# Octo - GitHub Mobile Client

A beautiful, modern GitHub mobile client built with React Native and Expo, inspired by GitNex and styled like PixelPlayer.

## Features

- 🎨 Beautiful dark theme UI following PixelPlayer's design principles
- 📱 Native mobile experience with Expo
- 🔐 GitHub authentication via Personal Access Token
- 📂 Browse repositories, stars, and recent activity
- 🔍 Search repositories
- 👤 View user profile and statistics
- 🎯 Uses Geist fonts (Sans & Mono) for typography
- 🎨 Lucide icons as primary icon set
- 🔧 Octicons for Git-specific semantics

## Tech Stack

- **Expo** - Managed React Native framework
- **React Native** - Mobile app framework
- **TypeScript** - Type safety
- **Expo Router** - File-based routing
- **React Query** - Data fetching and caching
- **Lucide React Native** - Primary icon library
- **Primer Octicons** - Git-specific icons
- **Geist Fonts** - Typography (Sans & Mono)
- **pnpm** - Package manager

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- Expo CLI (optional, can use `npx expo`)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Octo
```

2. Install dependencies:
```bash
pnpm install
```


3. Create placeholder assets:
   - Create `assets/icon.png` (1024x1024)
   - Create `assets/splash.png` (1284x2778)
   - Create `assets/adaptive-icon.png` (1024x1024)
   - Create `assets/favicon.png` (48x48)

4. Start the development server:
```bash
pnpm start
```

### GitHub Authentication

To use the app, you'll need a GitHub Personal Access Token:

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name (e.g., "Octo Mobile")
4. Select scopes: `repo`, `read:user`, `user:email`
5. Generate and copy the token
6. Use it in the app's sign-in screen

## Project Structure

```
Octo/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home screen
│   │   ├── explore.tsx    # Search/Explore
│   │   ├── notifications.tsx
│   │   └── profile.tsx
│   ├── auth.tsx           # Authentication screen
│   └── _layout.tsx        # Root layout
├── contexts/              # React contexts
│   └── AuthContext.tsx    # Authentication state
├── services/              # API services
│   └── github.ts          # GitHub API client
├── assets/                # Static assets
│   └── fonts/             # Geist font files
└── package.json
```

## Design Philosophy

The app follows PixelPlayer's design principles:
- Dark theme with GitHub-inspired colors (#0d1117 background)
- Clean, minimal UI with proper spacing
- Consistent typography using Geist fonts
- Smooth animations and transitions
- Accessible color contrasts

## Development

### Running on iOS Simulator
```bash
pnpm ios
```

### Running on Android Emulator
```bash
pnpm android
```

### Running on Web
```bash
pnpm web
```

## License

ISC

## Credits

- Inspired by [GitNex](https://codeberg.org/gitnex/GitNex)
- Styled following [PixelPlayer](https://github.com/theovilardo/PixelPlayer)
- Icons from [Lucide](https://lucide.dev) and [Octicons](https://primer.style/octicons/)
- Fonts from [Geist](https://github.com/vercel/geist-font)
