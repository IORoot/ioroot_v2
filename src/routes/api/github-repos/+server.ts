import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function GET() {
  try {
    console.log('📡 Fetching GitHub repos...');
    
    // Get GitHub token from environment (server-side)
    const token = env.GITHUB_TOKEN || import.meta.env.VITE_GITHUB_TOKEN;
    console.log('🔑 Token available:', !!token);
    
    // Prepare headers
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'IORoot-Portfolio'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      console.log('🔑 Using GitHub token');
    } else {
      console.log('⚠️ No GitHub token, using unauthenticated requests');
    }
    
    // Fetch repos from GitHub API
    const response = await fetch('https://api.github.com/users/IORoot/repos?sort=updated&per_page=100', {
      headers
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`GitHub API error: ${response.status} - ${response.statusText}`);
      console.error('Response body:', errorText);
      throw new Error(`GitHub API error: ${response.status} - ${response.statusText}`);
    }
    
    const repos = await response.json();
    console.log(`📦 Fetched ${repos.length} repos from GitHub`);
    
    // Fetch README content for each repo with rate limiting
    const reposWithReadme: any[] = [];
    
    for (let i = 0; i < repos.length; i++) {
      const repo = repos[i];
      console.log(`📖 Fetching README for: ${repo.name} (${i + 1}/${repos.length})`);
      
      try {
        // Add delay between requests to avoid rate limiting
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay between requests
        }
        
        // Try to fetch README from the main branch with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        console.log(`🔍 Making API call for ${repo.name} to: https://api.github.com/repos/IORoot/${repo.name}/readme`);
        const readmeResponse = await fetch(`https://api.github.com/repos/IORoot/${repo.name}/readme`, {
          headers,
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        console.log(`📡 Response status for ${repo.name}: ${readmeResponse.status} ${readmeResponse.statusText}`);
        
        if (readmeResponse.ok) {
          const readmeData = await readmeResponse.json();
          console.log(`✅ Successfully fetched README data for ${repo.name}, content length: ${readmeData.content?.length || 0}`);
          
          // Use the raw content endpoint which should handle encoding properly
          try {
            const rawController = new AbortController();
            const rawTimeoutId = setTimeout(() => rawController.abort(), 10000);
            
            // Use the default branch from the repo data, fallback to main
            const defaultBranch = repo.default_branch || 'main';
            console.log(`🔍 Trying raw content for ${repo.name} on branch: ${defaultBranch}`);
            
            const rawResponse = await fetch(`https://raw.githubusercontent.com/IORoot/${repo.name}/${defaultBranch}/README.md`, {
              signal: rawController.signal
            });
            
            clearTimeout(rawTimeoutId);
            
            if (rawResponse.ok) {
              const rawContent = await rawResponse.text();
              console.log(`📄 Using raw content for: ${repo.name}, length: ${rawContent.length}`);
              reposWithReadme.push({
                ...repo,
                readme_content: rawContent,
                readme_html: readmeData.html_url
              });
              continue;
            } else {
              console.log(`⚠️ Raw content failed for ${repo.name} on ${defaultBranch}: ${rawResponse.status} ${rawResponse.statusText}`);
            }
          } catch (e) {
            console.warn(`Could not fetch raw content for ${repo.name}:`, e);
          }
          
          // Fallback to base64 decoding
          console.log(`🔄 Falling back to base64 decoding for ${repo.name}`);
          const binaryString = atob(readmeData.content);
          const bytes = new Uint8Array(binaryString.length);
          for (let j = 0; j < binaryString.length; j++) {
            bytes[j] = binaryString.charCodeAt(j);
          }
          const readmeContent = new TextDecoder('utf-8').decode(bytes);
          console.log(`📄 Base64 decoded content for ${repo.name}, length: ${readmeContent.length}`);
          
          // Debug: Check if content contains emojis
          if (readmeContent.includes('🚀') || readmeContent.includes('🎨') || readmeContent.includes('⚡')) {
            console.log('✅ Found emojis in README for:', repo.name);
          }
          reposWithReadme.push({
            ...repo,
            readme_content: readmeContent,
            readme_html: readmeData.html_url
          });
        } else {
          console.log(`⚠️ No README found in main branch for: ${repo.name}, status: ${readmeResponse.status}, trying other branches...`);
          // Try alternative branch names
          const branches = ['main', 'master', 'develop'];
          for (const branch of branches) {
            try {
              console.log(`🔍 Trying ${branch} branch for ${repo.name}...`);
              const branchController = new AbortController();
              const branchTimeoutId = setTimeout(() => branchController.abort(), 10000);
              
              const branchReadmeResponse = await fetch(`https://api.github.com/repos/IORoot/${repo.name}/readme?ref=${branch}`, {
                headers,
                signal: branchController.signal
              });
              
              clearTimeout(branchTimeoutId);
              console.log(`📡 ${branch} branch response for ${repo.name}: ${branchReadmeResponse.status} ${branchReadmeResponse.statusText}`);
              
              if (branchReadmeResponse.ok) {
                const readmeData = await branchReadmeResponse.json();
                
                // Try raw content for this branch
                try {
                  const rawController = new AbortController();
                  const rawTimeoutId = setTimeout(() => rawController.abort(), 10000);
                  
                  console.log(`🔍 Trying raw content for ${repo.name} on branch: ${branch}`);
                  const rawResponse = await fetch(`https://raw.githubusercontent.com/IORoot/${repo.name}/${branch}/README.md`, {
                    signal: rawController.signal
                  });
                  
                  clearTimeout(rawTimeoutId);
                  
                  if (rawResponse.ok) {
                    const rawContent = await rawResponse.text();
                    console.log(`📄 Using raw content for ${repo.name} (${branch}), length: ${rawContent.length}`);
                    reposWithReadme.push({
                      ...repo,
                      readme_content: rawContent,
                      readme_html: readmeData.html_url
                    });
                    break;
                  } else {
                    console.log(`⚠️ Raw content failed for ${repo.name} on ${branch}: ${rawResponse.status} ${rawResponse.statusText}`);
                  }
                } catch (e) {
                  console.warn(`Could not fetch raw content for ${repo.name} (${branch}):`, e);
                }
                
                // Fallback to base64 decoding
                const binaryString = atob(readmeData.content);
                const bytes = new Uint8Array(binaryString.length);
                for (let j = 0; j < binaryString.length; j++) {
                  bytes[j] = binaryString.charCodeAt(j);
                }
                const readmeContent = new TextDecoder('utf-8').decode(bytes);
                console.log(`✅ Found README in ${branch} branch for: ${repo.name}`);
                reposWithReadme.push({
                  ...repo,
                  readme_content: readmeContent,
                  readme_html: readmeData.html_url
                });
                break;
              }
            } catch (e) {
              // Continue to next branch
            }
          }
        }
      } catch (error) {
        console.warn(`Could not fetch README for ${repo.name}:`, error);
        if (error instanceof Error) {
          console.warn(`Error details for ${repo.name}:`, error.message);
        }
      }
      
      // Return repo without README if all attempts failed
      if (!reposWithReadme.find(r => r.name === repo.name)) {
        console.log(`❌ No README found for: ${repo.name}`);
        reposWithReadme.push({
          ...repo,
          readme_content: null,
          readme_html: null
        });
      }
    }
    
    const reposWithReadmeCount = reposWithReadme.filter(repo => repo.readme_content).length;
    console.log(`📚 Added README content for ${reposWithReadmeCount}/${reposWithReadme.length} repos`);
    
    return json({
      success: true,
      repos: reposWithReadme,
      totalRepos: reposWithReadme.length,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return json({
      success: false,
      repos: [],
      totalRepos: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 