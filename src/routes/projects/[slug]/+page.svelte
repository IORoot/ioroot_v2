<script lang="ts">
  import Navigation from '$lib/components/Navigation.svelte';
  import MarkdownTable from '$lib/components/MarkdownTable.svelte';
  import type { PageData } from './$types';
	
	export let data: PageData;
	
	$: ({ repo } = data);
	

	
	// Parse markdown content and extract tables
	function parseMarkdownWithTables(markdown: string): { html: string, tables: Array<{ id: string, content: string }> } {
		const tables: Array<{ id: string, content: string }> = [];
		let tableCounter = 0;
		
		// Find and replace markdown tables with placeholders
		const htmlWithPlaceholders = markdown.replace(/\|(.+)\|\n\|[\s\-:]+\|\n((?:\|.+\|\n?)+)/g, (match) => {
			const tableId = `table-${tableCounter++}`;
			tables.push({ id: tableId, content: match });
			return `<!-- TABLE_PLACEHOLDER:${tableId} -->`;
		});
		
		// Convert the rest to HTML
		const html = convertMarkdownToHtml(htmlWithPlaceholders);
		
		return { html, tables };
	}
	
	// Convert markdown to HTML with image support
	function convertMarkdownToHtml(markdown: string): string {
		return markdown
			// Headers
			.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">$1</h3>')
			.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">$1</h2>')
			.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">$1</h1>')
			// Images - handle both ![alt](url) and ![alt](url "title") formats
			.replace(/!\[([^\]]*)\]\(([^)]+)(?:\s+"([^"]+)")?\)/g, '<img src="$2" alt="$1" title="$3" class="max-w-full h-auto my-4" loading="lazy" />')
			// Bold
			.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
			// Italic
			.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
			// Code blocks
			.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg overflow-x-auto mb-6 text-sm leading-relaxed"><code class="font-mono">$1</code></pre>')
			// Inline code
			.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>')
			// Links
			.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
			// Line breaks
			.replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 dark:text-gray-300">')
			.replace(/\n/g, '<br>')
			// Wrap in paragraph
			.replace(/^(.*)$/gm, '<p class="mb-4 text-gray-700 dark:text-gray-300">$1</p>');
	}
	
	// Extract header image from README content
	function extractHeaderImage(markdown: string): string | null {
		if (!markdown) return null;
		
		// First, check for header.png or header.jpg in the markdown
		const headerImageMatch = markdown.match(/!\[([^\]]*)\]\(([^)]*header\.(png|jpg|jpeg))\)/i);
		if (headerImageMatch) {
			return headerImageMatch[2]; // Return the header image URL
		}
		
		// Also check for HTML img tags with header images
		const headerHtmlMatch = markdown.match(/<img[^>]+src="([^"]*header\.(png|jpg|jpeg))"/i);
		if (headerHtmlMatch) {
			return headerHtmlMatch[1];
		}
		
		return null;
	}
	
	// Parse the README content
	$: parsedContent = repo?.readme_content ? parseMarkdownWithTables(repo.readme_content) : { html: '', tables: [] };
	
	// Extract header image
	$: headerImage = repo?.readme_content ? extractHeaderImage(repo.readme_content) : null;
	
	// Debug: Log table detection
	$: if (parsedContent.tables.length > 0) {
		console.log('Found tables:', parsedContent.tables.length);
		parsedContent.tables.forEach((table, index) => {
			console.log(`Table ${index}:`, table.content.substring(0, 100) + '...');
		});
	}
</script>

<svelte:head>
	<title>{repo.name} - Andy Pearson</title>
	<meta name="description" content="{repo.description || `View ${repo.name} project details and documentation`}" />
</svelte:head>

<div class="min-h-screen">
	<Navigation theme="stone" />
	
	<!-- Hero Section -->
	<section class="py-20 bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-800">
		<div class="container-custom">
			<div class="max-w-4xl mx-auto">
				<!-- Breadcrumb -->
				<nav class="mb-8">
					<a href="/projects" class="text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200">
						← Back to Projects
					</a>
				</nav>
				
				<!-- Project Header -->
				<div class="text-center mb-8">
					<h1 class="text-4xl md:text-5xl font-bold text-stone-800 dark:text-stone-200 mb-4">
						{repo.name}
					</h1>
					{#if repo.description}
						<p class="text-xl text-stone-600 dark:text-stone-400 mb-6">
							{repo.description}
						</p>
					{/if}
					
					<!-- Project Meta -->
					<div class="flex flex-wrap justify-center items-center gap-6 text-sm text-stone-600 dark:text-stone-400">
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
				</div>
				
				<!-- Tags -->
				{#if repo.tags.length > 0}
					<div class="flex flex-wrap justify-center gap-2 mb-8">
						{#each repo.tags as tag}
							<span class="px-3 py-1 bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 text-sm rounded-full">
								{tag}
							</span>
						{/each}
					</div>
				{/if}
				
				<!-- Action Buttons -->
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<a 
						href={repo.html_url} 
						target="_blank" 
						rel="noopener noreferrer"
						class="btn btn-primary bg-stone-600 hover:bg-stone-700 flex items-center justify-center space-x-2"
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
	</section>
	
	<!-- Header Image Section -->
	{#if headerImage}
		<section class="py-12 bg-white dark:bg-gray-900">
			<div class="container-custom">
				<div class="max-w-6xl mx-auto">
					<div class="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
						<img 
							src={headerImage} 
							alt="{repo.name} header image" 
							class="w-full h-full object-contain"
							loading="lazy"
						/>
					</div>
				</div>
			</div>
		</section>
	{/if}
	
	<!-- README Content -->
	{#if repo.readme_content}
		<section class="py-20 bg-white dark:bg-gray-900">
			<div class="container-custom">
				<div class="max-w-4xl mx-auto">
					<h2 class="text-3xl font-bold text-stone-800 dark:text-stone-200 mb-8">
						Documentation
					</h2>
					
					<div class="prose prose-lg dark:prose-invert max-w-none font-mono text-base leading-relaxed">
						{@html parsedContent.html}
						
						{#each parsedContent.tables as table}
							<MarkdownTable tableData={table.content} headers={[]} />
						{/each}
					</div>
				</div>
			</div>
		</section>
	{:else}
		<section class="py-20 bg-white dark:bg-gray-900">
			<div class="container-custom">
				<div class="max-w-4xl mx-auto text-center">
					<h2 class="text-3xl font-bold text-stone-800 dark:text-stone-200 mb-8">
						Documentation
					</h2>
					<p class="text-gray-600 dark:text-gray-400">
						No README content available for this project.
					</p>
					<a 
						href={repo.html_url} 
						target="_blank" 
						rel="noopener noreferrer"
						class="btn btn-primary bg-stone-600 hover:bg-stone-700 mt-4"
					>
						View on GitHub for more details
					</a>
				</div>
			</div>
		</section>
	{/if}
</div> 