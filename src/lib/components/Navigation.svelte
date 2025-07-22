<script>
	import { page } from '$app/stores';
	
	const navItems = [
		{ href: '/about', label: 'About' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/showcase', label: 'Showcase' }
	];
	
	let mobileMenuOpen = false;
	
	$: isActive = (href) => $page.url.pathname === href;
</script>

<nav class="fixed top-2 left-1/2 transform -translate-x-1/2 z-50">
	<div class="bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg px-6 py-3">
		<div class="flex items-center space-x-8">
			<!-- Logo -->
			<a href="/" class="flex items-center px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-md">
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
		</div>
	</div>
</nav> 