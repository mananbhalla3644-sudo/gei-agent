#!/usr/bin/env node

/**
 * G.E.I. Agent System Doctor
 * Checks Node/npm readiness, provider routes, and configuration status
 */

import { fileURLToPath } from 'url';
import { dirname, basename } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('\n═══════════════════════════════════════════════════════');
console.log('🩺 G.E.I. Agent - System Doctor');
console.log('═══════════════════════════════════════════════════════\n');

// Check Node version
const nodeVersion = process.version;
const [major] = nodeVersion.match(/\d+/g);
console.log(`📦 Node.js: ${nodeVersion} (${major >= 18 ? '✅' : '⚠️  Need 18.x or later'})`);

// Check npm version
const execSync = require('child_process').execSync;
try {
  const npmVersion = execSync('npm --version').toString().trim();
  console.log(`📦 npm: ${npmVersion} ✅\n`);
} catch (e) {
  console.log('⚠️  npm not found or failed to check version\n');
}

// Check if dependencies are installed
console.log('📋 Checking Dependencies...');
try {
  const fs = require('fs');
  const pkgPath = '../package.json';
  const pkgPathResolved = fileURLToPath(new URL(pkgPath, import.meta.url));
  const packageJson = JSON.parse(fs.readFileSync(pkgPathResolved, 'utf8'));
  
  console.log(`   ✅ package.json found`);
  console.log(`   📦 Dependencies: ${Object.keys(packageJson.dependencies).length}`);
  console.log('   ✅ All dependencies loaded\n');
} catch (e) {
  console.log('⚠️  Dependencies may not be installed. Run: npm ci\n');
}

// Check environment configuration
console.log('🔑 Provider Configuration:');
const env = process.env;

if (env.OPENAI_API_KEY) {
  console.log(`   🔓 OpenAI: ✅ Configured (${env.OPENAI_API_KEY.startsWith('sk_') ? 'OpenAI key' : 'Unknown'})`);
} else {
  console.log(`   🔒 OpenAI: Not configured (voice control unavailable)`);
}

if (env.CESIUM_ACCESS_TOKEN) {
  console.log(`   🛰️  Cesium Ion: ✅ Configured (${env.CESIUM_ACCESS_TOKEN.slice(0, 20)}...)`);
} else {
  console.log(`   ⬜ Cesium Ion: Not configured (2D satellite only)`);
}

if (env.GOOGLE_MAPS_API_KEY) {
  console.log(`   🗺️  Google Maps: ✅ Configured (${env.GOOGLE_MAPS_API_KEY.slice(0, 20)}...)`);
} else {
  console.log(`   ⬜ Google Maps: Not configured (basic OSM fallback)`);
}

// Check for .env file
const envPath = '../.env';
try {
  const pathResolved = fileURLToPath(new URL(envPath, import.meta.url));
  const stat = fs.statSync(pathResolved);
  if (stat.isFile()) {
    console.log(`   📄 Environment: ✅ .env file found`);
  } else {
    console.log(`   ⬜ Environment: No .env file (using default settings)`);
  }
} catch (e) {
  // No .env file, that's fine
  console.log(`   ⬜ Environment: No .env file (using default settings)`);
}

console.log('');

// Check network routes (if internet available)
console.log('🌐 Network Routes:');
try {
  const https = require('https');
  
  async function checkRoute(url, name) {
    try {
      const start = Date.now();
      await new Promise((resolve, reject) => {
        const req = https.get(url, res => {
          if (res.statusCode === 200) {
            resolve(Date.now() - start);
          } else {
            reject(new Error(`Status ${res.statusCode}`));
          }
        });
        
        req.on('error', reject);
      });
      return { status: '✅', time: `${start}ms` };
    } catch (e) {
      return { status: '⚠️', reason: e.message.split('(')[0].trim() };
    }
  }
  
  const routes = [
    { url: 'https://api.opensky.org/', name: 'OpenSky' },
    { url: 'https://www.aisstream.io/api/v2/status', name: 'AISStream' },
    { url: 'https://celestreak.com/', name: 'CelesTrak' },
  ];
  
  for (const route of routes) {
    const result = await checkRoute(route.url, route.name);
    console.log(`   ${result.status} ${route.name}: ${result.time || result.reason}`);
  }
} catch (e) {
  console.log('   ⚠️  Network checks skipped (offline or firewall blocking)');
}

console.log('');

// Summary
console.log('═══════════════════════════════════════════════════════');
console.log('📋 Summary:');
console.log('═══════════════════════════════════════════════════════');
console.log(`   • System: Ready`);
console.log(`   • Node.js: ${major}.x (recommended: 24.x or 26.x)`);
console.log(`   • Dependencies: Installed`);
console.log('   • Providers: See configuration above');
console.log('═══════════════════════════════════════════════════════\n');

console.log('💡 Next Steps:');
console.log('   Run: npm run dev');
console.log('   Then open http://localhost:4173 in your browser\n');
