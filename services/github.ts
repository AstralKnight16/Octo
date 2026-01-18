const GITHUB_API_BASE = 'https://api.github.com';

interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name?: string;
  bio?: string;
  email?: string;
  location?: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description?: string;
  stargazers_count: number;
  forks_count: number;
  language?: string;
  updated_at: string;
  private: boolean;
}

async function fetchWithAuth(url: string, token: string) {
  const response = await fetch(url, {
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Octo-Mobile',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

export async function getAuthenticatedUser(token: string): Promise<GitHubUser> {
  return fetchWithAuth(`${GITHUB_API_BASE}/user`, token);
}

export async function getRepositories(
  token: string,
  filter: 'all' | 'starred' | 'recent' = 'all'
): Promise<GitHubRepository[]> {
  let url = `${GITHUB_API_BASE}/user/repos?sort=updated&per_page=30`;
  
  if (filter === 'starred') {
    url = `${GITHUB_API_BASE}/user/starred?sort=updated&per_page=30`;
  }

  const repos = await fetchWithAuth(url, token);
  
  if (filter === 'recent') {
    return repos
      .sort((a: GitHubRepository, b: GitHubRepository) => 
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
      .slice(0, 10);
  }
  
  return repos;
}

export async function searchRepositories(
  token: string,
  query: string
): Promise<GitHubRepository[]> {
  const url = `${GITHUB_API_BASE}/search/repositories?q=${encodeURIComponent(query)}&per_page=20`;
  const response = await fetchWithAuth(url, token);
  return response.items;
}

export async function authenticateWithGitHub(
  clientId: string,
  clientSecret: string,
  code: string
): Promise<string> {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error_description || data.error);
  }

  return data.access_token;
}
