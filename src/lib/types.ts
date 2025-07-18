export interface InteractiveObject {
	id: string;
	x: number; // percentage
	y: number; // percentage
	width: number; // percentage
	height: number; // percentage
	label: string;
	action: () => void;
}

export interface CollisionArea {
	id: string;
	x: number; // percentage
	y: number; // percentage
	width: number; // percentage
	height: number; // percentage
	type: 'blocked' | 'walkable' | 'water' | 'wall';
	label?: string;
}

export interface GameState {
	currentScene: string;
	inventory: string[];
	characterPosition: { x: number; y: number };
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