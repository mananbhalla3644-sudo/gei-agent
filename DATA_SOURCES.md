# Data Sources for G.E.I. Agent

This document lists all data sources used by G.E.I. Agent, their purposes, access requirements, and license/terms information.

## 🛰️ Satellite & Aerial Layers

### Cesium Ion (3D Tiles)
- **Purpose**: Photorealistic 3D terrain, world elevation data, Google 3D city models
- **Access**: Free token at https://cesium.com/ion (Community/Personal use eligible)
- **Terms**: Check current [pricing](https://cesium.com/platform/cesium-ion/pricing/) - metered billing for commercial use

### Esri World Imagery
- **Purpose**: Basemap satellite imagery (2D fallback)
- **Access**: Free, no key required
- **License**: Esri Terms of Use

### OpenStreetMap (OSM)
- **Purpose**: Vector map data, road networks, building footprints
- **Access**: Free via Overpass API or TileServer
- **License**: ODbL (Open Database License)

## ✈️ Movement Layers

### OpenSky Network
- **Purpose**: Live aircraft tracking (position, altitude, speed, heading)
- **Access**: Free anonymous access; OAuth for higher rates
- **Website**: https://opensky-network.org

### ADS-B Exchange (adsb.lol)
- **Purpose**: Military flight tracking, supplementary civilian data
- **Access**: Free via API
- **Website**: https://www.adsb.lol/

### AISStream
- **Purpose**: Live ship/vessel AIS positions and identifiers
- **Access**: Free signup required
- **Website**: https://aisstream.io

### CelesTrak TLE Database
- **Purpose**: Satellite Two-Line Element data for orbital propagation (SGP4)
- **Access**: Public domain
- **Website**: https://celestrak.org/NORAD/elements/

## 🌍 Environmental Layers

### USGS Earthquake Feed
- **Purpose**: Global seismic activity (last 24h)
- **Access**: Free, no key required
- **Source**: United States Geological Survey
- **Website**: https://earthquake.usgs.gov/fdsnws/event/1/query

### NOAA GFS/ECMWF Weather
- **Purpose**: Wind forecasts, temperature, pressure fields
- **Access**: Free via WMO Buoy API or NCEI
- **Website**: https://www.noaa.gov

### NOAA nowCOAST (Observed Weather)
- **Purpose**: Rain radar (contiguous US), satellite clouds, lightning density
- **Access**: Free public access
- **Website**: https://nowcoast.noaa.gov

### NASA FIRMS
- **Purpose**: Active fire detections (MODIS, VIIRS sensors)
- **Access**: Free API key recommended for higher limits
- **Website**: https://firms.modaps.eosdis.nasa.gov

## 📹 Camera Layers

### City CCTV Feeds
- **Austin TX**: TxDOT traffic cameras
- **California**: Caltrans camera network
- **London**: TfL transport cameras
- **Finland**: Fintraffic road cameras
- **Ontario**: 511 Ontario system
- **Estonia**: Tallinn/Tarktee smart city cameras
- **Delaware**: DelDOT live video
- **Access**: Free public APIs (varies by city)

### Mapped ALPR Cameras
- **Purpose**: License plate reader locations (metadata only, no plates)
- **Source**: OpenStreetMap contributions (DeFlock mapping project)
- **License**: ODbL

## 📻 Radio & Communication Layers

### Radio Browser API
- **Purpose**: Geolocated radio station database with streaming URLs
- **Access**: Free public API
- **Website**: https://radio-browser.info/

## 🚌 Transit & Mobility Layers

### GTFS-Realtime Feeds
- **Purpose**: Live bus, tram, metro, train, ferry positions
- **Cities**: Boston, Austin, Minneapolis, Helsinki, Netherlands, Norway, SE Queensland
- **Access**: Free operator feeds (no central API)
- **License**: Varies by transit agency

### GBFS Bike Share Feeds
- **Purpose**: Live bicycle share station availability and dock counts
- **Access**: Free via CitiBike API examples
- **Website**: https://gbfs.citybikings.org/

## 🗺️ Routing & Directions

### OSRM (OpenSource Routing Machine)
- **Purpose**: Turn-by-turn street routing on OSM data
- **Host**: FOSSGIS servers
- **Access**: Free public API
- **Website**: https://router.project-osrm.org/

## 🚀 Space Mission Data

### Launch Library 2
- **Purpose**: Past and future rocket launches with payload details
- **Access**: Free public API
- **Website**: https://thespacedevs.com

## 🔥 Event Layers

### Submarine Cable Maps
- **Source**: Community-maintained database (Global submarine cable map)
- **Purpose**: Major undersea fiber optic routes
- **License**: CC BY-SA 4.0

### Data Center Locations
- **Source**: Community mapping and commercial data
- **Count**: ~4,351 global locations
- **Note**: Some data may be proprietary or estimated

## 🦠 Virus Simulation (Synthetic)

The virus spread simulation uses **synthetic generated data** for demonstration purposes:

### Network Topology
- **Nodes**: 200 virtual network nodes
- **Node Types**: Data centers, servers, endpoints
- **Connections**: Dynamic graph based on proximity
- **Infection Model**: Random walk with distance-decay propagation

### Virus Strains (Simulation)
- **Cyber-phage**: High-speed propagation variant
- **Data-worm**: Self-replicating across connected nodes
- **Logic-bomb**: Conditional trigger-based activation
- **Trojan-fox**: Backdoor installation simulation

> **Note**: All virus simulation data is synthetic and for visualization purposes only. No actual network infections occur.

### AGI AI Effects (Visual)

- **Neural Network Visualization**: Procedurally generated particle system
- **Threat Detection**: Algorithmic pattern recognition simulation
- **Countermeasures**: Visual feedback from deployed defenses

## 📊 Bundled Static Datasets

### Included in Distribution
- Three Gorges Dam data
- Nepal flood visualization assets (non-commercial)
- Sample aircraft 3D models

## 🔒 Privacy Notice

- **No private data collection**: This project uses only public, third-party APIs
- **No face recognition or named-person search** (as per original policy)
- **No tracking of individuals**: Only geolocated assets and infrastructure
- **Browser-side keys are local-only** (Cesium ion, Google Maps)

## ⚖️ License Summary

| Source | License | Notes |
|--------|---------|-------|
| OpenSky | Free API / CC BY 4.0 | Varies by endpoint |
| AISStream | Commercial license | Free tier for personal use |
| CelesTrak | Public domain | TLE data in public domain |
| USGS Earthquake | Public domain | Federal government work |
| NOAA Weather | Public domain | U.S. government work |
| NASA FIRMS | CC BY 4.0 | Attribution required |
| OSM Data | ODbL | Open Database License |
| Radio Browser | CC BY-SA 3.0/4.0 | Varies by station |
| Cesium Ion | Proprietary | Free tier eligible for personal use |

Always check the individual source's current terms before commercial deployment.

## 📞 Support & Credits

For data questions or integration help:
- Original project maintainers at [Halfpixel](https://halfpixel.ai)
- Data provider documentation links in respective API pages
- Community contributions welcome via GitHub issues/PRs

---

**G.E.I. Agent - No place left behind.**
