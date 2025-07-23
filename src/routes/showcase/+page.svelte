<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import type { PageData } from './$types';
	
	export let data: PageData;
	
	$: ({ websites } = data);
	
	// Categories for filtering
	const categories = ['website', 'design', 'app', 'parkour', 'articles', 'work'];
	let selectedCategory = 'all';
	
	// Filter websites based on selected category
	$: filteredWebsites = selectedCategory === 'all' 
		? websites 
		: websites.filter(website => website.category === selectedCategory);
	
	// Count items in each category
	$: categoryCounts = {
		all: websites.length,
		website: websites.filter(w => w.category === 'website').length,
		design: websites.filter(w => w.category === 'design').length,
		app: websites.filter(w => w.category === 'app').length,
		parkour: websites.filter(w => w.category === 'parkour').length,
		articles: websites.filter(w => w.category === 'articles').length,
		work: websites.filter(w => w.category === 'work').length
	};
	
	// Helper function to get category count
	function getCategoryCount(category: string): number {
		return categoryCounts[category as keyof typeof categoryCounts] || 0;
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
		<div class="flex flex-wrap gap-4 justify-center">
			<button 
				class="px-6 py-3 text-lg font-bold transition-all duration-200 {selectedCategory === 'all' 
					? 'text-white' 
					: 'text-white/70 hover:text-white'}"
				on:click={() => selectedCategory = 'all'}
			>
				All <sup class="font-normal text-sm">{categoryCounts.all}</sup>
			</button>
			{#each categories as category}
				<button 
					class="px-6 py-3 text-lg font-bold transition-all duration-200 {selectedCategory === category 
						? 'text-white' 
						: 'text-white/70 hover:text-white'}"
					on:click={() => selectedCategory = category}
				>
					{category.charAt(0).toUpperCase() + category.slice(1)} <sup class="font-normal text-sm">{getCategoryCount(category)}</sup>
				</button>
			{/each}
		</div>
	</div>
	
	<!-- Bento Box Layout -->
	<div class="p-4 md:p-8 pt-0">
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
	</div>
</div> 