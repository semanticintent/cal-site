# Installation

::: warning Coming Soon
CAL is currently in development and testing. The public repository will be available soon at [github.com/semanticintent](https://github.com/semanticintent).

**Status**: Documentation complete, language testing in progress.
:::

## Requirements (When Available)

- Node.js 18+
- npm or yarn

## Quick Install (Coming Soon)

Once CAL is publicly released, installation will be:

```bash
# Clone from GitHub
git clone https://github.com/semanticintent/cal.git
cd cal

# Install dependencies
npm install

# Verify installation
node cal.js --version
```

## Package Contents

When released, CAL will include:

```
cal/
├── cal.js              # Parser & compiler
├── cormorant.pegjs     # Grammar definition
├── run.js              # CLI runner
├── repl.js             # Interactive mode
├── agent.js            # AI integration
└── lib/
    ├── executor.js         # Execution engine
    ├── analysis-engine.js  # 6D scoring
    ├── data-adapters.js    # Data sources
    └── alert-adapters.js   # Notifications
```

## Verify Installation (When Available)

```bash
# Run demo
node cal.js

# Start REPL
node repl.js

# Run a script
node run.js examples/tailwind-cascade.cal --data examples/sample-data.json
```

## AI Agent Setup (Optional)

To use the AI integration layer:

```bash
# Set API key
export ANTHROPIC_API_KEY=your-key

# Test agent
node agent.js "Your situation description here"

# Or use mock mode (no API key needed)
node agent.js --mock "Test situation"
```

## Why the Wait?

We're ensuring CAL is production-ready before public release:

- ✅ **Language specification** complete
- ✅ **Documentation** complete
- 🔄 **Testing** on additional use cases
- 🔄 **Framework validation** (DRIFT, Fetch, 6D)
- 🔄 **Edge case handling**
- 🔄 **Performance optimization**

## Get Notified

Want to know when CAL is released?

- **Watch**: [github.com/semanticintent](https://github.com/semanticintent)
- **Follow**: The [Cormorant Foraging](https://cormorantforaging.dev) project
- **Check**: This documentation will be updated when available

## Current Status

**Documentation**: Complete and available for review
**Repository**: Private, testing in progress
**Expected**: Public release after validation phase

## Next Steps

While you wait, explore the documentation:

- [Quick Start Tutorial](/guide/quick-start) - See what CAL will do
- [Learn Core Concepts](/guide/concepts) - Understand the methodology
- [Explore the Language](/language/syntax) - Study the syntax
- [Review Frameworks](/frameworks/drift) - Learn DRIFT and Fetch

---

::: tip Stay Connected
Follow updates at [Cormorant Foraging](https://cormorantforaging.dev) and [StratIQX](https://stratiqx.com).
:::
