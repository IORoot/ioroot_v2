# Andy Pearson Portfolio Website

A modern, high-performance personal portfolio website built with SvelteKit, Tailwind CSS, and TypeScript.

## Features

- **Multi-theme Design**: Each section has its own theme
  - Homepage: Modernism/Grid Theme
  - About: Professional Theme
  - Projects: Coding/AI Theme
  - Websites: 8-Bit Game Theme
  - Articles: 80s Retro Theme

- **Performance Optimized**: Built for high Lighthouse scores
- **SEO Friendly**: Proper meta tags and structured content
- **Responsive Design**: Mobile-first approach
- **Dark Mode Support**: Automatic theme switching
- **Markdown Support**: Articles and content in MDX format

## Project Structure

```
src/
├── lib/
│   └── components/          # Reusable components
├── routes/
│   ├── +layout.svelte      # Root layout
│   ├── +page.svelte        # Homepage
│   ├── about/
│   │   └── +page.svelte    # About page
│   ├── projects/
│   │   ├── +page.svelte    # Projects listing
│   │   └── [slug]/
│   │       └── +page.svelte # Individual project
│   ├── websites/
│   │   ├── +page.svelte    # Websites listing
│   │   └── [slug]/
│   │       └── +page.svelte # Individual website
│   └── articles/
│       ├── +page.svelte    # Articles listing
│       └── [slug]/
│           └── +page.svelte # Individual article
├── app.css                 # Global styles
└── app.html               # HTML template
```

## Content Management

### Articles
- Stored as `.mdx` files in `src/content/articles/`
- Frontmatter for metadata (title, date, description, tags)
- Automatic chronological listing

### Websites
- Stored as `.mdx` files in `src/content/websites/`
- Include external links, images, and summaries
- Grid layout with 8-bit game theme

### Projects
- GitHub README integration
- Organized by categories
- Coding/AI theme with modern tech aesthetics

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Performance Goals

- Lighthouse Performance: 95+
- Lighthouse SEO: 95+
- Lighthouse Accessibility: 95+
- Lighthouse Best Practices: 95+

## Technologies Used

- **SvelteKit**: Full-stack framework
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type safety
- **MDsveX**: Markdown support
- **Vite**: Build tool
- **PostCSS**: CSS processing

## Deployment

The site is configured for static site generation and can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## Customization

### Themes
Each section uses a different color palette defined in `tailwind.config.js`:
- `modern`: Homepage colors
- `professional`: About page colors
- `tech`: Projects page colors
- `game`: Websites page colors
- `retro`: Articles page colors

### Content
Add new content by creating `.mdx` files in the appropriate content directories. The site will automatically generate pages for each file. 