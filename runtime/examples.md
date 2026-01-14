# Examples

Walkthrough of example scripts demonstrating CAL features and real-world usage.

## Overview

The runtime includes four example scripts that progressively demonstrate CAL features, from basic queries to complete closed-loop analysis pipelines.

**Example Scripts:**
1. **simple-query.cal** - Basic entity querying
2. **drift-analysis.cal** - Gap measurement with DRIFT
3. **tailwind-cascade.cal** - Multi-dimensional cascade analysis
4. **closed-loop-pipeline.cal** - Complete 5-layer intelligence pipeline

All examples use the same sample dataset: `examples/data/entities.json`

## Running Examples

```bash
# Clone or install
npm install @stratiqx/cal-runtime

# Run any example
cal run examples/simple-query.cal --data examples/data/entities.json

# Verbose output
cal run examples/tailwind-cascade.cal --data examples/data/entities.json --verbose

# Save results
cal run examples/closed-loop-pipeline.cal \
  --data examples/data/entities.json \
  --output results.json
```

## Sample Dataset

All examples use `examples/data/entities.json` containing four entities:

### Entity 1: Tailwind CSS
High-impact cascade example (80% revenue decline, 75% layoffs):

```json
{
  "id": "tailwind-css",
  "name": "Tailwind CSS",
  "sound": 9,
  "space": 8,
  "time": 9,
  "impact": "high",
  "baseCost": 300000,
  "dimensions": {
    "D1": { "sound": 5, "space": 6, "time": 7 },
    "D2": { "sound": 9, "space": 8, "time": 8 },
    "D3": { "sound": 9, "space": 9, "time": 8 },
    "D5": { "sound": 6, "space": 7, "time": 5 },
    "D6": { "sound": 9, "space": 8, "time": 8 }
  }
}
```

### Entity 2: Stack Overflow
High-impact with traffic decline (35%):

```json
{
  "id": "stack-overflow",
  "name": "Stack Overflow",
  "sound": 7,
  "space": 7,
  "time": 7,
  "impact": "high",
  "baseCost": 500000
}
```

### Entity 3: GitHub Copilot
High-impact growth enabler:

```json
{
  "id": "github-copilot",
  "name": "GitHub Copilot",
  "sound": 8,
  "space": 9,
  "time": 8,
  "impact": "high",
  "baseCost": 0
}
```

### Entity 4: Stable Enterprise Co
Low-impact baseline:

```json
{
  "id": "stable-company",
  "name": "Stable Enterprise Co",
  "sound": 3,
  "space": 4,
  "time": 3,
  "impact": "low",
  "baseCost": 100000
}
```

## Example 1: Simple Query

**File:** `examples/simple-query.cal`

Basic entity querying with filters.

### Script

```cal
-- ================================================
-- Cormorant Agentic Language (CAL)
-- Example: Simple Entity Query
-- ================================================

-- Find all high-impact entities
FORAGE entities
WHERE impact = "high"
SURFACE results
```

### Concepts Demonstrated

- **FORAGE** keyword for querying
- **WHERE** clause filtering
- **SURFACE** for output

### Running

```bash
cal run examples/simple-query.cal --data examples/data/entities.json
```

### Expected Output

```
📦 results:
   Type: Array
   Count: 3
```

The query returns three entities with `impact = "high"`:
- Tailwind CSS
- Stack Overflow
- GitHub Copilot

### Key Takeaway

FORAGE + WHERE + SURFACE is the basic pattern for querying and filtering entities.

## Example 2: DRIFT Analysis

**File:** `examples/drift-analysis.cal`

Gap measurement using the DRIFT formula.

### Script

```cal
-- ================================================
-- Cormorant Agentic Language (CAL)
-- Example: DRIFT Gap Analysis
-- ================================================

-- Find entities for analysis
FORAGE entities
WHERE sound > 5
SURFACE target_entities

-- Measure methodology-performance gap
DRIFT target_entities
METHODOLOGY 85
PERFORMANCE 40

-- Alert if gap is significant
CHIRP warning "Significant DRIFT detected in target entities"
```

### Concepts Demonstrated

