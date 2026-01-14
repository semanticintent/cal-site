# Configuration

Configure CAL projects with flexible settings and sensible defaults.

## Configuration Files

The runtime searches for configuration in this order:

1. `cal.config.json` - Dedicated config file
2. `.calrc.json` - Hidden config file
3. `.calrc` - Hidden config (JSON format)
4. `package.json` - In the `"cal"` field

## Basic Configuration

Create `cal.config.json` in your project root:

```json
{
  "name": "my-cascade-analysis",
  "version": "1.0.0",
  "data": {
    "path": "./data",
    "files": ["*.json"],
    "adapter": "json"
  },
  "alerts": {
    "type": "console",
    "file": "./logs/cal-alerts.log"
  },
  "execution": {
    "cascadeDepth": 3,
    "dimensions": ["D1", "D2", "D3", "D4", "D5", "D6"],
    "timeout": 30000
  },
  "thresholds": {
    "lens": 6.0,
    "drift": 30,
    "fetch": 1000
  },
  "validation": {
    "requireAllDimensions": false,
    "requireMetadata": false
  },
  "output": {
    "format": "json",
    "directory": "./output",
    "pretty": true
  }
}
```

## Configuration Options

### Project Metadata

```json
{
  "name": "project-name",
  "version": "1.0.0"
}
```

### Data Configuration

```json
{
  "data": {
    "path": "./data",           // Default data directory
    "files": ["*.json"],         // File patterns to load
    "adapter": "json"            // Adapter type: json | memory | composite
  }
}
```

**Adapter Types:**
- `json` - Load from JSON files
- `memory` - Use in-memory data
- `composite` - Combine multiple sources

### Alert Configuration

```json
{
  "alerts": {
    "type": "console",           // Alert type: console | file | json | multi
    "file": "./cal-alerts.log",  // File path (for file alerts)
    "webhooks": [                // Webhook configurations
      {
        "url": "https://hooks.slack.com/...",
        "format": "slack"        // Format: slack | discord | generic
      }
    ]
  }
}
```

**Alert Types:**
- `console` - Pretty-printed terminal output
- `file` - JSON lines log file
- `json` - Accumulate in memory
- `multi` - Multiple channels simultaneously

### Execution Defaults

```json
{
  "execution": {
    "cascadeDepth": 3,           // Default CASCADE DEPTH
    "dimensions": [              // Default dimensions to analyze
      "D1", "D2", "D3",
      "D4", "D5", "D6"
    ],
    "timeout": 30000             // Execution timeout (ms)
  }
}
```

### Formula Thresholds

```json
{
  "thresholds": {
    "lens": 6.0,                 // 3D Lens urgency threshold (0-10)
    "drift": 30,                 // DRIFT gap threshold (0-100)
    "fetch": 1000                // FETCH decision threshold (0+)
  }
}
```

**Threshold Usage:**
- `lens`: Filters entities by urgency score
- `drift`: Triggers gap alerts when exceeded
- `fetch`: Routes decisions (EXECUTE/CONFIRM/QUEUE/WAIT)

### Validation Rules

```json
{
  "validation": {
    "requireAllDimensions": false,  // Require all 6D dimensions
    "requireMetadata": false,       // Require metadata fields
    "customRules": {                // Custom validation rules
      "minSound": 0,
      "maxSound": 10
    }
  }
}
```

### Output Configuration

```json
{
  "output": {
    "format": "json",            // Output format: json | yaml | text
    "directory": "./output",     // Output directory
    "pretty": true               // Pretty-print JSON
  }
}
```

## Loading Configuration

### Programmatic Loading

```typescript
import { loadConfig } from '@stratiqx/cal-runtime';

// Auto-discover config file
const config = await loadConfig();

// Load specific file
const config = await loadConfig('./my-config.json');

console.log('Project:', config.name);
console.log('Data path:', config.data?.path);
```

### With Defaults

```typescript
import { loadConfig, DEFAULT_CONFIG } from '@stratiqx/cal-runtime';

const config = await loadConfig();

// Config is merged with defaults
console.log(config.thresholds?.lens); // 6.0 (from defaults if not specified)
```

## Merging Configuration

Custom configs are merged with defaults:

```typescript
import { mergeConfig, DEFAULT_CONFIG } from '@stratiqx/cal-runtime';

const userConfig = {
  name: 'custom-project',
  thresholds: {
    lens: 8.0  // Override just this value
  }
};

const config = mergeConfig(DEFAULT_CONFIG, userConfig);

console.log(config.name);                    // 'custom-project'
console.log(config.thresholds?.lens);        // 8.0 (overridden)
console.log(config.thresholds?.drift);       // 30 (from defaults)
console.log(config.data?.path);              // './data' (from defaults)
```

## Validation

Validate configuration before use:

