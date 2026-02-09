# TXchyon Labs Infrastructure Plan

## Goal
Integrate Omega and Ultima trading platforms under `txchyon.com/labs/*` to leverage SEO authority from the main educational megablog while keeping codebases separate.

## Current Architecture
- **Main Site**: `txchyon.com` (Astro, Cloudflare Pages)
- **Omega**: Separate Next.js app (project-omega repo)
- **Ultima**: Separate Next.js app (project-ultima repo)

## Target Architecture

```
txchyon.com (Astro - main educational megablog)
└── /labs (landing page - choose Omega or Ultima)
    ├── /omega (Next.js from project-omega)
    │   ├── /signin
    │   └── /dashboard
    └── /ultima (Next.js from project-ultima)
        ├── /signin
        └── /dashboard
```

## Implementation Strategy

### Option 1: Cloudflare Workers + Multiple Pages Projects (Recommended)

**How it works:**
- Deploy 3 separate Cloudflare Pages projects
- Use Cloudflare Worker to route requests based on path

**Pros:**
- ✅ Each app stays independent with its own repo
- ✅ Independent deployments (update Omega without touching Ultima)
- ✅ Full control over routing logic
- ✅ Clean separation of concerns

**Cons:**
- Requires Cloudflare Worker configuration
- Slightly more complex initial setup

**Steps:**
1. Deploy `txchyon.com` (already done - main Astro site)
2. Deploy `omega-txchyon` (project-omega Next.js)
3. Deploy `ultima-txchyon` (project-ultima Next.js)
4. Create Cloudflare Worker to route:
   - `/labs/omega/*` → omega-txchyon.pages.dev
   - `/labs/ultima/*` → ultima-txchyon.pages.dev
   - Everything else → main txchyon site

---

### Option 2: Monorepo with Path-based Routing

**How it works:**
- Create a monorepo structure within txchyon
- Use Cloudflare's advanced build settings

**Structure:**
```
txchyon/
├── apps/
│   ├── main/ (Astro site)
│   ├── omega/ (Next.js)
│   └── ultima/ (Next.js)
└── packages/ (shared utilities if needed)
```

**Pros:**
- ✅ Single deployment
- ✅ Easier to share components/utilities
- ✅ Simpler routing

**Cons:**
- ❌ Loses independent git repos
- ❌ All apps deploy together (slower CI/CD)
- ❌ Harder to manage separate teams

---

### Option 3: Next.js Rewrites in Astro Config

**How it works:**
- Use Astro's middleware/routing to proxy to deployed Next.js apps

**Pros:**
- Simple configuration
- No worker needed

**Cons:**
- ❌ Performance overhead (proxy requests)
- ❌ Complexity in Astro config

---

## Recommended Approach: Option 1 (Workers + Multi-Project)

### Detailed Implementation Steps

#### Phase 1: Deploy Separate Pages Projects

1. **Deploy Omega to Cloudflare Pages**
   ```bash
   # From project-omega directory
   # Connect to Cloudflare Pages
   # Build command: npm run build
   # Output directory: .next or out
   # Project name: omega-txchyon
   ```

2. **Deploy Ultima to Cloudflare Pages**
   ```bash
   # From project-ultima directory  
   # Build command: npm run build
   # Output directory: .next or out
   # Project name: ultima-txchyon
   ```

#### Phase 2: Create Labs Landing Page

Create `/labs` route in main txchyon Astro site:
- `src/pages/labs/index.astro` - Landing page to choose Omega or Ultima
- Links to `/labs/omega` and `/labs/ultima`

#### Phase 3: Configure Cloudflare Worker

Create a Worker to route traffic:

```javascript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Route /labs/omega/* to Omega app
    if (url.pathname.startsWith('/labs/omega')) {
      url.hostname = 'omega-txchyon.pages.dev';
      url.pathname = url.pathname.replace('/labs/omega', '');
      return fetch(url, request);
    }
    
    // Route /labs/ultima/* to Ultima app
    if (url.pathname.startsWith('/labs/ultima')) {
      url.hostname = 'ultima-txchyon.pages.dev';
      url.pathname = url.pathname.replace('/labs/ultima', '');
      return fetch(url, request);
    }
    
    // Everything else goes to main site
    url.hostname = 'txchyon.pages.dev';
    return fetch(url, request);
  }
};
```

#### Phase 4: Update DNS/Routes

- Bind Worker to `txchyon.com` domain
- Configure routes in Cloudflare dashboard

## SEO Considerations

✅ **Preserves SEO Authority**
- All apps under `txchyon.com` domain
- Inherits domain authority from megablog
- Clean URL structure

✅ **Performance**
- Each app optimized independently
- No unnecessary bundling

## Next Steps

1. Review this plan
2. Choose deployment approach
3. Set up Cloudflare Pages projects
4. Configure routing (Worker or alternative)
5. Test `/labs` integration
6. Deploy to production
