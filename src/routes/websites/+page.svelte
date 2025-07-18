<script lang="ts">
	import { goto } from '$app/navigation';
	import type { InteractiveObject } from '$lib/types';
	import AnimatedCharacter from '$lib/components/AnimatedCharacter.svelte';

	let characterX = 200;
	let characterY = 180;
	let targetX = 200;
	let targetY = 180;
	let isMoving = false;
	let gameScene: HTMLElement;

	// Responsive interactive objects using percentages
	let interactiveObjects: InteractiveObject[] = [
		{
			id: 'website1',
			x: 30,
			y: 15,
			width: 24,
			height: 16,
			label: 'Portfolio',
			action: () => window.open('https://example.com/portfolio', '_blank')
		},
		{
			id: 'website2',
			x: 45,
			y: 12,
			width: 24,
			height: 16,
			label: 'Blog',
			action: () => window.open('https://example.com/blog', '_blank')
		},
		{
			id: 'website3',
			x: 60,
			y: 18,
			width: 24,
			height: 16,
			label: 'Shop',
			action: () => window.open('https://example.com/shop', '_blank')
		},
		{
			id: 'back',
			x: 5,
			y: 5,
			width: 16,
			height: 8,
			label: '← Back',
			action: () => goto('/')
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

	function handleSceneClick(event: MouseEvent) {
		if (isMoving) return;

		const rect = gameScene.getBoundingClientRect();
		const clickX = event.clientX - rect.left;
		const clickY = event.clientY - rect.top;

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
</script>

<div class="game-container">
	<div 
		class="game-scene" 
		bind:this={gameScene}
		on:click={handleSceneClick}
		on:keydown={handleKeydown}
		role="button"
		tabindex="0"
		aria-label="Websites scene - click to move character or interact with websites"
	>
		<!-- Background Layer -->
		<div class="background-layer" style="background-image: url('/images/backgrounds/websites-bg.png')">
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
				aria-label="Click to visit {object.label}"
			>
				<div class="object-label bg-purple-500 bg-opacity-30 border-2 border-purple-400 text-white text-sm">
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
		<div class="foreground-layer" style="background-image: url('/images/backgrounds/websites-fg.png')"></div>
		</div>
	</div>

	<!-- SCUMM-style Menu -->
	<div class="scumm-menu">
		<div class="menu-bar">
			<button class="menu-item" on:click={() => goto('/')} aria-label="Navigate to home page">Home</button>
			<button class="menu-item" on:click={() => goto('/projects')} aria-label="Navigate to projects page">Projects</button>
			<button class="menu-item active" aria-label="Current page - Websites">Websites</button>
			<button class="menu-item" on:click={() => goto('/articles')} aria-label="Navigate to articles page">Articles</button>
			<button class="menu-item" on:click={() => goto('/about')} aria-label="Navigate to about page">About</button>
		</div>
		
		<div class="inventory-area">
			<div class="text-white text-sm">Websites Gallery - Click on websites to visit them</div>
		</div>
	</div>
</div> 