from flask import Flask, render_template, request
from PyPDF2 import PdfReader
import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
import json
import PyPDF2
import requests

app = Flask(__name__)

def recommend_projects(pdf_file):
    def extract_text_from_pdf(pdf_file) -> str:
        try:
            reader = PyPDF2.PdfReader(pdf_file, strict=False)
            pdf_text = []
            for page in reader.pages:
                content = page.extract_text()
                pdf_text.append(content)
            return '\n'.join(pdf_text)
        except Exception as e:
            print(f"Error: {e}")
            return ''

    def preprocess_text(text):
        if isinstance(text, str):
            words = word_tokenize(text)
            clean_words = [word.lower() for word in words if word.isalpha() and word.lower() not in stop_words]
            return ' '.join(clean_words)
        else:
            return ''

    def get_top_repositories(domain):
        url = f""
        headers = {
            "Accept": "application/vnd.github.v3+json"
        }
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            repositories = response.json()["items"]
            return repositories
        else:
            print(f"Failed to fetch repositories for domain '{domain}'. Status code: {response.status_code}")
            return None

    stop_words = set(stopwords.words('english'))

    extracted_text = extract_text_from_pdf(pdf_file)

    if not extracted_text:
        return "Failed to extract text from PDF."

    df = pd.read_json('PY_data.json')

    df['Experience'] = df['Projects'].apply(lambda x: preprocess_text(x.get('Experience', '')))
    df['Skills'] = df['Skills'].apply(preprocess_text)
    df['Domain'] = df['Domain'].apply(preprocess_text)

    df['Combined_Text'] = df['Experience'] + ' ' + df['Skills'] + ' ' + df['Domain']

    vectorizer = TfidfVectorizer(max_features=5000, ngram_range=(1, 2))
    tfidf_matrix = vectorizer.fit_transform(df['Combined_Text'])

    client_resume = extracted_text
    client_resume = preprocess_text(client_resume)

    client_resume_vector = vectorizer.transform([client_resume])

    cosine_similarities = cosine_similarity(client_resume_vector, tfidf_matrix)

    top_n_projects_indices = cosine_similarities.argsort()[0][::-1][:5]

    if cosine_similarities[0, top_n_projects_indices[0]] == 0:
        return "No matching projects found."
    else:
        unique_top_projects_indices = list(set(top_n_projects_indices))

        while len(unique_top_projects_indices) < 5:
            additional_projects = cosine_similarities.argsort()[0][::-1][len(unique_top_projects_indices):len(unique_top_projects_indices)+5]
            unique_top_projects_indices.extend(set(additional_projects))

        recommended_projects = df.loc[unique_top_projects_indices[:5], ['Experience', 'Skills', 'Domain']]

        unique_domains = set(recommended_projects['Domain'])

        output = ""

        for domain in unique_domains:
            output += f"\n{domain.capitalize()} repositories:\n"
            repositories = get_top_repositories(domain)
            if repositories:
                for index, repo in enumerate(repositories, start=1):
                    output += f"{index}. {repo['name']} - {repo['html_url']} (Stars: {repo['stargazers_count']})\n"
            else:
                output += f"Failed to fetch repositories for domain '{domain}'.\n"

        return output

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        if 'pdf_file' not in request.files:
            return render_template('index.html')

        pdf_file = request.files['pdf_file']
        if pdf_file.filename == '':
            return render_template('index.html')

        if pdf_file:
            output = recommend_projects(pdf_file)
            return render_template('index.html', output=output)

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
