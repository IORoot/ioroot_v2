<script>
	import Navigation from '$lib/components/Navigation.svelte';
	

	
	const experience = [
		{
			title: 'Lead DevOps Engineer',
			company: 'ThirtyThree Global',
			period: 'Jan 2019 - Present',
			description: 'Leading DevOps department with infrastructure-as-code using Puppet and Terraform. Managing CI/CD pipelines, cloud resources across Microsoft Azure, and supporting development teams with robust deployment workflows.'
		},
		{
			title: 'Director, Owner & Head Coach',
			company: 'LondonParkour Ltd',
			period: 'Apr 2018 - Present',
			description: 'Founder and head coach leading all aspects of the business. 20+ years of parkour coaching experience, international education programs, and establishing ParkourUK as the UK\'s first national governing body.'
		},
		{
			title: 'DevOps Engineer',
			company: 'Herdl',
			period: 'Sep 2021 - Apr 2023',
			description: 'Freelance DevOps engineering role focusing on infrastructure automation and deployment optimization.'
		},
		{
			title: 'Chief Technology Officer & Senior Coach',
			company: 'Parkour Generations',
			period: 'Jul 2006 - Mar 2018',
			description: 'Leading digital presence, web development, and IT systems while running international parkour coaching programs and events.'
		}
	];
	
	const education = [
		{
			degree: 'Bachelor of Science - BS, Computer Science',
			school: 'University of Hertfordshire',
			period: 'Sep 1999 - May 2000',
			grade: '2:1 (HONS)'
		},
		{
			degree: 'Higher National Diploma, Computer Software Engineering',
			school: 'University of Hertfordshire',
			period: 'Sep 1997 - May 1999',
			grade: 'Distinction + Commendation'
		}
	];
	
	const contact = {
		email: 'contact@londonparkour.com',
		github: 'https://github.com/ioroot',
		instagram: 'https://www.instagram.com/andy_n_p/',
		londonparkour: 'https://www.instagram.com/london_parkour/',
		youtube: 'https://www.youtube.com/@AndyPearson'
	};
</script>

<svelte:head>
	<title>About Andy Pearson - Full-Stack Developer</title>
	<meta name="description" content="Learn about Andy Pearson's background, skills, and experience in web development and parkour." />
</svelte:head>

<div class="min-h-screen">
	<Navigation theme="blue" />
	
	<!-- Hero Section -->
	<section class="relative py-32 overflow-hidden">
		<!-- Background Image -->
		<div class="absolute inset-0 z-0">
			<img src="/images/about/andy_full.jpg" alt="Andy Pearson" class="w-full h-full object-cover opacity-20" />
			<div class="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-blue-800/80"></div>
		</div>
		
		<!-- Content -->
		<div class="container-custom relative z-10">
			<div class="max-w-4xl mx-auto text-center">
				<h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
					About Me
				</h1>
				<p class="text-xl text-blue-100 mb-8">
					Lead DevOps Engineer with 20+ years of parkour coaching experience, building infrastructure and movement communities.
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
						<h2 class="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-6">
							Background
						</h2>
						<div class="prose prose-lg dark:prose-invert">
							<p class="mb-4">
								I'm a Lead DevOps Engineer at ThirtyThree Global with over 6 years of experience managing infrastructure, 
								CI/CD pipelines, and cloud resources across Microsoft Azure. I specialize in infrastructure-as-code using 
								Puppet and Terraform, Kubernetes, and automated deployment workflows.
							</p>
							<p class="mb-4">
								I'm also the founder and head coach of LondonParkour Ltd, with 20+ years of parkour coaching experience. 
								I've coached thousands of students internationally and helped establish ParkourUK as the UK's first 
								national governing body for parkour.
							</p>
							<p>
								I believe in building robust, scalable systems and fostering strong communities through movement and technology.
							</p>
						</div>
					</div>
					<div class="text-center">
						<img src="/images/about/andy_profile.jpg" alt="Andy Pearson" class="w-64 h-64 mx-auto rounded-full object-cover shadow-lg" />
					</div>
				</div>
			</div>
		</div>
	</section>
	

	
	<!-- Experience Section -->
	<section class="py-20 bg-white dark:bg-gray-900">
		<div class="container-custom">
			<div class="max-w-4xl mx-auto">
				<h2 class="text-3xl font-bold text-center text-blue-800 dark:text-blue-200 mb-12">
					Professional Experience
				</h2>
				
				<div class="space-y-8">
					{#each experience as job}
						<div class="card p-6">
							<div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
								<h3 class="text-xl font-semibold text-blue-800 dark:text-blue-200">
									{job.title}
								</h3>
								<span class="text-blue-600 dark:text-blue-400 font-medium">
									{job.period}
								</span>
							</div>
							<p class="text-blue-600 dark:text-blue-400 mb-2">
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
	
	<!-- Education Section -->
	<section class="py-20 bg-blue-50 dark:bg-blue-900">
		<div class="container-custom">
			<div class="max-w-4xl mx-auto">
				<h2 class="text-3xl font-bold text-center text-blue-800 dark:text-blue-200 mb-12">
					Education
				</h2>
				
				<div class="space-y-8">
					{#each education as edu}
						<div class="card p-6">
							<div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
								<h3 class="text-xl font-semibold text-blue-800 dark:text-blue-200">
									{edu.degree}
								</h3>
								<span class="text-blue-600 dark:text-blue-400 font-medium">
									{edu.period}
								</span>
							</div>
							<p class="text-blue-600 dark:text-blue-400 mb-2">
								{edu.school}
							</p>
							<p class="text-gray-600 dark:text-gray-400">
								Grade: {edu.grade}
							</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>
	
	<!-- Contact Section -->
	<section class="py-20 bg-white dark:bg-gray-900">
		<div class="container-custom">
			<div class="max-w-4xl mx-auto text-center">
				<h2 class="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-12">
					Get In Touch
				</h2>
				
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<a href="mailto:{contact.email}" class="card p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
						<div class="text-3xl mb-4">📧</div>
						<h3 class="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Email</h3>
						<p class="text-blue-600 dark:text-blue-400">{contact.email}</p>
					</a>
					
					<a href={contact.github} target="_blank" rel="noopener noreferrer" class="card p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
						<div class="text-3xl mb-4">🐙</div>
						<h3 class="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">GitHub</h3>
						<p class="text-blue-600 dark:text-blue-400">@ioroot</p>
					</a>
					
					<a href={contact.instagram} target="_blank" rel="noopener noreferrer" class="card p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
						<div class="text-3xl mb-4">📸</div>
						<h3 class="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Instagram</h3>
						<p class="text-blue-600 dark:text-blue-400">@andy_n_p</p>
					</a>
					
					<a href={contact.youtube} target="_blank" rel="noopener noreferrer" class="card p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
						<div class="text-3xl mb-4">📺</div>
						<h3 class="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">YouTube</h3>
						<p class="text-blue-600 dark:text-blue-400">@AndyPearson</p>
					</a>
				</div>
			</div>
		</div>
	</section>
</div> 