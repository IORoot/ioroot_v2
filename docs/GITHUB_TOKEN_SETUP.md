# GitHub API Token Setup

To avoid rate limiting and get better access to GitHub API, you can provide a Personal Access Token.

## Step 1: Create GitHub Personal Access Token

1. Go to [GitHub.com](https://github.com)
2. Click your profile picture → Settings
3. Scroll down to "Developer settings" (bottom left)
4. Click "Personal access tokens" → "Tokens (classic)"
5. Click "Generate new token (classic)"
6. Give it a name like "IORoot Portfolio"
7. Select these scopes:
   - `public_repo` (to read public repositories)
   - `read:user` (to read user information)
8. Click "Generate token"
9. **Copy the token immediately** (you won't see it again!)

## Step 2: Add Token to Environment

Create a `.env` file in your project root:

```bash
# Create .env file
touch .env
```

Add your token to the `.env` file:

```env
VITE_GITHUB_TOKEN=your_github_token_here
GITHUB_USERNAME=IORoot
```

## Step 3: Restart Server

After adding the token, restart your development server:

```bash
npm run dev
```

## Benefits

With a token, you get:
- **5,000 requests per hour** (vs 60 without token)
- **No rate limiting** for normal usage
- **Better API access** and reliability

## Security Notes

- Never commit your `.env` file to git
- The `.env` file is already in `.gitignore`
- Keep your token secure and don't share it
- You can revoke tokens in GitHub settings if needed

## Troubleshooting

If you still get rate limited:
1. Check that the token is correct
2. Verify the token has the right permissions
3. Make sure the `.env` file is in the project root
4. Restart the development server after adding the token 