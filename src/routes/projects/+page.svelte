<script lang="ts">
  import Navigation from '$lib/components/Navigation.svelte';
  import type { PageData } from './$types';
	
	export let data: PageData;
	
	$: ({ repos, totalRepos } = data);
	
	// Sort repos based on selected sort option
	$: sortedRepos = repos.sort((a, b) => {
		switch (sortBy) {
			case 'default':
				return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
			case 'default-reverse':
				return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
			case 'alphabetical':
				return a.name.localeCompare(b.name);
			case 'alphabetical-reverse':
				return b.name.localeCompare(a.name);
			case 'stars':
				return b.stargazers_count - a.stargazers_count;
			case 'age':
				return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
			case 'age-reverse':
				return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();

			default:
				return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
		}
	});
	
	// Tag filtering state
	let selectedTags: string[] = [];
	let filterMode: 'AND' | 'OR' = 'OR';
	let showFilters = false;
	
	// Sorting state
	let sortBy: 'default' | 'default-reverse' | 'alphabetical' | 'alphabetical-reverse' | 'stars' | 'age' | 'age-reverse' = 'age-reverse';
	let showSortDropdown = false;
	
	// Get all unique tags from all repos
	$: allTags = [...new Set(repos.flatMap(repo => repo.tags))].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
	
	// Filter repos based on selected tags
	$: filteredRepos = selectedTags.length === 0 
		? sortedRepos 
		: sortedRepos.filter(repo => {
			if (filterMode === 'AND') {
				// All selected tags must be present
				return selectedTags.every(tag => repo.tags.includes(tag));
			} else {
				// At least one selected tag must be present
				return selectedTags.some(tag => repo.tags.includes(tag));
			}
		});
	
	// Toggle tag selection
	function toggleTag(tag: string) {
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter(t => t !== tag);
		} else {
			selectedTags = [...selectedTags, tag];
		}
	}
	
	// Clear all filters
	function clearFilters() {
		selectedTags = [];
	}
	
	// Extract first image from markdown content and convert local references to GitHub URLs
	function extractFirstImage(markdown: string, repoName: string): string | null {
		if (!markdown) return null;
		
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
	<title>Projects - Andy Pearson</title>
	<meta name="description" content="Explore Andy Pearson's coding projects, web applications, and technical work." />
</svelte:head>

<div class="min-h-screen bg-[#EAE6D8]">
	<Navigation theme="peach" />
	

	
	<!-- Projects Section -->
	<section class="py-12 bg-white">
		<div class="container-custom">
			{#if data.error}
				<!-- Error State -->
				<div class="max-w-2xl mx-auto text-center">
					<div class="bg-[#E4EDEE] border border-[#87A7AC] rounded-lg p-8 mb-8">
						<div class="flex justify-center mb-4">
							<svg class="h-12 w-12 text-[#E7A97F]" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
							</svg>
						</div>
						<h3 class="text-2xl font-black text-[#434840] mb-2">
							GitHub API Rate Limited
						</h3>
						<p class="text-[#434840] mb-4 font-semibold">
							{data.error}
						</p>
						<p class="text-lg text-[#677A67]">
							The projects will be available once the rate limit resets.
						</p>
					</div>
				</div>
			{:else}
				<!-- Header with Project Count, Sort, and Filter Buttons -->
				<div class="flex justify-between items-center mb-8">
					<!-- Project Count -->
					<div>
						<h2 class="text-4xl font-black text-[#434840]">
							{totalRepos} Projects
						</h2>
						<p class="text-xl text-[#677A67] font-semibold">
							From GitHub repositories
						</p>
					</div>
					
					<!-- Sort and Filter Buttons -->
					<div class="flex items-center space-x-4">
						<!-- Sort Dropdown -->
						<div class="relative">
							<button
								on:click={() => showSortDropdown = !showSortDropdown}
								class="inline-flex items-center space-x-2 px-6 py-3 bg-[#E7A97F] text-white rounded-lg hover:bg-[#87A7AC] transition-colors font-bold"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path>
								</svg>
								<span>Sort</span>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
								</svg>
							</button>
							
							{#if showSortDropdown}
								<div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#87A7AC] z-10">
									<div class="py-1">
										<button
											on:click={() => { sortBy = 'default'; showSortDropdown = false; }}
											class="w-full text-left px-4 py-2 text-lg hover:bg-[#EAE6D8] {sortBy === 'default' ? 'bg-[#EAE6D8] text-[#434840] font-bold' : 'text-[#434840]'}"
										>
											Newest First
										</button>
										<button
											on:click={() => { sortBy = 'default-reverse'; showSortDropdown = false; }}
											class="w-full text-left px-4 py-2 text-lg hover:bg-[#EAE6D8] {sortBy === 'default-reverse' ? 'bg-[#EAE6D8] text-[#434840] font-bold' : 'text-[#434840]'}"
										>
											Oldest First
										</button>
										<button
											on:click={() => { sortBy = 'alphabetical'; showSortDropdown = false; }}
											class="w-full text-left px-4 py-2 text-lg hover:bg-[#EAE6D8] {sortBy === 'alphabetical' ? 'bg-[#EAE6D8] text-[#434840] font-bold' : 'text-[#434840]'}"
										>
											A-Z
										</button>
										<button
											on:click={() => { sortBy = 'alphabetical-reverse'; showSortDropdown = false; }}
											class="w-full text-left px-4 py-2 text-lg hover:bg-[#EAE6D8] {sortBy === 'alphabetical-reverse' ? 'bg-[#EAE6D8] text-[#434840] font-bold' : 'text-[#434840]'}"
										>
											Z-A
										</button>
										<button
											on:click={() => { sortBy = 'stars'; showSortDropdown = false; }}
											class="w-full text-left px-4 py-2 text-lg hover:bg-[#EAE6D8] {sortBy === 'stars' ? 'bg-[#EAE6D8] text-[#434840] font-bold' : 'text-[#434840]'}"
										>
											Most Stars
										</button>
										<button
											on:click={() => { sortBy = 'age'; showSortDropdown = false; }}
											class="w-full text-left px-4 py-2 text-lg hover:bg-[#EAE6D8] {sortBy === 'age' ? 'bg-[#EAE6D8] text-[#434840] font-bold' : 'text-[#434840]'}"
										>
											Oldest Repo
										</button>
										<button
											on:click={() => { sortBy = 'age-reverse'; showSortDropdown = false; }}
											class="w-full text-left px-4 py-2 text-lg hover:bg-[#EAE6D8] {sortBy === 'age-reverse' ? 'bg-[#EAE6D8] text-[#434840] font-bold' : 'text-[#434840]'}"
										>
											Newest Repo
										</button>

									</div>
								</div>
							{/if}
						</div>
						
						<!-- Filter Toggle Button -->
						<button
							on:click={() => showFilters = !showFilters}
							class="inline-flex items-center space-x-2 px-6 py-3 bg-[#E7A97F] text-white rounded-lg hover:bg-[#87A7AC] transition-colors font-bold"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
							</svg>
							<span>{showFilters ? 'Hide' : 'Show'} Filters</span>
						</button>
					</div>
				</div>

				<!-- Tag Filter -->
				{#if showFilters}
					<div class="mb-8 p-6 bg-[#E4EDEE] rounded-lg">
						<div class="flex flex-wrap items-center gap-4 mb-4">
							<h3 class="text-2xl font-black text-[#434840]">
								Filter by tags:
							</h3>
							
							<!-- Filter Mode Toggle -->
							<div class="flex items-center space-x-2">
								<span class="text-lg text-[#677A67] font-semibold">Mode:</span>
								<button
									on:click={() => filterMode = filterMode === 'OR' ? 'AND' : 'OR'}
									class="px-4 py-2 text-lg font-bold rounded-md transition-colors {filterMode === 'OR' ? 'bg-[#EAE6D8] text-[#434840]' : 'bg-[#E7A97F] text-white'}"
								>
									{filterMode}
								</button>
							</div>
							
							<!-- Clear Filters -->
							{#if selectedTags.length > 0}
								<button
									on:click={clearFilters}
									class="px-4 py-2 text-lg text-[#677A67] hover:text-[#434840] transition-colors font-bold"
								>
									Clear filters
								</button>
							{/if}
						</div>
						
						<!-- Tag List -->
						<div class="flex flex-wrap gap-2">
							{#each allTags as tag}
								<button
									on:click={() => toggleTag(tag)}
									class="px-4 py-2 text-lg rounded-full transition-all duration-200 font-bold {selectedTags.includes(tag) 
										? 'bg-[#E7A97F] text-white shadow-md' 
										: 'bg-[#EAE6D8] text-[#434840] hover:bg-[#E4EDEE]'}"
								>
									{tag}
								</button>
							{/each}
						</div>
						
						<!-- Results Count -->
						{#if selectedTags.length > 0}
							<div class="mt-4 text-lg text-[#677A67] font-semibold">
								Showing {filteredRepos.length} of {totalRepos} projects
								{#if selectedTags.length > 1}
									({filterMode === 'AND' ? 'all tags' : 'any tag'})
								{/if}
							</div>
						{/if}
					</div>
				{/if}
			{/if}
		</div>
		
		<!-- Projects Grid - Full Width -->
		<div class="px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 w-full">
				{#each filteredRepos as repo}
					{@const firstImage = repo.readme_content ? extractFirstImage(repo.readme_content, repo.name) : null}
					<a href="/projects/{repo.name}" class="group block">
						<div class="rounded-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden" style="background:#fcfcfc">
							<!-- Project Image Container -->
							<div class="aspect-video bg-[#E4EDEE] relative">
								{#if firstImage}
									<img 
										src={firstImage} 
										alt="{repo.name} preview" 
										class="w-full h-full object-contain bg-white"
										loading="lazy"
									/>
								{:else}
									<div class="w-full h-full flex items-center justify-center">
										<div class="text-center">
											<svg class="w-12 h-12 mx-auto text-[#87A7AC] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
											</svg>
											<p class="text-sm text-[#434840] font-bold font-mono">
												{repo.name}
											</p>
										</div>
									</div>
								{/if}
								
								<!-- Hover Overlay - Tags, Links, and Stats -->
								<div class="absolute inset-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4">
									<!-- Tags -->
									<div class="flex flex-wrap gap-1 justify-center mb-4">
										{#if repo.tags.length > 0}
											{#each repo.tags.slice(0, 4) as tag}
												<span class="px-3 py-1 bg-[#EAE6D8] text-[#434840] text-sm rounded-full font-bold">
													{tag}
												</span>
											{/each}
											{#if repo.tags.length > 4}
												<span class="px-3 py-1 bg-[#EAE6D8] text-[#434840] text-sm rounded-full font-bold">
													+{repo.tags.length - 4}
												</span>
											{/if}
										{/if}
									</div>
									
									<!-- Links and Stats -->
									<div class="flex items-center space-x-6">
										<div class="flex items-center space-x-3">
											<a 
												href={repo.html_url} 
												target="_blank" 
												rel="noopener noreferrer"
												class="flex items-center space-x-1 text-white hover:text-[#E7897F] transition-colors"
												on:click={(e) => e.stopPropagation()}
											>
												<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
													<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
												</svg>
												<span class="text-sm font-bold">GitHub</span>
											</a>
											{#if repo.homepage}
												<a 
													href={repo.homepage} 
													target="_blank" 
													rel="noopener noreferrer"
													class="flex items-center space-x-1 text-white hover:text-[#E7897F] transition-colors"
													on:click={(e) => e.stopPropagation()}
												>
													<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
													</svg>
													<span class="text-sm font-bold">Demo</span>
												</a>
											{/if}
										</div>
										
										<!-- Stats -->
										<div class="flex items-center space-x-4 text-sm text-white font-semibold">
											<span class="flex items-center space-x-1">
												<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
													<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
												</svg>
												<span>{repo.stargazers_count}</span>
											</span>
											<span class="flex items-center space-x-1">
												<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
													<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
												</svg>
												<span>{repo.forks_count}</span>
											</span>
										</div>
									</div>
								</div>
							</div>
							
							<!-- Project Info Below Image -->
							<div class="p-4 space-y-3">
								<!-- Project Name and Date -->
								<div class="flex justify-between items-start">
									<h3 class="text-xl font-black text-[#434840] group-hover:text-[#E7A97F] transition-colors">
										{repo.name}
									</h3>
									<p class="text-sm text-[#677A67] flex-shrink-0 ml-2 font-semibold">
										{repo.formattedDate}
									</p>
								</div>
								
								<!-- Description -->
								{#if repo.description}
									<p class="text-lg text-[#434840] line-clamp-2 h-12 leading-6 font-normal">
										{repo.description}
									</p>
								{:else}
									<p class="text-lg text-[#434840] line-clamp-2 h-12 leading-6 font-normal">
										&nbsp;
									</p>
								{/if}
							</div>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
</div> 