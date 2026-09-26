# Security Considerations for G.E.I. Agent

This document outlines the security model, threat analysis, and best practices for running G.E.I. Agent.

## 🔐 Architecture Overview

### Local-First Design
- **Server binds to localhost** by default (not exposed on network)
- **Browser-side API keys** (Google Maps, Cesium Ion) are restricted to origin via CORS
- **OpenAI key**: Only short-lived session tokens sent to browser; never stored client-side

### Key Storage
Keys can be configured in two ways:

1. **Pinokio**: Stored in `pinokio/ENVIRONMENT` (ignored by Git, owner-only permissions)
2. **Terminal clone**: Stored in `.env` at repo root (same restrictions apply)

The app will create owner-only files before writing secrets to them.

## ⚠️ Threat Model

### Key Exposure Risks

#### 1. LAN Server Sharing
If you enable `--host 0.0.0.0` to share on your local network:

**Risks**:
- Anyone on your LAN can access the API endpoints
- They can read configured keys via Provider Settings (if enabled)
- **Warning**: Keys are exposed as plaintext in memory

**Mitigations**:
```bash
# Set rate limits per IP
export GEV_RATELIMIT_OPENAI_PER_MIN=5
export GEV_RATELIMIT_GOOGLE_PER_MIN=10

# Disable key panel for remote users
GEV_SERVER_MODE=true  # Disables Provider Settings UI
```

#### 2. Browser Key Leakage
Browser-side keys (Google Maps, Cesium Ion) MUST be restricted:

- **Cesium Ion**: Set token scope to `assets:read` only; never allow write access
- **Google Maps**: URL-restrict key to your domain or localhost
- Use budget alerts and billing notifications at provider level

#### 3. OpenAI API Usage
OpenAI's Realtime API costs money and has usage limits:

**Cost Controls**:
- Built-in `$5 session spend cap` (automatically ends session)
- Spend readout displayed next to mic button
- Model toggle: STD vs MINI (MINI costs ~$0.02/min, STD ~$0.06/min)

## 🛡️ Security Best Practices

### For Solo Users (Recommended Default)
```bash
# Run locally (binds to localhost)
npm run dev

# No network exposure
# Provider Settings: Read-only external keys
```

### For LAN Sharing
```bash
# Only expose if necessary
HOST=0.0.0.0 npm run dev -- --port 4173

# Set strict rate limits
export GEV_RATELIMIT_OPENAI_PER_MIN=3
export GEV_RATELIMIT_GOOGLE_PER_MIN=5

# Disable key panel for remote users
export GEV_SERVER_MODE=true
```

### For Production (Advanced)
Deploy behind reverse proxy with authentication:

```nginx
# Example nginx config
location / {
    proxy_pass http://localhost:4173;
    
    # Rate limiting
    limit_req zone=api burst=20 nodelay;
    
    # Only trusted IPs can access if needed
    # allow 192.168.1.0/24;
    # deny all;
}

# Add auth header (example)
auth_basic "GEI Agent"
auth_basic_user_file /etc/nginx/.htpasswd
```

## 🔑 Key Provider Security

### Cesium Ion Token
```javascript
// Create token with minimal permissions
{
  "token_type": "COMMUNITY",
  "assets_scope": ["read"],  // Never include "write" or "update"
  "billing_enabled": false   // Keep free tier for non-commercial use
}
```

### Google Maps Key
```javascript
// Create key with URL restrictions
{
  "key_type": "API_KEY",
  "applies_to": ["*"],  // Can add specific origins
  "restricted_key": true,  // Recommended for production
  "cors_enabled": false    // Disable CORS unless proxying
}
```

### OpenAI Key
- Keep separate from other keys (costly)
- Use separate project/organization for tracking
- Set budget alerts in OpenAI dashboard
- Monitor session spend via app readout

## 🚫 What We DON'T Do

Following the original God's Eye View policy:

1. **No face recognition or biometric tracking**
2. **No named-person search or identity queries**
3. **No private dataset collection**
4. **No mystery scraping of unauthorized sites**

The app is an exploratory visualization tool, not a surveillance platform.

## 📊 Data Privacy

### Public Data Sources Only
All layers use public APIs with clear data sources:
- OpenSky Network (public API)
- AISStream (free tier signup required)
- USGS Earthquake (public domain)
- NOAA Weather (public domain)
- City CCTV feeds (official municipal APIs)

### No Private User Data
- Location history is not persisted server-side
- Voice inputs processed via OpenAI API only (not stored locally)
- Session tokens expire immediately after use

## 🐛 Reporting Vulnerabilities

If you discover a security issue:

1. **DO NOT** create a public GitHub issue
2. Email the maintainers directly or create a private issue
3. Include reproduction steps and potential impact

Responsible disclosure is appreciated!

## 🧪 Security Testing

Before deployment, run these checks:

```bash
# Check for exposed environment variables
grep -r 'KEY=' . --include='.env*' | grep -v '^#'

# Verify server binding
netstat -an | grep 4173

# Test CORS restrictions (if using proxy)
curl -H "Origin: evil.com" http://localhost:4173
```

## 📜 License & Terms

This project is MIT licensed, but:

- **Bundle data** carries their own terms (see DATA_SOURCES.md)
- **Provider terms** apply (Cesium Ion, Google Maps billing policies)
- **Commercial use**: Review each provider's commercial eligibility

## 🆘 Security Questions

Common questions answered:

**Q: Can I share this with friends on my home network?**  
A: Yes, but enable `--host 0.0.0.0` and set rate limits. Disable key panel for them.

**Q: Will someone steal my keys from the app?**  
A: Keys are in plaintext `.env` files (owner-only). Protect your machine from unauthorized access.

**Q: Is voice data stored anywhere?**  
A: No. OpenAI processes it server-side; only session tokens reach your browser.

**Q: How much will voice usage cost?**  
A: ~$0.02-0.06 per minute depending on model. Built-in $5 cap prevents surprise charges.

---

**G.E.I. Agent - Security by design. No place left behind.**