- **DRIFT** keyword for gap measurement
- **METHODOLOGY** and **PERFORMANCE** values (0-100 scale)
- **CHIRP** for alerting
- Chaining multiple actions

### Formula

```
DRIFT = Methodology - Performance
DRIFT = 85 - 40 = 45 (teaching gap)
```

A positive DRIFT indicates a teaching gap: methodology exceeds performance, requiring more explanation.

### Running

```bash
cal run examples/drift-analysis.cal --data examples/data/entities.json
```

### Expected Output

```
⚠️ ═══════════════════════════════════════════════
   CHIRP: WARNING
   TIME: 2026-01-14T10:30:00.000Z
   ───────────────────────────────────────────────
   Significant DRIFT detected in target entities
   ═══════════════════════════════════════════════
```

### Key Takeaway

DRIFT measures gaps between expected (methodology) and actual (performance) states for adaptive behavior.

## Example 3: Tailwind Cascade

**File:** `examples/tailwind-cascade.cal`

Real-world cascade analysis based on the Tailwind CSS case study.

### Script

```cal
-- ================================================
-- Cormorant Agentic Language (CAL)
-- Example: Tailwind CSS Cascade Analysis
-- ================================================

-- Find affected entities with high urgency signals
FORAGE entities
WHERE sound > 7
AND impact = "high"
ACROSS D1, D2, D3, D5, D6
DEPTH 3
SURFACE cascade_map

-- Deep dive into revenue dimension
DIVE INTO revenue
WHEN decline > 80
TRACE cascade
EMIT financial_impact

-- Monitor for ongoing signals
PERCH ON segment:"open-source"
LISTEN FOR disruption signals, churn signals
WAKE AFTER 30d
CHIRP warning

-- Output final analysis
SURFACE report AS json
```

### Concepts Demonstrated

- **ACROSS** - Multi-dimensional analysis (D1, D2, D3, D5, D6)
- **DEPTH** - Cascade depth control (3 levels)
- **DIVE INTO** - Deep analysis with conditions
- **TRACE cascade** - Follow cascade pathways
- **PERCH ON** - Observation positioning
- **LISTEN FOR** - Signal monitoring
- **WAKE AFTER** - Time-based triggers
- Complex multi-action workflows

### Dimensions Analyzed

- **D1 (Customer)** - Customer trust damage
- **D2 (Employee)** - 75% layoffs, knowledge loss
- **D3 (Revenue)** - 80% revenue decline
- **D5 (Quality)** - Skeleton crew for 75M downloads
- **D6 (Operational)** - AI broke discovery funnel

### Running

```bash
cal run examples/tailwind-cascade.cal \
  --data examples/data/entities.json \
  --verbose
```

### Expected Results

The analysis reveals:
- **3 entities** with high urgency (sound > 7)
- **Multiple dimensions affected** across each entity
- **Cascade pathways** showing how impacts spread
- **Financial multipliers** based on dimensions × depth
- **Watchers** set up for ongoing monitoring

### Key Takeaway

CAL can model complex real-world cascades with multi-dimensional analysis, deep dives, and continuous monitoring.

## Example 4: Closed-Loop Pipeline

**File:** `examples/closed-loop-pipeline.cal`

Complete 5-layer intelligence pipeline: Sense → Analyze → Measure → Decide → Act.

### Script

```cal
-- ================================================
-- Cormorant Agentic Language (CAL)
-- Example: Full Closed-Loop Intelligence Pipeline
--
-- Sense → Analyze → Measure → Decide → Act
-- ================================================

-- LAYER 1: SENSE
-- Find affected entities with high urgency signals
FORAGE entities
WHERE sound > 7
AND impact = "high"
ACROSS D1, D2, D3, D5, D6
DEPTH 3
SURFACE cascade_map

-- LAYER 2: ANALYZE
-- Deep dive into the cascade
DIVE INTO revenue
WHEN decline > 50
TRACE cascade
EMIT impact_analysis

-- LAYER 3: MEASURE (DRIFT)
-- Measure the gap between methodology and performance
DRIFT cascade_map
METHODOLOGY 85
PERFORMANCE 35

-- LAYER 4: DECIDE (FETCH)
-- Determine action based on Fetch score
-- Fetch = Chirp × |DRIFT| × Confidence
FETCH cascade_map
THRESHOLD 1000
ON EXECUTE CHIRP critical "Immediate action required - cascade in progress"
ON CONFIRM CHIRP warning "Review recommended before action"
ON QUEUE SURFACE queue_report
ON WAIT PERCH ON segment:"monitor"

-- LAYER 5: ACT
-- Output final results
SURFACE results AS json
```

