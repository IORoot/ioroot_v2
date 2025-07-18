<script lang="ts">
	import { goto } from '$app/navigation';
	import type { InteractiveObject, CollisionArea } from '$lib/types';
	import AnimatedCharacter from '$lib/components/AnimatedCharacter.svelte';
	import InteractiveDebug from '$lib/components/InteractiveDebug.svelte';
	import CollisionDebug from '$lib/components/CollisionDebug.svelte';
	import ScummMenu from '$lib/components/ScummMenu.svelte';
	import { checkCollision, findValidPath } from '$lib/collisionDetection';
	import { onMount } from 'svelte';

	// Character position (responsive) - Projects page starts center left
	let characterX = 1000;
	let characterY = 500; // Projects page starts at center
	let targetX = 200;
	let targetY = 300;
	let isMoving = false;
	let gameScene: HTMLElement;
	let showInteractiveDebug = false;
	let showCollisionDebug = false;
	let inventory: string[] = [];
	let mouseCoordinates = { x: 0, y: 0 };

	// Initialize on mount
	onMount(() => {
		// Any initialization can go here
	});

	// Responsive interactive objects using percentages
	let interactiveObjects: InteractiveObject[] = [
		{
			id: 'project1',
			x: 25,
			y: 15,
			width: 20,
			height: 16,
			label: 'Web App',
			action: () => window.open('https://example.com/project1', '_blank')
		},
		{
			id: 'project2',
			x: 40,
			y: 12,
			width: 20,
			height: 16,
			label: 'Mobile App',
			action: () => window.open('https://example.com/project2', '_blank')
		},
		{
			id: 'project3',
			x: 55,
			y: 18,
			width: 20,
			height: 16,
			label: 'API Service',
			action: () => window.open('https://example.com/project3', '_blank')
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

	// Collision areas - define where character can't walk
	let collisionAreas: CollisionArea[] = [
		{
			id: 'section1',
			x: 0,
			y: 0,
			width: 25,
			height: 85,
			type: 'blocked',
			label: 'section1'
		},
		{
			id: 'section2',
			x: 25,
			y: 0,
			width: 25,
			height: 70,
			type: 'blocked',
			label: 'section2'
		},
		{
			id: 'section3',
			x: 50,
			y: 0,
			width: 25,
			height: 60,
			type: 'blocked',
			label: 'section3'
		},
		{
			id: 'section4',
			x: 75,
			y: 0,
			width: 15,
			height: 55,
			type: 'blocked',
			label: 'section4'
		},
		{
			id: 'section5',
			x: 90,
			y: 0,
			width: 10,
			height: 50,
			type: 'blocked',
			label: 'section5'
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

		// Update mouse coordinates for display
		mouseCoordinates = { x: Math.round(clickX), y: Math.round(clickY) };

		const clickedObject = interactiveObjects.find(obj => {
			const pos = getPixelPosition(obj.x, obj.y, obj.width, obj.height);
			return clickX >= pos.x && clickX <= pos.x + pos.width &&
				   clickY >= pos.y && clickY <= pos.y + pos.height;
		});

		if (clickedObject) {
			clickedObject.action();
			return;
		}

		// Check if clicking inside collision areas
		for (const area of collisionAreas) {
			const pos = getPixelPosition(area.x, area.y, area.width, area.height);
			if (clickX >= pos.x && clickX <= pos.x + pos.width &&
				clickY >= pos.y && clickY <= pos.y + pos.height) {
				console.log('Clicked inside collision area:', area.label);
				return; // Don't move if clicking in collision area
			}
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
		if (!gameScene) return;
		
		const rect = gameScene.getBoundingClientRect();
		let characterWidth = 960;
		let characterHeight = 960;
		
		// Responsive sizing based on screen width
		if (rect.width <= 768) {
			characterWidth = 480;
			characterHeight = 480;
		}

		// Check if target position is valid
		if (checkCollision(newTargetX, newTargetY, characterWidth, characterHeight, collisionAreas, rect.width, rect.height)) {
			console.log('Target position blocked, finding alternative path...');
		}

		// Find valid path to target
		const validTarget = findValidPath(
			characterX,
			characterY,
			newTargetX,
			newTargetY,
			characterWidth,
			characterHeight,
			collisionAreas,
			rect.width,
			rect.height
		);

		if (!validTarget) {
			console.log('No valid path to target');
			return;
		}

		// Check if the valid target is the same as current position
		const distanceToTarget = Math.sqrt((validTarget.x - characterX) ** 2 + (validTarget.y - characterY) ** 2);
		if (distanceToTarget < 5) {
			console.log('Target too close to current position, not moving');
			return;
		}

		isMoving = true;
		targetX = validTarget.x;
		targetY = validTarget.y;
		
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
			
			const newX = startX + (targetX - startX) * easeProgress;
			const newY = startY + (targetY - startY) * easeProgress;
			
			// Check collision at each step
			if (checkCollision(newX, newY, characterWidth, characterHeight, collisionAreas, rect.width, rect.height)) {
				console.log('Collision detected during movement, stopping');
				isMoving = false;
				return;
			}
			
			characterX = newX;
			characterY = newY;
			
			if (progress < 1) {
				requestAnimationFrame(animate);
			} else {
				isMoving = false;
			}
		}
		
		requestAnimationFrame(animate);
	}

	function toggleInteractiveDebug() {
		showInteractiveDebug = !showInteractiveDebug;
	}

	function toggleCollisionDebug() {
		showCollisionDebug = !showCollisionDebug;
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
		aria-label="Projects scene - click to move character or interact with projects"
	>
		<!-- Background Layer -->
		<div class="background-layer" style="background-image: url('/images/backgrounds/projects-bg.png')">
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
				aria-label="Click to view {object.label}"
			>
				<div class="object-label bg-green-500 bg-opacity-30 border-2 border-green-400 text-white text-sm">
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
		<div class="foreground-layer" style="background-image: url('/images/backgrounds/projects-fg.png')"></div>

		<!-- Interactive Debug (optional) -->
		<InteractiveDebug 
			interactiveObjects={interactiveObjects}
			containerWidth={gameScene?.getBoundingClientRect().width || 0}
			containerHeight={gameScene?.getBoundingClientRect().height || 0}
			showDebug={showInteractiveDebug}
		/>

		<!-- Collision Debug (optional) -->
		<CollisionDebug 
			collisionAreas={collisionAreas}
			containerWidth={gameScene?.getBoundingClientRect().width || 0}
			containerHeight={gameScene?.getBoundingClientRect().height || 0}
			showDebug={showCollisionDebug}
		/>
		</div>
	</div>

	<!-- SCUMM-style Menu -->
	<ScummMenu />
	
	<!-- Debug Controls -->
	<div class="debug-controls">
		<button 
			class="debug-button"
			class:active={showCollisionDebug}
			on:click={toggleCollisionDebug}
			aria-label="Toggle collision debug mode"
			title="Toggle collision areas visibility"
		>
			{showCollisionDebug ? 'Hide' : 'Show'} Collisions
		</button>
		<button 
			class="debug-button"
			class:active={showInteractiveDebug}
			on:click={toggleInteractiveDebug}
			aria-label="Toggle interactive debug mode"
			title="Toggle interactive areas visibility"
		>
			{showInteractiveDebug ? 'Hide' : 'Show'} Interactive
		</button>
		
		<!-- Mouse Coordinates Display -->
		<div class="coordinates-display">
			<div class="coordinate-label">Mouse Position:</div>
			<div class="coordinate-value">X: {mouseCoordinates.x}, Y: {mouseCoordinates.y}</div>
		</div>
	</div>
</div>

<style>
	.debug-controls {
		position: absolute;
		top: 10px;
		right: 10px;
		z-index: 30;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.debug-button {
		background: rgba(0, 0, 0, 0.7);
		color: white;
		border: 1px solid #666;
		padding: 8px 12px;
		border-radius: 4px;
		font-size: 12px;
		cursor: pointer;
		transition: all 0.2s ease;
		white-space: nowrap;
	}

	.debug-button:hover {
		background: rgba(0, 0, 0, 0.8);
		border-color: #888;
	}

	.debug-button.active {
		background: rgba(0, 0, 255, 0.7);
		border-color: #4444ff;
	}

	.debug-button.active:hover {
		background: rgba(0, 0, 255, 0.8);
	}

	.coordinates-display {
		background: rgba(0, 0, 0, 0.8);
		color: #00ff00;
		border: 1px solid #00ff00;
		padding: 8px 12px;
		border-radius: 4px;
		font-size: 11px;
		font-family: 'Courier New', monospace;
		margin-top: 5px;
		text-align: center;
	}

	.coordinate-label {
		font-weight: bold;
		margin-bottom: 2px;
	}

	.coordinate-value {
		font-size: 10px;
		opacity: 0.9;
	}


</style> 