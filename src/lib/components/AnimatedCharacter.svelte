<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { CharacterAnimator, getSpriteFramePosition, animationState } from '../spriteAnimation';
	import { characterAnimations } from '../spriteAnimation';

	export let x: number = 100;
	export let y: number = 200;
	export let isMoving: boolean = false;
	export let targetX: number = 100;
	export let targetY: number = 200;

	let characterElement: HTMLElement;
	let spriteElement: HTMLElement;
	let animator: CharacterAnimator;
	let unsubscribe: () => void;
	let currentDirection: 'left' | 'right' | 'up' | 'down' = 'right';

	// Subscribe to animation state changes
	onMount(() => {
		animator = new CharacterAnimator();
		unsubscribe = animationState.subscribe(state => {
			// Update character appearance based on animation state
			if (spriteElement) {
				const frame = state.currentFrame;
				const direction = state.direction;
				
				// Only animate if actually moving
				if (isMoving) {
					const animation = characterAnimations.walk;
					const framePosition = getSpriteFramePosition(
						frame, 
						animation.frameWidth, 
						animation.frameHeight,
						direction
					);
					
					console.log('Walking animation:', { frame, direction, framePosition });
					spriteElement.style.backgroundPosition = framePosition.backgroundPosition;
					spriteElement.style.transform = framePosition.transform;
				} else {
					// Show first frame of idle animation when not moving
					const animation = characterAnimations.idle;
					const framePosition = getSpriteFramePosition(
						0, // Always use first frame when idle
						animation.frameWidth, 
						animation.frameHeight,
						currentDirection
					);
					
					console.log('Idle animation:', { frame: 0, direction: currentDirection, framePosition });
					spriteElement.style.backgroundPosition = framePosition.backgroundPosition;
					spriteElement.style.transform = framePosition.transform;
				}
			}
		});
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
		if (animator) {
			animator.stopWalking();
		}
	});

	// Determine walking direction based on movement
	$: if (isMoving && animator) {
		const deltaX = targetX - x;
		const deltaY = targetY - y;
		
		// Determine primary direction
		let direction: 'left' | 'right' | 'up' | 'down' = 'right';
		
		if (Math.abs(deltaX) > Math.abs(deltaY)) {
			direction = deltaX > 0 ? 'right' : 'left';
		} else {
			direction = deltaY > 0 ? 'down' : 'up';
		}
		
		currentDirection = direction;
		animator.startWalking(direction);
	} else if (!isMoving && animator) {
		// Stop walking animation when not moving
		animator.stopWalking();
	}
</script>

<div 
	bind:this={characterElement}
	class="character animated-character"
	style="left: {x}px; top: {y}px;"
	aria-label="Player character"
>
	<!-- Animated sprite background -->
	<div 
		bind:this={spriteElement}
		class="character-sprite"
		style="background-image: url('/images/sprites/character-sprite.png');"
	>
		<!-- Fallback text if sprite doesn't load -->
		<div class="character-fallback">
			ME
		</div>
	</div>
</div>

<style>
	.animated-character {
		position: absolute;
		width: 640px;
		height: 640px;
		z-index: 10;
		transition: none; /* Disable CSS transitions for sprite animations */
		background-color: transparent;
	}

	.character-sprite {
		width: 100%;
		height: 100%;
		background-size: auto 100%;
		background-repeat: no-repeat;
		background-position: 0 0;
		image-rendering: pixelated;
		image-rendering: -moz-crisp-edges;
		image-rendering: crisp-edges;
		position: relative;
		background-color: transparent;
	}

	.character-fallback {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: transparent;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: bold;
		font-size: 120px;
		opacity: 0; /* Hide fallback when sprite is loaded */
	}

	/* Show fallback only when sprite fails to load */
	.character-sprite:not([style*="background-image"]) .character-fallback,
	.character-sprite[style*="background-image: none"] .character-fallback {
		opacity: 1;
	}

	/* Responsive sizing */
	@media (max-width: 768px) {
		.animated-character {
			width: 320px;
			height: 320px;
		}
		.character-fallback {
			font-size: 60px;
		}
	}

	@media (min-width: 1025px) {
		.animated-character {
			width: 640px;
			height: 640px;
		}
		.character-fallback {
			font-size: 120px;
		}
	}
</style> 