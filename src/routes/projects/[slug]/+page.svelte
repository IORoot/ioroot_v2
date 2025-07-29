<script lang="ts">
  import Navigation from '$lib/components/Navigation.svelte';
  import MarkdownTable from '$lib/components/MarkdownTable.svelte';
  import type { PageData } from './$types';
  import hljs from 'highlight.js';
  import 'highlight.js/styles/atom-one-dark.css';
  import { onMount } from 'svelte';
  import { categorizeRepo, extractTagsFromRepo, formatDate, type GitHubRepo } from '$lib/github-client';
	
	export let data: PageData;
	
	// Client-side data fetching
	let repo: GitHubRepo | null = null;
	let loading = true;
	let error = '';
	
	onMount(async () => {
		try {
			loading = true;
			console.log('🔍 Loading project:', data.slug);
			
			// Check for refresh cache query parameter
			const urlParams = new URLSearchParams(window.location.search);
			const shouldRefreshCache = urlParams.get('refreshcache') === 'true';
			
			if (shouldRefreshCache) {
				console.log('🔄 Force refreshing cache due to query parameter');
				localStorage.removeItem('github-repos-cache');
				localStorage.removeItem('github-repos-timestamp');
				// Remove the query parameter from URL
				const newUrl = window.location.pathname;
				window.history.replaceState({}, '', newUrl);
			}
			
			// Check for cached data first
			const cachedData = localStorage.getItem('github-repos-cache');
			const cacheTimestamp = localStorage.getItem('github-repos-timestamp');
			const now = Date.now();
			const cacheAge = now - (parseInt(cacheTimestamp || '0'));
			const cacheValid = cacheAge < 24 * 60 * 60 * 1000; // 24 hours
			
			let repos: GitHubRepo[] = [];
			
			if (cachedData && cacheValid && !shouldRefreshCache) {
				console.log('📦 Using cached data (age:', Math.round(cacheAge / 1000 / 60), 'minutes)');
				const parsedData = JSON.parse(cachedData);
				repos = parsedData.repos || [];
			} else {
				console.log('🔄 Fetching fresh data from API');
				const response = await fetch('/api/github-repos');
				console.log('📡 API response status:', response.status);
				
				if (response.ok) {
					const apiData = await response.json();
					console.log('📦 API data received, repos count:', apiData.repos?.length || 0);
					
					// Cache the data
					localStorage.setItem('github-repos-cache', JSON.stringify(apiData));
					localStorage.setItem('github-repos-timestamp', now.toString());
					console.log('💾 Cached data for 24 hours');
					
					repos = apiData.repos || [];
				} else {
					error = 'Failed to load project';
					console.log('❌ API failed:', response.status, response.statusText);
					return;
				}
			}
			
			const foundRepo = repos.find((r: GitHubRepo) => r.name === data.slug);
			console.log('🎯 Found repo:', foundRepo ? foundRepo.name : 'not found');
			
			if (foundRepo) {
				repo = {
					...foundRepo,
					category: categorizeRepo(foundRepo),
					tags: extractTagsFromRepo(foundRepo),
					formattedDate: formatDate(foundRepo.updated_at)
				};
				console.log('✅ Processed repo:', repo.name);
				console.log('📚 README content length:', repo.readme_content?.length || 0);
				console.log('📚 README HTML URL:', repo.readme_html);
			} else {
				// If repo not found, create a fallback with basic info
				repo = {
					id: 1,
					name: data.slug,
					full_name: `IORoot/${data.slug}`,
					description: `Project ${data.slug}`,
					html_url: `https://github.com/IORoot/${data.slug}`,
					clone_url: `https://github.com/IORoot/${data.slug}.git`,
					ssh_url: `git@github.com:IORoot/${data.slug}.git`,
					stargazers_count: 0,
					watchers_count: 0,
					forks_count: 0,
					language: 'Unknown',
					default_branch: 'main',
					created_at: '2024-01-01T00:00:00Z',
					updated_at: '2024-01-01T00:00:00Z',
					pushed_at: '2024-01-01T00:00:00Z',
					archived: false,
					disabled: false,
					private: false,
					fork: false,
					topics: [],
					category: 'Other',
					tags: [],
					formattedDate: 'Unknown'
				};
				console.log('⚠️ Using fallback repo for:', data.slug);
			}
		} catch (err) {
			error = 'Failed to load project';
			console.error('💥 Error loading project:', err);
		} finally {
			loading = false;
		}
	});
	

	
	// Get the raw README content and convert to HTML
	$: rawContent = repo?.readme_content || '';
	$: htmlContent = rawContent && repo?.name ? convertMarkdownToHtml(rawContent, repo.name) : '';
	
	// Convert markdown to HTML with proper image URL conversion
	function convertMarkdownToHtml(markdown: string, repoName: string | undefined): string {
		if (!markdown) return '';
		
		// First, extract and preserve code blocks
		const codeBlocks: string[] = [];
		let codeBlockIndex = 0;
		
		// Replace code blocks with placeholders
		let processedMarkdown = markdown.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
			const placeholder = `__CODE_BLOCK_${codeBlockIndex}__`;
			
			// Use highlight.js for syntax highlighting
			let highlightedCode = code;
			if (lang) {
				try {
					highlightedCode = hljs.highlight(code, { language: lang }).value;
				} catch (e) {
					// Fallback to auto-detection if language is not supported
					highlightedCode = hljs.highlightAuto(code).value;
				}
			} else {
				// Auto-detect language if none specified
				highlightedCode = hljs.highlightAuto(code).value;
			}
			
			codeBlocks[codeBlockIndex] = `<pre class="bg-[#282C34] p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm border border-[#3E4451]"><code class="hljs">${highlightedCode}</code></pre>`;
			codeBlockIndex++;
			return placeholder;
		});
		
		// Also preserve inline code
		const inlineCodeBlocks: string[] = [];
		let inlineCodeIndex = 0;
		
		processedMarkdown = processedMarkdown.replace(/`([^`]+)`/g, (match, code) => {
			const placeholder = `__INLINE_CODE_${inlineCodeIndex}__`;
			inlineCodeBlocks[inlineCodeIndex] = `<code class="bg-[#E4EDEE] px-2 py-1 rounded text-sm font-mono">${code}</code>`;
			inlineCodeIndex++;
			return placeholder;
		});
		
		let html = processedMarkdown
			// Headers
			.replace(/^### (.*$)/gim, '<h3 class="text-3xl font-black text-[#434840] mt-8 mb-4">$1</h3>')
			.replace(/^## (.*$)/gim, '<h2 class="text-4xl font-black text-[#434840] mt-8 mb-4">$1</h2>')
			.replace(/^# (.*$)/gim, '<h1 class="text-5xl font-black text-[#434840] mt-8 mb-4">$1</h1>')
			
			// Bold and italic
			.replace(/\*\*(.*?)\*\*/g, '<strong class="font-black">$1</strong>')
			.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
			
			// Lists
			.replace(/^\* (.*$)/gim, '<li class="ml-4 mb-2 text-[#434840] font-semibold">$1</li>')
			.replace(/^- (.*$)/gim, '<li class="ml-4 mb-2 text-[#434840] font-semibold">$1</li>')
			
			// Convert list items to proper lists
			.replace(/(<li.*<\/li>)/g, '<ul class="list-disc ml-6 mb-4">$1</ul>')
			
			// Paragraphs
			.replace(/^(?!<[h|u|p|pre])(.*$)/gim, '<p class="mb-4 text-[#434840] font-semibold text-lg">$1</p>')
			
			// Clean up empty paragraphs
			.replace(/<p class="mb-4 text-[#434840] font-semibold text-lg"><\/p>/g, '')
			.replace(/<p class="mb-4 text-[#434840] font-semibold text-lg">\s*<\/p>/g, '');
		
		// Restore code blocks
		codeBlocks.forEach((codeBlock, index) => {
			html = html.replace(`__CODE_BLOCK_${index}__`, codeBlock);
		});
		
		// Restore inline code
		inlineCodeBlocks.forEach((inlineCode, index) => {
			html = html.replace(`__INLINE_CODE_${index}__`, inlineCode);
		});
		
		// Convert all image references to proper URLs FIRST
		html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
			let imageUrl = url;
			
			// Handle relative/local image references
			if (url && !url.startsWith('http') && !url.startsWith('//') && !url.startsWith('data:')) {
				// Remove leading slash if present
				const cleanUrl = url.replace(/^\//, '');
				// Convert to GitHub raw URL with proper branch reference
				imageUrl = `https://raw.githubusercontent.com/IORoot/${repoName}/refs/heads/master/${cleanUrl}`;
			}
			
			return `<img src="${imageUrl}" alt="${alt}" class="max-w-full h-auto rounded-lg my-4" loading="lazy" />`;
		});
		
		// Also handle HTML img tags that might be in the markdown
		html = html.replace(/<img([^>]+)src="([^"]+)"([^>]*)>/g, (match, before, url, after) => {
			let imageUrl = url;
			
			// Handle relative/local image references in HTML img tags
			if (url && !url.startsWith('http') && !url.startsWith('//') && !url.startsWith('data:')) {
				// Remove leading slash if present
				const cleanUrl = url.replace(/^\//, '');
				// Convert to GitHub raw URL with proper branch reference
				imageUrl = `https://raw.githubusercontent.com/IORoot/${repoName}/refs/heads/master/${cleanUrl}`;
			}
			
			return `<img${before}src="${imageUrl}"${after}>`;
		});
		
		// Convert links AFTER images (exclude links that are already converted to images)
		html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
			// Skip if this looks like it was already processed as an image
			if (text.includes('<img')) {
				return match;
			}
			return `<a href="${url}" class="text-[#E7A97F] hover:text-[#87A7AC] underline font-bold" target="_blank" rel="noopener noreferrer">${text}</a>`;
		});
		
		return html;
	}
	
	// Extract first image from markdown content
	function extractFirstImage(markdown: string, repoName: string): string | null {
		// Match markdown image syntax: ![alt](url)
		const imageMatch = markdown.match(/!\[([^\]]*)\]\(([^)]+)\)/);
		if (imageMatch) {
			let imageUrl = imageMatch[2];
			
			// Convert local image references to GitHub raw URLs
			if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('//')) {
				// Remove leading slash if present
				imageUrl = imageUrl.replace(/^\//, '');
				// Convert to GitHub raw URL with proper branch reference
				imageUrl = `https://raw.githubusercontent.com/IORoot/${repoName}/refs/heads/master/${imageUrl}`;
			}
			
			return imageUrl;
		}
		
		// Also check for HTML img tags
		const htmlImageMatch = markdown.match(/<img[^>]+src="([^"]+)"/);
		if (htmlImageMatch) {
			let imageUrl = htmlImageMatch[1];
			
			// Convert local image references to GitHub raw URLs
			if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('//')) {
				// Remove leading slash if present
				imageUrl = imageUrl.replace(/^\//, '');
				// Convert to GitHub raw URL with proper branch reference
				imageUrl = `https://raw.githubusercontent.com/IORoot/${repoName}/refs/heads/master/${imageUrl}`;
			}
			
			return imageUrl;
		}
		
		return null;
	}