### The 5-Layer Intelligence Model

#### Layer 1: SENSE
Detect signals in the environment.

```cal
FORAGE entities
WHERE sound > 7
ACROSS D1, D2, D3, D5, D6
DEPTH 3
```

- Query entities with high urgency (sound > 7)
- Analyze across 5 dimensions
- Trace 3 levels deep

#### Layer 2: ANALYZE
Deep analysis of detected signals.

```cal
DIVE INTO revenue
WHEN decline > 50
TRACE cascade
```

- Focus on specific dimensions
- Apply conditions (decline > 50)
- Map cascade pathways

#### Layer 3: MEASURE
Quantify gaps and drift.

```cal
DRIFT cascade_map
METHODOLOGY 85
PERFORMANCE 35
```

- Calculate DRIFT: 85 - 35 = 50
- Large teaching gap indicates significant underperformance
- Triggers need for action

#### Layer 4: DECIDE
Determine appropriate action level.

```cal
FETCH cascade_map
THRESHOLD 1000
ON EXECUTE CHIRP critical
ON CONFIRM CHIRP warning
ON QUEUE SURFACE queue_report
ON WAIT PERCH ON segment
```

FETCH formula:
```
Fetch = Chirp × |DRIFT| × Confidence
```

Decision levels:
- **EXECUTE** (>1000): Immediate action
- **CONFIRM** (>500): Review needed
- **QUEUE** (>100): Schedule later
- **WAIT** (≤100): Continue monitoring

#### Layer 5: ACT
Execute the decided action.

```cal
SURFACE results AS json
```

- Output results
- Send alerts
- Set up monitoring
- Queue tasks

### Running

```bash
cal run examples/closed-loop-pipeline.cal \
  --data examples/data/entities.json \
  --output results.json
```

### Expected Flow

1. **SENSE**: 3 high-impact entities detected
2. **ANALYZE**: Revenue dimension shows 80% decline
3. **MEASURE**: DRIFT = 50 (large teaching gap)
4. **DECIDE**: FETCH score > 1000 → EXECUTE level
5. **ACT**: Critical alert sent, results output

### Key Takeaway

The closed-loop pipeline demonstrates complete intelligence workflows: sensing signals, analyzing patterns, measuring gaps, making decisions, and taking actions.

## Common Patterns

### Pattern 1: Query + Filter

```cal
FORAGE entities
WHERE sound > 7 AND type = "customer"
SURFACE high_priority
```

Use for: Finding specific entities

### Pattern 2: Query + DRIFT

```cal
FORAGE targets
WHERE impact = "high"
SURFACE analysis

DRIFT analysis
METHODOLOGY 85
PERFORMANCE 40
```

Use for: Gap measurement

### Pattern 3: Query + FETCH

```cal
FORAGE entities
WHERE sound > 7
SURFACE targets

FETCH targets
THRESHOLD 1000
ON EXECUTE CHIRP critical "Act now"
```

Use for: Decision logic

### Pattern 4: Query + Monitor

```cal
FORAGE entities
WHERE segment = "enterprise"
SURFACE targets

PERCH ON segment:"enterprise"
LISTEN FOR churn signals
WAKE AFTER 30d
CHIRP warning
```

Use for: Continuous monitoring

### Pattern 5: Full Pipeline

```cal
FORAGE entities WHERE sound > 7 SURFACE targets
DRIFT targets METHODOLOGY 85 PERFORMANCE 40
FETCH targets THRESHOLD 1000
  ON EXECUTE CHIRP critical "Act"
SURFACE results
```

Use for: Complete analysis workflows

