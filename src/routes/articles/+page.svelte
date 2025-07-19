<script>
	import Navigation from '$lib/components/Navigation.svelte';
	
	const articles = [
		{
			title: 'Building High-Performance Web Apps',
			excerpt: 'Tips and tricks for optimizing your web applications for speed and user experience.',
			date: '2024-01-15',
			readTime: '5 min read',
			tags: ['Performance', 'Web Development', 'Optimization'],
			slug: 'performance-tips',
			icon: '⚡'
		},
		{
			title: 'The Future of AI in Web Development',
			excerpt: 'Exploring how artificial intelligence is transforming the way we build and maintain websites.',
			date: '2024-01-10',
			readTime: '8 min read',
			tags: ['AI', 'Web Development', 'Future'],
			slug: 'ai-web-development',
			icon: '🤖'
		},
		{
			title: 'Parkour: More Than Just Movement',
			excerpt: 'How parkour training has influenced my approach to problem-solving and creativity.',
			date: '2024-01-05',
			readTime: '6 min read',
			tags: ['Parkour', 'Movement', 'Creativity'],
			slug: 'parkour-movement',
			icon: '🏃‍♂️'
		},
		{
			title: 'SvelteKit vs Next.js: A Developer\'s Perspective',
			excerpt: 'Comparing two popular frameworks and when to choose each one for your projects.',
			date: '2023-12-20',
			readTime: '10 min read',
			tags: ['SvelteKit', 'Next.js', 'Frameworks'],
			slug: 'sveltekit-vs-nextjs',
			icon: '⚛️'
		},
		{
			title: 'Building Community Through Technology',
			excerpt: 'How I used web development to create and strengthen the London parkour community.',
			date: '2023-12-15',
			readTime: '7 min read',
			tags: ['Community', 'Technology', 'Parkour'],
			slug: 'community-technology',
			icon: '🌐'
		},
		{
			title: 'The Art of Code Review',
			excerpt: 'Best practices for conducting effective code reviews that improve code quality and team collaboration.',
			date: '2023-12-10',
			readTime: '9 min read',
			tags: ['Code Review', 'Best Practices', 'Teamwork'],
			slug: 'code-review-art',
			icon: '🔍'
		}
	];
	
	const featuredArticle = articles[0];
</script>

<svelte:head>
	<title>Articles - Andy Pearson</title>
	<meta name="description" content="Read Andy Pearson's thoughts on web development, technology, parkour, and community building." />
</svelte:head>

<div class="min-h-screen">
	<Navigation theme="orange" />
	
	<!-- Hero Section -->
	<section class="py-20 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800">
		<div class="container-custom">
			<div class="max-w-4xl mx-auto text-center">
				<h1 class="text-5xl md:text-6xl font-bold text-orange-800 dark:text-orange-200 mb-6">
					Articles
				</h1>
				<p class="text-xl text-orange-600 dark:text-orange-400 mb-8">
					Thoughts on tech, movement, and everything in between
				</p>
			</div>
		</div>
	</section>
	
	<!-- Featured Article -->
	<section class="py-20 bg-white dark:bg-gray-900">
		<div class="container-custom">
			<div class="max-w-4xl mx-auto">
				<h2 class="text-3xl font-bold text-orange-800 dark:text-orange-200 mb-8">
					Featured Article
				</h2>
				
				<div class="card p-8 border-2 border-orange-200 dark:border-orange-700">
					<div class="flex items-center space-x-4 mb-6">
						<span class="text-4xl">{featuredArticle.icon}</span>
						<div>
							<h3 class="text-2xl font-bold text-orange-800 dark:text-orange-200">
								{featuredArticle.title}
							</h3>
							<div class="flex items-center space-x-4 text-sm text-orange-600 dark:text-orange-400">
								<span>{featuredArticle.date}</span>
								<span>•</span>
								<span>{featuredArticle.readTime}</span>
							</div>
						</div>
					</div>
					
					<p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
						{featuredArticle.excerpt}
					</p>
					
					<div class="flex flex-wrap gap-2 mb-6">
						{#each featuredArticle.tags as tag}
							<span class="px-3 py-1 bg-orange-100 text-orange-700 dark:bg-orange-800 dark:text-orange-300 text-sm rounded-full">
								{tag}
							</span>
						{/each}
					</div>
					
					<a 
						href="/articles/{featuredArticle.slug}" 
						class="inline-flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200"
					>
						<span>Read Article</span>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</section>
	
	<!-- All Articles -->
	<section class="py-20 bg-orange-50 dark:bg-orange-900">
		<div class="container-custom">
			<div class="max-w-6xl mx-auto">
				<h2 class="text-3xl font-bold text-orange-800 dark:text-orange-200 mb-8">
					All Articles
				</h2>
				
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{#each articles.slice(1) as article}
						<a href="/articles/{article.slug}" class="card group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-orange-200 dark:border-orange-700">
							<div class="p-6">
								<div class="flex items-center space-x-3 mb-4">
									<span class="text-2xl">{article.icon}</span>
									<div class="flex-1">
										<h3 class="text-lg font-semibold text-orange-800 dark:text-orange-200 group-hover:text-orange-600 dark:group-hover:text-orange-400">
											{article.title}
										</h3>
										<div class="flex items-center space-x-2 text-sm text-orange-600 dark:text-orange-400">
											<span>{article.date}</span>
											<span>•</span>
											<span>{article.readTime}</span>
										</div>
									</div>
								</div>
								
								<p class="text-gray-600 dark:text-gray-400 mb-4">
									{article.excerpt}
								</p>
								
								<div class="flex flex-wrap gap-2">
									{#each article.tags.slice(0, 2) as tag}
										<span class="px-2 py-1 bg-orange-100 text-orange-700 dark:bg-orange-800 dark:text-orange-300 text-xs rounded-full">
											{tag}
										</span>
									{/each}
									{#if article.tags.length > 2}
										<span class="px-2 py-1 bg-orange-100 text-orange-700 dark:bg-orange-800 dark:text-orange-300 text-xs rounded-full">
											+{article.tags.length - 2} more
										</span>
									{/if}
								</div>
							</div>
						</a>
					{/each}
				</div>
			</div>
		</div>
	</section>
</div> 