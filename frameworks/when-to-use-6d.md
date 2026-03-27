# When to Use 6D Cascade Analysis

## The Problem with Isolated Frameworks

Traditional business analysis frameworks evaluate dimensions independently. When a disruption hits, they tell you *what* changed — but not *how it propagates*.

A supply chain failure doesn't stay in operations. It cascades into revenue, then customer retention, then employee morale, then quality, then regulatory exposure. By the time you've run five separate analyses, the cascade has already moved.

## 6D vs Traditional Frameworks

### SWOT Analysis

**What it does:** Identifies strengths, weaknesses, opportunities, and threats as four independent quadrants.

**What it misses:** How a weakness in one area cascades into a threat in another. SWOT treats each quadrant as static. Business events are dynamic — a revenue weakness (D3) triggers an employee exodus (D2) that degrades quality (D5) that loses customers (D1). SWOT sees four separate findings. 6D sees one cascade chain.

**Use SWOT when:** You need a quick strategic snapshot for a stable business.
**Use 6D when:** Something broke and you need to trace where the damage propagates.

### Porter's Five Forces

**What it does:** Maps competitive pressure from suppliers, buyers, substitutes, new entrants, and rivalry.

**What it misses:** Internal propagation. Porter's is external-facing — it tells you the competitive landscape but not how a competitive shock moves through your organization's six dimensions. When a new entrant (Porter's) triggers a pricing war that hits revenue (D3), cascading into layoffs (D2), then quality decline (D5), then customer attrition (D1) — Porter's sees the trigger. 6D maps the full chain.

**Use Porter's when:** You're evaluating market positioning and competitive dynamics.
**Use 6D when:** A competitive force has already hit and you need to trace its internal propagation path.

### PESTEL Analysis

**What it does:** Lists Political, Economic, Social, Technological, Environmental, and Legal factors affecting a business.

**What it misses:** Sequence and severity. PESTEL identifies macro factors but doesn't score them, sequence them, or trace how they interact. A regulatory change (PESTEL's Political/Legal) that forces operational restructuring (D6) that degrades service quality (D5) that triggers customer switching (D1) — PESTEL lists the factors. 6D maps the cascade, scores each dimension, and calculates the aggregate impact.

**Use PESTEL when:** You need a macro-environmental scan before entering a market.
**Use 6D when:** A macro factor has activated and you need to measure its multi-dimensional impact.

### McKinsey 7S

**What it does:** Evaluates organizational alignment across Strategy, Structure, Systems, Shared Values, Skills, Staff, and Style.

**What it misses:** External triggers and cascade dynamics. 7S is an internal alignment tool — it assumes the seven elements exist in equilibrium and asks whether they're aligned. 6D starts with a disruption event and traces how it breaks that equilibrium across externally-facing dimensions (Customer, Revenue, Regulatory) and internally-facing dimensions (Employee, Quality, Operational).

**Use 7S when:** You're restructuring or assessing organizational health in stable conditions.
**Use 6D when:** An external event has disrupted the organization and you need to trace the propagation path.

## The 6D Difference

| Capability | SWOT | Porter's | PESTEL | 7S | **6D** |
|-----------|------|----------|--------|-----|--------|
| Identifies factors | Yes | Yes | Yes | Yes | Yes |
| Scores severity | No | No | No | No | **Yes (0-100)** |
| Maps sequence | No | No | No | No | **Yes (Origin > L1 > L2)** |
| Traces propagation | No | No | No | No | **Yes (cascade chains)** |
| Cross-calibrates | No | No | No | No | **Yes (155+ case library)** |
| Reproducible output | No | No | No | No | **Yes (CAL source code)** |
| Machine-executable | No | No | No | No | **Yes (cal-runtime on npm)** |
| Forward-looking triggers | No | No | No | No | **Yes (WATCH/prognostic)** |

## When to Use Each

```
"What are our strengths?"           → SWOT
"Who are our competitors?"          → Porter's Five Forces
"What macro trends affect us?"      → PESTEL
"Are we internally aligned?"        → McKinsey 7S
"Something happened — what's the    → 6D Cascade Analysis
 full impact and where does it go?"
```

## 6D Is Not a Replacement

6D doesn't replace these frameworks. It fills the gap none of them cover: **propagation dynamics**. A strategy team might use PESTEL to identify a regulatory change, then use 6D to trace how that change cascades across all six organizational dimensions.

The frameworks are complementary. The difference is that 6D is the only one that:

1. **Scores** each dimension independently (0-100)
2. **Sequences** the cascade chain (Origin > L1 > L2)
3. **Calculates** aggregate impact (FETCH score)
4. **Measures** the gap between stated position and revealed reality (DRIFT)
5. **Ships source code** — every analysis is written in CAL and reproducible
6. **Calibrates** against a growing library of 155+ published case studies

## Real-World Application

When Silicon Valley Bank collapsed in 48 hours ([UC-039](https://uc-039.stratiqx.com)):

- **SWOT** would have listed "concentrated deposits" as a weakness
- **Porter's** would have noted competitive pressure from higher-yielding alternatives
- **PESTEL** would have flagged the interest rate environment
- **6D** traced the full cascade: D3 (revenue/asset mismatch) > D1 (deposit flight at $1M/second) > D2 (employee panic) > D4 (regulatory intervention) > D6 (operational seizure) > D5 (trust collapse) — all six dimensions compromised in 48 hours, scored and sequenced

The difference is not what you find. It's whether you see how it moves.

## Getting Started

- [Introduction to CAL](/guide/introduction) — The language that makes 6D reproducible
- [Core Concepts](/guide/concepts) — Dimensions, cascades, and scoring
- [Case Library](https://uc-000.stratiqx.com) — 155+ published analyses across 80+ sectors
- [@stratiqx/cal-runtime](https://www.npmjs.com/package/@stratiqx/cal-runtime) — The npm runtime engine
