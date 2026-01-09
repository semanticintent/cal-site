# DRIFT Framework

## What is DRIFT?

DRIFT measures the gap between what something **demonstrates** (Methodology) and what it **performs** (Performance).

```
DRIFT = Methodology − Performance
```

## The Insight

From content analysis research:

- **Negative gap** → Creates curiosity (entertainment)
- **Positive gap** → Enables teaching (educational)

## Formula

```
DRIFT = Methodology Score − Performance Score

Where:
  Methodology = What it SHOULD demonstrate (0-100)
  Performance = What it actually DOES (0-100)
```

## Gap Types

| Type | Optimal Range | Use Case |
|------|---------------|----------|
| **Curiosity** | -20 to -11 | Viral content, engagement |
| **Teaching** | +8 to +15 | Education, training |

## Quality Assessment

| DRIFT | Quality | Meaning |
|-------|---------|---------|
| In optimal range | Optimal | Perfect balance |
| \|DRIFT\| > 25 | Extreme | Gap too large |
| \|DRIFT\| < 5 | Minimal | Gap too small |
| Otherwise | Moderate | Room to improve |

## CAL Syntax

```cal
DRIFT <target>
METHODOLOGY <score>
PERFORMANCE <score>
[GAP curiosity|teaching|auto]
```

## Example

```cal
DRIFT cascade_map
METHODOLOGY 85
PERFORMANCE 35
```

**Output:**
```json
{
  "drift": 50,
  "absDrift": 50,
  "gapType": "teaching",
  "driftQuality": "extreme",
  "interpretation": "Over-explanation - may cause cognitive overload"
}
```

## Integration with Fetch

DRIFT feeds into Fetch:

```
Fetch = Chirp × |DRIFT| × Confidence
```

The gap size directly influences action urgency.

## Real-World Example

**Tailwind CSS Case (UC-002):**

```cal
DRIFT tailwind_cascade
METHODOLOGY 85  -- Company demonstrated 85% of methodology
PERFORMANCE 35  -- But only performed at 35%

-- Result:
-- DRIFT = 50 (extreme teaching gap)
-- Meaning: Massive gap between what they knew and what they did
```

## Use Cases

### 1. Content Quality Assessment
```cal
DRIFT content_performance
METHODOLOGY 80
PERFORMANCE 60
GAP teaching
-- Use for educational content optimization
```

### 2. Organizational Maturity
```cal
DRIFT process_execution
METHODOLOGY 90
PERFORMANCE 45
-- Measures theory vs. practice gap
```

### 3. Tool Adoption
```cal
DRIFT tool_usage
METHODOLOGY 75
PERFORMANCE 25
-- Tracks implementation vs. capability gap
```

## Next Steps

- [Learn Fetch Decisions](/frameworks/fetch)
- [Explore 6D Methodology](/frameworks/6d)
- [See Full Examples](/language/examples)
