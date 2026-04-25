# EMBER — Sibling DSL

CAL and EMBER are sibling languages in the same methodology family. Both instantiate **[Methodology-as-Infrastructure](https://doi.org/10.5281/zenodo.18946631)** — the principle that analytical frameworks can be encoded as deterministic infrastructure other systems build upon.

They operate at different layers. They serve different domains.

---

## The Relationship

**CAL is methodology-as-executor.** Write a CAL script and something runs — cascade analysis executes, scores emerge, alerts fire. CAL is computation.

**EMBER is methodology-as-memory.** Write an EMBER file and something is recorded — intent is captured, artifacts travel forward, agents and humans read them without a manual. EMBER is representation.

```
CAL     →  methodology becomes computation
            write it, something executes it, decisions emerge

EMBER   →  methodology becomes representation
            write it, agents and humans read it,
            the pipeline carries it forward as permanent state
```

Neither is more correct. They operate at different layers of the same pattern.

---

## The Pattern Family

| Property | CAL | EMBER |
|---|---|---|
| Domain | Cascade analysis | Legacy modernization |
| Execution | Runs — produces scores and alerts | Represents — carries artifacts forward |
| Layer | Runtime / executor | Memory / intermediate representation |
| Pipeline | 6D → Sense → Analyze → Decide → Act | Phoenix → Extract → Synthesize → Build → Certify |
| Keywords | `FORAGE` `DRIFT` `FETCH` `CHIRP` ... | `SIGNAL` `WORKFLOW` `SCREEN` `SPEC` `EPISODE` |
| Output | Analysis scores, cascade maps, action alerts | Mission briefs, process traces, specs, certification |

---

## Side by Side

```
CAL script                          EMBER spec

FORAGE entities WHERE sound > 7     CONSTRUCT  spec
ACROSS D1, D2, D3, D5, D6          ID         cart.checkout
DEPTH 3                             VERSION    1
SURFACE cascade_map                 ─────────────────────────────
                                    intent:
DRIFT cascade_map                     Allow a customer to purchase
  METHODOLOGY 85                      and receive confirmation
  PERFORMANCE 35
FETCH cascade_map THRESHOLD 1000    rules:
ON EXECUTE CHIRP critical "Act now"   - Charge before order created
                                      - Promo before total

↓ executes → produces scores        ↓ read by agents → informs build
```

CAL tells the system what to decide. EMBER tells the system what was meant.

---

## Full EMBER Documentation

EMBER is native to Project Phoenix — it is the artifact language of the seven-agent pipeline. The complete specification lives alongside Phoenix:

**[EMBER language specification →](https://phoenix.cormorantforaging.dev/ember/)**

Covers: constructs (`SIGNAL`, `WORKFLOW`, `SCREEN`, `SPEC`, `EPISODE`), file structure, naming conventions, and the `phoenix-runtime` CLI.

---

---

**Foundation:** Shatny, M. *Methodology-as-Infrastructure: From Framework to Runtime.* Zenodo, 2026. [doi.org/10.5281/zenodo.18946631](https://doi.org/10.5281/zenodo.18946631)

*EMBER v0.1 — [Project Phoenix](https://phoenix.cormorantforaging.dev) — Part of the [Cormorant Foraging](https://cormorantforaging.dev) methodology family*
