---
layout: doc
title: Playground
aside: false
---

<script setup>
import CALPlayground from './.vitepress/theme/components/CALPlayground.vue'
</script>

<style>
/* Full-width playground */
.vp-doc .container {
  max-width: 100% !important;
  padding: 0 !important;
}

.vp-doc .content {
  max-width: 100% !important;
  padding: 2rem 1rem !important;
}
</style>

# CAL Playground

Try CAL syntax with pre-loaded examples. Write cascade analysis code on the left, see outputs on the right.

<CALPlayground />

---

## About These Examples

All examples demonstrate real CAL syntax patterns:

- **FORAGE** - Entity discovery with filters and cascade mapping
- **DRIFT** - Methodology vs Performance gap measurement
- **FETCH** - Threshold-based decision making
- **CHIRP** - Alert and notification triggers
- **Full Pipelines** - Complete closed-loop workflows

### What You're Seeing:

1. **CAL Code** - Real language syntax with keywords, operators, and structure
2. **Example Output** - Formatted results showing cascade impacts, DRIFT measurements, and FETCH decisions
3. **Case Studies** - Real-world examples like the Tailwind CSS analysis from UC-002

### Key Features Demonstrated:

- 🪶 **Methodology-Native** - FORAGE, DRIFT, FETCH as keywords, not functions
- 📊 **6D Cascade Mapping** - Multi-dimensional impact analysis (D1-D6)
- 🎯 **DRIFT Measurement** - Quantify gaps between what you know and what you do
- ⚡ **FETCH Decisions** - Automated threshold-based action triggers
- 🔄 **Closed-Loop Intelligence** - Sense → Analyze → Measure → Decide → Act

---

## Live Execution Coming Soon

This playground currently shows pre-determined outputs for each example. The full interactive version with real CAL execution is coming soon and will include:

- ✅ Real-time CAL parsing and execution
- ✅ Custom data input (JSON/CSV)
- ✅ Interactive cascade visualizations
- ✅ Editable code with syntax highlighting
- ✅ Save and share scripts

Want to try CAL with real execution now?

👉 [Install CAL Locally](/guide/installation) - Once the repository is public

---

## Understanding the Syntax

### Keywords

- `FORAGE` - Discover entities and map cascades
- `DRIFT` - Measure methodology vs performance gaps
- `FETCH` - Make threshold-based decisions
- `CHIRP` - Send alerts and notifications
- `PERCH` - Persist results for later analysis
- `DIVE` - Deep-dive into specific entities

### Operators

- `WHERE` - Filter conditions
- `ACROSS` - Specify dimensions (D1, D2, D3, D5, D6)
- `DEPTH` - How many cascade levels to analyze
- `SURFACE` - Name the output
- `THRESHOLD` - Decision point for FETCH
- `ON EXECUTE` / `ON SKIP` - Conditional actions

### Dimensions

- **D1: Customer** - Customer experience impact
- **D2: Employee** - Workforce and culture effects
- **D3: Revenue** - Business growth and opportunities
- **D5: Quality** - Standards and technical excellence
- **D6: Operational** - Systems and process efficiency

---

## Want to Try More?

Explore the full language reference:

- **[Syntax Guide](/language/syntax)** - Complete CAL grammar
- **[Keywords Reference](/language/keywords)** - All CAL keywords explained
- **[Code Examples](/language/examples)** - More complex patterns
- **[DRIFT Framework](/frameworks/drift)** - Methodology explained
- **[Fetch Framework](/frameworks/fetch)** - Decision logic details

---

## Ready to Use CAL?

While CAL is still in testing before public release:

1. **[Read the Docs](/guide/introduction)** - Understand the methodology
2. **[Learn the Language](/language/syntax)** - Study CAL syntax
3. **[Review Case Studies](/language/examples)** - See real examples
4. **[Watch for Release](https://github.com/semanticintent)** - GitHub coming soon

---

<div style="text-align: center; margin-top: 3rem; padding: 2rem; background: var(--vp-c-bg-soft); border-radius: 12px;">

**The only language where cascade analysis is syntax, not a library.**

*Find what companies miss.* 🪶

[Get Started →](/guide/introduction)

</div>
