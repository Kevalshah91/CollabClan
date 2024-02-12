import requests

def get_top_repositories(domain):
    url = f"https://api.github.com/search/repositories?q=stars:>1+topic:{domain}&sort=stars&order=desc&per_page=50"
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

def display_top_repositories(domains):
    for domain in domains:
        print(f"\nTop 50 {domain.capitalize()} repositories:")
        repositories = get_top_repositories(domain)
        if repositories:
            for index, repo in enumerate(repositories, start=1):
                repo_name = repo['name']
                repo_url = repo['html_url']
                username = repo['owner']['login']  # Get the owner's username
                print(f"{index}. Username: {username}, Project Name: {repo_name}, Repo Link: {repo_url} (Stars: {repo['stargazers_count']})")


domains = ['AI','ML','WEB','APP','FINTECH','CYBER SECURITY','IOT','Data Science']

display_top_repositories(domains)
