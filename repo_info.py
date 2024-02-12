import requests
import base64  
from urllib.parse import urlparse


username = 'Say2hub'
token = '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'


def get_repo_details(username, repo_name):
    url_repo = f'https://api.github.com/repos/{username}/{repo_name}'
    url_languages = f'https://api.github.com/repos/{username}/{repo_name}/languages'
    url_commits = f'https://api.github.com/repos/{username}/{repo_name}/commits'
    url_readme = f'https://api.github.com/repos/{username}/{repo_name}/readme'
    url_contributors = f'https://api.github.com/repos/{username}/{repo_name}/contributors'
    
    headers = {'Authorization': f'token {token}'}
    
    # Fetch repository information
    response_repo = requests.get(url_repo, headers=headers)
    if response_repo.status_code == 200:
        repo_info = response_repo.json()
    else:
        print(f"Failed to fetch repository info: {response_repo.status_code}")
        return None
    
    # Fetch language information
    response_languages = requests.get(url_languages, headers=headers)
    if response_languages.status_code == 200:
        languages_info = response_languages.json()
    else:
        print(f"Failed to fetch language info: {response_languages.status_code}")
        return None
    
    # Fetch commit information
    response_commits = requests.get(url_commits, headers=headers)
    if response_commits.status_code == 200:
        commits_info = response_commits.json()
    else:
        print(f"Failed to fetch commit info: {response_commits.status_code}")
        return None
    
    # Fetch README content
    response_readme = requests.get(url_readme, headers=headers)
    if response_readme.status_code == 200:
        readme_content = response_readme.json()['content']
    else:
        print(f"Failed to fetch README content: {response_readme.status_code}")
        return None
    
    # Fetch contributors and their commits
    response_contributors = requests.get(url_contributors, headers=headers)
    if response_contributors.status_code == 200:
        contributors_info = response_contributors.json()
        contributors = {contributor['login']: contributor['contributions'] for contributor in contributors_info}
    else:
        print(f"Failed to fetch contributors: {response_contributors.status_code}")
        return None
    
    # Extract languages used
    languages_used = list(languages_info.keys())
    
    # Extract commit count
    commit_count = len(commits_info)
    
    return {
        'repo_info': repo_info,
        'languages_used': languages_used,
        'commit_count': commit_count,
        'readme_content': readme_content,
        'contributors': contributors
    }

# Function to extract user name from contributor URL
def extract_username_from_url(contributor_url):
    path = urlparse(contributor_url).path
    username = path.split('/')[1]  # Get the username from the URL path
    return username

# Function to print repository details
def print_repo_details(repo_details):
    if repo_details:
        print("Repository Information:")
        print(f"Name: {repo_details['repo_info']['name']}")
        print(f"Description: {repo_details['repo_info']['description']}")
        print(f"Language: {repo_details['repo_info']['language']}")
        print("Contributors:")
        for contributor, commits in repo_details['contributors'].items():
            print(f"- {contributor}: {commits} commits")
        print(f"Commit Count: {repo_details['commit_count']}")
        print(f"Languages Used: {repo_details['languages_used']}")
        
        decoded_readme = base64.b64decode(repo_details['readme_content']).decode('utf-8')
        print("README Content:")
        print(decoded_readme)

# Function to generate combined link for contributors
def generate_contributors_link(contributors_url, owner, repo):
    response = requests.get(contributors_url, headers={'Authorization': f'token {token}'})
    if response.status_code == 200:
        contributors = response.json()
        usernames = [contributor['login'] for contributor in contributors]
        username_combined = '/'.join(usernames)
        return f"https://github.com/{username_combined}/{repo}"
    else:
        print(f"Failed to fetch contributors: {response.status_code}")
        return None


username = 'Kevalshah91'
repo_name = 'Summ-e5'
repo_details = get_repo_details(username, repo_name)
print_repo_details(repo_details)
