<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import type { PageData } from './$types';
	import { markdownToHtml } from '$lib/markdown';
	
	export let data: PageData;
	
	$: ({ website } = data);
	$: htmlContent = website ? markdownToHtml(website.content) : '';
</script>

<svelte:head>
	<title>{website.title} - Andy Pearson</title>
	<meta name="description" content="{website.description}" />
</svelte:head>

<div class="min-h-screen bg-[#EAE6D8]">
	<Navigation theme="neutral" />
	
	<!-- Hero Section -->
	<section class="py-20 bg-gradient-to-br from-[#EAE6D8] to-[#E4EDEE]">
		<div class="container-custom">
			<div class="max-w-4xl mx-auto text-center">
				<h1 class="text-6xl md:text-7xl font-black text-[#434840] mb-6">
					{website.title}
				</h1>
				<p class="text-2xl text-[#434840] mb-8 font-semibold">
					{website.description}
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<a 
						href={website.url} 
						target="_blank" 
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center space-x-2 bg-[#677A67] text-white px-8 py-4 rounded-lg hover:bg-[#87A7AC] transition-colors duration-200 font-bold text-xl"
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
						</svg>
						<span>Visit Site</span>
					</a>
					<a 
						href="/showcase" 
						class="inline-flex items-center justify-center space-x-2 bg-[#EAE6D8] text-[#434840] px-8 py-4 rounded-lg hover:bg-[#E7A97F] hover:text-white transition-colors duration-200 font-bold text-xl"
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
						</svg>
						<span>Back to Showcase</span>
					</a>
				</div>
			</div>
		</div>
	</section>
	
	<!-- Website Details -->
	<section class="py-20 bg-white">
		<div class="container-custom">
			<div class="max-w-4xl mx-auto">
				<!-- Image Section -->
				{#if website.image}
					<div class="mb-12">
						<img 
							src={website.image} 
							alt="{website.title}" 
							class="w-full h-auto object-contain"
						/>
					</div>
				{/if}
				
				<!-- Content Section -->
				<div class="prose prose-xl max-w-none text-[#434840] mb-12 leading-relaxed text-xl">
					{@html htmlContent}
				</div>
				
				<!-- Tech Stack -->
				<div class="mb-8">
					<h4 class="text-2xl font-black text-[#677A67] mb-4">
						Technologies Used
					</h4>
					<div class="flex flex-wrap gap-3">
						{#each website.tech as tech}
							<span class="px-4 py-2 bg-[#E4EDEE] text-[#434840] text-lg font-bold rounded-full font-mono">
								{tech}
							</span>
						{/each}
					</div>
				</div>
				
				<!-- Features -->
				<div class="mb-8">
					<h4 class="text-2xl font-black text-[#677A67] mb-4">
						Key Features
					</h4>
					<ul class="space-y-3 text-[#434840] text-xl font-semibold">
						{#each website.features || [] as feature}
							<li class="flex items-start space-x-3">
								<span class="text-[#677A67] mt-1 text-xl">✓</span>
								<span>{feature}</span>
							</li>
						{/each}
					</ul>
				</div>
				
				<!-- Action Buttons -->
				<div class="flex flex-col sm:flex-row gap-4">
					<a 
						href={website.url} 
						target="_blank" 
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center space-x-2 bg-[#677A67] text-white px-8 py-4 rounded-lg hover:bg-[#87A7AC] transition-colors duration-200 font-bold text-xl"
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
						</svg>
						<span>Visit Site</span>
					</a>
					
					<a 
						href="/showcase" 
						class="inline-flex items-center justify-center space-x-2 bg-[#EAE6D8] text-[#434840] px-8 py-4 rounded-lg hover:bg-[#E7A97F] hover:text-white transition-colors duration-200 font-bold text-xl"
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
						</svg>
						<span>Back to Showcase</span>
					</a>
				</div>
			</div>
		</div>
	</section>
</div> 