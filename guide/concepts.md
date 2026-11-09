# Core Concepts

## The 5-Layer Stack

CAL operates in five layers:

### Layer 1: SENSE
**Question:** "What's happening?"

| Keyword | Purpose |
|---------|---------|
| `FORAGE` | Query and search |
| `LISTEN` | Monitor signals |
| `PERCH` | Set observation position |
| `WAKE` | Time-based trigger |

### Layer 2: ANALYZE
**Question:** "What's the cascade?"

| Keyword | Purpose |
|---------|---------|
| `DIVE` | Deep analysis |
| `TRACE` | Follow pathways |
| `ACROSS` | Specify dimensions |
| `DEPTH` | Cascade levels |

### Layer 3: MEASURE
**Question:** "How big is the gap?"

| Keyword | Purpose |
|---------|---------|
| `DRIFT` | Gap measurement |

### Layer 4: DECIDE
**Question:** "Should I act?"

| Keyword | Purpose |
|---------|---------|
| `FETCH` | Action decision |

### Layer 5: ACT
**Question:** "Execute what?"

| Keyword | Purpose |
|---------|---------|
| `CHIRP` | Send alert |
| `SURFACE` | Output results |

---

## The 3D Lens

CAL observes through three dimensions:

| Dimension | Question | Alias | Range |
|-----------|----------|-------|-------|
| **Sound** | How urgent? | Chirp | 1-10 |
| **Space** | How widespread? | Perch | 1-10 |
| **Time** | How fast? | Wake | 1-10 |

### Scoring

```
Score = (Sound × Space × Time) / 10
```

Example: Sound=8, Space=7, Time=9
```
Score = (8 × 7 × 9) / 10 = 50.4
```

---

## The 6 Dimensions

CAL maps impact across:

| ID | Dimension | Description |
|----|-----------|-------------|
| D1 | Customer | External stakeholders |
| D2 | Employee | Internal people |
| D3 | Revenue | Financial impact |
| D4 | Regulatory | Compliance |
| D5 | Quality | Product/service |
| D6 | Operational | Processes/systems |

---

## Cascade Multiplier (deprecated)

Earlier versions estimated a cost multiplier from dimensions × depth. That estimate had no published evidence behind it and is **deprecated** as of runtime 1.5.0 (to be removed in 2.0.0). The 6D methodology reports the number of dimensions hit and the cascade depth directly instead.

---

## Next Steps

- [Explore Language Syntax](/language/syntax)
- [Learn All Keywords](/language/keywords)
- [Understand DRIFT Framework](/frameworks/drift)
- [Master Fetch Decisions](/frameworks/fetch)
