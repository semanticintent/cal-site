# 6D Dimensions Reference

## Overview

The 6D Framework maps organizational impact:

```
┌─────────────────────────────────────────┐
│              6D DIMENSIONS              │
├─────────────────────────────────────────┤
│                                         │
│  D1 Customer    ←→    D2 Employee       │
│       ↕                    ↕            │
│  D3 Revenue     ←→    D4 Regulatory     │
│       ↕                    ↕            │
│  D5 Quality     ←→    D6 Operational    │
│                                         │
└─────────────────────────────────────────┘
```

## Dimension Details

### D1: Customer
**External stakeholders**

| Signal | Indicators |
|--------|------------|
| Sound | Complaints, churn signals, NPS drops |
| Space | Market segments affected |
| Time | Speed of sentiment change |

### D2: Employee
**Internal people**

| Signal | Indicators |
|--------|------------|
| Sound | Attrition, engagement scores |
| Space | Teams/departments affected |
| Time | Velocity of change |

### D3: Revenue
**Financial impact**

| Signal | Indicators |
|--------|------------|
| Sound | Revenue decline, cost increases |
| Space | Product lines, markets |
| Time | Rate of financial change |

### D4: Regulatory
**Compliance**

| Signal | Indicators |
|--------|------------|
| Sound | Audit findings, violations |
| Space | Jurisdictions, regulations |
| Time | Compliance deadlines |

### D5: Quality
**Product/Service**

| Signal | Indicators |
|--------|------------|
| Sound | Defects, technical debt |
| Space | Products, features affected |
| Time | Quality degradation rate |

### D6: Operational
**Processes/Systems**

| Signal | Indicators |
|--------|------------|
| Sound | System failures, process breaks |
| Space | Infrastructure scope |
| Time | Operational velocity |

## Cascade Pathways

Common cascade flows:

```
D6 → D2 → D5 → D1 → D3
(Operations fail → Employees struggle → Quality drops →
 Customers leave → Revenue falls)

D3 → D2 → D6
(Revenue pressure → Layoffs → Operational gaps)

D2 → D5 → D1
(Knowledge loss → Quality issues → Customer impact)
```

## Using Dimensions in CAL

```cal
-- Analyze specific dimensions
FORAGE entities
ACROSS D1, D2, D3
DEPTH 3

-- Analyze all dimensions
FORAGE entities
ACROSS D1, D2, D3, D4, D5, D6
DEPTH 2

-- Or use shorthand
FORAGE entities
ACROSS ALL
DEPTH 2
```

## Scoring Formula

Each dimension is scored using the 3D lens:

```
Dimension Score = (Sound × Space × Time) / 10
```

**Example:**
- D2 (Employee): Sound=9, Space=7, Time=8
- Score = (9 × 7 × 8) / 10 = 50.4

## Cascade Level

| Score | Level |
|-------|-------|
| ≥ 70 | Critical |
| ≥ 50 | High |
| ≥ 30 | Medium |
| ≥ 15 | Low |
| < 15 | Minimal |

The level labels describe how strong a dimension's 3D Lens score is. Earlier versions also attached a probability to each level (90% down to 10%); those numbers were assumptions, not measured, and are deprecated from runtime 1.6.0 (removal in 2.0.0). For how cascades actually move between dimensions, see the counted patterns from the published cases in the [6D methodology](https://6d.semanticintent.dev).

## Next Steps

- [See Full Examples](/language/examples)
- [Learn the 6D Methodology](/frameworks/6d)
- [Explore DRIFT Measurement](/frameworks/drift)
