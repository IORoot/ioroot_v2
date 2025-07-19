# GitHub Integration System

This portfolio website automatically monitors your GitHub repositories and uses their README files as project content.

## How It Works

### 1. **Automatic Repository Fetching**
- Fetches all repositories from your GitHub account (`@IORoot`)
- Retrieves README content from each repository
- Categorizes projects based on keywords and topics
- Extracts tags from repository metadata and content

### 2. **Smart Categorization**
Projects are automatically categorized into:
- **WordPress Development** 🔧 - WordPress plugins, themes, PHP
- **Web Development** 🌐 - JavaScript, React, Vue, HTML/CSS
- **DevOps & Infrastructure** ⚙️ - Terraform, Puppet, Azure, SRE
- **AI & Machine Learning** 🤖 - AI, ML, neural networks
- **Video & Media** 🎬 - Video processing, YouTube, FFmpeg
- **Tools & Utilities** 🛠️ - Scripts, automation, utilities
- **Community & Documentation** 📚 - Docs, wikis, community projects

### 3. **Content Features**
Each project displays:
- **Repository name** and description
- **Last updated date** (formatted as "Updated X days ago")
- **Tags** extracted from language, topics, and content
- **Category** with appropriate icon
- **Star and fork counts**
- **Links** to GitHub and live demo (if available)
- **Full README content** on individual project pages

### 4. **Performance Optimization**
- **Caching**: GitHub data is cached for 5 minutes
- **Lazy loading**: README content is fetched on-demand
- **Error handling**: Graceful fallbacks for missing READMEs

## API Endpoints

### `/api/github-webhook`
Webhook endpoint for automatic updates when repositories change.

**Setup:**
1. Go to your GitHub repository settings
2. Add webhook URL: `https://yourdomain.com/api/github-webhook`
3. Select events: `push`, `create`, `delete`
4. Add webhook secret (optional but recommended)

## Configuration

### GitHub Username
Update the username in `src/lib/github.ts`:
```typescript
export async function fetchGitHubRepos(username: string = 'IORoot'): Promise<GitHubRepo[]>
```

### Categories
Modify `PROJECT_CATEGORIES` in `src/lib/github.ts` to add/remove categories:
```typescript
export const PROJECT_CATEGORIES: ProjectCategory[] = [
  {
    name: 'Your Category',
    icon: '🎯',
    keywords: ['keyword1', 'keyword2']
  }
];
```

### Cache Duration
Adjust cache TTL in `src/lib/cache.ts`:
```typescript
set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void
```

## File Structure

```
src/
├── lib/
│   ├── github.ts          # GitHub API integration
│   └── cache.ts           # Caching system
├── routes/
│   ├── projects/
│   │   ├── +page.svelte   # Projects listing
│   │   ├── +page.server.ts # Server-side data loading
│   │   └── [slug]/
│   │       ├── +page.svelte   # Individual project page
│   │       └── +page.server.ts # Project data loading
│   └── api/
│       └── github-webhook/
│           └── +server.ts  # Webhook endpoint
```

## Features

### Automatic Updates
- New repositories appear automatically
- Updated READMEs are reflected immediately
- Repository deletions are handled gracefully

### Smart Tagging
- Extracts tags from repository topics
- Identifies technologies from README content
- Limits tags to prevent clutter

### Responsive Design
- Mobile-friendly project cards
- Optimized for all screen sizes
- Fast loading with caching

### SEO Optimized
- Individual project pages with full README content
- Proper meta tags and descriptions
- Structured data for search engines

## Troubleshooting

### Rate Limiting
GitHub API has rate limits. The system includes:
- Caching to reduce API calls
- Error handling for rate limit responses
- Graceful degradation

### Missing READMEs
- Projects without READMEs still display
- Shows basic repository information
- Links to GitHub for full details

### Webhook Issues
- Check webhook URL is accessible
- Verify webhook secret if configured
- Monitor webhook delivery logs

## Future Enhancements

- **GitHub Actions Integration**: Auto-deploy on repository updates
- **Advanced Caching**: Redis or database storage
- **Analytics**: Track project views and engagement
- **Search**: Full-text search across all projects
- **Filtering**: Filter by category, language, or tags 