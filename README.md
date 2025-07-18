# Adventure Game Website

A side-scrolling point-and-click adventure game website built with SvelteKit, TailwindCSS, and TypeScript. The website features you as the main character navigating through different "rooms" that represent different sections of your portfolio.

## Features

- **Point-and-Click Navigation**: Click anywhere in the scene to move your character
- **Interactive Objects**: Click on objects to navigate to different pages or open links
- **SCUMM-style Menu**: Classic LucasArts-style menu system at the bottom
- **Smooth Animations**: Character movement with easing functions
- **Responsive Design**: Works on different screen sizes
- **Sprite System**: Easy to add and manage different sprites and graphics

## Project Structure

```
src/
├── lib/
│   ├── types.ts          # TypeScript type definitions
│   ├── stores.ts         # Svelte stores for game state
│   └── spriteManager.ts  # Sprite management system
├── routes/
│   ├── +layout.svelte    # Main layout
│   ├── +page.svelte      # Home page (main game scene)
│   ├── projects/         # Projects page
│   ├── websites/         # Websites page
│   ├── articles/         # Articles page
│   └── about/            # About page
└── app.css              # Main styles with TailwindCSS
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## Adding Your Artwork

### Sprites
Place your sprite images in the `static/images/sprites/` directory:
- `character.png` - Your character sprite (64x64px recommended)
- `computer.png` - Computer object sprite
- `bookshelf.png` - Bookshelf object sprite
- `window.png` - Window object sprite
- `project.png` - Project object sprite
- `website.png` - Website object sprite
- `article.png` - Article object sprite
- `link.png` - Link object sprite

### Backgrounds
Place your background images in the `static/images/backgrounds/` directory:
- `home-bg.png` - Home office background
- `projects-bg.png` - Projects room background
- `websites-bg.png` - Websites gallery background
- `articles-bg.jpg` - Articles library background
- `about-bg.jpg` - About page background

### Customizing Sprites

1. **Add new sprites**: Edit `src/lib/spriteManager.ts` and add your sprite configuration:

```typescript
{
  id: 'my-sprite',
  url: '/images/sprites/my-sprite.png',
  width: 100,
  height: 80,
  animationFrames: 4 // Optional for animated sprites
}
```

2. **Register the sprite**: Call `registerSprite()` with your sprite configuration.

### Customizing Scenes

1. **Add interactive objects**: Edit the `interactiveObjects` array in each page:

```typescript
{
  id: 'my-object',
  x: 300,
  y: 150,
  width: 100,
  height: 80,
  label: 'My Object',
  action: () => window.open('https://example.com', '_blank')
}
```

2. **Change backgrounds**: Update the background style in each page's game scene.

## Game Mechanics

### Character Movement
- Click anywhere in the scene to move your character
- Character movement is animated with easing functions
- Movement is blocked while animations are running

### Interactive Objects
- Objects have defined click areas (x, y, width, height)
- Clicking an object triggers its action (navigation, opening links, etc.)
- Objects are highlighted on hover

### SCUMM Menu
- Fixed menu bar at the bottom
- Navigation between different pages
- Inventory system (expandable)
- Classic adventure game styling

## Customization

### Colors and Styling
Edit `src/app.css` to customize:
- Game container styling
- Character appearance
- SCUMM menu colors
- Interactive object styling

### Animation Speed
Adjust the `animationSpeed` in `src/lib/stores.ts` to change character movement speed.

### Scene Layout
Modify the `interactiveObjects` arrays in each page to change object positions and actions.

## Technologies Used

- **SvelteKit**: Full-stack web framework
- **TailwindCSS**: Utility-first CSS framework
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type check
- `npm run lint` - Lint code

### Adding New Pages

1. Create a new directory in `src/routes/`
2. Add a `+page.svelte` file
3. Follow the pattern from existing pages
4. Add navigation to the SCUMM menu

## Deployment

Build the project for production:

```bash
npm run build
```

The built files will be in the `build/` directory, ready for deployment to any static hosting service.

## License

MIT License - feel free to use this project as a starting point for your own adventure game website! 