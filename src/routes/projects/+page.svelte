<script lang="ts">
  import Navigation from '$lib/components/Navigation.svelte';
  import type { PageData } from './$types';
	
	export let data: PageData;
	
	$: ({ repos, categories, totalRepos } = data);
</script>

<svelte:head>
	<title>Projects - Andy Pearson</title>
	<meta name="description" content="Explore Andy Pearson's coding projects, web applications, and technical work." />
</svelte:head>

<div class="min-h-screen">
	<Navigation theme="tech" />
	
	<!-- Hero Section -->
	<section class="py-20 bg-gradient-to-br from-tech-50 to-tech-100 dark:from-tech-900 dark:to-tech-800">
		<div class="container-custom">
			<div class="max-w-4xl mx-auto text-center">
				<h1 class="text-5xl md:text-6xl font-bold text-tech-800 dark:text-tech-200 mb-6">
					Projects
				</h1>
				<p class="text-xl text-tech-600 dark:text-tech-400 mb-8">
					Exploring the intersection of code, AI, and user experience
				</p>
			</div>
		</div>
	</section>
	
	<!-- Projects by Category -->
	<section class="py-20 bg-white dark:bg-gray-900">
		<div class="container-custom">
			{#if data.error}
				<!-- Error State -->
				<div class="max-w-2xl mx-auto text-center">
					<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-8 mb-8">
						<div class="flex justify-center mb-4">
							<svg class="h-12 w-12 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
							</svg>
						</div>
						<h3 class="text-lg font-medium text-yellow-800 mb-2">
							GitHub API Rate Limited
						</h3>
						<p class="text-yellow-700 mb-4">
							{data.error}
						</p>
						<p class="text-sm text-yellow-600">
							The projects will be available once the rate limit resets.
						</p>
					</div>
				</div>
			{:else}
				<!-- Stats -->
				<div class="text-center mb-12">
					<h2 class="text-3xl font-bold text-tech-800 dark:text-tech-200 mb-4">
						{totalRepos} Projects from GitHub
					</h2>
					<p class="text-tech-600 dark:text-tech-400">
						Automatically updated from your GitHub repositories
					</p>
				</div>
			
			{#each categories as category}
				<div class="mb-16">
					<h2 class="text-3xl font-bold text-tech-800 dark:text-tech-200 mb-8 flex items-center">
						<span class="text-4xl mr-4">{category.icon}</span>
						{category.name}
						<span class="ml-4 text-lg text-tech-600 dark:text-tech-400">
							({category.repos.length} projects)
						</span>
					</h2>
					
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{#each category.repos as repo}
							<a href="/projects/{repo.name}" class="card group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
								<div class="p-6">
									<!-- Header -->
									<div class="flex items-start justify-between mb-4">
										<div class="flex-1">
											<h3 class="text-xl font-semibold text-tech-800 dark:text-tech-200 mb-2 group-hover:text-tech-600 dark:group-hover:text-tech-400">
												{repo.name}
											</h3>
											<p class="text-sm text-tech-600 dark:text-tech-400 mb-2">
												{repo.formattedDate}
											</p>
										</div>
										<div class="flex items-center space-x-2 text-sm text-tech-600 dark:text-tech-400">
											<span class="flex items-center">
												⭐ {repo.stargazers_count}
											</span>
											<span class="flex items-center">
												🍴 {repo.forks_count}
											</span>
										</div>
									</div>
									
									<!-- Description -->
									{#if repo.description}
										<p class="text-gray-600 dark:text-gray-400 mb-4">
											{repo.description}
										</p>
									{/if}
									
									<!-- Tags -->
									{#if repo.tags.length > 0}
										<div class="flex flex-wrap gap-2 mb-4">
											{#each repo.tags.slice(0, 5) as tag}
												<span class="px-2 py-1 bg-tech-100 text-tech-700 dark:bg-tech-800 dark:text-tech-300 text-xs rounded-full">
													{tag}
												</span>
											{/each}
											{#if repo.tags.length > 5}
												<span class="px-2 py-1 bg-tech-100 text-tech-700 dark:bg-tech-800 dark:text-tech-300 text-xs rounded-full">
													+{repo.tags.length - 5} more
												</span>
											{/if}
										</div>
									{/if}
									
									<!-- Links -->
									<div class="flex space-x-4">
										<a 
											href={repo.html_url} 
											target="_blank" 
											rel="noopener noreferrer"
											class="flex items-center space-x-2 text-tech-600 dark:text-tech-400 hover:text-tech-700 dark:hover:text-tech-300"
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
												class="flex items-center space-x-2 text-tech-600 dark:text-tech-400 hover:text-tech-700 dark:hover:text-tech-300"
											>
												<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
												</svg>
												<span>Live Demo</span>
											</a>
										{/if}
									</div>
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/each}
			{/if}
		</div>
	</section>
</div> 