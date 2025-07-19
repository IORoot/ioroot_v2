# Andy Pearson Portfolio Website

A modern, high-performance personal portfolio website built with SvelteKit, Tailwind CSS, and TypeScript.

## 🚀 Features

- **Multi-theme Design**: Each section has its own unique theme
  - 🏠 Homepage: Modernism/Grid Theme
  - 👤 About: Professional Theme  
  - 💻 Projects: Coding/AI Theme
  - 🌐 Websites: 8-Bit Game Theme
  - 📝 Articles: 80s Retro Theme

- **Performance Optimized**: Built for high Lighthouse scores
- **SEO Friendly**: Proper meta tags and structured content
- **Responsive Design**: Mobile-first approach
- **Dark Mode Support**: Automatic theme switching
- **Markdown Support**: Articles and content in MDX format

## 🛠️ Quick Start

1. **Install dependencies:**
   ```bash
   # Option 1: Using the Node.js script
   node install.js
   
   # Option 2: Using npm directly
   npm install
   
   # Option 3: Using the shell script
   chmod +x install-deps.sh
   ./install-deps.sh
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── lib/
│   └── components/          # Reusable components
├── routes/
│   ├── +layout.svelte      # Root layout
│   ├── +page.svelte        # Homepage
│   ├── about/
│   ├── projects/
│   ├── websites/
│   └── articles/
├── content/
│   ├── articles/           # MDX article files
│   └── websites/           # MDX website files
├── app.css                 # Global styles
└── app.html               # HTML template
```

## 🎨 Themes

Each section uses a different color palette:

- **Modern**: Clean, grid-based design for homepage
- **Professional**: Blue tones for about page
- **Tech**: Purple/neon colors for projects
- **Game**: Yellow/orange 8-bit aesthetic for websites
- **Retro**: Pink/purple 80s vibe for articles

## 📝 Content Management

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

## 🚀 Deployment

The site is configured for static site generation and can be deployed to:

- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: `npm run build`
- Any static hosting service

## 📊 Performance Goals

- Lighthouse Performance: 95+
- Lighthouse SEO: 95+
- Lighthouse Accessibility: 95+
- Lighthouse Best Practices: 95+

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check types
npm run check

# Lint code
npm run lint

# Format code
npm run format
```

## 🎯 Technologies Used

- **SvelteKit**: Full-stack framework
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type safety
- **MDsveX**: Markdown support
- **Vite**: Build tool
- **PostCSS**: CSS processing

## 📚 Documentation

See the [docs/](./docs/) folder for detailed documentation about:
- Project structure
- Content management
- Deployment
- Customization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE). 