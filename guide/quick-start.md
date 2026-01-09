# Quick Start

## 5-Minute Tutorial

### Step 1: Write Your First Script

Create `my-analysis.cal`:

```cal
-- My first CAL script
FORAGE entities
WHERE sound > 5
ACROSS D1, D2, D3
DEPTH 2
SURFACE my_results
```

### Step 2: Create Sample Data

Create `data.json`:

```json
{
  "entities": [
    {
      "id": "situation-001",
      "name": "Product Launch Delay",
      "sound": 7,
      "space": 6,
      "time": 8,
      "baseCost": 50000,
      "dimensions": {
        "D1": { "sound": 5, "space": 6, "time": 7 },
        "D2": { "sound": 8, "space": 7, "time": 8 },
        "D3": { "sound": 7, "space": 8, "time": 7 }
      }
    }
  ]
}
```

### Step 3: Run Analysis

```bash
node run.js my-analysis.cal --data data.json
```

### Step 4: See Results

```
📦 my_results:
   Count: 1
   Dimensions Affected: 3
   Average Score: 42.7
   Impact Range: $200,000 - $300,000
```

### Step 5: Add DRIFT and FETCH

Extend your script:

```cal
-- Analysis
FORAGE entities
WHERE sound > 5
ACROSS D1, D2, D3
DEPTH 2
SURFACE cascade_map

-- Measure gap
DRIFT cascade_map
METHODOLOGY 80
PERFORMANCE 40

-- Decide action
FETCH cascade_map
THRESHOLD 500
ON EXECUTE CHIRP alert "Take action now"
ON WAIT PERCH ON segment:"monitor"
```

Run again and watch the CHIRP fire when Fetch exceeds threshold!

## What's Next?

- [Understand Core Concepts](/guide/concepts)
- [Learn the Language Syntax](/language/syntax)
- [Explore Keywords](/language/keywords)
- [Try the Playground](/playground)
