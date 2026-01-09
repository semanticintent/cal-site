# Interactive REPL

## Starting the REPL

```bash
node repl.js
```

## Welcome Screen

```
🪶 CAL REPL v0.1.0
Cascade Analysis Language - Interactive Mode

Type CAL commands or .help for assistance
Use .exit to quit

cal>
```

## Commands

| Command | Description |
|---------|-------------|
| `.help` | Show help |
| `.clear` | Clear context |
| `.results` | Show results |
| `.data <file>` | Load data file |
| `.verbose` | Toggle verbose mode |
| `.exit` | Exit REPL |

## Example Session

### Basic Query

```
cal> FORAGE entities WHERE sound > 5

✓ Parsed: Forage statement
✓ Added to execution plan

cal> ACROSS D1, D2, D3

✓ Added: dimensions

cal> DEPTH 2

✓ Added: depth level

cal> SURFACE results

✓ Executing...

📦 results:
   Count: 3
   Dimensions Affected: 3
   Average Score: 38.5
```

### Loading Data

```
cal> .data sample-data.json

✓ Loaded 5 entities from sample-data.json

cal> FORAGE entities WHERE segment = "enterprise"

✓ Query ready

cal> SURFACE enterprise_list

📦 enterprise_list:
   Count: 2
   Entities:
   - Acme Corp (score: 42.3)
   - TechStart Inc (score: 51.2)
```

### Full Analysis

```
cal> FORAGE entities WHERE sound > 7

✓ Query ready

cal> ACROSS ALL

✓ Analyzing all 6 dimensions

cal> DEPTH 3

✓ Cascade depth: 3 levels

cal> SURFACE cascade_map

✓ Executing...

📦 cascade_map:
   Count: 2
   Dimensions: D1, D2, D3, D5, D6
   Average Score: 52.8
   Multiplier: 6-10× (severe)

cal> DRIFT cascade_map METHODOLOGY 85 PERFORMANCE 35

📈 DRIFT Analysis:
   Drift: 50
   Abs Drift: 50
   Gap Type: teaching
   Quality: extreme
   Interpretation: Over-explanation - cognitive overload risk

cal> FETCH cascade_map THRESHOLD 1000

🎯 FETCH Decision:
   Score: 3600
   Threshold: 1000
   Decision: EXECUTE
   Action: Immediate intervention required
```

### Checking Results

```
cal> .results

📊 Current Results:

cascade_map:
  - Count: 2
  - Dimensions: 5
  - Score: 52.8
  - Impact: $2.1M - $3.2M

drift_analysis:
  - Drift: 50
  - Gap: teaching
  - Quality: extreme

fetch_decision:
  - Score: 3600
  - Decision: EXECUTE
```

### Clearing Context

```
cal> .clear

✓ Context cleared
✓ Ready for new analysis

cal>
```

## Interactive Features

### Tab Completion
Press `Tab` to auto-complete keywords:
```
cal> FOR<Tab>
cal> FORAGE
```

### History Navigation
- `↑` - Previous command
- `↓` - Next command

### Multi-line Input
Use `\` for multi-line:
```
cal> FORAGE entities \
...> WHERE sound > 7 \
...> AND segment = "enterprise"

✓ Parsed multi-line statement
```

## REPL-Specific Commands

### .data - Load Data
```
cal> .data ./data.json
✓ Loaded 10 entities

cal> .data ./customers.csv
✓ Loaded 25 customers
```

### .verbose - Toggle Verbose Output
```
cal> .verbose
✓ Verbose mode enabled

cal> FORAGE entities
[DEBUG] Parsing FORAGE statement
[DEBUG] Building WHERE clause
[DEBUG] Executing query
[DEBUG] Found 3 matches
```

### .clear - Reset State
```
cal> .clear
✓ Execution context cleared
✓ Results cleared
✓ Ready for new session
```

### .results - Show All Results
```
cal> .results
📊 Execution Results:

Variables:
- cascade_map: CascadeAnalysis (count: 3)
- drift_scores: DriftAnalysis (drift: 50)
- fetch_decision: FetchDecision (score: 3600)

Outputs:
- results.json: Saved
- alerts.log: 2 chirps logged
```

## Tips for REPL Usage

### 1. Build Incrementally
```
cal> FORAGE entities
cal> WHERE sound > 7
cal> ACROSS D1, D2, D3
cal> SURFACE results
```

### 2. Test Conditions
```
cal> FORAGE entities WHERE sound > 5
cal> .results  -- See what matched

cal> FORAGE entities WHERE sound > 8
cal> .results  -- Compare
```

### 3. Iterate on DRIFT/FETCH
```
cal> DRIFT analysis METHODOLOGY 80 PERFORMANCE 40
cal> FETCH analysis THRESHOLD 1000

-- Adjust threshold
cal> FETCH analysis THRESHOLD 500
```

### 4. Save Sessions
```
cal> .verbose
cal> FORAGE entities...
-- Copy output for documentation
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+C` | Cancel current input |
| `Ctrl+D` | Exit REPL |
| `Ctrl+L` | Clear screen |
| `↑` / `↓` | Navigate history |
| `Tab` | Auto-complete |

## Troubleshooting

### REPL Won't Start
```bash
Error: Cannot find module 'repl.js'
```
**Solution:** Ensure you're in the correct directory

### Data Not Loading
```
cal> .data missing.json
Error: File not found
```
**Solution:** Check file path and permissions

### Parse Errors
```
cal> FORAGE
Error: Expected target after FORAGE
```
**Solution:** Complete the statement or use `.clear` to reset

## Next Steps

- [Learn CLI Usage](/tools/cli)
- [Try the AI Agent](/tools/agent)
- [See Full Examples](/language/examples)
