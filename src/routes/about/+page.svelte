<script>
	import Navigation from '$lib/components/Navigation.svelte';
	

	
	const experience = [
		{
			title: 'Lead DevOps Engineer',
			company: 'ThirtyThree Global',
			logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQE8kw0bxG_7ZA/company-logo_100_100/company-logo_100_100/0/1646822065749?e=1755734400&v=beta&t=M4oj5z7Wo1iow4Jjj4J9x2C_nwtCeViLHskdBzsoL7c',
			period: 'Jan 2019 - Present',
			description: 'Leading DevOps department with infrastructure-as-code using Puppet and Terraform. Managing CI/CD pipelines, cloud resources across Microsoft Azure, and supporting development teams with robust deployment workflows.',
			skills: ['Infrastructure as Code', 'CI/CD Pipelines', 'Cloud Architecture', 'Team Leadership', 'Security'],
			technologies: ['Terraform', 'Puppet', 'Azure', 'Kubernetes', 'Docker', 'GitLab CI/CD', 'Prometheus', 'Grafana'],
			achievements: ['Led DevOps transformation', '99.9% uptime maintained', 'Reduced deployment time by 80%', 'Implemented security best practices'],
			highlighted: true
		},
		{
			title: 'Director, Owner & Head Coach',
			company: 'LondonParkour Ltd',
			logo: 'https://media.licdn.com/dms/image/v2/C560BAQF5BKyVLfUd5w/company-logo_100_100/company-logo_100_100/0/1630599297634?e=1755734400&v=beta&t=WkAffPhB2r5qPwavXtzAlEnfR537DU6tKwZbSS1TVWw',
			period: 'Apr 2018 - Present',
			description: 'Founder and head coach leading all aspects of the business. 20+ years of parkour coaching experience, international education programs, and establishing ParkourUK as the UK\'s first national governing body.',
			skills: ['Business Development', 'Coaching Excellence', 'Event Production', 'Community Building', 'International Education'],
			technologies: ['WordPress', 'PHP', 'Social Media', 'Video Production', 'Website Management'],
			achievements: ['Founded successful business', 'Established ParkourUK', 'International coaching programs', 'Thousands of students coached'],
			highlighted: true
		},
		{
			title: 'DevOps Engineer',
			company: 'Herdl',
			logo: 'https://media.licdn.com/dms/image/v2/D560BAQFsmInQ1PK4gw/company-logo_100_100/company-logo_100_100/0/1700660712513/herdl_logo?e=1755734400&v=beta&t=V-dtYIZJF0Fi2UTQ4X6_ud1xEAvfVzk3Xc5r7tUA6PI',
			period: 'Sep 2021 - Apr 2023',
			description: 'Freelance DevOps engineering role focusing on infrastructure automation and deployment optimization.',
			skills: ['Infrastructure Automation', 'Deployment Optimization', 'Cloud Management', 'System Administration'],
			technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Monitoring'],
			achievements: ['Improved deployment efficiency', 'Enhanced system reliability', 'Reduced operational costs'],
			highlighted: true
		},
		{
			title: 'Chief Technology Officer & Senior Coach',
			company: 'Parkour Generations',
			period: 'Jul 2006 - Mar 2018',
			description: 'Leading digital presence, web development, and IT systems while running international parkour coaching programs and events.',
			skills: ['Technology Leadership', 'Web Development', 'Digital Marketing', 'International Coaching', 'Event Management'],
			technologies: ['LAMP Stack', 'WordPress', 'PHP', 'JavaScript', 'CSS', 'Social Media'],
			achievements: ['Built international brand', 'Developed coaching programs', 'Created digital platforms', 'Established industry standards'],
			highlighted: true
		},
		{
			title: 'Server Stability Project Lead',
			company: 'Mblox (now Sinch)',
			period: 'Jun 2008 - Aug 2008',
			description: 'Contract role focusing on server stability and performance optimization.'
		},
		{
			title: 'Lead Test Analyst',
			company: 'Schroders',
			period: 'Dec 2007 - May 2008',
			description: 'Contract role leading test analysis and quality assurance processes.'
		},
		{
			title: 'Lead Test Analyst',
			company: 'GE',
			period: 'Jul 2007 - Nov 2007',
			description: 'Contract role leading test analysis and quality assurance processes.'
		},
		{
			title: 'Senior Test Analyst',
			company: 'IMG Media',
			period: 'Feb 2007 - Jun 2007',
			description: 'Contract role in senior test analysis and quality assurance.'
		},
		{
			title: 'Senior Test Analyst',
			company: 'Sky',
			period: 'Nov 2006 - Feb 2007',
			description: 'Contract role in senior test analysis and quality assurance.'
		},
		{
			title: 'Server Analysis and Administration',
			company: 'The Football Association',
			period: 'Jun 2006 - Nov 2006',
			description: 'Contract role in server analysis and administration.'
		},
		{
			title: 'Fraud Management Test Analyst',
			company: 'John Lewis & Partners',
			period: 'Mar 2006 - Jun 2006',
			description: 'Contract role in fraud management testing and analysis.'
		},
		{
			title: 'System Test Analyst and Project Leader',
			company: 'Channel 5',
			period: 'Jan 2006 - Mar 2006',
			description: 'Contract role leading system testing and project management.'
		},
		{
			title: 'GUI Test Analyst',
			company: 'ERNEST JONES',
			period: 'Aug 2005 - Feb 2006',
			description: 'Contract role in GUI testing and analysis.'
		},
		{
			title: 'Database Testing Team',
			company: 'TUI',
			period: 'Dec 2004 - Jul 2005',
			description: 'Contract role in database testing and quality assurance.'
		},
		{
			title: 'Lead Implementation Engineer',
			company: 'WatchMark',
			period: 'Aug 2004 - Nov 2004',
			description: 'Full-time role leading implementation engineering.'
		},
		{
			title: 'Network Performance Management Consultant',
			company: 'ADC Telecommunications',
			period: 'Feb 2001 - Jul 2004',
			description: 'Full-time role in network performance management and consulting.'
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
	
	const skillTree = {
		'Infrastructure & DevOps': {
			icon: '☁️',
			level: 'Master',
			children: {
				'Cloud Platforms': {
					icon: '🔷',
					level: 'Expert',
					children: {
						'Microsoft Azure': { icon: '🔷', level: 'Expert' },
						'AKS (Azure Kubernetes Service)': { icon: '🐳', level: 'Expert' },
						'Azure Container Registry': { icon: '📦', level: 'Expert' }
					}
				},
				'Infrastructure as Code': {
					icon: '🏗️',
					level: 'Expert',
					children: {
						'Terraform': { icon: '🏗️', level: 'Expert' },
						'Puppet': { icon: '🎭', level: 'Expert' }
					}
				},
				'Containerization': {
					icon: '🐳',
					level: 'Expert',
					children: {
						'Docker': { icon: '🐳', level: 'Expert' },
						'Kubernetes': { icon: '⚓', level: 'Expert' },
						'Helm': { icon: '⚓', level: 'Expert' },
						'Orbstack': { icon: '🚀', level: 'Advanced' }
					}
				},
				'CI/CD': {
					icon: '🔄',
					level: 'Expert',
					children: {
						'GitLab CI/CD': { icon: '🦊', level: 'Expert' },
						'GitHub Actions': { icon: '🐙', level: 'Expert' },
						'Git': { icon: '📝', level: 'Expert' }
					}
				},
				'Monitoring & Observability': {
					icon: '📊',
					level: 'Expert',
					children: {
						'Prometheus': { icon: '📊', level: 'Expert' },
						'Grafana': { icon: '📈', level: 'Expert' },
						'Loki': { icon: '📝', level: 'Expert' }
					}
				}
			}
		},
		'System Administration': {
			icon: '🖥️',
			level: 'Expert',
			children: {
				'Operating Systems': {
					icon: '💻',
					level: 'Expert',
					children: {
						'CentOS': { icon: '🐧', level: 'Expert' },
						'Rocky Linux': { icon: '🪨', level: 'Expert' },
						'BASH/ZSH': { icon: '💻', level: 'Expert' }
					}
				},
				'Web Technologies': {
					icon: '🌐',
					level: 'Expert',
					children: {
						'LAMP Stack': { icon: '🦬', level: 'Expert' },
						'PHP/Laravel': { icon: '🐘', level: 'Expert' },
						'WordPress': { icon: '📝', level: 'Expert' },
						'Concrete5': { icon: '🏗️', level: 'Advanced' }
					}
				},
				'Security': {
					icon: '🔒',
					level: 'Expert',
					children: {
						'SSL Certificates': { icon: '🔐', level: 'Expert' },
						'OWASP ZAP': { icon: '🛡️', level: 'Expert' },
						'Critical Incident Response': { icon: '🚨', level: 'Expert' }
					}
				}
			}
		},
		'Parkour & Movement': {
			icon: '🏃‍♂️',
			level: 'Master',
			children: {
				'Coaching': {
					icon: '👨‍🏫',
					level: 'Master',
					children: {
						'ADAPT Level 3': { icon: '🏆', level: 'Master' },
						'ParkourUK Level 2': { icon: '🇬🇧', level: 'Expert' },
						'PTLLS Level 4': { icon: '📚', level: 'Expert' },
						'Level 3 Tutoring Sport': { icon: '🎓', level: 'Expert' }
					}
				},
				'Safety & First Aid': {
					icon: '🆘',
					level: 'Expert',
					children: {
						'ITC Level 2 First Aid': { icon: '🩹', level: 'Expert' },
						'Emergency Life Support': { icon: '💓', level: 'Expert' },
						'Safeguarding Children': { icon: '👶', level: 'Expert' },
						'Enhanced DBS Checked': { icon: '✅', level: 'Expert' }
					}
				},
				'Business Leadership': {
					icon: '💼',
					level: 'Expert',
					children: {
						'Business Development': { icon: '📈', level: 'Expert' },
						'Event Production': { icon: '🎪', level: 'Expert' },
						'International Education': { icon: '🌍', level: 'Expert' }
					}
				}
			}
		},
		'Testing & Quality Assurance': {
			icon: '🔍',
			level: 'Expert',
			children: {
				'Test Analysis': {
					icon: '📊',
					level: 'Expert',
					children: {
						'System Testing': { icon: '⚙️', level: 'Expert' },
						'GUI Testing': { icon: '🖥️', level: 'Expert' },
						'Database Testing': { icon: '🗄️', level: 'Expert' },
						'Fraud Management Testing': { icon: '🕵️', level: 'Expert' }
					}
				},
				'Project Leadership': {
					icon: '👥',
					level: 'Expert',
					children: {
						'Team Leadership': { icon: '👨‍💼', level: 'Expert' },
						'Project Management': { icon: '📋', level: 'Expert' },
						'Quality Assurance': { icon: '✅', level: 'Expert' }
					}
				}
			}
		}
	};
</script>

<svelte:head>
	<title>About Andy Pearson - Full-Stack Developer</title>
	<meta name="description" content="Learn about Andy Pearson's background, skills, and experience in web development and parkour." />
</svelte:head>

<div class="min-h-screen bg-[#1a1a1a] relative">
	<!-- Film Grain Overlay -->
	<div class="absolute inset-0 opacity-10">
		<img src="/images/bento/film-grain.svg" alt="" class="w-full h-full object-cover" />
	</div>
	
	<Navigation />
	

	
	<!-- Bio Section -->
	<section class="py-20 bg-[#1a1a1a] relative z-5">
		<!-- 8px Grid Overlay for Background -->
		<div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px); background-size: 8px 8px, 8px 8px;">
		</div>
		<div class="container-custom relative z-10">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div>
						<h2 class="text-5xl font-black text-white mb-8">
							Background
						</h2>
						<div class="prose prose-2xl">
							<p class="mb-6 text-xl font-semibold leading-relaxed text-white">
								I'm a Lead DevOps Engineer at ThirtyThree Global with over 6 years of experience managing infrastructure, 
								CI/CD pipelines, and cloud resources across Microsoft Azure. I specialize in infrastructure-as-code using 
								Puppet and Terraform, Kubernetes, and automated deployment workflows.
							</p>
							<p class="mb-6 text-xl font-semibold leading-relaxed text-white">
								I'm also the founder and head coach of LondonParkour Ltd, with 20+ years of parkour coaching experience. 
								I've coached thousands of students internationally and helped establish ParkourUK as the UK's first 
								national governing body for parkour.
							</p>
							<p class="text-xl font-semibold leading-relaxed text-white">
								I believe in building robust, scalable systems and fostering strong communities through movement and technology.
							</p>
						</div>
					</div>
					<div class="text-center">
						<img src="/images/about/andy_profile.jpg" alt="Andy Pearson" class="w-64 h-64 mx-auto rounded-full object-cover shadow-lg" />
					</div>
				</div>
			</div>
		</section>
	

	
	<!-- Experience Section -->
	<section class="py-20 bg-[#2a2a2a] relative z-5">
		<!-- 8px Grid Overlay for Background -->
		<div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px); background-size: 8px 8px, 8px 8px;">
		</div>
		<div class="container-custom relative z-10">
			<h2 class="text-5xl font-black text-center text-white mb-12">
				Professional Experience
			</h2>
			
							<div class="space-y-8">
					{#each experience as job}
						<div class="card p-6 bg-[#1a1a1a] border border-[#333] {job.highlighted ? 'border-2 border-[#677A67] bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a]' : ''}">
							<div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
								<div class="flex items-center space-x-4">
									{#if job.logo}
										<img src={job.logo} alt="{job.company} logo" class="w-12 h-12 rounded-lg object-cover shadow-sm" />
									{/if}
									<h3 class="text-3xl font-black text-white">
										{job.title}
									</h3>
								</div>
								<span class="text-xl text-[#677A67] font-bold">
									{job.period}
								</span>
							</div>
							<p class="text-xl text-[#677A67] mb-3 font-semibold">
								{job.company}
							</p>
							<p class="text-lg text-white mb-6 font-medium leading-relaxed">
								{job.description}
							</p>
							
							{#if job.highlighted}
								<!-- Skills Section -->
								<div class="mb-4">
									<h4 class="text-xl font-black text-[#677A67] mb-3">Key Skills</h4>
									<div class="flex flex-wrap gap-3">
										{#each job.skills as skill}
											<span class="px-4 py-2 bg-[#333] text-white text-lg font-bold rounded-full">
												{skill}
											</span>
										{/each}
									</div>
								</div>
								
								<!-- Technologies Section -->
								<div class="mb-6">
									<h4 class="text-xl font-black text-[#677A67] mb-3">Technologies</h4>
									<div class="flex flex-wrap gap-3">
										{#each job.technologies as tech}
											<span class="px-4 py-2 bg-[#333] text-white text-lg font-bold rounded-full font-mono">
												{tech}
											</span>
										{/each}
									</div>
								</div>
								
								<!-- Achievements Section -->
								<div>
									<h4 class="text-xl font-black text-[#677A67] mb-3">Key Achievements</h4>
									<ul class="list-disc list-inside text-lg text-white space-y-2 font-semibold">
										{#each job.achievements as achievement}
											<li>{achievement}</li>
										{/each}
									</ul>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</section>
	
</div> 