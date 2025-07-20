<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	
	const navItems = [
		{ href: '/about', label: 'About' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/showcase', label: 'Showcase' }
	];
	
	let mobileMenuOpen = false;
	let isDarkMode = false;
	
	$: isActive = (href) => $page.url.pathname === href;
	
	onMount(() => {
		// Check for saved theme preference or default to light mode
		const savedTheme = localStorage.getItem('theme');
		isDarkMode = savedTheme === 'dark';
		applyTheme();
	});
	
	function toggleTheme() {
		isDarkMode = !isDarkMode;
		applyTheme();
	}
	
	function applyTheme() {
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}
</script>

<nav class="fixed top-2 left-1/2 transform -translate-x-1/2 z-50">
	<div class="bg-white/90 backdrop-blur-md rounded-xl shadow-sm px-6 py-3 relative overflow-hidden">
		<!-- Gradient in bottom right corner -->
		<div class="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/30 to-transparent pointer-events-none"></div>
		<div class="flex items-center space-x-8">
			<!-- Logo -->
			<a href="/" class="flex items-center">
				<img src="/images/logo/logo_full.svg" alt="Andy Pearson" class="h-6 w-auto" />
			</a>
			
			<!-- Navigation Items -->
			{#each navItems as item}
				{@const hoverColor = item.href === '/about' ? 'hover:text-[#87A7AC] hover:bg-[#87A7AC]/10' : 
					item.href === '/projects' ? 'hover:text-[#E7A97F] hover:bg-[#E7A97F]/10' : 
					item.href === '/showcase' ? 'hover:text-[#677A67] hover:bg-[#677A67]/10' : 
					'hover:text-gray-900 hover:bg-gray-900/10'}
				{@const activeColor = item.href === '/about' ? 'bg-[#87A7AC]/20 text-[#87A7AC]' : 
					item.href === '/projects' ? 'bg-[#E7A97F]/20 text-[#E7A97F]' : 
					item.href === '/showcase' ? 'bg-[#677A67]/20 text-[#677A67]' : 
					'bg-gray-900/20 text-gray-900'}
				<a 
					href={item.href}
					class="px-3 py-2 rounded-lg transition-all duration-200 {isActive(item.href) 
						? activeColor 
						: `text-gray-600 ${hoverColor}`}"
				>
					<span>{item.label}</span>
				</a>
			{/each}
			
			<!-- Theme Toggle Switch -->
			<button 
				on:click={toggleTheme}
				class="relative w-12 h-6 bg-gray-200 rounded-full transition-colors duration-300 {isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}"
			>
				<!-- Slider -->
				<div class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 {isDarkMode ? 'translate-x-6' : 'translate-x-0'}">
					<!-- Light Icon -->
					{#if !isDarkMode}
						<svg class="w-3 h-3 text-yellow-500 absolute top-1 left-1" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
						</svg>
					{/if}
					<!-- Dark Icon -->
					{#if isDarkMode}
						<svg class="w-3 h-3 text-gray-700 absolute top-1 left-1" fill="currentColor" viewBox="0 0 20 20">
							<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
						</svg>
					{/if}
				</div>
			</button>
		</div>
	</div>
</nav> 