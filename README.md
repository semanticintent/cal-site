# CAL Language Specification

**Cormorant Agentic Language (CAL) — Language Reference and Documentation**

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.18905197.svg)](https://doi.org/10.5281/zenodo.18905197)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Complete specification for CAL, a domain-specific language for cascade analysis and autonomous decision-making built on the Cormorant Foraging methodology.

## What is CAL?

CAL is the first language where cascade analysis is syntax, not a library. Every keyword maps directly to the Cormorant Foraging Framework:

```cal
FORAGE entities WHERE sound > 7
ACROSS D1, D2, D3, D5, D6
DEPTH 3
SURFACE cascade_map

DRIFT cascade_map METHODOLOGY 85 PERFORMANCE 35
FETCH cascade_map THRESHOLD 1000
ON EXECUTE CHIRP critical "Act now"
```

## The CAL Pipeline

```
SENSE     →  FORAGE, LISTEN, PERCH, WAKE
ANALYZE   →  DIVE, TRACE, ACROSS, DEPTH
MEASURE   →  DRIFT
DECIDE    →  FETCH
ACT       →  CHIRP, SURFACE
```

## Documentation Structure

```
cal-site/
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
├── runtime/                # Runtime Documentation
│   ├── installation.md
│   ├── getting-started.md
│   ├── configuration.md
│   ├── data-adapters.md
│   ├── alert-adapters.md
│   ├── cli-reference.md
│   ├── api-reference.md
│   └── examples.md
├── tools/                  # Tools
│   ├── cli.md
│   ├── repl.md
│   └── agent.md
├── api/                    # API Reference
│   ├── parser.md
│   ├── executor.md
│   └── adapters.md
└── playground.md           # Interactive playground
```

## Development

```bash
npm install
npm run docs:dev       # Start dev server at localhost:5173
npm run docs:build     # Build for production
npm run docs:preview   # Preview production build
```

## Ecosystem

- [CAL Runtime](https://github.com/semanticintent/cal-runtime) — Execution engine
- [Cormorant Foraging Framework](https://cormorantforaging.dev) — Foundational methodology
- [6D Foraging Methodology](https://6d.cormorantforaging.dev) — Dimensional analysis
- [StratIQX](https://stratiqx.com) — Case studies and analysis platform

## Citation

If you reference the CAL language specification, please cite:

```bibtex
@misc{shatny2026calspec,
  author = {Shatny, Michael},
  title = {CAL Language Specification: Cormorant Agentic Language Documentation},
  year = {2026},
  publisher = {Zenodo},
  url = {https://github.com/semanticintent/cal-site},
  doi = {10.5281/zenodo.18905197},
  note = {ORCID: 0009-0006-2011-3258}
}
```

## Author

**Michael Shatny**
ORCID: [0009-0006-2011-3258](https://orcid.org/0009-0006-2011-3258)

## License

MIT

---

Built with [VitePress](https://vitepress.dev/) and the Cormorant Foraging methodology.