## Modifying Examples

### Adjust Thresholds

```cal
-- Original
WHERE sound > 7

-- More sensitive
WHERE sound > 5

-- Less sensitive
WHERE sound > 8
```

### Change Dimensions

```cal
-- Original
ACROSS D1, D2, D3, D5, D6

-- Focus on financial
ACROSS D3

-- Include all
ACROSS D1, D2, D3, D4, D5, D6
```

### Adjust Cascade Depth

```cal
-- Original
DEPTH 3

-- Shallow analysis
DEPTH 1

-- Deep analysis
DEPTH 5
```

### Modify DRIFT Values

```cal
-- Original
METHODOLOGY 85
PERFORMANCE 40

-- Different gap
METHODOLOGY 90
PERFORMANCE 70
```

### Change FETCH Threshold

```cal
-- Original
THRESHOLD 1000

-- More aggressive
THRESHOLD 500

-- More conservative
THRESHOLD 2000
```

## Creating Custom Examples

### Step 1: Start Simple

```cal
-- my-analysis.cal
FORAGE entities
WHERE sound > 6
SURFACE results
```

### Step 2: Add Filtering

```cal
FORAGE entities
WHERE sound > 6
AND type = "customer"
AND segment = "enterprise"
SURFACE high_priority
```

### Step 3: Add Analysis

```cal
FORAGE entities
WHERE sound > 6
ACROSS D1, D2, D3
DEPTH 2
SURFACE cascade_analysis
```

### Step 4: Add Measurement

```cal
FORAGE entities WHERE sound > 6 SURFACE targets
DRIFT targets METHODOLOGY 80 PERFORMANCE 50
```

### Step 5: Add Decision Logic

```cal
FORAGE entities WHERE sound > 6 SURFACE targets
DRIFT targets METHODOLOGY 80 PERFORMANCE 50
FETCH targets THRESHOLD 1000
  ON EXECUTE CHIRP critical "Action required"
```

### Step 6: Add Output

```cal
FORAGE entities WHERE sound > 6 SURFACE targets
DRIFT targets METHODOLOGY 80 PERFORMANCE 50
FETCH targets THRESHOLD 1000
  ON EXECUTE CHIRP critical "Action required"
SURFACE final_report AS json
```

## Testing Examples

### Validate Syntax

```bash
cal validate examples/simple-query.cal
```

### Dry Run (Analyze)

```bash
cal analyze examples/tailwind-cascade.cal --verbose
```

### Run with Sample Data

```bash
cal run examples/simple-query.cal --data examples/data/entities.json
```

### Run with Custom Data

```bash
# Create your own data
cat > my-entities.json <<EOF
{
  "entities": [
    { "id": "e1", "name": "Entity 1", "sound": 8, "space": 7, "time": 9 }
  ]
}
EOF

# Run example
cal run examples/simple-query.cal --data my-entities.json
```

## Next Steps

### For Learning
- Start with `simple-query.cal`
- Progress to `drift-analysis.cal`
- Study `tailwind-cascade.cal`
- Understand `closed-loop-pipeline.cal`

### For Development
- Modify examples for your use case
- Create custom scripts
- Build on the patterns shown
- Combine multiple techniques

### For Production
- Adapt examples to real data
- Add error handling
- Configure alerts
- Set up monitoring

## Additional Resources

- **[Getting Started](/runtime/getting-started)** - CAL basics
- **[CLI Reference](/runtime/cli-reference)** - Command options
- **[Configuration](/runtime/configuration)** - Project setup
- **[Data Adapters](/runtime/data-adapters)** - Connect your data
- **[Alert Adapters](/runtime/alert-adapters)** - Configure alerts
- **[Validation](/runtime/validation)** - Ensure data quality

## Example Repository

All examples are available in the runtime package:

```bash
# View examples
ls node_modules/@stratiqx/cal-runtime/examples/

# Copy to your project
cp -r node_modules/@stratiqx/cal-runtime/examples ./my-examples
```

Or clone from GitHub:

```bash
git clone https://github.com/semanticintent/cal-runtime.git
cd cal-runtime/examples
```
