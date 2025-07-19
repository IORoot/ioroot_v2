<script>
	import Navigation from '$lib/components/Navigation.svelte';
	
	const skills = [
		{ name: 'JavaScript/TypeScript', level: 95, icon: '⚡' },
		{ name: 'React/Next.js', level: 90, icon: '⚛️' },
		{ name: 'Node.js/Express', level: 85, icon: '🟢' },
		{ name: 'Python/Django', level: 80, icon: '🐍' },
		{ name: 'PostgreSQL/MongoDB', level: 85, icon: '🗄️' },
		{ name: 'AWS/Docker', level: 75, icon: '☁️' }
	];
	
	const experience = [
		{
			title: 'Senior Full-Stack Developer',
			company: 'Tech Startup',
			period: '2022 - Present',
			description: 'Leading development of web applications using modern technologies.'
		},
		{
			title: 'Full-Stack Developer',
			company: 'Digital Agency',
			period: '2020 - 2022',
			description: 'Built responsive websites and web applications for various clients.'
		},
		{
			title: 'Frontend Developer',
			company: 'E-commerce Platform',
			period: '2018 - 2020',
			description: 'Developed user interfaces and improved user experience.'
		}
	];
</script>

<svelte:head>
	<title>About Andy Pearson - Full-Stack Developer</title>
	<meta name="description" content="Learn about Andy Pearson's background, skills, and experience in web development and parkour." />
</svelte:head>

<div class="min-h-screen">
	<Navigation theme="professional" />
	
	<!-- Hero Section -->
	<section class="py-20 bg-gradient-to-br from-professional-50 to-professional-100 dark:from-professional-900 dark:to-professional-800">
		<div class="container-custom">
			<div class="max-w-4xl mx-auto text-center">
				<h1 class="text-5xl md:text-6xl font-bold text-professional-800 dark:text-professional-200 mb-6">
					About Me
				</h1>
				<p class="text-xl text-professional-600 dark:text-professional-400 mb-8">
					Full-Stack Developer with a passion for building modern web experiences and exploring movement through parkour.
				</p>
			</div>
		</div>
	</section>
	
	<!-- Bio Section -->
	<section class="py-20 bg-white dark:bg-gray-900">
		<div class="container-custom">
			<div class="max-w-4xl mx-auto">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div>
						<h2 class="text-3xl font-bold text-professional-800 dark:text-professional-200 mb-6">
							Background
						</h2>
						<div class="prose prose-lg dark:prose-invert">
							<p class="mb-4">
								I'm a passionate full-stack developer with over 5 years of experience building web applications. 
								I specialize in JavaScript/TypeScript, React, Node.js, and modern web technologies.
							</p>
							<p class="mb-4">
								When I'm not coding, you'll find me training parkour in London, exploring movement, 
								and building community within the parkour scene.
							</p>
							<p>
								I believe in creating high-performance, accessible, and user-friendly web experiences 
								that make a positive impact.
							</p>
						</div>
					</div>
					<div class="text-center">
						<div class="w-64 h-64 mx-auto bg-gradient-to-br from-professional-400 to-professional-600 rounded-full flex items-center justify-center text-8xl">
							👨‍💻
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	
	<!-- Skills Section -->
	<section class="py-20 bg-professional-50 dark:bg-professional-900">
		<div class="container-custom">
			<div class="max-w-4xl mx-auto">
				<h2 class="text-3xl font-bold text-center text-professional-800 dark:text-professional-200 mb-12">
					Skills & Technologies
				</h2>
				
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
					{#each skills as skill}
						<div class="card p-6">
							<div class="flex items-center space-x-3 mb-4">
								<span class="text-2xl">{skill.icon}</span>
								<h3 class="text-lg font-semibold text-professional-800 dark:text-professional-200">
									{skill.name}
								</h3>
							</div>
							<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
								<div class="bg-professional-500 h-2 rounded-full" style="width: {skill.level}%"></div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>
	
	<!-- Experience Section -->
	<section class="py-20 bg-white dark:bg-gray-900">
		<div class="container-custom">
			<div class="max-w-4xl mx-auto">
				<h2 class="text-3xl font-bold text-center text-professional-800 dark:text-professional-200 mb-12">
					Professional Experience
				</h2>
				
				<div class="space-y-8">
					{#each experience as job}
						<div class="card p-6">
							<div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
								<h3 class="text-xl font-semibold text-professional-800 dark:text-professional-200">
									{job.title}
								</h3>
								<span class="text-professional-600 dark:text-professional-400 font-medium">
									{job.period}
								</span>
							</div>
							<p class="text-professional-600 dark:text-professional-400 mb-2">
								{job.company}
							</p>
							<p class="text-gray-600 dark:text-gray-400">
								{job.description}
							</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>
</div> 