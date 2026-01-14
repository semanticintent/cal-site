# CLI Reference

Complete command-line interface reference for the CAL Runtime.

## Installation

Install globally for command-line use:

```bash
npm install -g @stratiqx/cal-runtime

# Verify installation
cal version
```

Or use locally:

```bash
npm install @stratiqx/cal-runtime

# Run via npx
npx cal run script.cal
```

## Commands

### run

Execute a CAL script with data.

```bash
cal run <script> [options]
```

**Arguments:**
- `<script>` - Path to CAL script file (`.cal` extension)

**Options:**
- `--inline, -i <code>` - Inline CAL code instead of file
- `--data, -d <file>` - Data file (JSON)
- `--data-path <dir>` - Directory with data files
- `--output, -o <file>` - Output file for results (JSON)
- `--alert, -a <type>` - Alert type: `console`, `file`, `json`
- `--alert-file <file>` - Alert log file (for file alerts)
- `--verbose, -v` - Verbose output
- `--quiet, -q` - Minimal output

**Examples:**

```bash
# Basic execution
cal run analysis.cal --data entities.json

# With data directory
cal run analysis.cal --data-path ./data

# Save output
cal run analysis.cal --data entities.json --output results.json

# Verbose mode
cal run analysis.cal --data entities.json --verbose

# File alerts
cal run analysis.cal --data entities.json --alert file --alert-file ./logs/alerts.log

# Quiet mode
cal run analysis.cal --data entities.json --quiet

# Inline script
cal run --inline "FORAGE entities WHERE sound > 7 SURFACE results" --data entities.json
```

**Output:**

```
🪶 ═══════════════════════════════════════════════════════════════════
   Cormorant Agentic Language (CAL) v0.1.0
   Sound × Space × Time → 6D Analysis → Action
🪶 ═══════════════════════════════════════════════════════════════════

📄 Script: analysis.cal

🔧 Parsing CAL...
✅ Parsing successful

📊 Loading data: entities.json
🚀 Executing action plan...

─── EXECUTION RESULTS ───

✅ Execution completed

Actions executed: 3
Outputs: 2
Watchers: 0

─── OUTPUTS ───

📦 results:
   Type: Array
   Count: 2

🪶 Done.
```

### analyze

Parse and analyze a script without execution.

```bash
cal analyze <script> [options]
```

**Arguments:**
- `<script>` - Path to CAL script file

**Options:**
- `--inline, -i <code>` - Inline CAL code
- `--output, -o <file>` - Save analysis to file
- `--verbose, -v` - Show detailed action plan
- `--quiet, -q` - Minimal output

**Examples:**

```bash
# Analyze script structure
cal analyze analysis.cal

# Detailed analysis
cal analyze analysis.cal --verbose

# Save to file
cal analyze analysis.cal --output analysis.json
```

**Output:**

```
🪶 ═══════════════════════════════════════════════════════════════════
   Cormorant Agentic Language (CAL) v0.1.0
   Sound × Space × Time → 6D Analysis → Action
🪶 ═══════════════════════════════════════════════════════════════════

📄 Analyzing: analysis.cal

🔧 Parsing CAL...
✅ Parsing successful

─── ANALYSIS ───

Actions: 5

Action breakdown:
  query: 2
  drift: 1
  fetch: 1
  output: 1

🪶 Analysis complete.
```

### validate

Validate script syntax without execution or analysis.

```bash
cal validate <script>
```

**Arguments:**
- `<script>` - Path to CAL script file

**Options:**
- `--inline, -i <code>` - Inline CAL code

**Examples:**

```bash
# Validate script
cal validate analysis.cal

# Validate inline
cal validate --inline "FORAGE entities SURFACE results"
```

**Output:**

```
✅ analysis.cal is valid
```

Or if invalid:

```
❌ Validation failed: Expected keyword but found "INVALID"
   at line 5, column 3
```

### help

Show help information.

```bash
cal help
```

Shows complete usage information, available commands, options, and examples.

### version

Show version information.

```bash
cal version
```

**Output:**

```
CAL (Cormorant Agentic Language) v0.1.0
Runtime: Node.js v20.10.0
```

## Global Options

Options that work with all commands:

### --verbose, -v

Show detailed output including:
- Source code
- Parsed action plan (JSON)
- Full result objects
- Stack traces on errors

```bash
cal run script.cal --verbose
```

### --quiet, -q

