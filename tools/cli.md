# Command Line Interface

## Basic Usage

```bash
# Parse and show AST
node cal.js script.cal

# Execute with data
node run.js script.cal --data data.json

# Execute with output
node run.js script.cal --data data.json --output results.json

# Verbose mode
node run.js script.cal --data data.json --verbose

# Show help
node run.js --help
```

## Options

| Option | Short | Description |
|--------|-------|-------------|
| `--data` | `-d` | Data file (JSON or CSV) |
| `--output` | `-o` | Output file |
| `--verbose` | `-v` | Verbose output |
| `--help` | `-h` | Show help |

## Examples

### Simple Analysis
```bash
node run.js analysis.cal --data entities.json
```

**Output:**
```
🪶 CAL Execution Results

📦 cascade_map:
   Count: 3
   Dimensions Affected: 5
   Average Score: 48.3
   Impact Range: $1.2M - $1.8M
```

### Full Output with Verbose
```bash
node run.js analysis.cal --data entities.json --output report.json --verbose
```

**Output:**
```
🪶 CAL Parser v0.1.0

📄 Parsing: analysis.cal
✓ Parsed successfully

📊 Loading data: entities.json
✓ Loaded 5 entities

⚙️ Executing action plan...
✓ FORAGE: 3 entities matched
✓ ACROSS: Analyzing D1, D2, D3, D5, D6
✓ DEPTH: Tracing 3 levels
✓ SURFACE: Output to cascade_map

📈 DRIFT Analysis:
   Drift: 50
   Gap Type: teaching
   Quality: extreme

🎯 FETCH Decision:
   Score: 3600
   Threshold: 1000
   Decision: EXECUTE

🔔 CHIRP: critical "Immediate action required"

💾 Results saved to: report.json
```

### Using CSV Data
```bash
node run.js analysis.cal --data entities.csv
```

## File Formats

### JSON Data Format
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

### CSV Data Format
```csv
id,name,sound,space,time,baseCost,segment
situation-001,Product Launch Delay,7,6,8,50000,enterprise
situation-002,Customer Churn,8,7,9,75000,high-value
```

## Output Formats

### Console Output (Default)
Human-readable summary with emojis and formatting

### JSON Output (`--output results.json`)
```json
{
  "timestamp": "2026-01-09T12:00:00Z",
  "results": {
    "cascade_map": {
      "count": 3,
      "dimensionsAffected": 5,
      "averageScore": 48.3,
      "impactRange": "$1.2M - $1.8M"
    }
  },
  "drift": {
    "score": 50,
    "gapType": "teaching",
    "quality": "extreme"
  },
  "fetch": {
    "score": 3600,
    "threshold": 1000,
    "decision": "EXECUTE"
  }
}
```

## Advanced Usage

### Chaining Multiple Scripts
```bash
# Run analysis, then decision
node run.js analyze.cal --data data.json
node run.js decide.cal --data results.json
```

### Using Environment Variables
```bash
# Set data source
export CAL_DATA_SOURCE=./data.json

# Run script
node run.js script.cal
```

### Debugging
```bash
# Enable debug mode
DEBUG=cal:* node run.js script.cal --data data.json --verbose
```

## Tips & Best Practices

1. **Start Simple** - Test with small data files first
2. **Use Verbose** - Add `-v` to understand execution flow
3. **Save Output** - Use `-o` to preserve results for later analysis
4. **Validate Data** - Ensure JSON/CSV format is correct before running

## Troubleshooting

### Parse Error
```bash
Error: Unexpected token at line 5
```
**Solution:** Check CAL syntax, missing keywords, or quotes

### Data Load Error
```bash
Error: Cannot find data file
```
**Solution:** Verify file path is correct and file exists

### Execution Error
```bash
Error: No entities matched WHERE condition
```
**Solution:** Check your WHERE clause and data values

## Next Steps

- [Try the REPL](/tools/repl)
- [Use the AI Agent](/tools/agent)
- [See Code Examples](/language/examples)
