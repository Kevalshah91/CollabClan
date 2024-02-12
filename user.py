import requests


username = 'Say2hub'
token = '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'

def get_user_info(username):
    url = f'https://api.github.com/users/{username}'
    headers = {'Authorization': f'token {token}'}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        user_info = response.json()
        return user_info
    else:
        print(f"Failed to fetch information for user '{username}': {response.status_code}")
        return None

def get_user_repositories(username):
    url = f'https://api.github.com/users/{username}/repos'
    headers = {'Authorization': f'token {token}'}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        repositories = response.json()
        return repositories
    else:
        print(f"Failed to fetch repositories for user '{username}': {response.status_code}")
        return None

def get_repo_details(username, repo_name):
    url_repo = f'https://api.github.com/repos/{username}/{repo_name}'
    url_commits = f'https://api.github.com/repos/{username}/{repo_name}/commits'
    
    headers = {'Authorization': f'token {token}'}
    
    # Fetch repository information
    response_repo = requests.get(url_repo, headers=headers)
    if response_repo.status_code == 200:
        repo_info = response_repo.json()
    else:
        print(f"Failed to fetch repository info for '{repo_name}': {response_repo.status_code}")
        return None
    
    
    response_commits = requests.get(url_commits, headers=headers)
    if response_commits.status_code == 200:
        commits_info = response_commits.json()
        commit_count = len(commits_info)
    else:
        print(f"Failed to fetch commit info for '{repo_name}': {response_commits.status_code}")
        commit_count = None
    
    return {
        'repo_name': repo_name,
        'description': repo_info.get('description', ''),
        'language': repo_info.get('language', ''),
        'commit_count': commit_count
    }

def get_user_skills(username):
    url = f'https://api.github.com/users/{username}/repos'
    headers = {'Authorization': f'token {token}'}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        repositories = response.json()
        skills = set()
        for repo in repositories:
            if repo['language']:
                skills.add(repo['language'])
        return skills
    else:
        print(f"Failed to fetch repositories for user '{username}': {response.status_code}")
        return None

def get_user_badges(username):
    
    badges = ['Badge 1', 'Badge 2', 'Badge 3']
    return badges

def print_user_info(username):
    user_info = get_user_info(username)
    if user_info:
        print(f"User Information for '{username}':")
        print(f"Name: {user_info.get('name', '')}")
        print(f"Bio: {user_info.get('bio', '')}")
        print(f"Location: {user_info.get('location', '')}")
        print(f"Public Repositories: {user_info.get('public_repos', 0)}")
        print(f"Followers: {user_info.get('followers', 0)}")
        print(f"Following: {user_info.get('following', 0)}")
        print("")

def print_user_repo_details(username):
    repositories = get_user_repositories(username)
    if repositories:
        print(f"Repositories of user '{username}':")
        for repo in repositories:
            repo_name = repo['name']
            repo_details = get_repo_details(username, repo_name)
            if repo_details:
                print(f"\nRepository: {repo_name}")
                print(f"Description: {repo_details['description']}")
                print(f"Language: {repo_details['language']}")
                print(f"Commit Count: {repo_details['commit_count']}")

def print_user_skills(username):
    skills = get_user_skills(username)
    if skills:
        print(f"Skills of user '{username}':")
        for skill in skills:
            print(f"- {skill}")

def get_user_badges(username):
    # Here you can implement logic to determine user's badges
    # This can be based on certain criteria such as contributions, achievements, etc.
    # For this example, let's just return a list of predefined badges
    badges = [
        {'name': 'Contributor', 'description': 'Awarded for making contributions to open source projects'},
        {'name': 'Achiever', 'description': 'Awarded for achieving milestones in coding challenges'},
        {'name': 'Innovator', 'description': 'Awarded for innovative projects or ideas'}
    ]
    return badges

def print_user_badges(username):
    badges = get_user_badges(username)
    if badges:
        print(f"Badges of user '{username}':")
        for badge in badges:
            print(f"Badge Name: {badge['name']}")
            print(f"Description: {badge['description']}")
            print()  

username = 'Star-Viper'
print_user_info(username)
print_user_repo_details(username)
print_user_skills(username)
print_user_badges(username)
