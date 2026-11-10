# Benchmarks

*Added in CAL spec v1.3.0 and runtime 1.7.0. Optional.*

Benchmarks replace the retired cascade multiplier. Each one is a ratio taken from a published, cited source and computed by the runtime. A case supplies inputs only, never a multiplier. When no benchmark fits a case, none is shown.

## Why the multiplier was retired

6D v1 defined the multiplier as *total cascade cost ÷ visible cost*. Cases rarely had sourced costs on both sides, so in practice it was read off an unsourced table of typical ranges ("2–4×", "7–15×") or typed as free text. FETCH never used it. Published research supports ratios **for one kind of event in one field**, not one number across all six dimensions. Benchmarks follow that evidence.

## Three tiers

| Tier | Fits | Value | Function |
|---|---|---|---|
| **Sector** | A case about U.S. activity in one industry | BEA output multiplier: total U.S. output required, directly and through suppliers, per $1 of final demand for that industry | `sectorReach(code, year?)` |
| **Event** | A case about one incident at one firm | A published ratio for that event type, picked by its size tier | `eventRatio(id, directCost?)` |
| **Measured** | A case at review with sourced first and final costs | Final cost ÷ first reported cost | `measuredMultiplier(first, final)` |

## Rules

1. **A lookup, not a judgement.** The case's BEA industry code, event type and sourced direct cost select the value. A case cannot choose among ratios.
2. **Tiered entries need a sourced direct cost.** Without one, no ratio is given.
3. **Shown separately, never added.** Each benchmark is shown with its source and scope. Benchmarks are never blended into one multiplier.
4. **Share-price ratios are not costs.** Entries of kind `market_value` measure a fall in market value at listed firms. They are never added to cost ratios.
5. **Scope is part of the value.** A ratio applies only to the events, firms, places and years its source studied. BEA multipliers describe the U.S. economy.
6. **If nothing matches, nothing is shown.**

## Sector tier: BEA output multipliers

Source: U.S. Bureau of Economic Analysis, *Industry-by-Industry Total Requirements* (supply-use framework, producers' prices), the row *Total industry output requirement*, 1997–2023, for 15 sectors and 71 summary industries. The runtime uses the latest BEA year at or before the case year.

| Example (2023) | Code | Multiplier |
|---|---|---|
| Motor vehicles, bodies and trailers, and parts | 3361MV | 2.83 |
| Construction | 23 | 1.90 |
| Air transportation | 481 | 1.90 |
| Computer systems design | 5415 | 1.48 |
| Housing | HS | 1.17 |

It measures how far demand spreads through supply chains in the economy. It does not measure hidden costs inside a firm.

## Event tier: registry 1.0.0

Every entry was checked against its primary source on 2026-11-10.

| ID | Dimension | Event | Value | Kind | Source |
|---|---|---|---|---|---|
| `osha-injury-indirect` | D2 (D6) | Workplace injury | 4.5 / 1.6 / 1.2 / 1.1 by direct cost (<$3k, <$5k, <$10k, $10k+) | cost ratio | OSHA, *$afety Pays* (construction) |
| `armour-fsa-fine` | D4 → D3, D1 | Fine for misconduct harming customers or investors | ≈ 9× the fine | market value | Armour, Mayer & Polo (2017), *JFQA* 52(4) |
| `karpoff-misrepresentation` | D4 → D3 | SEC action for financial misrepresentation | > 7.5× legal penalties | market value | Karpoff, Lee & Martin (2008), *JFQA* 43(3) |
| `jarrell-peltzman-drug-recall` | D5 → D3 | Major drug or device recall | 12× direct cost | market value | Jarrell & Peltzman (1985), *JPE* 93(3) |
| `hallegatte-disaster` | D6 → D3 | Natural disaster, regional economy | 1.39× ($50–200B direct), 2× ($200B+) | cost ratio | Hallegatte (2008), *Risk Analysis* 28(3) |
| `ibm-breach-lost-business` | D1 → D3 | Data breach | 31% of total cost is lost business | cost share | IBM / Ponemon, *Cost of a Data Breach 2025* |
| `cap-turnover` | D2 | Employee leaves and is replaced | median 21% of salary | sizing | Boushey & Glynn (2012), Center for American Progress |

**Held back:** HSE HSG96 (8:1 to 36:1). The primary text could not be reached, and secondary sources disagree on what it measures.

**Excluded as folklore:** Heinrich's 4:1; Bird's $5–50 iceberg; "6–9 months of salary" (no primary SHRM study); "acquiring a customer costs 5–25× keeping one"; the 1:10:100 defect-cost rule; Gartner's $5,600 per minute of downtime.

## Measured tier

At a case's review, when both the first reported cost (a provision or first estimate) and the final cost are sourced and in the same unit, the runtime computes final ÷ first. Measured values from the library can later become registry entries, with the library as the cited source.

## Runtime

```ts
import { sectorReach, eventRatio, measuredMultiplier } from '@stratiqx/cal-runtime'

sectorReach('23')                               // { industry: 'Construction', year: 2023, multiplier: 1.9004, ... }
eventRatio('osha-injury-indirect', 2500)        // { value: 4.5, tier: { min: 0, max: 3000 }, kind: 'cost_ratio', ... }
eventRatio('armour-fsa-fine')                   // { value: 9, kind: 'market_value', ... }
measuredMultiplier(6.5, 32)                     // 4.92
```

Each function throws `BenchmarkError` for an unknown code or entry, a missing direct cost on a tiered entry, or a size outside every tier. The data lives in `data/benchmarks/` in the runtime repository.
