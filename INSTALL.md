# Installation Guide - G.E.I. Agent

This guide covers all installation methods for the God's Eye View Enhanced (Virus Simulation + AGI AI).

## 🎯 Prerequisites

Before installing, ensure you have:

1. **Node.js 24.x or 26.x** 
   - Check: `node --version`
   - Install from: https://nodejs.org/
   
2. **npm or yarn** (comes with Node.js)

3. **Git** (for cloning the repository)
   - Check: `git --version`
   - Install from: git-scm.com

## 🚀 Installation Methods

### Method 1: Pinokio (Easiest - One Click)

Pinokio is a browser-based app installer for running AI and ML projects.

#### Step 1: Install Pinokio

1. Download Pinokio v8.2+ from: https://pinokio.computer/
2. Run the installer (Windows/macOS/Linux)
3. Launch Pinokio browser extension

#### Step 2: Install GEI Agent

1. In Pinokio, click **"Discover"** → **"Download from URL"**
2. Paste this URL: `https://github.com/[your-username]/gei-agent-virus-sim`
   - Or use the original if you forked it
3. Click **"Install"** and wait for it to complete
4. Once installed, click **"Start"**

That's it! Pinokio will automatically:
- Verify Node.js runtime
- Install all dependencies (locked via package.json)
- Find a free local port
- Open the app in your browser

#### Step 3: Access the App

Open your browser and navigate to the URL Pinokio shows (typically `http://localhost:4173` or similar).

### Method 2: Terminal Installation

Use this method if you prefer command-line installation.

#### Step 1: Clone the Repository

```bash
# Using git clone (if you have a GitHub link)
git clone https://github.com/[your-username]/gei-agent-virus-sim.git
cd gei-agent-virus-sim

# OR download zip from GitHub and extract in current directory
# Then rename folder to: gei-agent-virus-sim
```

#### Step 2: Install Dependencies

```bash
npm ci
```

This reads `package.json` and installs all locked dependencies.

#### Step 3: Check System Status

```bash
npm run doctor
```

This checks:
- Node/npm versions
- Required packages
- Available network routes for APIs
- Provider configuration status

Fix any issues reported before continuing.

#### Step 4: Start Development Server

```bash
npm run dev
```

The app will open automatically at `http://localhost:4173`. If not, manually navigate to it.

### Method 3: Using npx (No Installation)

Run directly from npm registry without cloning:

```bash
npx -y gei-agent-virus-sim@latest start
```

Or with a Git URL:

```bash
npx --yes git+https://github.com/[your-username]/gei-agent-virus-sim.git#install
npm run dev
```

## 🔑 Initial Configuration

### First Run Checklist

1. **Accept the first-run mission** (choose one):
   - "Live Contacts" - Start with aircraft tracking
   - "Space Missions" - Explore satellites and launches
   - "Environmental" - See earthquakes and weather
   - "Explore Manually" - Choose your own path

2. **Add optional API keys** (via POWER UP panel):
   - Cesium Ion (for 3D terrain)
   - OpenAI (for voice control)
   - Google Maps (for advanced geocoding)

### macOS Shortcut

On macOS, use the included script for a fresh start:

```bash
./scripts/dev-fresh.sh
```

This automatically:
- Clears Vite cache
- Pulls keys from Keychain (if configured)
- Starts the dev server fresh

## 🔧 Advanced Configuration

### Environment Variables

Create or edit `.env` at the repo root:

```env
# OpenAI API Key (for voice control - optional but recommended)
OPENAI_API_KEY=sk-your-openai-key-here

# Cesium Ion Token (for 3D terrain - optional)
CESIUM_ACCESS_TOKEN=eyJ...your-token...

# Google Maps Key (for place search - optional)
GOOGLE_MAPS_API_KEY=AIza...your-key...

# Rate limiting (protect against abuse when sharing)
GEV_RATELIMIT_OPENAI_PER_MIN=5
GEV_RATELIMIT_GOOGLE_PER_MIN=10

# Enable host binding for LAN access (default is localhost only)
# Uncomment the next line to enable:
HOST=0.0.0.0
```

### Provider Configuration

Keys are read from multiple sources in priority order:

1. **Pinokio**: `pinokio/ENVIRONMENT` (preferred, Git-ignored)
2. **Terminal**: `.env` file at repo root
3. **Environment variables**: Direct shell exports (`export OPENAI_API_KEY=...`)

On macOS, use the Keychain for secure storage:

```bash
# Store in Keychain (macOS only)
security add-generic-password \
  -s "GEI-Agent-OpenAI" \
  -a "your-openai-key-here"

# The dev-fresh.sh script will pull from Keychain automatically
./scripts/dev-fresh.sh
```

## 🐛 Troubleshooting

### Port Already in Use

If port 4173 is busy:

```bash
# Find what's using the port
lsof -i :4173          # macOS/Linux
netstat -ano | findstr :4173   # Windows

# Either kill the process or change the port:
export PORT=4174
npm run dev
```

### Dependencies Not Found

Run:

```bash
rm -rf node_modules package-lock.json
npm ci
npm run doctor
```

### Cesium Globe Not Showing 3D

You need a **Cesium Ion token**. Add it via the app's POWER UP panel or in `.env`:

```env
CESIUM_ACCESS_TOKEN=your-token-here
```

Get one at: https://cesium.com/ion (Community/Personal use is free)

### Voice Control Not Working

Ensure you have an **OpenAI API key**:

```env
OPENAI_API_KEY=sk-your-key-here
```

Or add it in the app via POWER UP → Provider Settings.

### Google Places Search Fails

Google Maps keys need billing enabled and URL restriction:

1. Create key at: https://console.cloud.google.com/
2. Enable billing on your Google Cloud project
3. Restrict key to your domain or localhost only
4. Add to `.env` as `GOOGLE_MAPS_API_KEY=...`

## 📦 What Gets Installed

```
gei-agent-virus-sim/
├── node_modules/           # All dependencies (~500MB)
├── src/                    # Application source
│   ├── App.jsx            # Main component (with virus sim + AGI AI)
│   ├── styles/            # CSS files
│   └── data/              # Layer implementations
├── dist/                   # Production build (generated)
└── package.json           # Dependencies and scripts
```

## 🔄 Updating the Project

### After Forking

If you forked the repository:

1. Set upstream remote:
   ```bash
   git remote add upstream https://github.com/bilawalsidhu/gods-eye-view.git
   ```

2. Pull latest updates:
   ```bash
   git pull origin main
   git pull upstream main
   npm ci
   ```

### Updating Dependencies

```bash
npm update
npm run doctor
npm run dev
```

## 🎓 Next Steps After Installation

1. **Explore the interface**: Try all GEV layers (aircraft, ships, satellites)
2. **Test voice control**: Say "Take me to Tokyo" (requires OpenAI key)
3. **Check virus simulation**: Switch tabs to see the cyber network spread
4. **Add AGI AI**: Toggle the neural network monitoring panel
5. **Customize**: See `src/` directory to understand and extend features

## 📞 Need Help?

- Check [README.md](./README.md) for feature overview
- Review [CONTRIBUTING.md](./CONTRIBUTING.md) to understand code structure  
- Read [SECURITY.md](./SECURITY.md) before sharing on LAN
- View [DATA_SOURCES.md](./DATA_SOURCES.md) for data documentation

---

**Happy exploring! 🌐 G.E.I. Agent - No place left behind.**