Minimal output, only errors:

```bash
cal run script.cal --quiet
```

Good for scripting and automation.

## Data Options

### --data, -d

Specify a single data file:

```bash
cal run script.cal --data entities.json
```

File must contain JSON with an `entities` array:

```json
{
  "entities": [
    { "id": "1", "name": "Entity 1", "sound": 8, "space": 7, "time": 9 }
  ]
}
```

### --data-path

Specify a directory containing data files:

```bash
cal run script.cal --data-path ./data
```

Scripts reference files by name (without extension):

```cal
FORAGE entities   -- Loads ./data/entities.json
FORAGE customers  -- Loads ./data/customers.json
```

## Output Options

### --output, -o

Save execution results to file (JSON format):

```bash
cal run script.cal --data entities.json --output results.json
```

Output includes:
- Execution metadata (timestamps, methodology)
- All action results
- Output variables
- Watchers and scheduled tasks
- Success status

Example output file:

```json
{
  "type": "ExecutionResult",
  "started": "2026-01-14T10:30:00.000Z",
  "completed": "2026-01-14T10:30:05.123Z",
  "methodology": "6D Foraging",
  "actions": [...],
  "outputs": {
    "results": {...}
  },
  "watchers": [],
  "scheduledTasks": [],
  "success": true
}
```

## Alert Options

### --alert, -a

Specify alert channel type:

```bash
# Console alerts (default)
cal run script.cal --alert console

# File alerts
cal run script.cal --alert file --alert-file ./logs/alerts.log

# JSON accumulation
cal run script.cal --alert json
```

**Alert Types:**
- `console` - Pretty-printed terminal output (default)
- `file` - JSON Lines log file
- `json` - In-memory (testing)

### --alert-file

Log file path for file alerts:

```bash
cal run script.cal --alert file --alert-file ./logs/cal-alerts.log
```

Creates JSON Lines format log:

```json
{"timestamp":"2026-01-14T10:30:00.000Z","type":"warning","message":"High risk detected"}
{"timestamp":"2026-01-14T10:31:00.000Z","type":"critical","message":"Immediate action"}
```

## Inline Execution

### --inline, -i

Execute CAL code directly without a file:

```bash
# Simple query
cal run --inline "FORAGE entities WHERE sound > 7 SURFACE results" --data entities.json

# Multi-line (use quotes)
cal run --inline "
  FORAGE entities WHERE sound > 7 SURFACE targets
  DRIFT targets METHODOLOGY 85 PERFORMANCE 40
  CHIRP warning 'Gap detected'
" --data entities.json
```

Good for:
- Quick tests
- Shell scripts
- One-off analysis

## Exit Codes

The CLI uses standard exit codes:

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Error (parse, execution, validation) |

Example usage in scripts:

```bash
#!/bin/bash

if cal run analysis.cal --data entities.json --quiet; then
  echo "Analysis passed"
else
  echo "Analysis failed"
  exit 1
fi
```

## Configuration Files

The CLI automatically loads configuration from:

1. `cal.config.json`
2. `.calrc.json`
3. `.calrc`
4. `package.json` (in `"cal"` field)

See [Configuration](/runtime/configuration) for details.

**Command-line options override configuration file settings.**

## Environment Variables

### CAL_DATA_PATH

Default data directory:

```bash
export CAL_DATA_PATH=./production-data
cal run script.cal
```

### CAL_ALERT_FILE

Default alert log file:

```bash
export CAL_ALERT_FILE=/var/log/cal/alerts.log
cal run script.cal --alert file
```

### NODE_ENV

Affects default settings:

```bash
# Development: verbose, console alerts
NODE_ENV=development cal run script.cal

# Production: quiet, file alerts
NODE_ENV=production cal run script.cal
```

## Examples

### Basic Analysis

```bash
cal run examples/simple-query.cal --data examples/data/entities.json
```

### Cascade Analysis

```bash
cal run examples/tailwind-cascade.cal \
  --data examples/data/entities.json \
  --verbose \
  --output results.json
```

### DRIFT Analysis

```bash
cal run examples/drift-analysis.cal \
  --data examples/data/entities.json \
  --alert file \
  --alert-file ./logs/drift-alerts.log
```

### Closed-Loop Pipeline

```bash
cal run examples/closed-loop-pipeline.cal \
  --data examples/data/entities.json \
  --output pipeline-results.json
```

