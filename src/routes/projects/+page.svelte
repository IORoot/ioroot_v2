<script lang="ts">
  import Navigation from '$lib/components/Navigation.svelte';
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import { extractTagsFromRepo, formatDate, type GitHubRepo } from '$lib/github-client';
	
	export let data: PageData;
	
	// Client-side data fetching
	let repos: GitHubRepo[] = [];
	let totalRepos = 0;
	let loading = true;
	let error = '';
	
	onMount(async () => {
		try {
			loading = true;
			
			console.log('🔄 Fetching fresh data from API');
			const response = await fetch('/api/github-repos');
			if (response.ok) {
				const data = await response.json();
				
				const rawRepos = data.repos || [];
				
				// Process repos to add tags and formatted dates
				repos = rawRepos.map((repo: GitHubRepo) => ({
					...repo,
					tags: extractTagsFromRepo(repo),
					formattedDate: formatDate(repo.updated_at)
				}));
				
				totalRepos = repos.length;
			} else {
				error = 'Failed to load projects';
				return;
			}
		} catch (err) {
			error = 'Failed to load projects';
			console.error('Error loading projects:', err);
		} finally {
			loading = false;
		}
	});
	
	// Sort repos based on selected sort option
	$: sortedRepos = repos.sort((a, b) => {
		if (!a || !b) return 0;
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
	
	// Status filtering state
	let statusFilter: 'public' | 'archived' = 'public';
	
	// Sorting state
	let sortBy: 'default' | 'default-reverse' | 'alphabetical' | 'alphabetical-reverse' | 'stars' | 'age' | 'age-reverse' = 'age-reverse';
	let showSortDropdown = false;
	
	// Get all unique tags from repos based on current status filter
	$: allTags = [...new Set(
		repos
			.filter(repo => {
				if (statusFilter === 'public') {
					return !repo.archived;
				} else {
					return repo.archived;
				}
			})
			.flatMap(repo => repo.tags || [])
	)].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
	
	// Filter repos based on status and selected tags
	$: filteredRepos = sortedRepos
		.filter(repo => {
			// Apply status filter
			if (statusFilter === 'public') {
				return !repo.archived;
			} else {
				return repo.archived;
			}
		})
		.filter(repo => {
			// Apply tag filter if tags are selected
			if (selectedTags.length === 0) return true;
			
			const repoTags = repo.tags || [];
			if (filterMode === 'AND') {
				// All selected tags must be present
				return selectedTags.every(tag => repoTags.includes(tag));
			} else {
				// At least one selected tag must be present
				return selectedTags.some(tag => repoTags.includes(tag));
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
		statusFilter = 'public';
	}
	
	// Show loading state
	$: if (loading) {
		// Loading state will be handled in the template
	}
	
	// Show error state
	$: if (error) {
		// Error state will be handled in the template
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

<div class="min-h-screen bg-[#EAE6D8] pt-20">
	<Navigation />
	

	
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
				<div class="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
					<!-- Project Count -->
					<div class="mb-4 md:mb-0">
						<h2 class="text-4xl font-black text-[#434840]">
							{filteredRepos.length} Projects
						</h2>
						<p class="text-xl text-[#677A67] font-semibold">
							{statusFilter === 'public' ? 'Public' : 'Archived'} repositories
						</p>
					</div>
					
					<!-- Sort and Filter Buttons - Stack on mobile, inline on desktop -->
					<div class="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
						<!-- Sort and Filter Controls -->
						<div class="flex flex-wrap items-center gap-2 md:space-x-4">
							<!-- Status Filter Switch - First on mobile -->
							<div class="flex items-center space-x-1 md:space-x-2 bg-[#EAE6D8] rounded-lg p-1 order-1 md:order-3">
								<button
									on:click={() => statusFilter = 'public'}
									class="flex items-center space-x-1 md:space-x-2 px-2 py-2 md:px-3 md:py-2 rounded-md transition-all duration-200 {statusFilter === 'public' ? 'bg-[#E7A97F] text-white shadow-md' : 'text-[#434840] hover:bg-[#E4EDEE]'}"
									title="Public repositories"
								>
									<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
									</svg>
									<span class="text-sm font-bold hidden md:inline">Public</span>
								</button>
								<button
									on:click={() => statusFilter = 'archived'}
									class="flex items-center space-x-1 md:space-x-2 px-2 py-2 md:px-3 md:py-2 rounded-md transition-all duration-200 {statusFilter === 'archived' ? 'bg-[#E7A97F] text-white shadow-md' : 'text-[#434840] hover:bg-[#E4EDEE]'}"
									title="Archived repositories"
								>
									<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
										<path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5l-4-4h2.5V12h3v1.5H16l-4 4z"/>
									</svg>
									<span class="text-sm font-bold hidden md:inline">Archived</span>
								</button>
							</div>
							
							<!-- Filter Toggle Button - Second on mobile -->
							<button
								on:click={() => showFilters = !showFilters}
								class="inline-flex items-center space-x-1 md:space-x-2 px-3 py-2 md:px-6 md:py-3 bg-[#E7A97F] text-white rounded-lg hover:bg-[#87A7AC] transition-colors font-bold text-sm md:text-base order-2 md:order-2"
							>
								<svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
								</svg>
								<span>{showFilters ? 'Hide' : 'Show'} Filters</span>
							</button>
							
							<!-- Sort Dropdown - Third on mobile -->
							<div class="relative order-3 md:order-1">
								<button
									on:click={() => showSortDropdown = !showSortDropdown}
									class="inline-flex items-center space-x-1 md:space-x-2 px-3 py-2 md:px-6 md:py-3 bg-[#E7A97F] text-white rounded-lg hover:bg-[#87A7AC] transition-colors font-bold text-sm md:text-base"
								>
									<svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path>
									</svg>
									<span>Sort</span>
									<svg class="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Tag Filter - Full Width -->
		{#if showFilters && !data.error}
			<div class="w-full bg-[#E4EDEE] py-6">
				<div class="px-4 sm:px-6 lg:px-8">
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
								class="px-3 py-1.5 text-sm rounded-full transition-all duration-200 font-normal font-mono {selectedTags.includes(tag) 
									? 'bg-[#E7A97F] text-white shadow-md' 
									: 'bg-white text-[#434840] hover:bg-gray-100 border border-gray-200'}"
							>
								{tag}
							</button>
						{/each}
					</div>
					
					<!-- Results Count -->
					<div class="mt-4 text-lg text-[#677A67] font-semibold">
						Showing {filteredRepos.length} of {repos.filter(r => statusFilter === 'public' ? !r.archived : r.archived).length} {statusFilter} projects
						{#if selectedTags.length > 0}
							with {selectedTags.length > 1 ? (filterMode === 'AND' ? 'all tags' : 'any tag') : 'selected tag'}
						{/if}
					</div>
				</div>
			</div>
		{/if}
		
		<!-- Projects Grid - Full Width -->
		<div class="px-4 sm:px-6 lg:px-8 bg-stone-100">
			{#if loading}
				<!-- Loading State with Skeleton -->
				<div class="text-center py-12">
					<div class="flex items-center justify-center mb-6">
						<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#677A67]"></div>
					</div>
					<p class="text-lg text-[#677A67] mb-8">Loading projects...</p>
					
					<!-- Skeleton Grid -->
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 w-full">
						{#each Array(12) as _, i}
							<div class="rounded-lg overflow-hidden animate-pulse">
								<!-- Skeleton Image -->
								<div class="aspect-video bg-gray-200"></div>
								<!-- Skeleton Content -->
								<div class="p-4 bg-white">
									<div class="h-4 bg-gray-200 rounded mb-2"></div>
									<div class="h-3 bg-gray-200 rounded w-3/4"></div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{:else if error}
				<div class="text-center py-12">
					<p class="text-lg text-red-600">{error}</p>
				</div>
			{:else}
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 w-full py-8">
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
		{/if}
		</div>
	</section>
</div> 