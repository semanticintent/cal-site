# Introduction to CAL

::: tip Published
The runtime is on npm as [`@stratiqx/cal-runtime`](https://www.npmjs.com/package/@stratiqx/cal-runtime), the source is at [github.com/semanticintent/cal-runtime](https://github.com/semanticintent/cal-runtime), and this specification is citable at [10.5281/zenodo.18905196](https://doi.org/10.5281/zenodo.18905196).
:::

## What is CAL?

CAL (Cascade Analysis Language) is a domain-specific programming language designed for cascade analysis and autonomous decision-making.

### The Problem CAL Solves

When something happens to an organization, its effects rarely stay in one place. A layoff reaches quality, quality reaches customers, customers reach revenue. CAL records how an event moves across six dimensions, scores each one from the evidence, and turns those scores into a decision anyone can recompute.

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
│  VALIDATE  →  RECALL                    │
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
| Recalls (validates) | RECALL |

The cormorant is the only bird that masters air, land, AND water. CAL masters Signal, Structure, AND Time.

### Lineage

CAL's core pattern — structured input, generated output, auditable artifacts — traces to **.netTiers** (2005–2010), one of the earliest schema-driven code generation frameworks for .NET. The same founding contributor created both. In 2005, the input was a database schema and the output was a typed data access layer. In 2026, the input is a business event and the output is a six-dimensional cascade analysis with scored dimensions, mapped propagation chains, and reproducible source code. The pattern is the same. The domain changed.

This pattern — methodology compiled into deterministic execution — is formalized in [*Methodology-as-Infrastructure: From Framework to Runtime*](https://doi.org/10.5281/zenodo.18946631) (Shatny, 2026). CAL is the primary case study.

## Next Steps

- [Install CAL](/guide/installation)
- [Try the Quick Start](/guide/quick-start)
- [Learn Core Concepts](/guide/concepts)
