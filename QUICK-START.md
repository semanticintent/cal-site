# Quick Start Guide

## Your CAL Documentation Site is Ready! 🎉

Everything has been set up at `C:\workplace\cal-docs\`

---

## Start the Development Server

```bash
cd C:\workplace\cal-docs
npm run docs:dev
```

Then open your browser to: **http://localhost:5173**

---

## What You'll See

- 🏠 **Home page** with hero section and features
- 📖 **Guide** section (4 pages)
- 💬 **Language** reference (5 pages)
- 🔧 **Frameworks** documentation (3 pages)
- 🛠️ **Tools** guides (3 pages)
- 📚 **API** reference (3 pages)
- 🎮 **Playground** placeholder

**Total: 20 pages of content**

---

## Build for Production

```bash
npm run docs:build
```

Output will be in `.vitepress/dist/` - ready to deploy!

---

## Preview Production Build

```bash
npm run docs:preview
```

---

## Deployment Options

### Option 1: Netlify (Recommended)
1. Push to GitHub
2. Connect repo to Netlify
3. Build command: `npm run docs:build`
4. Publish directory: `.vitepress/dist`
5. Custom domain: `cal.cormorantforaging.dev`

### Option 2: Vercel
1. Push to GitHub
2. Import to Vercel
3. Framework: VitePress
4. Build command: `npm run docs:build`
5. Output: `.vitepress/dist`

### Option 3: GitHub Pages
1. Add `base: '/cal-docs/'` to `.vitepress/config.js`
2. Use GitHub Actions for deployment
3. Enable GitHub Pages in repo settings

---

## Project Structure

```
cal-docs/
├── .vitepress/          # VitePress config
├── guide/               # Getting started
├── language/            # Language reference
├── frameworks/          # DRIFT, Fetch, 6D
├── tools/               # CLI, REPL, Agent
├── api/                 # API docs
├── index.md             # Home page
└── playground.md        # Playground
```

---

## Key Files

- **`.vitepress/config.js`** - Site configuration, nav, sidebar
- **`.vitepress/theme/custom.css`** - Cormorant brand colors
- **`index.md`** - Home page with hero
- **`package.json`** - Dependencies

---

## Need Help?

- See [SITE-SUMMARY.md](./SITE-SUMMARY.md) for complete details
- See [README.md](./README.md) for project overview
- Check VitePress docs: https://vitepress.dev/

---

## Next Steps

1. ✅ Test locally: `npm run docs:dev`
2. ✅ Review all pages
3. ✅ Make any content tweaks
4. ✅ Build: `npm run docs:build`
5. ✅ Deploy to hosting
6. ✅ Point `cal.cormorantforaging.dev` to deployment

---

**You're all set!** 🚀

The site is production-ready with all content from the original spec.
