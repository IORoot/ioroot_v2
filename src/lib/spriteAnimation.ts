import { writable } from 'svelte/store';

export interface SpriteAnimation {
	id: string;
	frames: number;
	frameWidth: number;
	frameHeight: number;
	fps: number;
	loop: boolean;
}

export interface AnimationState {
	currentFrame: number;
	isPlaying: boolean;
	direction: 'left' | 'right' | 'up' | 'down';
	lastUpdate: number;
}

// Animation configurations
export const characterAnimations: Record<string, SpriteAnimation> = {
	idle: {
		id: 'idle',
		frames: 1, // Only one frame for idle
		frameWidth: 640,
		frameHeight: 640,
		fps: 1,
		loop: false // Don't loop idle animation
	},
	walk: {
		id: 'walk',
		frames: 8,
		frameWidth: 640,
		frameHeight: 640,
		fps: 12,
		loop: true
	},
	walkLeft: {
		id: 'walkLeft',
		frames: 8,
		frameWidth: 640,
		frameHeight: 640,
		fps: 12,
		loop: true
	},
	walkRight: {
		id: 'walkRight',
		frames: 8,
		frameWidth: 640,
		frameHeight: 640,
		fps: 12,
		loop: true
	}
};

// Animation state store
export const animationState = writable<AnimationState>({
	currentFrame: 0,
	isPlaying: false,
	direction: 'right',
	lastUpdate: 0
});

// Animation controller
export class SpriteAnimator {
	private animation: SpriteAnimation;
	private state: AnimationState;
	private animationId: number | null = null;

	constructor(animation: SpriteAnimation) {
		this.animation = animation;
		this.state = {
			currentFrame: 0,
			isPlaying: false,
			direction: 'right',
			lastUpdate: 0
		};
	}

	start() {
		if (this.animationId) return;
		
		this.state.isPlaying = true;
		this.state.lastUpdate = performance.now();
		this.animate();
	}

	stop() {
		if (this.animationId) {
			cancelAnimationFrame(this.animationId);
			this.animationId = null;
		}
		this.state.isPlaying = false;
		this.state.currentFrame = 0;
		animationState.set(this.state);
	}

	private animate() {
		if (!this.state.isPlaying) return;

		const now = performance.now();
		const deltaTime = now - this.state.lastUpdate;
		const frameTime = 1000 / this.animation.fps;

		if (deltaTime >= frameTime) {
			this.state.currentFrame = (this.state.currentFrame + 1) % this.animation.frames;
			this.state.lastUpdate = now;
			animationState.set(this.state);
		}

		this.animationId = requestAnimationFrame(() => this.animate());
	}

	setDirection(direction: 'left' | 'right' | 'up' | 'down') {
		this.state.direction = direction;
		animationState.set(this.state);
	}

	getCurrentFrame(): number {
		return this.state.currentFrame;
	}

	getDirection(): string {
		return this.state.direction;
	}
}

// Character animation manager
export class CharacterAnimator {
	private currentAnimation: SpriteAnimator | null = null;
	private isMoving = false;

	constructor() {
		// Don't start any animation initially
	}

	startWalking(direction: 'left' | 'right' | 'up' | 'down') {
		if (this.isMoving) return;

		this.isMoving = true;
		
		// Stop any existing animation
		if (this.currentAnimation) {
			this.currentAnimation.stop();
		}

		// Choose appropriate walking animation based on direction
		let animationKey = 'walk';
		if (direction === 'left') {
			animationKey = 'walkLeft';
		} else if (direction === 'right') {
			animationKey = 'walkRight';
		}

		this.currentAnimation = new SpriteAnimator(characterAnimations[animationKey]);
		this.currentAnimation.setDirection(direction);
		this.currentAnimation.start();
	}

	stopWalking() {
		if (!this.isMoving) return;

		this.isMoving = false;
		
		// Stop the current animation
		if (this.currentAnimation) {
			this.currentAnimation.stop();
			this.currentAnimation = null;
		}
		
		// Reset animation state to idle
		animationState.set({
			currentFrame: 0,
			isPlaying: false,
			direction: 'right',
			lastUpdate: 0
		});
	}

	getCurrentFrame(): number {
		return this.currentAnimation ? this.currentAnimation.getCurrentFrame() : 0;
	}

	getDirection(): string {
		return this.currentAnimation ? this.currentAnimation.getDirection() : 'right';
	}

	isWalking(): boolean {
		return this.isMoving;
	}
}

// Utility function to get sprite frame position
export function getSpriteFramePosition(
	frame: number, 
	frameWidth: number, 
	frameHeight: number,
	direction: string = 'right'
): { backgroundPosition: string; transform: string } {
	const x = frame * frameWidth;
	const y = 0; // Assuming all frames are in one row
	
	// For left direction, we can flip the sprite horizontally
	const flipX = direction === 'left' ? 'scaleX(-1)' : '';
	
	return {
		backgroundPosition: `-${x}px -${y}px`,
		transform: flipX
	};
} 