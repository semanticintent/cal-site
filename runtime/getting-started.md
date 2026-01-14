# Getting Started

Learn the basics of using the CAL Runtime in 10 minutes.

## Your First CAL Script

Create a file `analysis.cal`:

```cal
-- Find entities with high urgency signals
FORAGE entities
WHERE sound > 7
SURFACE results
```

Create sample data `entities.json`:

```json
{
  "entities": [
    {
      "id": "entity-1",
      "name": "High Priority Item",
      "type": "customer",
      "sound": 9,
      "space": 8,
      "time": 8
    },
    {
      "id": "entity-2",
      "name": "Low Priority Item",
      "type": "customer",
      "sound": 3,
      "space": 4,
      "time": 3
    }
  ]
}
```

Run the script:

```bash
cal run analysis.cal --data entities.json
```

Output:

```
🪶 ═══════════════════════════════════════════════════════════════════
   Cormorant Agentic Language (CAL) v0.1.0
   Sound × Space × Time → 6D Analysis → Action
🪶 ═══════════════════════════════════════════════════════════════════

📄 Script: analysis.cal

🔧 Parsing CAL...
✅ Parsing successful

🚀 Executing action plan...

─── EXECUTION RESULTS ───

✅ Execution completed

Actions executed: 1
Outputs: 1
Watchers: 0

─── OUTPUTS ───

📦 results:
   Type: Array
   Count: 1

🪶 Done.
```

## Using in TypeScript

### Basic Usage

```typescript
import { compile, Executor, createDataAdapter } from '@stratiqx/cal-runtime';

// Compile CAL script
const calSource = `
  FORAGE entities
  WHERE sound > 7
  SURFACE results
`;

const compileResult = compile(calSource);

if (!compileResult.success) {
  console.error('Parse error:', compileResult.error);
  process.exit(1);
}

// Create data adapter
const dataAdapter = createDataAdapter({
  type: 'memory',
  initialData: {
    entities: [
      {
        id: 'entity-1',
        name: 'High Priority',
        type: 'customer',
        sound: 9,
        space: 8,
        time: 8
      }
    ]
  }
});

// Execute
const executor = new Executor({ dataAdapter });
const result = await executor.execute(compileResult.actionPlan);

console.log('Results:', result.outputs.results);
```

### With File Data

```typescript
import { compile, Executor, createDataAdapter } from '@stratiqx/cal-runtime';
import * as fs from 'fs/promises';

// Read and compile script
const calSource = await fs.readFile('analysis.cal', 'utf-8');
const { actionPlan } = compile(calSource);

// Create JSON file adapter
const dataAdapter = createDataAdapter({
  type: 'json',
  basePath: './data'
});

// Execute
const executor = new Executor({ dataAdapter });
const result = await executor.execute(actionPlan);
```

## Key Concepts

### 1. Compilation

Transform CAL source into an executable action plan:

```typescript
import { compile } from '@stratiqx/cal-runtime';

const result = compile('FORAGE entities SURFACE results');
// result.success: boolean
// result.actionPlan: ActionPlan (if successful)
// result.error: Error (if failed)
```

### 2. Adapters

Connect to data sources and alert channels:

**Data Adapters:**
- `memory` - In-memory collections
- `json` - JSON files
- `composite` - Multiple sources

**Alert Adapters:**
- `console` - Terminal output
- `file` - Log files
- `webhook` - Slack/Discord/etc
- `json` - Testing/accumulation

### 3. Execution

Run action plans with the executor:

```typescript
const executor = new Executor({
  dataAdapter: myDataAdapter,
  alertAdapter: myAlertAdapter
});

const result = await executor.execute(actionPlan);
// result.outputs: Record<string, any>
// result.actions: ActionResult[]
// result.watchers: Watcher[]
```

## Common Patterns

### Query and Filter

```cal
FORAGE customers
WHERE sound > 7 AND segment = "enterprise"
SURFACE high_priority
```

### Multi-Dimensional Analysis

```cal
FORAGE entities
WHERE sound > 7
ACROSS D1, D2, D3, D5, D6
DEPTH 3
SURFACE cascade_map
```

### Gap Measurement (DRIFT)

```cal
FORAGE targets
WHERE impact = "high"
SURFACE analysis

DRIFT analysis
METHODOLOGY 85
PERFORMANCE 40
```

### Decision Logic (FETCH)