```typescript
import { validateConfig } from '@stratiqx/cal-runtime';

const config = {
  thresholds: {
    lens: 15  // Invalid: must be 0-10
  }
};

const result = validateConfig(config);

if (!result.valid) {
  console.error('Config errors:', result.errors);
  // ['lens threshold must be between 0 and 10']
}
```

## Getting/Setting Values

Access nested config values:

```typescript
import { getConfigValue, setConfigValue } from '@stratiqx/cal-runtime';

// Get value by path
const lensThreshold = getConfigValue(config, 'thresholds.lens');
// 6.0

// Set value by path (returns new config)
const newConfig = setConfigValue(config, 'thresholds.lens', 8.0);

console.log(newConfig.thresholds?.lens);  // 8.0
console.log(config.thresholds?.lens);     // 6.0 (original unchanged)
```

## Saving Configuration

Save configuration to file:

```typescript
import { saveConfig } from '@stratiqx/cal-runtime';

await saveConfig(config, 'cal.config.json');
```

## Package.json Integration

Add CAL config to your `package.json`:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "cal": {
    "data": {
      "path": "./data"
    },
    "thresholds": {
      "lens": 7.0
    }
  }
}
```

The runtime will automatically discover and use this configuration.

## Environment-Specific Config

### Development

```json
{
  "name": "dev-project",
  "data": { "path": "./dev-data" },
  "alerts": { "type": "console" },
  "output": { "pretty": true }
}
```

### Production

```json
{
  "name": "prod-project",
  "data": { "path": "/var/lib/cal/data" },
  "alerts": {
    "type": "multi",
    "webhooks": [
      { "url": "https://...", "format": "slack" }
    ]
  },
  "output": { "pretty": false, "directory": "/var/log/cal" }
}
```

Load based on environment:

```typescript
const configFile = process.env.NODE_ENV === 'production'
  ? './config/production.json'
  : './config/development.json';

const config = await loadConfig(configFile);
```

## Project Initialization

Create a new CAL project with defaults:

```typescript
import { initProject } from '@stratiqx/cal-runtime';

// Initialize with defaults
const config = await initProject('my-cascade-analysis');

// Creates:
// - cal.config.json
// - ./data/ directory
// - ./output/ directory
```

## Default Configuration

The runtime provides sensible defaults:

```typescript
{
  name: 'cal-project',
  version: '0.1.0',
  data: {
    path: './data',
    files: ['*.json'],
    adapter: 'json'
  },
  alerts: {
    type: 'console',
    file: './cal-alerts.log'
  },
  execution: {
    cascadeDepth: 3,
    dimensions: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6'],
    timeout: 30000
  },
  thresholds: {
    lens: 6.0,   // Moderate urgency
    drift: 30,   // Moderate gap
    fetch: 1000  // Standard decision threshold
  },
  validation: {
    requireAllDimensions: false,
    requireMetadata: false
  },
  output: {
    format: 'json',
    directory: './output',
    pretty: true
  }
}
```

## CLI Override

Override config values from CLI:

```bash
# Use different data path
cal run script.cal --data-path ./custom-data

# Use different alert type
cal run script.cal --alert file --alert-file ./logs/alerts.log

# Save output to custom location
cal run script.cal --output ./reports/analysis.json
```

CLI flags take precedence over config file settings.

## Best Practices

### 1. Use Version Control

Commit your config file:
```bash
git add cal.config.json
```

But exclude environment-specific files:
```gitignore
# .gitignore
cal.config.local.json
*.log
output/
```

### 2. Document Custom Settings

Add comments in adjacent README:
```markdown
## CAL Configuration

- `thresholds.lens: 7.5` - Higher threshold for our use case
- `dimensions: [D1, D2, D3]` - Focus on customer, employee, revenue
```

### 3. Validate Before Deployment

```typescript
import { loadConfig, validateConfig } from '@stratiqx/cal-runtime';

const config = await loadConfig();
const validation = validateConfig(config);

if (!validation.valid) {
  throw new Error(`Invalid config: ${validation.errors.join(', ')}`);
}
```

### 4. Use Environment Variables

```typescript
const config = await loadConfig();

if (process.env.CAL_DATA_PATH) {
  config.data!.path = process.env.CAL_DATA_PATH;
}

if (process.env.CAL_WEBHOOK_URL) {
  config.alerts!.webhooks = [
    { url: process.env.CAL_WEBHOOK_URL, format: 'generic' }
  ];
}
```

## Next Steps

- **[Validation](/runtime/validation)** - Configure validation rules
- **[Data Adapters](/runtime/data-adapters)** - Set up data sources
- **[Alert Adapters](/runtime/alert-adapters)** - Configure alert channels
- **[CLI Reference](/runtime/cli-reference)** - Use CLI with config
