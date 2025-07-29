#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchGitHubData() {
  try {
    console.log('🔍 Fetching GitHub data for build...');
    
    // Get GitHub token from environment
    const token = process.env.VITE_GITHUB_TOKEN;
    
    // Prepare headers
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'IORoot-Portfolio'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      console.log('🔑 Using GitHub token for API requests');
    } else {
      console.log('⚠️ No GitHub token found, using unauthenticated requests');
    }
    
    // Fetch all repos using pagination
    let allRepos = [];
    let page = 1;
    const perPage = 100;
    
    while (true) {
      console.log(`📄 Fetching page ${page}...`);
      const response = await fetch(`https://api.github.com/users/IORoot/repos?sort=updated&per_page=${perPage}&page=${page}`, {
        headers
      });
      
      if (!response.ok) {
        console.error(`GitHub API error: ${response.status} - ${response.statusText}`);
        break;
      }
      
      const repos = await response.json();
      
      if (repos.length === 0) {
        break;
      }
      
      allRepos = allRepos.concat(repos);
      console.log(`📦 Fetched page ${page} (${repos.length} repos)`);
      
      if (repos.length < perPage) {
        break;
      }
      
      page++;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`📦 Total repos fetched: ${allRepos.length}`);
    
    // Fetch README content for each repo
    const reposWithReadme = await Promise.all(
      allRepos.map(async (repo) => {
        try {
          const rawReadmeUrl = `https://raw.githubusercontent.com/IORoot/${repo.name}/refs/heads/master/README.md`;
          const readmeResponse = await fetch(rawReadmeUrl);
          
          if (readmeResponse.ok) {
            const readmeContent = await readmeResponse.text();
            return {
              ...repo,
              readme_content: readmeContent,
              readme_html: `https://github.com/IORoot/${repo.name}/blob/master/README.md`
            };
          } else {
            const apiReadmeResponse = await fetch(`https://api.github.com/repos/IORoot/${repo.name}/readme`, {
              headers
            });
            if (apiReadmeResponse.ok) {
              const readmeData = await apiReadmeResponse.json();
              const readmeContent = atob(readmeData.content);
              return {
                ...repo,
                readme_content: readmeContent,
                readme_html: readmeData.html_url
              };
            }
          }
        } catch (error) {
          console.warn(`Could not fetch README for ${repo.name}:`, error.message);
        }
        return repo;
      })
    );
    
    return reposWithReadme;
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return [];
  }
}

async function buildProjectsData() {
  try {
    console.log('🚀 Building projects data...');
    
    const repos = await fetchGitHubData();
    
    if (repos.length === 0) {
      console.log('❌ No repos fetched, using empty data');
      return;
    }
    
    // Create static directory
    const staticDir = path.join(__dirname, '..', 'src', 'lib', 'static');
    if (!fs.existsSync(staticDir)) {
      fs.mkdirSync(staticDir, { recursive: true });
    }
    
    // Save all repos data
    const reposData = {
      repos: repos,
      totalRepos: repos.length,
      lastUpdated: new Date().toISOString()
    };
    
    fs.writeFileSync(
      path.join(staticDir, 'projects.json'),
      JSON.stringify(reposData, null, 2)
    );
    
    // Save individual repo data
    repos.forEach(repo => {
      fs.writeFileSync(
        path.join(staticDir, `project-${repo.name}.json`),
        JSON.stringify(repo, null, 2)
      );
    });
    
    console.log(`✅ Built projects data for ${repos.length} repos`);
    console.log(`📁 Data saved to ${staticDir}`);
  } catch (error) {
    console.error('❌ Error building projects data:', error);
  }
}

buildProjectsData(); 