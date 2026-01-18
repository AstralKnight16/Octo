# Setup Instructions

## Quick Start

1. **Install dependencies:**
   ```bash
   pnpm install
   ```


3. **Create placeholder assets:**
   
   Create these files in the `assets/` directory:
   - `icon.png` (1024x1024) - App icon
   - `splash.png` (1284x2778) - Splash screen
   - `adaptive-icon.png` (1024x1024) - Android adaptive icon
   - `favicon.png` (48x48) - Web favicon

4. **Start the app:**
   ```bash
   pnpm start
   ```

## GitHub Personal Access Token

To use the app, you'll need a GitHub Personal Access Token:

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name it (e.g., "Octo Mobile")
4. Select scopes:
   - `repo` (Full control of private repositories)
   - `read:user` (Read user profile data)
   - `user:email` (Access user email addresses)
5. Click "Generate token"
6. Copy the token (starts with `ghp_`)
7. Use it in the app's authentication screen

## Development

- **iOS Simulator:** `pnpm ios`
- **Android Emulator:** `pnpm android`
- **Web:** `pnpm web`

## Troubleshooting

### TypeScript errors
- Run `pnpm install` to ensure all dependencies are installed
- Make sure you're using Node.js 18+

### Authentication issues
- Verify your token has the correct scopes
- Check that the token hasn't expired
- Generate a new token if needed
