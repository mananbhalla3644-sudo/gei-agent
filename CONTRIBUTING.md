# Contributing to G.E.I. Agent

Thank you for your interest in contributing to G.E.I. Agent! This enhanced version of God's Eye View combines satellite visualization with virus spread simulation and AGI AI effects.

## 🎯 Areas for Contribution

### 1. **New Data Layers**
Add new visualization layers following the existing pattern:

```javascript
// Example: Add a "Datacenters" layer
src/data/datacenters.js {
  create(data) { ... }
  getNearby(entity, radius) { ... }
}
```

See existing layers in `src/data/` for patterns.

### 2. **Visual Styles**
Create new sensor/optic modes:

```javascript
// src/styles/visuals/thermal.js
export default {
  id: 'thermal',
  name: 'Thermal Optics',
  uniforms: { ... },
  fragmentShader: `...`
}
```

### 3. **Voice Tools**
Add new voice command handlers:

```javascript
// src/voice/tools/navigation.js
tools.zoomToLocation = {
  intent: /go to|fly to|take me to/,
  execute: async (command) => {...}
};
```

### 4. **Network Simulation Enhancements**
- Better infection models
- Virus strain customization
- Network topology generators

### 5. **AGI AI Features**
- New threat detection algorithms
- Countermeasure simulations
- Neural network visualization improvements

## 📝 Code Style

We follow these conventions:

- **ES Modules**: Use `import`/`export` (no CommonJS)
- **TypeScript**: Preferred for new files
- **React Hooks**: Functional components with hooks
- **Cesium Convention**: Existing layer patterns must be followed
- **Naming**: kebab-case for CSS classes, camelCase for JS

## 🚀 Getting Started

```bash
git clone https://github.com/[your-github]/gei-agent-virus-sim.git
cd gei-agent-virus-sim
npm ci
npm run dev
```

Then open http://localhost:4173 and explore!

## 🔧 Development Workflow

### Adding a New Layer

1. Create layer file in `src/data/layers/`
2. Register in `src/main.js` layer system
3. Add UI controls to appropriate panel
4. Test with `npm run dev`

### Adding Visual Styles

1. Create style definition in `src/styles/visuals/`
2. Register in style cycle list
3. Update keyboard shortcuts if needed

### Adding Voice Commands

1. Define intent regex and handler
2. Handle success/error states
3. Test with actual voice input (requires OpenAI key)

## 🧪 Testing

Before submitting PRs:

```bash
npm run doctor     # Check dependencies
npm run build      # Ensure clean build
npm run preview    # Test production build
```

## 📋 PR Guidelines

- **Small focused changes**: One feature per PR
- **Tests**: Include basic usage examples
- **Documentation**: Update README.md if features change
- **Git history**: Clean commit messages

### Example PR Title Format
```
feat: Add submarine cable layer with depth visualization
feat: Improve virus spread infection model
fix: Correct satellite orbit drift calculation
docs: Update API keys section with new Cesium terms
```

## ⚖️ Code of Conduct

- Be respectful and constructive
- Focus on enhancing the experience, not breaking it
- Follow existing patterns and architecture
- Respect data provider terms and licenses

## 🌟 Feature Ideas We're Excited About

- **Time travel mode**: Replay historical events with satellite imagery archives
- **Multi-globe comparison**: View multiple projections simultaneously
- **AI scenario planning**: Simulate different threat/virus scenarios
- **Collaborative whiteboarding**: Share annotations with friends
- **Customizable sensor packs**: Preset configurations for different use cases

## 📚 Resources

- [God's Eye View Original Docs](https://github.com/bilawalsidhu/gods-eye-view)
- [CesiumJS Documentation](https://cesium.com/learn/cesium-javascript/)
- [Three.js Examples](https://threejs.org/examples/)
- [React Best Practices](https://react.dev/learn)

## 🏷️ Issue Labels

When creating issues:

- `bug`: Something broken
- `enhancement`: New feature request  
- `data-layer`: Request to add new data source
- `style`: Visual/optic improvement
- `voice`: Voice command enhancement
- `question`: Need clarification

## 📧 Contact

Questions? Open an issue or discuss in the repository's issues tab.

---

**Remember**: This project is meant to be a shared sandbox for exploring geospatial intelligence and cyber simulation. Let's build something amazing together!

🌐 G.E.I. Agent - No place left behind.
