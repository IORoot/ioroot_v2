<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { InteractiveObject } from '$lib/types';
	import { gameState } from '$lib/stores';
	import AnimatedCharacter from '$lib/components/AnimatedCharacter.svelte';

	let gameScene: HTMLElement;
	let character: HTMLElement;
	let isMoving = false;

	// Character position (responsive)
	let characterX = 100;
	let characterY = 200;
	let targetX = 100;
	let targetY = 200;

	// Game state
	let currentScene = 'home';
	let inventory: string[] = [];
	let activeMenu = '';

	// Responsive interactive objects
	let interactiveObjects: InteractiveObject[] = [
		{
			id: 'computer',
			x: 20,
			y: 15,
			width: 15,
			height: 12,
			label: 'Computer',
			action: () => goto('/projects')
		},
		{
			id: 'bookshelf',
			x: 35,
			y: 10,
			width: 18,
			height: 25,
			label: 'Bookshelf',
			action: () => goto('/articles')
		},
		{
			id: 'window',
			x: 55,
			y: 12,
			width: 20,
			height: 16,
			label: 'Window',
			action: () => goto('/websites')
		}
	];

	// Convert percentage positions to pixel positions
	function getPixelPosition(percentX: number, percentY: number, percentWidth: number, percentHeight: number) {
		if (!gameScene) return { x: 0, y: 0, width: 0, height: 0 };
		
		const rect = gameScene.getBoundingClientRect();
		return {
			x: (percentX / 100) * rect.width,
			y: (percentY / 100) * rect.height,
			width: (percentWidth / 100) * rect.width,
			height: (percentHeight / 100) * rect.height
		};
	}

	// Handle scene clicks for character movement
	function handleSceneClick(event: MouseEvent) {
		if (isMoving) return;

		const rect = gameScene.getBoundingClientRect();
		const clickX = event.clientX - rect.left;
		const clickY = event.clientY - rect.top;

		// Check if clicking on interactive object
		const clickedObject = interactiveObjects.find(obj => {
			const pos = getPixelPosition(obj.x, obj.y, obj.width, obj.height);
			return clickX >= pos.x && clickX <= pos.x + pos.width &&
				   clickY >= pos.y && clickY <= pos.y + pos.height;
		});

		if (clickedObject) {
			clickedObject.action();
			return;
		}

		// Calculate character position so bottom center goes to clicked location
		// Character size varies by screen size, so we need to calculate dynamically
		let characterWidth = 960;
		let characterHeight = 960;
		
		// Responsive sizing based on screen width
		if (rect.width <= 768) {
			characterWidth = 480;
			characterHeight = 480;
		}
		
		const characterTargetX = clickX - (characterWidth / 2); // Center horizontally
		const characterTargetY = clickY - characterHeight + 200; // Bottom vertically, plus 200px down

		// Move character to calculated position
		moveCharacter(characterTargetX, characterTargetY);
	}

	// Handle keyboard navigation
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			const target = event.target as HTMLElement;
			if (target.classList.contains('interactive-object')) {
				const objectId = target.dataset.objectId;
				const object = interactiveObjects.find(obj => obj.id === objectId);
				if (object) {
					object.action();
				}
			}
		}
	}

	// Animate character movement
	function moveCharacter(newTargetX: number, newTargetY: number) {
		isMoving = true;
		targetX = newTargetX;
		targetY = newTargetY;
		
		const startX = characterX;
		const startY = characterY;
		const distance = Math.sqrt((targetX - startX) ** 2 + (targetY - startY) ** 2);
		const duration = Math.min(distance / 0.5, 3000); // Slower movement: 0.5 pixels per ms, max 3 seconds
		
		const startTime = performance.now();
		
		function animate(currentTime: number) {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);
			
			// Easing function for smooth movement
			const easeProgress = 1 - Math.pow(1 - progress, 3);
			
			characterX = startX + (targetX - startX) * easeProgress;
			characterY = startY + (targetY - startY) * easeProgress;
			
			if (progress < 1) {
				requestAnimationFrame(animate);
			} else {
				isMoving = false;
			}
		}
		
		requestAnimationFrame(animate);
	}

	// Menu handlers
	function handleMenuClick(menu: string) {
		activeMenu = activeMenu === menu ? '' : menu;
	}

	function handleNavigation(page: string) {
		goto(page);
	}

	onMount(() => {
		// Initialize game state
		gameState.set({
			currentScene,
			inventory,
			characterPosition: { x: characterX, y: characterY }
		});
	});
</script>

<div class="game-container">
	<div 
		class="game-scene" 
		bind:this={gameScene}
		on:click={handleSceneClick}
		on:keydown={handleKeydown}
		role="button"
		tabindex="0"
		aria-label="Game scene - click to move character or interact with objects"
	>
		<!-- Background Layer -->
		<div class="background-layer" style="background-image: url('/images/backgrounds/home-bg.png')">
			<!-- Interactive Objects -->
			{#each interactiveObjects as object}
				{@const pos = getPixelPosition(object.x, object.y, object.width, object.height)}
				<div 
					class="interactive-object"
					style="left: {pos.x}px; top: {pos.y}px; width: {pos.width}px; height: {pos.height}px;"
					title={object.label}
					data-object-id={object.id}
					role="button"
					tabindex="0"
					aria-label="Click to interact with {object.label}"
				>
					<div class="object-label bg-blue-500 bg-opacity-30 border-2 border-blue-400 text-white text-sm">
						{object.label}
					</div>
				</div>
			{/each}

			<!-- Animated Character -->
			<AnimatedCharacter 
				x={characterX}
				y={characterY}
				isMoving={isMoving}
				targetX={targetX}
				targetY={targetY}
			/>

			<!-- Foreground Layer -->
			<div class="foreground-layer" style="background-image: url('/images/backgrounds/home-fg.png')"></div>
		</div>
	</div>

	<!-- SCUMM-style Menu -->
	<div class="scumm-menu">
		<div class="menu-bar">
			<button 
				class="menu-item active" 
				aria-label="Current page - Home"
			>
				Home
			</button>
			<button 
				class="menu-item" 
				class:active={activeMenu === 'projects'}
				on:click={() => handleNavigation('/projects')}
				aria-label="Navigate to projects page"
			>
				Projects
			</button>
			<button 
				class="menu-item" 
				class:active={activeMenu === 'websites'}
				on:click={() => handleNavigation('/websites')}
				aria-label="Navigate to websites page"
			>
				Websites
			</button>
			<button 
				class="menu-item" 
				class:active={activeMenu === 'articles'}
				on:click={() => handleNavigation('/articles')}
				aria-label="Navigate to articles page"
			>
				Articles
			</button>
			<button 
				class="menu-item" 
				class:active={activeMenu === 'about'}
				on:click={() => handleNavigation('/about')}
				aria-label="Navigate to about page"
			>
				About
			</button>
		</div>
		
		<div class="inventory-area">
			<div class="text-white text-sm mb-2">Inventory:</div>
			{#each Array(8) as _, i}
				<div class="inventory-slot">
					{#if inventory[i]}
						{inventory[i]}
					{:else}
						{i + 1}
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div> 