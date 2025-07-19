<script lang="ts">
  import Navigation from '$lib/components/Navigation.svelte';
  import MarkdownTable from '$lib/components/MarkdownTable.svelte';
  import type { PageData } from './$types';
	
	export let data: PageData;
	
	$: ({ repo } = data);
	

	
	// Get the raw README content and convert to HTML
	$: rawContent = repo?.readme_content || '';
	$: htmlContent = rawContent ? convertMarkdownToHtml(rawContent, repo.name) : '';
	
	// Convert markdown to HTML with proper image URL conversion
	function convertMarkdownToHtml(markdown: string, repoName: string): string {
		if (!markdown) return '';
		
		// First, extract and preserve code blocks
		const codeBlocks: string[] = [];
		let codeBlockIndex = 0;
		
		// Replace code blocks with placeholders
		let processedMarkdown = markdown.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
			const placeholder = `__CODE_BLOCK_${codeBlockIndex}__`;
			codeBlocks[codeBlockIndex] = `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm whitespace-pre-wrap"><code>${code}</code></pre>`;
			codeBlockIndex++;
			return placeholder;
		});
		
		// Also preserve inline code
		const inlineCodeBlocks: string[] = [];
		let inlineCodeIndex = 0;
		
		processedMarkdown = processedMarkdown.replace(/`([^`]+)`/g, (match, code) => {
			const placeholder = `__INLINE_CODE_${inlineCodeIndex}__`;
			inlineCodeBlocks[inlineCodeIndex] = `<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">${code}</code>`;
			inlineCodeIndex++;
			return placeholder;
		});
		
		let html = processedMarkdown
			// Headers
			.replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold text-tech-800 dark:text-tech-200 mt-8 mb-4">$1</h3>')
			.replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold text-tech-800 dark:text-tech-200 mt-8 mb-4">$1</h2>')
			.replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-tech-800 dark:text-tech-200 mt-8 mb-4">$1</h1>')
			
			// Bold and italic
			.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
			.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
			
			// Lists
			.replace(/^\* (.*$)/gim, '<li class="ml-4 mb-2">$1</li>')
			.replace(/^- (.*$)/gim, '<li class="ml-4 mb-2">$1</li>')
			
			// Convert list items to proper lists
			.replace(/(<li.*<\/li>)/g, '<ul class="list-disc ml-6 mb-4">$1</ul>')
			
			// Paragraphs
			.replace(/^(?!<[h|u|p|pre])(.*$)/gim, '<p class="mb-4 text-gray-700 dark:text-gray-300">$1</p>')
			
			// Clean up empty paragraphs
			.replace(/<p class="mb-4 text-gray-700 dark:text-gray-300"><\/p>/g, '')
			.replace(/<p class="mb-4 text-gray-700 dark:text-gray-300">\s*<\/p>/g, '');
		
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
			return `<a href="${url}" class="text-tech-600 dark:text-tech-400 hover:text-tech-800 dark:hover:text-tech-200 underline" target="_blank" rel="noopener noreferrer">${text}</a>`;
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
	<title>{repo.name} - Andy Pearson</title>
	<meta name="description" content="{repo.description || `View ${repo.name} project details and documentation`}" />
</svelte:head>

<div class="min-h-screen">
	<Navigation theme="tech" />
	
	<!-- Main Image Section -->
	{#if repo.readme_content}
		{@const firstImage = extractFirstImage(repo.readme_content, repo.name)}
		{#if firstImage}
			<section class="w-full">
				<img 
					src={firstImage} 
					alt="{repo.name} preview" 
					class="w-full h-auto object-contain bg-gray-100 dark:bg-gray-800"
					loading="lazy"
				/>
			</section>
		{/if}
	{/if}
	
	<!-- Project Information Section -->
	<section class="py-12 bg-white dark:bg-gray-900">
		<div class="container-custom">
			<div class="max-w-4xl mx-auto">
				<!-- Breadcrumb -->
				<nav class="mb-8">
					<a href="/projects" class="text-tech-600 dark:text-tech-400 hover:text-tech-800 dark:hover:text-tech-200">
						← Back to Projects
					</a>
				</nav>
				
				<!-- Project Header -->
				<div class="mb-8">
					<h1 class="text-4xl md:text-5xl font-bold text-tech-800 dark:text-tech-200 mb-4">
						{repo.name}
					</h1>
					{#if repo.description}
						<p class="text-xl text-tech-600 dark:text-tech-400 mb-6">
							{repo.description}
						</p>
					{/if}
					
					<!-- Project Meta -->
					<div class="flex flex-wrap items-center gap-6 text-sm text-tech-600 dark:text-tech-400 mb-6">
						<span class="flex items-center">
							{repo.category.icon} {repo.category.name}
						</span>
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
					{#if repo.tags.length > 0}
						<div class="flex flex-wrap gap-2 mb-6">
							{#each repo.tags as tag}
								<span class="px-3 py-1 bg-tech-100 text-tech-700 dark:bg-tech-800 dark:text-tech-300 text-sm rounded-full">
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
							class="btn btn-primary bg-tech-600 hover:bg-tech-700 flex items-center justify-center space-x-2"
						>
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
							</svg>
							<span>View on GitHub</span>
						</a>
						{#if repo.homepage}
							<a 
								href={repo.homepage} 
								target="_blank" 
								rel="noopener noreferrer"
								class="btn btn-secondary flex items-center justify-center space-x-2"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
		<section class="py-20 bg-white dark:bg-gray-900">
			<div class="container-custom">
				<div class="max-w-4xl mx-auto">
					<h2 class="text-3xl font-bold text-tech-800 dark:text-tech-200 mb-8">
						Documentation
					</h2>
					
					<div class="prose prose-lg dark:prose-invert max-w-none text-base leading-relaxed text-gray-700 dark:text-gray-300">
						{@html htmlContent}
					</div>
				</div>
			</div>
		</section>
	{:else}
		<section class="py-20 bg-white dark:bg-gray-900">
			<div class="container-custom">
				<div class="max-w-4xl mx-auto text-center">
					<h2 class="text-3xl font-bold text-tech-800 dark:text-tech-200 mb-8">
						Documentation
					</h2>
					<p class="text-gray-600 dark:text-gray-400">
						No README content available for this project.
					</p>
					<a 
						href={repo.html_url} 
						target="_blank" 
						rel="noopener noreferrer"
						class="btn btn-primary bg-tech-600 hover:bg-tech-700 mt-4"
					>
						View on GitHub for more details
					</a>
				</div>
			</div>
		</section>
	{/if}
</div> 