# CAL Documentation Site

Official documentation for CAL (Cascade Analysis Language).

## About

CAL is a domain-specific language for cascade analysis and autonomous decision-making. This documentation site provides comprehensive guides, language reference, framework documentation, and API references.

**Live Site:** `cal.cormorantforaging.dev` (coming soon)

## Project Structure

```
cal-docs/
├── .vitepress/
│   ├── config.js           # VitePress configuration
│   └── theme/
│       ├── index.js        # Custom theme
│       └── custom.css      # Cormorant brand colors
├── guide/                  # Getting Started
│   ├── introduction.md
│   ├── installation.md
│   ├── quick-start.md
│   └── concepts.md
├── language/               # Language Reference
│   ├── syntax.md
│   ├── keywords.md
│   ├── operators.md
│   ├── dimensions.md
│   └── examples.md
├── frameworks/             # Integrated Frameworks
│   ├── drift.md
│   ├── fetch.md
│   └── 6d.md
├── tools/                  # Tools
│   ├── cli.md
│   ├── repl.md
│   └── agent.md
├── api/                    # API Reference
│   ├── parser.md
│   ├── executor.md
│   └── adapters.md
├── playground.md           # Interactive playground (coming soon)
├── index.md                # Home page
└── package.json
```

## Development

### Install Dependencies

```bash
npm install
```

### Start Dev Server

```bash
npm run docs:dev
```

Then open http://localhost:5173

### Build for Production

```bash
npm run docs:build
```

Output will be in `.vitepress/dist/`

### Preview Production Build

```bash
npm run docs:preview
```

## Features

- **Dark Theme** - Default dark mode with Cormorant brand colors
- **Full-Text Search** - Built-in local search
- **Responsive** - Mobile-friendly design
- **Code Highlighting** - Syntax highlighting for CAL and other languages
- **Navigation** - Organized sidebar navigation
- **SEO Optimized** - Meta tags and structured data

## Brand Colors

```css
--cal-primary: #4a9eff;      /* Cormorant blue */
--cal-secondary: #64ffda;    /* Accent teal */
--cal-accent: #ffd700;       /* Alert gold */
--cal-dark: #0d1117;         /* Background */
--cal-text: #e6edf3;         /* Primary text */
```

## Contributing

This documentation is open source. Contributions welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Links

- **CAL Language:** [github.com/semanticintent/cal](https://github.com/semanticintent/cal)
- **6D Methodology:** [6d.cormorantforaging.dev](https://6d.cormorantforaging.dev/)
- **Cormorant Foraging:** [cormorantforaging.dev](https://cormorantforaging.dev/)
- **StratIQX:** [stratiqx.com](https://stratiqx.com/)

## License

MIT

---

Built with [VitePress](https://vitepress.dev/) and the Cormorant Foraging methodology 🪶