</script>

<svelte:head>
	<title>{repo?.name || 'Project'} - Andy Pearson</title>
	<meta name="description" content="{repo?.description || `View ${repo?.name || 'project'} details and documentation`}" />
</svelte:head>

<div class="min-h-screen bg-[#EAE6D8]">
	<Navigation theme="peach" />
	
	{#if loading}
		<div class="container-custom py-12">
			<div class="max-w-4xl mx-auto text-center">
				<div class="flex items-center justify-center mb-4">
					<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#677A67]"></div>
				</div>
				<div class="text-2xl text-[#434840] font-bold">Loading project...</div>
			</div>
		</div>
	{:else if error}
		<div class="container-custom py-12">
			<div class="max-w-4xl mx-auto text-center">
				<div class="text-2xl text-[#434840] font-bold">Error: {error}</div>
				<a href="/projects" class="text-[#E7A97F] hover:text-[#87A7AC] font-bold text-xl mt-4 inline-block">
					← Back to Projects
				</a>
			</div>
		</div>
	{:else if repo}
	
	<!-- Main Image Section -->
	{#if repo.readme_content}
		{@const firstImage = extractFirstImage(repo.readme_content, repo.name)}
		{#if firstImage}
			<section class="w-full">
				<img 
					src={firstImage} 
					alt="{repo.name} preview" 
					class="w-full h-auto object-contain bg-[#E4EDEE]"
					loading="lazy"
				/>
			</section>
		{/if}
	{/if}
	
	<!-- Project Information Section -->
	<section class="py-12 bg-white">
		<div class="container-custom">
			<div class="max-w-4xl mx-auto">
				<!-- Breadcrumb -->
				<nav class="mb-8">
					<a href="/projects" class="text-[#E7A97F] hover:text-[#87A7AC] font-bold text-xl">
						← Back to Projects
					</a>
				</nav>
				
				<!-- Project Header -->
				<div class="mb-8">
					<h1 class="text-5xl md:text-6xl font-black text-[#434840] mb-4">
						{repo.name}
					</h1>
					{#if repo.description}
						<p class="text-2xl text-[#434840] mb-6 font-semibold">
							{repo.description}
						</p>
					{/if}
					
					<!-- Project Meta -->
					<div class="flex flex-wrap items-center gap-6 text-lg text-[#677A67] mb-6 font-semibold">
						{#if repo.category}
							<span class="flex items-center">
								{repo.category}
							</span>
						{/if}
						<span class="flex items-center">
							⭐ {repo.stargazers_count} stars
						</span>
						<span class="flex items-center">
							🍴 {repo.forks_count} forks
						</span>
						<span class="flex items-center">
							📅 {repo.formattedDate}
						</span>
					</div>
					
					<!-- Tags -->
					{#if repo.tags && repo.tags.length > 0}
						<div class="flex flex-wrap gap-2 mb-6">
							{#each repo.tags as tag}
								<span class="px-4 py-2 bg-[#EAE6D8] text-[#434840] text-lg rounded-full font-bold">
									{tag}
								</span>
							{/each}
						</div>
					{/if}
					
					<!-- Action Buttons -->
					<div class="flex flex-col sm:flex-row gap-4">
						<a 
							href={repo.html_url} 
							target="_blank" 
							rel="noopener noreferrer"
							class="btn btn-primary bg-[#E7A97F] hover:bg-[#87A7AC] flex items-center justify-center space-x-2 text-xl font-bold px-8 py-4"
						>
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
							</svg>
							<span>View on GitHub</span>
						</a>
						{#if repo.homepage}
							<a 
								href={repo.homepage} 
								target="_blank" 
								rel="noopener noreferrer"
								class="btn btn-secondary bg-[#EAE6D8] text-[#434840] hover:bg-[#E7A97F] hover:text-white flex items-center justify-center space-x-2 text-xl font-bold px-8 py-4"
							>
								<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
								</svg>
								<span>Live Demo</span>
							</a>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</section>
	
	<!-- README Content -->
	{#if rawContent}
		<section class="py-20 bg-[#E4EDEE]">
			<div class="container-custom">
				<div class="max-w-4xl mx-auto">
					<h2 class="text-4xl font-black text-[#434840] mb-8">
						Documentation
					</h2>
					
					<div class="prose prose-lg max-w-none text-base leading-relaxed text-[#434840]">
						{@html htmlContent}
					</div>
				</div>
			</div>
		</section>
	{:else}
		<section class="py-20 bg-[#E4EDEE]">
			<div class="container-custom">
				<div class="max-w-4xl mx-auto text-center">
					<h2 class="text-4xl font-black text-[#434840] mb-8">
						Documentation
					</h2>
					<p class="text-[#434840] text-xl font-semibold">
						No README content available for this project.
					</p>
					<a 
						href={repo.html_url} 
						target="_blank" 
						rel="noopener noreferrer"
						class="btn btn-primary bg-[#E7A97F] hover:bg-[#87A7AC] mt-4 text-xl font-bold px-8 py-4"
					>
						View on GitHub for more details
					</a>
				</div>
			</div>
		</section>
	{/if}
	{/if}
</div> 