```cal
FETCH cascade_map
THRESHOLD 1000
ON EXECUTE CHIRP critical "Take action now"
ON CONFIRM CHIRP warning "Review needed"
ON QUEUE SURFACE report
ON WAIT PERCH ON status:"monitoring"
```

### Monitoring

```cal
PERCH ON segment:"enterprise"
LISTEN FOR churn signals, revenue signals
WAKE AFTER 30d
CHIRP warning
```

## Working with 6D Dimensions

Entities must have dimension data:

```json
{
  "id": "customer-1",
  "name": "Enterprise Corp",
  "sound": 8,
  "space": 7,
  "time": 9,
  "dimensions": {
    "D1": { "sound": 7, "space": 6, "time": 8 },
    "D2": { "sound": 8, "space": 7, "time": 7 },
    "D3": { "sound": 9, "space": 8, "time": 9 },
    "D4": { "sound": 5, "space": 5, "time": 5 },
    "D5": { "sound": 6, "space": 7, "time": 6 },
    "D6": { "sound": 8, "space": 8, "time": 8 }
  }
}
```

Analyze across dimensions:

```cal
FORAGE entities
WHERE sound > 7
ACROSS D1, D2, D3  -- Only analyze these dimensions
DEPTH 2            -- Cascade depth
SURFACE cascade_analysis
```

## Formula Usage

### 3D Lens

Automatically calculated for all entities:

```
Lens = (Sound × Space × Time) / 10
```

Provides urgency score 0-100. Used for filtering and prioritization.

### DRIFT

Measure methodology-performance gap:

```cal
DRIFT target_entities
METHODOLOGY 85  -- Expected performance
PERFORMANCE 40  -- Actual performance
-- Gap = 85 - 40 = 45
```

### FETCH

Decision routing based on threshold:

```cal
FETCH analysis_results
THRESHOLD 1000
-- Routes actions based on calculated FETCH score:
-- FETCH = Chirp × |DRIFT| × Confidence
```

## Error Handling

### Compilation Errors

```typescript
const result = compile('FORAGE invalid syntax');

if (!result.success) {
  console.error('Parse error:', result.error.message);
  if (result.error.location) {
    console.error(`At line ${result.error.location.start.line}`);
  }
}
```

### Execution Errors

```typescript
try {
  const result = await executor.execute(actionPlan);

  if (!result.success) {
    console.error('Execution failed:', result.error);
  }
} catch (error) {
  console.error('Fatal error:', error);
}
```

## Configuration

Create `cal.config.json` for project settings:

```json
{
  "name": "my-analysis-project",
  "data": {
    "path": "./data",
    "adapter": "json"
  },
  "alerts": {
    "type": "console"
  },
  "thresholds": {
    "lens": 6.0,
    "drift": 30,
    "fetch": 1000
  }
}
```

Load configuration:

```typescript
import { loadConfig } from '@stratiqx/cal-runtime';

const config = await loadConfig();
console.log('Project:', config.name);
```

## CLI Quick Reference

```bash
# Run script
cal run script.cal --data entities.json

# Analyze without execution
cal analyze script.cal --verbose

# Validate syntax
cal validate script.cal

# Inline execution
cal run --inline "FORAGE entities SURFACE results" --data-path ./data

# Save output
cal run script.cal --data entities.json --output results.json

# Quiet mode
cal run script.cal --quiet
```

## Next Steps

Now that you understand the basics:

1. **[Configuration](/runtime/configuration)** - Set up project configuration
2. **[Data Adapters](/runtime/data-adapters)** - Connect to data sources
3. **[Alert Adapters](/runtime/alert-adapters)** - Configure alerts
4. **[CLI Reference](/runtime/cli-reference)** - Explore all CLI commands
5. **[Examples](/runtime/examples)** - Study real-world examples
6. **[Validation](/runtime/validation)** - Ensure data quality

## Troubleshooting

### "Cannot find module"

Ensure you've installed the package:
```bash
npm install @stratiqx/cal-runtime
```

### "Unexpected token"

Check that you're using ES modules:
```json
// package.json
{
  "type": "module"
}
```

### "Grammar not compiled"

The package should include pre-compiled grammar. If not:
```bash
cd node_modules/@stratiqx/cal-runtime
npm run build:grammar
```

### Data not found

Verify your data file path and structure:
```bash
# Check file exists
ls ./data/entities.json

# Validate JSON
cat entities.json | jq .
```