### Validation Only

```bash
# Validate all scripts
for script in *.cal; do
  echo "Validating $script..."
  cal validate "$script"
done
```

### Batch Processing

```bash
#!/bin/bash
# Process multiple data files

for datafile in data/*.json; do
  basename=$(basename "$datafile" .json)
  echo "Processing $basename..."

  cal run analysis.cal \
    --data "$datafile" \
    --output "results/$basename-results.json" \
    --quiet

  if [ $? -eq 0 ]; then
    echo "✅ $basename complete"
  else
    echo "❌ $basename failed"
    exit 1
  fi
done
```

### Monitoring Script

```bash
#!/bin/bash
# Run analysis every hour

while true; do
  timestamp=$(date +%Y%m%d-%H%M%S)

  cal run monitoring.cal \
    --data-path ./live-data \
    --output "./reports/monitor-$timestamp.json" \
    --alert file \
    --alert-file "./logs/alerts-$timestamp.log" \
    --quiet

  echo "$(date): Analysis complete"
  sleep 3600
done
```

## Troubleshooting

### "Cannot find module"

```bash
# Install globally
npm install -g @stratiqx/cal-runtime

# Or use npx
npx @stratiqx/cal-runtime run script.cal
```

### "Unexpected token" / Parse Error

```bash
# Validate syntax first
cal validate script.cal

# Check for syntax errors in CAL script
```

### "No data provided"

```bash
# Must specify data source
cal run script.cal --data entities.json
# OR
cal run script.cal --data-path ./data
```

### "Data file not found"

```bash
# Check file exists
ls entities.json

# Use absolute path
cal run script.cal --data /full/path/to/entities.json

# Or use data-path for directory
cal run script.cal --data-path $(pwd)/data
```

### Verbose debugging

```bash
# See everything
cal run script.cal --verbose

# Shows:
# - Source code
# - Parsed action plan
# - Full execution results
# - Stack traces on errors
```

## Shell Completion

### Bash

```bash
# Add to ~/.bashrc
eval "$(cal --completion bash)"
```

### Zsh

```bash
# Add to ~/.zshrc
eval "$(cal --completion zsh)"
```

### Fish

```fish
# Add to ~/.config/fish/config.fish
cal --completion fish | source
```

## Scripting Tips

### Check for errors

```bash
#!/bin/bash
set -e  # Exit on any error

cal validate analysis.cal
cal run analysis.cal --data entities.json --output results.json

echo "Analysis successful"
```

### Capture output

```bash
#!/bin/bash

# Run and capture output
output=$(cal run script.cal --data entities.json 2>&1)
exitcode=$?

if [ $exitcode -eq 0 ]; then
  echo "Success: $output"
else
  echo "Failed: $output"
  exit 1
fi
```

### Conditional execution

```bash
#!/bin/bash

# Only run if validation passes
if cal validate analysis.cal --quiet; then
  cal run analysis.cal --data entities.json
else
  echo "Script validation failed"
  exit 1
fi
```

## Best Practices

### 1. Validate Before Running

```bash
# Good: Validate first
cal validate script.cal && cal run script.cal --data entities.json

# Less safe: Run directly
cal run script.cal --data entities.json
```

### 2. Use Quiet Mode in Scripts

```bash
# Good for automation
cal run script.cal --quiet

# Verbose for debugging
cal run script.cal --verbose
```

### 3. Save Results for Auditing

```bash
timestamp=$(date +%Y%m%d-%H%M%S)
cal run analysis.cal \
  --data entities.json \
  --output "results-$timestamp.json" \
  --alert file \
  --alert-file "alerts-$timestamp.log"
```

### 4. Use Data Paths for Organization

```bash
# Better: Organized structure
data/
  entities.json
  customers.json
  employees.json

cal run script.cal --data-path ./data

# Less organized: Scattered files
cal run script.cal --data ./entities.json
```

### 5. Version Control Scripts

```bash
# Track scripts in git
git add *.cal
git commit -m "Add cascade analysis scripts"

# Document usage in README
echo "cal run analysis.cal --data entities.json" >> README.md
```

## Next Steps

- **[Examples](/runtime/examples)** - See CLI in action
- **[Configuration](/runtime/configuration)** - Configure defaults
- **[Getting Started](/runtime/getting-started)** - Learn CAL basics
- **[API Reference](/runtime/api-reference)** - TypeScript API
