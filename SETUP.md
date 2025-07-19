# Setup Guide for Andy Pearson Portfolio Website

## Prerequisites

Make sure you have Node.js and npm installed:
```bash
node --version
npm --version
```

## Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **If you encounter issues with MDsveX, install it separately:**
   ```bash
   npm install mdsvex@^0.10.6
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## Troubleshooting

### If npm install fails:
- Make sure you have Node.js 16+ installed
- Try clearing npm cache: `npm cache clean --force`
- Try using yarn instead: `yarn install`

### If MDsveX causes issues:
The website will work without MDsveX. You can add it later for markdown support.

### If SvelteKit modules are not found:
This is normal before running `npm install`. The modules will be available after installation.

## Project Structure

The website includes:

- **Homepage** (`/`) - Modernism/Grid theme
- **About** (`/about`) - Professional theme with skills and experience
- **Projects** (`/projects`) - Coding/AI theme with project categories
- **Websites** (`/websites`) - 8-bit game theme showcasing websites
- **Articles** (`/articles`) - 80s retro theme for blog posts

## Customization

1. **Update content** in the respective page files
2. **Add your projects** to `src/routes/projects/+page.svelte`
3. **Add your websites** to `src/routes/websites/+page.svelte`
4. **Create articles** in `src/content/articles/` (when MDsveX is working)
5. **Update About page** with your actual information

## Deployment

Once everything is working locally:

```bash
npm run build
```

The built files will be in the `.svelte-kit/output/` directory, ready for deployment to any static hosting service.

## Performance

The website is optimized for:
- High Lighthouse scores
- Fast loading times
- SEO best practices
- Mobile responsiveness 