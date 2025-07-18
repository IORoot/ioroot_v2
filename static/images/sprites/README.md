# Sprites Directory

## Character Animation Sprites

### character-sprite.png
This is your main character sprite sheet for walking animations.

**Requirements:**
- **Format**: PNG with transparency
- **Frame Size**: 960x960 pixels per frame
- **Layout**: Horizontal sprite sheet (all frames in one row)
- **Total Width**: 7680px (8 frames × 960px)
- **Total Height**: 960px

**Frame Layout:**
```
[Frame 0][Frame 1][Frame 2][Frame 3][Frame 4][Frame 5][Frame 6][Frame 7]
```

**Animation Types:**
- **Idle Animation**: Frames 0-0 (1 frame, static pose)
- **Walking Animation**: Frames 0-7 (8 frames, 12 FPS)
- **Direction**: Character automatically flips horizontally for left/right movement

**Example Frame Structure:**
```
Frame 0: Standing pose
Frame 1: Slight movement
Frame 2: Mid-step
Frame 3: Full step
Frame 4: Return to standing
Frame 5: Opposite movement
Frame 6: Mid-step opposite
Frame 7: Full step opposite
```

## Other Sprites

Place your other sprite images in this directory:

- `character.png` - Static character sprite (fallback)
- `computer.png` - Computer object sprite
- `bookshelf.png` - Bookshelf object sprite
- `window.png` - Window object sprite
- `project.png` - Project object sprite
- `website.png` - Website object sprite
- `article.png` - Article object sprite
- `link.png` - Link object sprite

## Creating Your Character Sprite Sheet

1. **Design your character** in 960x960 pixel frames
2. **Create walking animation** with 8 frames showing the walk cycle
3. **Arrange horizontally** in a single row
4. **Export as PNG** with transparency
5. **Name it** `character-sprite.png`
6. **Place in this directory**

The animation system will automatically:
- Play idle animation when stationary
- Play walking animation when moving
- Flip the sprite for left/right movement
- Handle different frame rates for different animations 