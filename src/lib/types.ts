export interface InteractiveObject {
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
	label: string;
	action: () => void;
	sprite?: string;
}

export interface CharacterPosition {
	x: number;
	y: number;
}

export interface GameState {
	currentScene: string;
	inventory: string[];
	characterPosition: CharacterPosition;
}

export interface Scene {
	id: string;
	name: string;
	background: string;
	objects: InteractiveObject[];
	characterStartPosition: CharacterPosition;
}

export interface Sprite {
	id: string;
	url: string;
	width: number;
	height: number;
	animationFrames?: number;
} 