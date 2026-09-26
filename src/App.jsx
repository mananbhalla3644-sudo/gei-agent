import React, { useState, useEffect } from 'react';
import './styles/app.css';

const App = () => {
  const [infectionLevel, setInfectionLevel] = useState(0);
  const [threatLevel, setThreatLevel] = useState('LOW');
  const [network, setNetwork] = useState([]);
  const [agiActive, setAgiActive] = useState(false);

  // Initialize virus network
  useEffect(() => {
    initNetwork();
  }, []);

  const initNetwork = () => {
    const nodes = [];
    for (let i = 0; i < 50; i++) {
      nodes.push({
        id: i,
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 600,
        size: Math.random() * 3 + 1,
        infected: false
      });
    }
    setNetwork(nodes);
  };

  const infectNode = () => {
    const newInfectionRate = 0.02;
    const newlyInfected = network.filter(node => !node.infected && Math.random() < newInfectionRate).map(n => n.id);
    
    if (newlyInfected.length > 0) {
      setNetwork(prev => prev.map(n => newlyInfected.includes(n.id) ? { ...n, infected: true } : n));
      
      // Update infection level
      const infectedCount = network.filter(n => n.infected).length;
      setInfectionLevel((infectedCount / network.length) * 100);
      
      if (infectionLevel < 30 && newlyInfected.length > 0) {
        setAgiActive(true);
      }
    }
  };

  const resetNetwork = () => {
    initNetwork();
    setInfectionLevel(0);
    setThreatLevel('LOW');
    setAgiActive(false);
  };

  return (
    <div className="gei-application">
      {/* Header */}
      <header className="app-header">
        <h1>🦠 G.E.I. Agent</h1>
        <p className="subtitle">God's Eye View Enhanced - Virus Spread Simulation with AGI AI Effects</p>
        
        <div className="status-bar">
          <div className="status-item">
            <span className="status-label">Threat Level:</span>
            <span className={`status-value threat-${threatLevel.toLowerCase()}`}>{threatLevel}</span>
          </div>
          <div className="status-item">
            <span className="status-label">Infection Progress:</span>
            <span className="status-value">{infectionLevel.toFixed(1)}%</span>
          </div>
          <div className={`status-item agi-status ${agiActive ? 'active' : ''}`}>
            <span className="status-label">AGI AI:</span>
            <span className="status-value">{agiActive ? 'ACTIVE - ANALYZING THREATS' : 'STANDBY'}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Virus Network Panel */}
        <div className="virus-panel">
          <h2>🦠 Computer Virus Spread Simulation</h2>
          <p className="panel-description">
            Real-time simulation of malware propagation across a distributed network. 
            Watch as cyber threats spread through connected nodes. 
            The AGI AI system actively monitors and contains threats using neural network defense systems.
          </p>

          {/* Network Visualization */}
          <div className="network-container">
            <svg width={800} height={600} className="network-svg">
              {/* Connections */}
              {network.map(nodeA => 
                network.slice(nodeA.id + 1, nodeA.id + 6).map(nodeB => (
                  <line
                    key={`${nodeA.id}-${nodeB.id}`}
                    x1={nodeA.x + 400} y1={nodeA.y + 300}
                    x2={nodeB.x + 400} y2={nodeB.y + 300}
                    stroke="#00ff88"
                    strokeWidth={nodeA.infected || nodeB.infected ? 2 : 1}
                    strokeOpacity={0.3}
                  />
                ))
              )}

              {/* Nodes */}
              {network.map(node => (
                <g key={node.id} className={`node ${node.infected ? 'infected' : ''}`}>
                  {!node.infected && agiActive && (
                    <circle cx={node.x + 400} cy={node.y + 300} r="30" fill="none" stroke="#ff4444" strokeWidth="1" opacity="0.5">
                      <animateTransform attributeName="transform" type="rotate" from={`${node.x+400} ${node.y+300} 0`} to={`${node.x+400} ${node.y+300} 360`} dur="2s" repeatCount="indefinite"/>
                    </circle>
                  )}
                  <circle 
                    cx={node.x + 400} cy={node.y + 300} 
                    r={node.size}
                    fill={node.infected ? '#ff4444' : '#00ff88'}
                    stroke={node.infected ? '#ff4444' : 'transparent'}
                    strokeWidth={node.infected ? 2 : 1}
                  />
                  {node.infected && (
                    <text x={node.x + 400} y={node.y + 305} textAnchor="middle" fill="#ff4444" fontSize="10" fontWeight="bold">
                      VIRUS
                    </text>
                  )}
                </g>
              ))}

              {/* Info Labels */}
              <text x="20" y="30" fill="#888" fontSize="12">
                Total Nodes: {network.length}
              </text>
              <text x="20" y="45" fill="#888" fontSize="12">
                Infected: {network.filter(n => n.infected).length}
              </text>
            </svg>
          </div>

          {/* Info Panel */}
          <div className="info-panel">
            <h3 className={`threat-indicator threat-${threatLevel.toLowerCase()}`}>
              THREAT: {threatLevel}
            </h3>
            
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-label">Infection Level</span>
                <span className={`stat-value ${infectionLevel > 50 ? 'danger' : ''}`}>
                  {infectionLevel.toFixed(1)}%
                </span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${infectionLevel}%`, backgroundColor: infectionLevel > 50 ? '#ff4444' : '#00ff88' }}
                  />
                </div>
              </div>

              <div className="stat-card">
                <span className="stat-label">Active Strains</span>
                <span className="stat-value">4</span>
                <ul className="strain-list">
                  <li>cyber-phage</li>
                  <li>data-worm</li>
                  <li>logic-bomb</li>
                  <li>trojan-fox</li>
                </ul>
              </div>

              <div className="stat-card agi-active" style={{ opacity: agiActive ? 1 : 0.5 }}>
                <span className="stat-label">AGI AI Defense</span>
                <span className="stat-value">ACTIVE</span>
                <div className="agi-status">Neural Network Monitoring</div>
              </div>
            </div>

            {/* Controls */}
            <div className="controls-panel">
              <button 
                className="btn btn-danger"
                onClick={infectNode}
              >
                {infectionLevel >= 100 ? 'MAXIMUM INFECTION' : 'ACCELERATE INFECTION'}
              </button>

              <button className="btn btn-secondary" onClick={resetNetwork}>
                RESET NETWORK
              </button>

              <div className="agi-toggle">
                <span>AGI AI Control:</span>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={agiActive}
                    onChange={(e) => setAgiActive(e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              {agiActive && (
                <>
                  <button className="btn btn-small" onClick={() => alert('Scanning network for threats...')}>SCAN & CONTAIN</button>
                  <button className="btn btn-small" onClick={() => alert('Deploying AI countermeasures...')}>DEPLOY COUNTERMEASURES</button>
                </>
              )}
            </div>
          </div>

          {/* Console Output */}
          {agiActive && (
            <div className="console-output">
              <h4>🤖 AGI AI Defense Console</h4>
              <div className="console-lines">
                <div className="console-line"><span className="timestamp">{new Date().toLocaleTimeString()}</span><span className="message pulse">💫 PULSE: Neural defense field active</span></div>
                <div className="console-line"><span className="timestamp">{new Date().toLocaleTimeString()}</span><span className="message scanline">🔍 SCANNING: Analyzing threat signature...</span></div>
                <div className="console-line"><span className="timestamp">{new Date().toLocaleTimeString()}</span><span className="message glitch">⚡ GLITCH DETECTED at coordinates [1234,5678]</span></div>
              </div>
            </div>
          )}
        </div>

        {/* GEV Features Panel */}
        <div className="gev-panel">
          <h2>🌍 God's Eye View Features</h2>
          <p className="panel-description">
            This enhanced version includes all original God's Eye View features:
          </p>

          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">✈️</span>
              <strong>Live Aircraft Tracking</strong>
              <p>11,000+ real-time aircraft with OpenSky data</p>
            </div>

            <div className="feature-item">
              <span className="feature-icon">🚢</span>
              <strong>Ship/Vessel Tracking</strong>
              <p>Thousands of ships worldwide via AISStream</p>
            </div>

            <div className="feature-item">
              <span className="feature-icon">🛰️</span>
              <strong>Satellite Monitoring</strong>
              <p>838 satellites including ISS and Starlink</p>
            </div>

            <div className="feature-item">
              <span className="feature-icon">🌍</span>
              <strong>Earthquake Detection</strong>
              <p>Global seismic activity from USGS</p>
            </div>

            <div className="feature-item">
              <span className="feature-icon">☁️</span>
              <strong>Weather Layers</strong>
              <p>Wind, clouds, lightning, cyclones (NOAA data)</p>
            </div>

            <div className="feature-item">
              <span className="feature-icon">📹</span>
              <strong>Public CCTV Feeds</strong>
              <p>Live camera projections into 3D city space</p>
            </div>

            <div className="feature-item">
              <span className="feature-icon">🎙️</span>
              <strong>Voice Control</strong>
              <p>Hands-free navigation and queries (requires OpenAI key)</p>
            </div>

            <div className="feature-item">
              <span className="feature-icon">✈️</span>
              <strong>Cockpit Mode</strong>
              <p>Ride inside tracked aircraft with sensor switching</p>
            </div>
          </div>

          <div className="voice-control">
            <h3>🎙️ Voice Command Center</h3>
            <input type="text" placeholder='Say: "Take me to Tokyo and show all aircraft"' disabled />
            <p className="voice-hint">Add OpenAI API key for voice control via POWER UP panel</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>G.E.I. Agent - Enhanced God's Eye View with Virus Simulation & AGI AI</p>
        <p>Data Sources: OpenSky, AISStream, CelesTrak, USGS, Live CCTV feeds, Cesium Ion</p>
      </footer>
    </div>
  );
};

export default App;
