<script>
	import { page } from '$app/stores';
	
	export let theme = 'modern';
	
	const navItems = [
		{ href: '/', label: 'Home', icon: '🏠' },
		{ href: '/about', label: 'About', icon: '👤' },
		{ href: '/projects', label: 'Projects', icon: '💻' },
		{ href: '/websites', label: 'Websites', icon: '🌐' },
		{ href: '/articles', label: 'Articles', icon: '📝' }
	];
	
	let mobileMenuOpen = false;
	
	$: isActive = (href) => $page.url.pathname === href;
</script>

<nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
	<div class="container-custom">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<a href="/" class="flex items-center space-x-2 text-xl font-bold text-{theme}-600 dark:text-{theme}-400">
				<span class="text-2xl">🚀</span>
				<span>Andy Pearson</span>
			</a>
			
			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center space-x-8">
				{#each navItems as item}
					<a 
						href={item.href}
						class="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 {isActive(item.href) 
							? `bg-${theme}-100 text-${theme}-700 dark:bg-${theme}-800 dark:text-${theme}-300` 
							: `text-gray-600 hover:text-${theme}-600 hover:bg-${theme}-50 dark:text-gray-300 dark:hover:text-${theme}-400 dark:hover:bg-${theme}-900/50`}"
					>
						<span>{item.icon}</span>
						<span>{item.label}</span>
					</a>
				{/each}
			</div>
			
			<!-- Mobile menu button -->
			<button 
				class="md:hidden p-2 rounded-lg text-gray-600 hover:text-{theme}-600 hover:bg-{theme}-50 dark:text-gray-300 dark:hover:text-{theme}-400 dark:hover:bg-{theme}-900/50"
				on:click={() => mobileMenuOpen = !mobileMenuOpen}
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
				</svg>
			</button>
		</div>
		
		<!-- Mobile Navigation -->
		{#if mobileMenuOpen}
			<div class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
				<div class="flex flex-col space-y-2">
					{#each navItems as item}
						<a 
							href={item.href}
							class="flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 {isActive(item.href) 
								? `bg-${theme}-100 text-${theme}-700 dark:bg-${theme}-800 dark:text-${theme}-300` 
								: `text-gray-600 hover:text-${theme}-600 hover:bg-${theme}-50 dark:text-gray-300 dark:hover:text-${theme}-400 dark:hover:bg-${theme}-900/50`}"
						>
							<span>{item.icon}</span>
							<span>{item.label}</span>
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</nav> 