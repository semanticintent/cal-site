# CAL Playground

::: warning Coming Soon
The interactive CAL playground is under development. Check back soon!
:::

## What is the Playground?

The CAL Playground will be an interactive environment where you can:

- **Write CAL scripts** in a browser-based editor
- **Execute analysis** with sample or custom data
- **See results** in real-time
- **Visualize cascades** with interactive diagrams
- **Share scripts** with a unique URL
- **Export results** as JSON or reports

## Features (Coming Soon)

### Code Editor
- Syntax highlighting for CAL
- Auto-completion for keywords
- Real-time syntax validation
- Line numbers and error indicators

### Live Execution
- Run scripts instantly
- See execution steps
- View intermediate results
- Debug with verbose mode

### Sample Data
- Pre-loaded examples
- Real case studies (Tailwind, etc.)
- Custom data upload
- JSON/CSV support

### Visualization
- 6D cascade diagrams
- DRIFT/Fetch charts
- Timeline views
- Impact heatmaps

### Collaboration
- Share scripts via URL
- Export to GitHub Gist
- Embed in documentation
- Save to browser storage

## Try CAL Now

While the playground is being built, you can try CAL:

### 1. Install Locally
```bash
git clone https://github.com/semanticintent/cal.git
cd cal
npm install
node repl.js
```

### 2. Use the CLI
```bash
node run.js examples/tailwind-cascade.cal --data examples/sample-data.json
```

### 3. Try the REPL
```bash
node repl.js
```

## Example Scripts to Try

### Basic Query
```cal
FORAGE entities
WHERE sound > 7
ACROSS D1, D2, D3
DEPTH 2
SURFACE results
```

### Full Analysis
```cal
FORAGE entities
WHERE sound > 7 AND segment = "enterprise"
ACROSS D1, D2, D3, D5, D6
DEPTH 3
SURFACE cascade_map

DRIFT cascade_map
METHODOLOGY 85
PERFORMANCE 35

FETCH cascade_map
THRESHOLD 1000
ON EXECUTE CHIRP critical "Act now"
```

### Tailwind Case Study
```cal
-- Real UC-002 analysis
FORAGE entities
WHERE name = "Tailwind CSS Layoffs"
ACROSS D1, D2, D3, D5, D6
DEPTH 2
SURFACE tailwind_cascade

DRIFT tailwind_cascade
METHODOLOGY 85
PERFORMANCE 35

FETCH tailwind_cascade
THRESHOLD 1000
ON EXECUTE CHIRP critical "Major restructure needed"
```

## Want to Contribute?

Help us build the playground! The repo is open source:

- [GitHub Repository](https://github.com/semanticintent/cal)
- [Submit Issues](https://github.com/semanticintent/cal/issues)
- [Join Discussions](https://github.com/semanticintent/cal/discussions)

## Playground Architecture (Planned)

```
┌─────────────────────────────────────────┐
│         CAL PLAYGROUND                  │
├─────────────────────────────────────────┤
│                                         │
│  Editor (Monaco/CodeMirror)             │
│    ├─ Syntax Highlighting               │
│    ├─ Auto-complete                     │
│    └─ Error Indicators                  │
│                                         │
│  Execution Engine (WASM)                │
│    ├─ Parse CAL                         │
│    ├─ Execute Plan                      │
│    └─ Return Results                    │
│                                         │
│  Visualization Layer (D3/React)         │
│    ├─ Cascade Diagrams                  │
│    ├─ DRIFT Charts                      │
│    └─ Fetch Indicators                  │
│                                         │
│  Data Manager                           │
│    ├─ Sample Datasets                   │
│    ├─ File Upload                       │
│    └─ Local Storage                     │
│                                         │
└─────────────────────────────────────────┘
```

## Next Steps

While you wait for the playground:

- [Learn the Language](/language/syntax)
- [Try Code Examples](/language/examples)
- [Understand Frameworks](/frameworks/drift)
- [Use the CLI](/tools/cli)
- [Explore the REPL](/tools/repl)

---

::: tip Stay Updated
Follow [@StratIQX](https://twitter.com/stratiqx) for playground launch announcements!
:::
