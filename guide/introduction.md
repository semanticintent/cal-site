# Introduction to CAL

::: tip Documentation Preview
This is the complete documentation for CAL. The language is currently in testing before public release. Repository coming soon at [github.com/semanticintent](https://github.com/semanticintent).
:::

## What is CAL?

CAL (Cascade Analysis Language) is a domain-specific programming language designed for cascade analysis and autonomous decision-making.

### The Problem CAL Solves

When something goes wrong in an organization, the visible cost is rarely the full cost:

```
Visible Cost: $100K (what you see)
        ↓
    [CASCADE]
        ↓
Actual Cost: $700K - $1.1M (what you miss)
```

CAL finds the hidden 70-90%.

### How It Works

```
┌─────────────────────────────────────────┐
│           THE CAL PIPELINE              │
├─────────────────────────────────────────┤
│                                         │
│  SENSE     →  FORAGE, LISTEN, PERCH     │
│      ↓                                  │
│  ANALYZE   →  DIVE, TRACE, ACROSS       │
│      ↓                                  │
│  MEASURE   →  DRIFT                     │
│      ↓                                  │
│  DECIDE    →  FETCH                     │
│      ↓                                  │
│  ACT       →  CHIRP, SURFACE            │
│      ↓                                  │
│  └──────────── LOOP ────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

### Your First CAL Script

```cal
-- Find high-urgency situations
FORAGE entities
WHERE sound > 7
ACROSS D1, D2, D3
DEPTH 2
SURFACE results
```

This script:
1. Searches for entities with urgency > 7
2. Analyzes across Customer (D1), Employee (D2), Revenue (D3)
3. Traces cascades 2 levels deep
4. Outputs to `results`

### The Cormorant Connection

CAL is built on the Cormorant Foraging methodology:

| Cormorant Behavior | CAL Concept |
|-------------------|-------------|
| Flies (surveys) | FORAGE |
| Perches (observes) | PERCH |
| Listens (detects) | LISTEN, CHIRP |
| Dives (retrieves) | DIVE, FETCH |
| Remembers (patterns) | WAKE |

The cormorant is the only bird that masters air, land, AND water. CAL masters Signal, Structure, AND Time.

### Lineage

CAL's core pattern — structured input, generated output, auditable artifacts — traces to **.netTiers** (2005–2010), one of the earliest schema-driven code generation frameworks for .NET. The same founding contributor created both. In 2005, the input was a database schema and the output was a typed data access layer. In 2026, the input is a business event and the output is a six-dimensional cascade analysis with scored dimensions, mapped propagation chains, and reproducible source code. The pattern is the same. The domain changed.

## Next Steps

- [Install CAL](/guide/installation)
- [Try the Quick Start](/guide/quick-start)
- [Learn Core Concepts](/guide/concepts)
