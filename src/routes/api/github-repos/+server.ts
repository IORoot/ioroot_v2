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
    
    // Fetch README content for each repo
    const reposWithReadme = await Promise.all(
      repos.map(async (repo: any) => {
        console.log(`📖 Fetching README for: ${repo.name}`);
        try {
          // Try to fetch README from the main branch
          const readmeResponse = await fetch(`https://api.github.com/repos/IORoot/${repo.name}/readme`, {
            headers
          });
          
          if (readmeResponse.ok) {
            const readmeData = await readmeResponse.json();
            
            // Use the raw content endpoint which should handle encoding properly
            try {
              const rawResponse = await fetch(`https://raw.githubusercontent.com/IORoot/${repo.name}/main/README.md`);
              if (rawResponse.ok) {
                const rawContent = await rawResponse.text();
                console.log('📄 Using raw content for:', repo.name);
                return {
                  ...repo,
                  readme_content: rawContent,
                  readme_html: readmeData.html_url
                };
              }
            } catch (e) {
              console.warn('Could not fetch raw content, falling back to base64');
            }
            
            // Fallback to base64 decoding
            const binaryString = atob(readmeData.content);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            const readmeContent = new TextDecoder('utf-8').decode(bytes);
            
            // Debug: Check if content contains emojis
            if (readmeContent.includes('🚀') || readmeContent.includes('🎨') || readmeContent.includes('⚡')) {
              console.log('✅ Found emojis in README for:', repo.name);
            }
            return {
              ...repo,
              readme_content: readmeContent,
              readme_html: readmeData.html_url
            };
          } else {
            console.log(`⚠️ No README found in main branch for: ${repo.name}, trying other branches...`);
            // Try alternative branch names
            const branches = ['main', 'master', 'develop'];
            for (const branch of branches) {
              try {
                const branchReadmeResponse = await fetch(`https://api.github.com/repos/IORoot/${repo.name}/readme?ref=${branch}`, {
                  headers
                });
                if (branchReadmeResponse.ok) {
                  const readmeData = await branchReadmeResponse.json();
                  
                  // Try raw content for this branch
                  try {
                    const rawResponse = await fetch(`https://raw.githubusercontent.com/IORoot/${repo.name}/${branch}/README.md`);
                    if (rawResponse.ok) {
                      const rawContent = await rawResponse.text();
                      console.log(`📄 Using raw content for ${repo.name} (${branch})`);
                      return {
                        ...repo,
                        readme_content: rawContent,
                        readme_html: readmeData.html_url
                      };
                    }
                  } catch (e) {
                    console.warn(`Could not fetch raw content for ${repo.name} (${branch})`);
                  }
                  
                  // Fallback to base64 decoding
                  const binaryString = atob(readmeData.content);
                  const bytes = new Uint8Array(binaryString.length);
                  for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                  }
                  const readmeContent = new TextDecoder('utf-8').decode(bytes);
                  console.log(`✅ Found README in ${branch} branch for: ${repo.name}`);
                  return {
                    ...repo,
                    readme_content: readmeContent,
                    readme_html: readmeData.html_url
                  };
                }
              } catch (e) {
                // Continue to next branch
              }
            }
          }
        } catch (error) {
          console.warn(`Could not fetch README for ${repo.name}:`, error);
        }
        
        // Return repo without README if all attempts failed
        console.log(`❌ No README found for: ${repo.name}`);
        return {
          ...repo,
          readme_content: null,
          readme_html: null
        };
      })
    );
    
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