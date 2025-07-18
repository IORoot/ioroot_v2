import type { CollisionArea } from './types';

export interface Point {
	x: number;
	y: number;
}

export interface Rectangle {
	x: number;
	y: number;
	width: number;
	height: number;
}

// Convert percentage positions to pixel positions
export function getPixelPosition(
	percentX: number, 
	percentY: number, 
	percentWidth: number, 
	percentHeight: number,
	containerWidth: number,
	containerHeight: number
): Rectangle {
	return {
		x: (percentX / 100) * containerWidth,
		y: (percentY / 100) * containerHeight,
		width: (percentWidth / 100) * containerWidth,
		height: (percentHeight / 100) * containerHeight
	};
}

// Check if two rectangles overlap
export function rectanglesOverlap(rect1: Rectangle, rect2: Rectangle): boolean {
	return (
		rect1.x < rect2.x + rect2.width &&
		rect1.x + rect1.width > rect2.x &&
		rect1.y < rect2.y + rect2.height &&
		rect1.y + rect1.height > rect2.y
	);
}

// Check if a point is inside a rectangle
export function pointInRectangle(point: Point, rect: Rectangle): boolean {
	return (
		point.x >= rect.x &&
		point.x <= rect.x + rect.width &&
		point.y >= rect.y &&
		point.y <= rect.y + rect.height
	);
}

// Check if character would collide with any blocked areas
export function checkCollision(
	characterX: number,
	characterY: number,
	characterWidth: number,
	characterHeight: number,
	collisionAreas: CollisionArea[],
	containerWidth: number,
	containerHeight: number
): boolean {
	// Calculate the center bottom point of the character (where they're "standing")
	const characterCenterBottom: Point = {
		x: characterX + (characterWidth / 2), // Center horizontally
		y: characterY + characterHeight // Bottom of the character
	};

	for (const area of collisionAreas) {
		if (area.type === 'blocked' || area.type === 'wall') {
			const pixelArea = getPixelPosition(
				area.x,
				area.y,
				area.width,
				area.height,
				containerWidth,
				containerHeight
			);

			if (pointInRectangle(characterCenterBottom, pixelArea)) {
				return true; // Collision detected
			}
		}
	}

	return false; // No collision
}

// Find valid path to target position
export function findValidPath(
	startX: number,
	startY: number,
	targetX: number,
	targetY: number,
	characterWidth: number,
	characterHeight: number,
	collisionAreas: CollisionArea[],
	containerWidth: number,
	containerHeight: number
): { x: number; y: number } | null {
	// Simple line-of-sight check
	const steps = 10;
	const dx = (targetX - startX) / steps;
	const dy = (targetY - startY) / steps;

	for (let i = 1; i <= steps; i++) {
		const testX = startX + dx * i;
		const testY = startY + dy * i;

		if (checkCollision(testX, testY, characterWidth, characterHeight, collisionAreas, containerWidth, containerHeight)) {
			// Found collision, return last valid position
			return {
				x: startX + dx * (i - 1),
				y: startY + dy * (i - 1)
			};
		}
	}

	return { x: targetX, y: targetY }; // Path is clear
} 