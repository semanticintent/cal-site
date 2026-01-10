# Deployment Documentation

## Cloudflare Workers Deployment ⚡

This project is deployed using **Cloudflare Workers** (not Cloudflare Pages) with automatic CI/CD from GitHub.

### Live Site
- **Production URL**: https://cal-site.michshat.workers.dev/
- **Custom Domain**: (to be configured)

### Deployment Method

This is our **first successful automated deployment** using the Cloudflare Workers framework! 🎉

#### Why Workers (Not Pages)?

After several attempts with Cloudflare Pages Git integration, we switched to **Cloudflare Workers with GitHub integration** which provides:
- Automated builds on every push to `main`
- Static asset serving via Workers Assets API
- Simpler configuration that actually works

### Configuration Files

#### `wrangler.toml`
```toml
name = "cal-site"
compatibility_date = "2026-01-10"
main = "index.js"

assets = { directory = ".vitepress/dist" }
```

- **name**: Worker name (cal-site)
- **compatibility_date**: Cloudflare Workers API version
- **main**: Entry point script
- **assets**: Static files directory (VitePress build output)

#### `index.js`
```javascript
// Minimal worker to serve static assets
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
```

Simple worker script that serves static files from the assets directory.

### Cloudflare Dashboard Configuration

**Workers & Pages → cal-site → Settings → Builds**

- **Framework**: Custom (VitePress)
- **Build command**: `npm run docs:build`
- **Deploy command**: `npx wrangler deploy`
- **Root directory**: `/`
- **Build system**: Connected to GitHub (semanticintent/cal-site)

### How Deployment Works

1. Push changes to GitHub `main` branch
2. Cloudflare automatically detects the push
3. Runs `npm install` and `npm run docs:build`
4. VitePress builds the site to `.vitepress/dist`
5. Wrangler deploys the Worker with static assets
6. Site is live at https://cal-site.michshat.workers.dev/

### Local Testing

```bash
# Build the site
npm run docs:build

# Preview locally with VitePress
npm run docs:preview

# Or test with Wrangler
npx wrangler dev
```

### Updating the Site

Just commit and push to GitHub:

```bash
git add .
git commit -m "Update documentation"
git push
```

Cloudflare will automatically rebuild and deploy within 1-2 minutes.

### Custom Domain Setup

To map a custom domain (e.g., `cal.cormorantforaging.dev`):

1. Go to Cloudflare Dashboard → Workers & Pages → cal-site → Settings → Domains
2. Click "Add domain" or "Add custom domain"
3. Enter your domain: `cal.cormorantforaging.dev`
4. Cloudflare will automatically configure DNS
5. Site will be accessible at both:
   - https://cal-site.michshat.workers.dev/ (default)
   - https://cal.cormorantforaging.dev/ (custom)

### Important Notes

- This uses **Workers**, not Pages (despite the "Workers & Pages" dashboard section)
- The `assets` configuration requires the modern Workers Assets API
- Do NOT use the deprecated `[site]` configuration (causes conflicts)
- The `index.js` file must exist even though it's minimal
- Build artifacts are NOT committed to Git (`.vitepress/dist` is in `.gitignore`)

### Troubleshooting

If deployment fails:
1. Check Cloudflare dashboard → Workers & Pages → cal-site → Deployments
2. View build logs for errors
3. Common issues:
   - Missing `wrangler.toml` or `index.js`
   - Wrong compatibility_date
   - Build command errors (check `package.json` scripts)
   - Deploy command missing project name

### Success! 🎉

First automated deployment achieved on **January 10, 2026** after troubleshooting:
- Dead link detection (fixed with `ignoreDeadLinks` config)
- Wrangler configuration issues
- Workers vs Pages confusion
- Build vs Deploy command setup

---

**Repository**: https://github.com/semanticintent/cal-site
**Framework**: VitePress (Vue-powered static site generator)
**Hosting**: Cloudflare Workers with Assets
