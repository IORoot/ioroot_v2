# Backgrounds Directory

This directory contains background and foreground images for all pages in the adventure game website.

## Image Requirements

### Background Images
- **Format**: PNG or JPG
- **Aspect Ratio**: 16:9 or 4:3 recommended
- **Resolution**: Minimum 1920x1080, higher for better quality
- **File Naming**: `{page-name}-bg.png`

### Foreground Images
- **Format**: PNG with transparency
- **Aspect Ratio**: Same as background images
- **Resolution**: Same as background images
- **File Naming**: `{page-name}-fg.png`
- **Purpose**: Overlay elements that appear in front of the character

## Required Images

### Home Page (`/`)
- `home-bg.png` - Background image
- `home-fg.png` - Foreground overlay

### Projects Page (`/projects`)
- `projects-bg.png` - Background image
- `projects-fg.png` - Foreground overlay

### Websites Page (`/websites`)
- `websites-bg.png` - Background image
- `websites-fg.png` - Foreground overlay

### Articles Page (`/articles`)
- `articles-bg.png` - Background image
- `articles-fg.png` - Foreground overlay

### About Page (`/about`)
- `about-bg.png` - Background image
- `about-fg.png` - Foreground overlay

## Image Layering

The images are layered in this order (from back to front):
1. **Background Layer** - Main scene background
2. **Interactive Objects** - Clickable elements
3. **Animated Character** - Player character
4. **Foreground Layer** - Overlay elements (trees, buildings, etc.)

## Creating Foreground Images

Foreground images should contain elements that:
- Appear in front of the character
- Add depth and atmosphere to the scene
- Are transparent where the character should be visible
- Include elements like trees, buildings, furniture, or decorative objects

### Tips for Foreground Images:
- Use PNG format with transparency
- Keep important interactive areas clear
- Ensure the character can still be seen clearly
- Test with different character positions
- Consider responsive sizing (images scale with screen size)

## Responsive Behavior

All images automatically scale to fit the screen while maintaining aspect ratio:
- **Desktop**: Full resolution
- **Tablet**: Scaled down proportionally
- **Mobile**: Further scaled for smaller screens

The foreground layer has `pointer-events: none` so it doesn't interfere with clicking on interactive objects or character movement. 