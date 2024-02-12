import requests
from collections import defaultdict
from datetime import datetime

def get_github_monthly_stats_with_badges(username, api_token):
    base_url = 'https://api.github.com'
    headers = {'Authorization': f'token {api_token}'}

    # Retrieve contribution data for the user
    contrib_response = requests.get(f'{base_url}/users/{username}/repos', headers=headers)
    if contrib_response.status_code != 200:
        print(f"Error: Unable to retrieve user data (status code: {contrib_response.status_code})")
        return None 

    repos_data = contrib_response.json()
    
    # Initialize dictionary to store contributions counts per month
    monthly_contribution_stats = defaultdict(lambda: {'commits': 0, 'additions': 0, 'deletions': 0})

    for repo in repos_data:
        repo_name = repo['name']
        owner_name = repo['owner']['login']
        
        contrib_response = requests.get(f'{base_url}/repos/{owner_name}/{repo_name}/stats/contributors', headers=headers)
        if contrib_response.status_code != 200:
            continue  

        contrib_data = contrib_response.json()
        
        for contributor in contrib_data:
            if contributor['author']['login'] == username:
                for week_data in contributor['weeks']:
                    timestamp = datetime.fromtimestamp(week_data['w'])
                    month_year = timestamp.strftime('%Y-%m')
                    monthly_contribution_stats[month_year]['commits'] += week_data['c']
                    monthly_contribution_stats[month_year]['additions'] += week_data['a']
                    monthly_contribution_stats[month_year]['deletions'] += week_data['d']
    
    # Determine badges for each month based on contribution counts
    monthly_stats_with_badges = {}
    for month, stats in monthly_contribution_stats.items():
        commit_badge = "Bronze Committer"
        if stats['commits'] >= 10:
            commit_badge = "Silver Committer"
        if stats['commits'] >= 20:
            commit_badge = "Gold Committer"

        addition_badge = "Bronze Contributor"
        if stats['additions'] >= 100:
            addition_badge = "Silver Contributor"
        if stats['additions'] >= 500:
            addition_badge = "Gold Contributor"

        deletion_badge = "Bronze Cleaner"
        if stats['deletions'] >= 500:
            deletion_badge = "Silver Cleaner"
        if stats['deletions'] >= 250:
            deletion_badge = "Gold Cleaner"
        
        monthly_stats_with_badges[month] = {
            "commits": stats['commits'],
            "additions": stats['additions'],
            "deletions": stats['deletions'],
            "commit_badge": commit_badge,
            "addition_badge": addition_badge,
            "deletion_badge": deletion_badge
        }
    
    return monthly_stats_with_badges


def print_monthly_stats_with_badges(monthly_stats_with_badges):
    for month, stats in sorted(monthly_stats_with_badges.items()):
        print(f"Month: {month}")
        print(f"Commits: {stats['commits']} | Commit Badge: {stats['commit_badge']}")
        print(f"Additions: {stats['additions']} | Addition Badge: {stats['addition_badge']}")
        print(f"Deletions: {stats['deletions']} | Deletion Badge: {stats['deletion_badge']}\n")


username = "Star-Viper"
api_token = "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"
monthly_stats_with_badges = get_github_monthly_stats_with_badges(username, api_token)
if monthly_stats_with_badges:
    print_monthly_stats_with_badges(monthly_stats_with_badges)
else:
    print("User not found or API request failed.")
