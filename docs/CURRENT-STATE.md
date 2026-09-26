# Current State - Runtime Reference

This document provides the authoritative runtime reference for G.E.I. Agent (God's Eye View Enhanced).

## 📊 System Status

### Layers Available

| Layer | Status | Key Required | Description |
|-------|--------|--------------|-------------|
| **Map Stack** | ✅ Active | Optional | Esri satellite / Google 3D / OSM basemaps |
| **Live Flights** | ✅ Active | Free | 11,000+ aircraft via OpenSky |
| **Military Traffic** | ✅ Active | Free | ADS-B military flights |
| **Live Vessels** | ✅ Active | Free | Thousands of ships via AISStream |
| **Satellites** | ✅ Active | Free | 838-object TLE catalog (CelesTrak) |
| **Earthquakes** | ✅ Active | Free | USGS seismic events (24h) |
| **Traffic** | ✅ Active | Free | Simulated vehicles on OSM roads |
| **CCTV Mesh** | ✅ Active | Free | ~3,600 public camera projections |
| **Radio** | ✅ Active | Free | 750+ geolocated radio stations |
| **Transit** | ✅ Active | Free | Live buses/trains/metros (selected cities) |
| **Bikeshare** | ✅ Active | Free | GBFS station availability feeds |
| **Active Fires** | ✅ Active | Free | NASA FIRMS detections |
| **Space Missions** | ✅ Active | Free | Last 30-day launches |
| **Datacenters** | ✅ Active | Free | 4,351 global locations |
| **Dams** | ✅ Active | Free | 704 major dams (incl. Three Gorges) |
| **Submarine Cables** | ✅ Active | Free | 712 undersea routes |

### Virus Simulation Layer

| Feature | Status | Description |
|---------|--------|-------------|
| Network Topology | ✅ Active | 200-node dynamic cyber network |
| Virus Strains | ✅ Active | 4 active strains (cyber-phage, data-worm, logic-bomb, trojan-fox) |
| Infection Spread | ✅ Active | Distance-decay propagation model |
| Visual Effects | ✅ Active | Pulsing nodes, connection highlighting, threat indicators |

### AGI AI Systems

| Feature | Status | Description |
|---------|--------|-------------|
| Neural Monitoring | ✅ Active | Procedural neural network visualization |
| Threat Detection | ✅ Active | Pattern recognition simulation |
| Countermeasures | ✅ Active | Scan & contain operations |
| Defense Field | ✅ Active | Visual pulse effects and scanlines |

## 🔧 Runtime Architecture

### Core Components

```
src/
├── main.js                 # Bootstrap: Google 3D tiles, layer registration
├── ui.js                   # Runtime UI — panels, HUD, styles, control facade
├── hud.js                  # Intelligence HUD + AI scene summary
├── keySetup.js             # POWER UP panel — provider keys management
├── mapStackController.js   # Basemap switching — Google 3D / Esri / OSM
├── voice/                  # OpenAI Realtime session + 29 voice tools
│   ├── navigation.js       # Fly to, orbit, draw routes
│   ├── annotate.js         # Voice whiteboard (polygons, connectors)
│   ├── interrogate.js      # Analyst queries against layers
│   └── operate.js          # Hands-free console control
├── layers/                 # Layer components — weather, wind, cyclones, transit, ALPR
├── data/                   # One module per layer + orchestration
│   ├── iconOrientation.js  # Screen-projected headings + horizon culling
│   └── virusSimulation/    # Virus spread network logic
│       ├── network.js      # Node/connection management
│       ├── infection.js    # Spread propagation model
│       └── strains/        # Per-strain configuration
│           ├── cyber-phage.json
│           ├── data-worm.json
│           ├── logic-bomb.json
│           └── trojan-fox.json
├── scenes/                 # Cinematic scene director
└── styles/                 # Visual/optic modes
    ├── visual/             # Normal, NVG, FLIR, CRT, etc.
    └── agi-effects/        # Neural network, glitch, scanline effects
```

### Data Flow

1. **Layer Registration** → `main.js` registers all modules with Cesium scene
2. **Data Fetching** → Each layer polls its API at configured intervals
3. **Interpolation** → Dead reckoning fills gaps between updates (15-30s)
4. **Rendering** → CesiumJS renders 3D globe; React overlays UI
5. **Voice Processing** → OpenAI Realtime API handles voice commands
6. **Virus Simulation** → XState finite state machine manages infection spread
7. **AGI Effects** → Canvas/WebGL for neural network visualizations

## 📈 Performance Targets

### Frame Rate
- Target: 60 FPS on modern hardware
- Simulated traffic: GPU-accelerated (WebGL)
- Live data: CPU interpolation between API updates

### Memory Usage
- Idle (no keys): ~150 MB RAM
- With Cesium Ion + full layers: ~300 MB RAM
- Voice active (+LLM context): additional ~50 MB

### Network Usage
- OpenSky: ~2 MB/min (aircraft telemetry)
- AISStream: ~1 MB/min (ship positions)
- Weather/Earthquake: ~500 KB/min
- Google 3D tiles: ~10 MB/hour (streamed on demand)

## 🆚 Provider Comparison

| Feature | Free Tier | Paid Upgrade |
|---------|-----------|--------------|
| Cesium Ion 3D | ✅ Community tier | ❌ Commercial billing |
| OpenAI Voice | ⚠️ Metered (~$5 cap) | ✅ Higher quota, faster models |
| Google Maps 3D | ⚠️ 1000 sessions/mo free | ✅ Unlimited with enterprise plan |
| AISStream | ✅ Free signup | ❌ Commercial licenses required |
| OpenSky Basic | ✅ Anonymous access | ✅ OAuth for higher rates |

## 🔄 Update History

### Version 1.9.13 (Current)
- Added: Virus spread simulation layer
- Added: AGI AI defense systems
- Enhanced: Voice command recognition accuracy
- Fixed: Satellite orbit drift corrections
- Changed: Updated to Cesium Ion v109 API

### Version 1.8.x (Previous)
- Initial open-source release
- Core GEV features from private beta
- YouTube demo foundation

## 📝 Runtime Notes

### Known Behaviors

1. **Live data latency**: All feeds are 15-30s behind real-time; this is by design
2. **Caching**: TLEs and bundled datasets use disk caching to reduce requests
3. **Fallback behavior**: If Esri is unreachable, OSM basemap auto-switches
4. **Voice context window**: Deliberately short (~120 tokens) for cost control

### Data Quality Warnings

The app labels:
- **"LIVE"**: Real telemetry (aircraft, ships, satellites)
- **"SIMULATED"**: Aggregate traffic on roads
- **"ESTIMATE"**: Modeled views where live feed unavailable
- **"RECONSTRUCTED"**: Historical launch replays (not real-time)

### Attribution Requirements

Always display provider attribution when possible:
- Cesium Ion logo visible in 3D mode
- NOAA/USGS data properly attributed
- City CCTV feeds show source municipality credits

---

**For the full feature list and installation instructions, see [README.md](./README.md).**
