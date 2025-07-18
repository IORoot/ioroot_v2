# Collision Detection System

This system allows you to define areas where the character can and cannot walk, creating realistic movement constraints.

## How It Works

### Collision Area Types

- **`blocked`** - Areas the character cannot walk through (furniture, walls, etc.)
- **`wall`** - Same as blocked, used for walls and boundaries
- **`walkable`** - Areas the character can walk on (default for undefined areas)
- **`water`** - Special areas (future feature for water mechanics)

### Defining Collision Areas

Add collision areas to your page:

```typescript
let collisionAreas: CollisionArea[] = [
	{
		id: 'wall1',
		x: 0,        // percentage from left
		y: 0,        // percentage from top
		width: 100,  // percentage width
		height: 5,   // percentage height
		type: 'wall',
		label: 'Top wall'
	},
	{
		id: 'desk',
		x: 25,
		y: 20,
		width: 15,
		height: 10,
		type: 'blocked',
		label: 'Desk'
	}
];
```

### Example Collision Areas

#### Home Page Example:
```typescript
// Walls around the room
{ id: 'wall1', x: 0, y: 0, width: 100, height: 5, type: 'wall', label: 'Top wall' },
{ id: 'wall2', x: 0, y: 0, width: 5, height: 100, type: 'wall', label: 'Left wall' },
{ id: 'wall3', x: 95, y: 0, width: 5, height: 100, type: 'wall', label: 'Right wall' },
{ id: 'wall4', x: 0, y: 95, width: 100, height: 5, type: 'wall', label: 'Bottom wall' },

// Furniture
{ id: 'desk', x: 25, y: 20, width: 15, height: 10, type: 'blocked', label: 'Desk' },
{ id: 'shelf', x: 60, y: 25, width: 20, height: 15, type: 'blocked', label: 'Shelf' }
```

### Adding to Other Pages

To add collision detection to other pages:

1. **Import the collision detection utilities:**
```typescript
import { checkCollision, findValidPath } from '$lib/collisionDetection';
import type { CollisionArea } from '$lib/types';
```

2. **Define collision areas:**
```typescript
let collisionAreas: CollisionArea[] = [
	// Your collision areas here
];
```

3. **Update the moveCharacter function** (see home page example)

4. **Add debug visualization** (optional):
```typescript
import CollisionDebug from '$lib/components/CollisionDebug.svelte';

// In template:
<CollisionDebug 
	collisionAreas={collisionAreas}
	containerWidth={gameScene?.getBoundingClientRect().width || 0}
	containerHeight={gameScene?.getBoundingClientRect().height || 0}
	showDebug={true} // Set to true to see collision areas
/>
```

### Debug Mode

Set `showDebug={true}` in the CollisionDebug component to visualize collision areas as red rectangles. This helps you position collision areas correctly.

### Tips for Creating Collision Areas

1. **Use percentages** - All positions and sizes are percentages of the screen
2. **Test thoroughly** - Make sure the character can reach all interactive objects
3. **Start with walls** - Define room boundaries first
4. **Add furniture** - Place collision areas around desks, shelves, etc.
5. **Consider character size** - The character is 960x960px, so leave enough space

### Collision Detection Features

- **Real-time checking** - Character stops if it hits a collision area during movement
- **Path finding** - System tries to find a valid path to the target
- **Responsive** - Works with different screen sizes
- **Performance optimized** - Efficient collision checking algorithms

### Example Usage

```typescript
// Check if a position is blocked
const isBlocked = checkCollision(x, y, characterWidth, characterHeight, collisionAreas, screenWidth, screenHeight);

// Find a valid path to target
const validTarget = findValidPath(startX, startY, targetX, targetY, characterWidth, characterHeight, collisionAreas, screenWidth, screenHeight);
```

This system creates realistic movement constraints while maintaining smooth gameplay! 