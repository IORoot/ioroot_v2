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

<div class="min-h-screen">
	<Navigation theme="green" />
	
	<!-- Hero Section -->
	<section class="py-20 bg-gradient-to-br from-green-700 to-green-800 dark:from-green-900 dark:to-green-800">
		<div class="container-custom">
			<div class="max-w-4xl mx-auto text-center">
				<h1 class="text-5xl md:text-6xl font-bold text-white dark:text-green-100 mb-6">
					{website.title}
				</h1>
				<p class="text-xl text-green-50 dark:text-green-200 mb-8">
					{website.description}
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<a 
						href={website.url} 
						target="_blank" 
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-mono text-lg"
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
						</svg>
						<span>Visit Site</span>
					</a>
					<a 
						href="/websites" 
						class="inline-flex items-center justify-center space-x-2 bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-200 px-8 py-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-mono text-lg"
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
						</svg>
						<span>Back to Websites</span>
					</a>
				</div>
			</div>
		</div>
	</section>
	
	<!-- Website Details -->
	<section class="py-20 bg-white dark:bg-gray-900">
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
				<div class="prose prose-xl dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 mb-12 leading-relaxed text-xl">
					{@html htmlContent}
				</div>
				
				<!-- Tech Stack -->
				<div class="mb-8">
											<h4 class="text-xl font-semibold text-green-700 dark:text-green-300 mb-4">
							Technologies Used
						</h4>
						<div class="flex flex-wrap gap-3">
							{#each website.tech as tech}
								<span class="px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 text-sm rounded-full font-mono">
									{tech}
								</span>
							{/each}
						</div>
					</div>
					
					<!-- Features -->
					<div class="mb-8">
						<h4 class="text-xl font-semibold text-green-700 dark:text-green-300 mb-4">
							Key Features
						</h4>
						<ul class="space-y-3 text-gray-600 dark:text-gray-400">
							{#each website.features || [] as feature}
								<li class="flex items-start space-x-3">
									<span class="text-green-600 dark:text-green-400 mt-1">✓</span>
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
							class="inline-flex items-center justify-center space-x-2 bg-green-700 text-white px-8 py-4 rounded-lg hover:bg-green-800 transition-colors duration-200 font-mono"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
							</svg>
							<span>Visit Site</span>
						</a>
						
						<a 
							href="/websites" 
							class="inline-flex items-center justify-center space-x-2 bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-200 px-8 py-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-mono"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
							</svg>
							<span>Back to Websites</span>
						</a>
					</div>
			</div>
		</div>
	</section>
</div> 