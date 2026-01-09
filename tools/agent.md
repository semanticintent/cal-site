# AI Agent Integration

## Overview

The AI agent translates natural language into CAL execution:

```
Natural Language → Signals → CAL → Results → Narrative
```

## Usage

```bash
# With API key
export ANTHROPIC_API_KEY=your-key
node agent.js "Your situation description"

# Mock mode (no API)
node agent.js --mock "Test situation"

# Verbose (see all stages)
node agent.js --mock --verbose "Situation"
```

## Pipeline Stages

The agent operates in four stages:

| Stage | Function | Purpose |
|-------|----------|---------|
| 1 | `extractSignals()` | NL → Structured signals |
| 2 | `generateCAL()` | Signals → CAL script |
| 3 | `executeCAL()` | CAL → Results |
| 4 | `narrateResults()` | Results → Narrative |

## Example Flow

### Input (Natural Language)
```
"Our main product launch is delayed 2 months because we lost 3 senior engineers"
```

### Stage 1: Signal Extraction
```json
{
  "entity": "Product Launch Delay",
  "signals": {
    "sound": 8,
    "space": 6,
    "time": 9
  },
  "dimensions": {
    "D2": { "sound": 9, "space": 7, "time": 8 },
    "D5": { "sound": 7, "space": 6, "time": 8 },
    "D6": { "sound": 8, "space": 7, "time": 9 }
  },
  "baseCost": 150000,
  "context": {
    "segment": "internal",
    "priority": "high"
  }
}
```

### Stage 2: CAL Generation
```cal
FORAGE entities
WHERE sound > 7
ACROSS D2, D5, D6
DEPTH 2
SURFACE cascade_analysis

DRIFT cascade_analysis
METHODOLOGY 80
PERFORMANCE 45

FETCH cascade_analysis
THRESHOLD 1000
ON EXECUTE CHIRP critical "Immediate action required"
```

### Stage 3: Execution
```json
{
  "cascade_analysis": {
    "count": 1,
    "dimensionsAffected": 3,
    "averageScore": 50.4,
    "multiplier": "4-6×",
    "impactRange": "$600K - $900K"
  },
  "drift": {
    "score": 35,
    "gapType": "teaching",
    "quality": "moderate"
  },
  "fetch": {
    "score": 2520,
    "decision": "EXECUTE"
  }
}
```

### Stage 4: Narrative
```markdown
## Executive Summary
The product launch delay shows a 4-6× cascade multiplier across
Employee, Quality, and Operational dimensions.

## Key Finding
- Direct Cost: $150,000
- Cascade Impact: $600K - $900K
- Hidden Cost: 4-6× the visible cost

## Cascade Analysis
D2 (Employee): Knowledge loss from 3 senior engineers
  ↓
D5 (Quality): Development velocity drops, technical debt rises
  ↓
D6 (Operational): Deployment processes fragile, bus factor critical

## DRIFT Assessment
- Gap: 35 (moderate teaching gap)
- Organization knew better but execution failed
- Likely due to resource constraints

## FETCH Decision
- Score: 2,520
- Threshold: 1,000
- Decision: **EXECUTE** immediately

## Recommended Actions
1. Backfill critical knowledge gaps (contractors or internal transfers)
2. Reassess timeline with current team capacity
3. Document tribal knowledge before more loss occurs
4. Consider pair programming to spread knowledge
5. Implement knowledge management system
```

## Mock Mode

For testing without an API key:

```bash
node agent.js --mock "75% workforce reduction"
```

**Mock mode:**
- Uses predefined patterns
- Generates reasonable signals
- Executes real CAL
- Produces mock narratives

## Verbose Mode

See all pipeline stages:

```bash
node agent.js --mock --verbose "Product delay"
```

**Output:**
```
🪶 CAL AI Agent v0.1.0

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Stage 1: Signal Extraction
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Input: "Product delay"

Extracted Signals:
{
  "entity": "Product Delay",
  "signals": { "sound": 7, "space": 6, "time": 8 },
  ...
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Stage 2: CAL Generation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generated CAL:
FORAGE entities
WHERE sound > 7
ACROSS D2, D5, D6
DEPTH 2
SURFACE cascade_analysis

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Stage 3: Execution
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Results:
{
  "cascade_analysis": { ... }
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Stage 4: Narrative Generation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Narrative output...]
```

## API Configuration

### Using Anthropic API

```bash
# Set API key
export ANTHROPIC_API_KEY=sk-ant-...

# Run agent
node agent.js "Your situation"
```

### Configuration File

Create `.env`:
```bash
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-sonnet-4.5
```

Load in agent:
```bash
node agent.js --env .env "Your situation"
```

## Advanced Usage

### Custom Signal Extraction

```bash
# Provide pre-extracted signals
node agent.js --signals signals.json
```

**signals.json:**
```json
{
  "entity": "Custom Situation",
  "signals": { "sound": 8, "space": 7, "time": 9 },
  "dimensions": { ... }
}
```

### Save Intermediate Steps

```bash
# Save all pipeline outputs
node agent.js "Situation" --save-steps
```

Creates:
- `signals.json` - Extracted signals
- `generated.cal` - Generated CAL script
- `results.json` - Execution results
- `narrative.md` - Final narrative

### Batch Processing

```bash
# Process multiple situations
node agent.js --batch situations.txt
```

**situations.txt:**
```
Product launch delayed 2 months
75% workforce reduction
Customer churn increased 40%
```

## Real-World Examples

### Example 1: Customer Churn
```bash
node agent.js --mock "Our top 3 enterprise customers are at risk of churning"
```

**Output narrative includes:**
- Signal scores for D1 (Customer), D3 (Revenue)
- Cascade analysis showing impact on D2 (Employee morale)
- DRIFT assessment of customer success process
- FETCH decision with recommended actions

### Example 2: Security Incident
```bash
node agent.js "Data breach exposed 10,000 customer records"
```

**Output narrative includes:**
- High urgency scores (sound: 9-10)
- Regulatory dimension (D4) heavily impacted
- Customer trust (D1) and revenue (D3) cascades
- Immediate EXECUTE decision

### Example 3: Engineering Exodus
```bash
node agent.js "Lost 5 senior engineers in 2 months"
```

**Output narrative includes:**
- D2 (Employee) primary impact
- Cascades to D5 (Quality) and D6 (Operational)
- Knowledge loss analysis
- Backfill recommendations

## Tips for Best Results

1. **Be Specific** - Include numbers, timeframes, magnitudes
2. **Add Context** - Mention segments, departments, impact areas
3. **State the Change** - What changed from before to now?
4. **Include Signals** - Words like "urgent", "widespread", "rapid"

**Good:**
> "75% workforce reduction from 9 to 2 people, revenue dropped 80% in 6 months"

**Less Good:**
> "Company had layoffs and problems"

## Limitations

- **Mock mode** provides patterns but not real AI reasoning
- **API mode** requires valid Anthropic API key
- **Signal extraction** quality depends on input specificity
- **Narrative** is AI-generated and should be reviewed

## Next Steps

- [Learn CLI Usage](/tools/cli)
- [Try the REPL](/tools/repl)
- [See Full Examples](/language/examples)
- [Explore Frameworks](/frameworks/drift)
