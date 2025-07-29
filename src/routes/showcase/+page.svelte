<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import type { PageData } from './$types';
	
	export let data: PageData;
	
	$: ({ websites } = data);
	
	// Dynamic categories based on actual content
	$: availableCategories = [...new Set(websites.map(website => website.category || 'website'))];
	$: categories = ['all', ...availableCategories];
	let selectedCategory = 'all';
	
	// Filter websites based on selected category
	$: filteredWebsites = selectedCategory === 'all' 
		? websites 
		: websites.filter(website => (website.category || 'website') === selectedCategory);
	
	// Count items in each category
	$: categoryCounts = {
		all: websites.length,
		...Object.fromEntries(
			availableCategories.map(category => [
				category, 
				websites.filter(w => (w.category || 'website') === category).length
			])
		)
	};
	
	// Helper function to get category count
	function getCategoryCount(category: string): number {
		return categoryCounts[category as keyof typeof categoryCounts] || 0;
	}
	
	// Layout toggle state
	let isListView = false;
	
	// Load saved layout preference from localStorage
	if (typeof window !== 'undefined') {
		const savedLayout = localStorage.getItem('showcase-layout');
		isListView = savedLayout === 'list';
	}
	
	function toggleLayout() {
		isListView = !isListView;
		// Save layout preference to localStorage
		if (typeof window !== 'undefined') {
			localStorage.setItem('showcase-layout', isListView ? 'list' : 'grid');
		}
	}
</script>

<svelte:head>
	<title>Showcase - Andy Pearson</title>
	<meta name="description" content="Explore the showcase of websites built and maintained by Andy Pearson, including community platforms and web applications." />
</svelte:head>

<div class="min-h-screen bg-[#677A67] pt-20 relative">
	<!-- Top Padding Bar for Navigation Background -->
	<div class="fixed top-0 left-0 right-0 h-20 bg-[#434840] z-40"></div>
	
	<!-- Grid Column Lines SVG -->
	<svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 1000" preserveAspectRatio="none">
		<!-- Column Lines (12 lines for 4 columns) -->
		<line x1="8.33%" y1="0" x2="8.33%" y2="100%" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
		<line x1="16.67%" y1="0" x2="16.67%" y2="100%" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
		<line x1="25%" y1="0" x2="25%" y2="100%" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
		<line x1="33.33%" y1="0" x2="33.33%" y2="100%" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
		<line x1="41.67%" y1="0" x2="41.67%" y2="100%" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
		<line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
		<line x1="58.33%" y1="0" x2="58.33%" y2="100%" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
		<line x1="66.67%" y1="0" x2="66.67%" y2="100%" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
		<line x1="75%" y1="0" x2="75%" y2="100%" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
		<line x1="83.33%" y1="0" x2="83.33%" y2="100%" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
		<line x1="91.67%" y1="0" x2="91.67%" y2="100%" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
	</svg>
	<Navigation />
	
	<!-- Category Filter -->
	<div class="p-4 md:p-8 pb-8">
		<div class="flex flex-wrap gap-4 justify-center items-center">
			{#each categories as category}
				<button 
					class="px-6 py-3 text-lg font-bold transition-all duration-200 {selectedCategory === category 
						? 'text-white' 
						: 'text-white/70 hover:text-white'}"
					on:click={() => selectedCategory = category}
				>
					{category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)} <sup class="font-normal text-sm">{getCategoryCount(category)}</sup>
				</button>
			{/each}
			
			<!-- Layout Toggle Button -->
			<button 
				on:click={toggleLayout}
				class="ml-4 p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200 flex items-center space-x-2"
				title="{isListView ? 'Switch to Grid View' : 'Switch to List View'}"
			>
				{#if isListView}
					<!-- Grid Icon -->
					<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
					</svg>
				{:else}
					<!-- List Icon -->
					<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
					</svg>
				{/if}
			</button>
		</div>
	</div>
	
	<!-- Bento Box Layout -->
	<div class="p-4 md:p-8 pt-0">
		{#if isListView}
			<!-- List View -->
			<div class="max-w-4xl mx-auto space-y-6">
				{#each filteredWebsites as website}
					<a href="/showcase/{website.slug}" class="group block bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-all duration-200 border border-white/10">
						<div class="flex items-center space-x-6">
							<!-- Thumbnail -->
							<div class="flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden">
								{#if website.image}
									<img 
										src={website.image} 
										alt="{website.title}" 
										class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
									/>
								{:else}
									<div class="w-full h-full bg-gradient-to-br from-[#EAE6D8] to-[#E4EDEE] flex items-center justify-center">
										<span class="text-2xl">{website.icon}</span>
									</div>
								{/if}
							</div>
							
							<!-- Content -->
							<div class="flex-1 min-w-0">
								<h3 class="text-xl md:text-2xl font-black text-white mb-2 group-hover:text-white/80 transition-colors">
									{website.title}
								</h3>
								<p class="text-white/70 text-sm md:text-base mb-3">
									{website.description}
								</p>
								<div class="flex items-center space-x-4">
									<span class="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full">
										{website.category || 'website'}
									</span>
									{#if website.tech && website.tech.length > 0}
										<span class="text-white/50 text-xs">
											{website.tech.slice(0, 3).join(', ')}
											{#if website.tech.length > 3}
												+{website.tech.length - 3} more
											{/if}
										</span>
									{/if}
								</div>
							</div>
							
							<!-- Arrow -->
							<div class="flex-shrink-0 text-white/50 group-hover:text-white transition-colors">
								<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
								</svg>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<!-- Grid View -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-24 md:gap-y-32">
				{#each filteredWebsites as website}
					<a href="/showcase/{website.slug}" class="group block">
						<!-- Title Above Image -->
						<h3 class="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-black text-white mb-4 drop-shadow-lg whitespace-nowrap overflow-hidden text-ellipsis">
							{website.title}
						</h3>
						
						<div class="aspect-video rounded-lg shadow-xl overflow-hidden relative">
							<!-- Background Image -->
							{#if website.image}
								<img 
									src={website.image} 
									alt="{website.title}" 
									class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
								/>
							{:else}
								<div class="w-full h-full bg-gradient-to-br from-[#EAE6D8] to-[#E4EDEE] flex items-center justify-center">
									<span class="text-6xl">{website.icon}</span>
								</div>
							{/if}
							
							<!-- Category Tag -->
							<div class="absolute top-4 right-4">
								<span class="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#677A67] text-sm font-bold rounded-full">
									{website.category || 'website'}
								</span>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div> 