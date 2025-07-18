<script lang="ts">
	import { goto } from '$app/navigation';
	import type { InteractiveObject } from '$lib/types';

	let characterX = 120;
	let characterY = 220;
	let isMoving = false;
	let gameScene: HTMLElement;

	// Responsive interactive objects using percentages
	let interactiveObjects: InteractiveObject[] = [
		{
			id: 'article1',
			x: 30,
			y: 15,
			width: 24,
			height: 16,
			label: 'Tech Article',
			action: () => window.open('https://example.com/article1', '_blank')
		},
		{
			id: 'article2',
			x: 45,
			y: 12,
			width: 24,
			height: 16,
			label: 'Design Article',
			action: () => window.open('https://example.com/article2', '_blank')
		},
		{
			id: 'article3',
			x: 60,
			y: 18,
			width: 24,
			height: 16,
			label: 'Tutorial',
			action: () => window.open('https://example.com/article3', '_blank')
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

		const rect = event.currentTarget as HTMLElement;
		const rectBounds = rect.getBoundingClientRect();
		const x = event.clientX - rectBounds.left;
		const y = event.clientY - rectBounds.top;

		const clickedObject = interactiveObjects.find(obj => {
			const pos = getPixelPosition(obj.x, obj.y, obj.width, obj.height);
			return x >= pos.x && x <= pos.x + pos.width &&
				   y >= pos.y && y <= pos.y + pos.height;
		});

		if (clickedObject) {
			clickedObject.action();
			return;
		}

		moveCharacter(x, y);
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

	function moveCharacter(targetX: number, targetY: number) {
		isMoving = true;
		
		const startX = characterX;
		const startY = characterY;
		const distance = Math.sqrt((targetX - startX) ** 2 + (targetY - startY) ** 2);
		const duration = Math.min(distance / 2, 1000);
		
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
		aria-label="Articles scene - click to move character or interact with articles"
		style="background: linear-gradient(to bottom, #E67E22 0%, #D35400 100%);"
	>
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
				aria-label="Click to read {object.label}"
			>
				<div class="object-label bg-orange-500 bg-opacity-30 border-2 border-orange-400 text-white text-sm">
					{object.label}
				</div>
			</div>
		{/each}

		<!-- Character -->
		<div 
			class="character"
			style="left: {characterX}px; top: {characterY}px;"
			aria-label="Player character"
		>
			<div class="w-full h-full bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
				ME
			</div>
		</div>
	</div>

	<!-- SCUMM-style Menu -->
	<div class="scumm-menu">
		<div class="menu-bar">
			<button class="menu-item" on:click={() => goto('/')} aria-label="Navigate to home page">Home</button>
			<button class="menu-item" on:click={() => goto('/projects')} aria-label="Navigate to projects page">Projects</button>
			<button class="menu-item" on:click={() => goto('/websites')} aria-label="Navigate to websites page">Websites</button>
			<button class="menu-item active" aria-label="Current page - Articles">Articles</button>
			<button class="menu-item" on:click={() => goto('/about')} aria-label="Navigate to about page">About</button>
		</div>
		
		<div class="inventory-area">
			<div class="text-white text-sm">Articles Library - Click on articles to read them</div>
		</div>
	</div>
</div> 