# CAL Runtime

The **CAL Runtime** is a production-ready TypeScript implementation of the Cormorant Agentic Language execution engine. It provides a complete, type-safe runtime for parsing, analyzing, and executing CAL scripts with modern development tooling.

## What is the CAL Runtime?

The CAL Runtime is a standalone TypeScript/Node.js package that:

- **Parses** CAL scripts into executable action plans
- **Executes** cascade analysis with the 6D methodology
- **Calculates** 3D Lens, DRIFT, and FETCH formulas
- **Adapts** to multiple data sources (JSON, CSV, memory)
- **Alerts** through multiple channels (console, file, webhooks)
- **Validates** entities and dimensions for correctness
- **Configures** projects with flexible settings

## Key Features

### 🔒 Type-Safe

Built with TypeScript in strict mode, providing full type safety and IntelliSense support.

```typescript
import { compile, Executor } from '@stratiqx/cal-runtime';

const result = compile('FORAGE entities WHERE sound > 7');
// result.actionPlan is fully typed
```

### 🪶 Semantic Anchoring

Every component preserves observable cormorant foraging behavior semantics:
- **FORAGE** → Query entities across territory
- **DIVE** → Deep cascade analysis
- **DRIFT** → Measure methodology-performance gap
- **FETCH** → Decision logic with thresholds
- **PERCH** → Observation positioning
- **LISTEN** → Signal monitoring
- **CHIRP** → Alert broadcasting

### 🚀 Production Ready

- **131+ passing tests** across all modules
- Comprehensive error handling
- Flexible adapter system
- CLI tool for scripting
- Configuration management
- Validation utilities

### 🔌 Flexible Adapters

**Data Sources:**
- JSON files
- In-memory collections
- Composite multi-source
- Custom adapters (implement interface)

**Alert Channels:**
- Console output with emoji icons
- File logging (JSON lines)
- Webhooks (Slack, Discord, generic)
- JSON accumulation for testing
- Multi-channel broadcasting

### 📊 Complete 6D Support

Full implementation of the 6D Cascade Methodology:
- **D1**: Customer dimension
- **D2**: Employee dimension
- **D3**: Revenue dimension
- **D4**: Regulatory dimension
- **D5**: Quality dimension
- **D6**: Operational dimension

## Quick Start

Install the runtime:

```bash
npm install @stratiqx/cal-runtime
```

Create a simple script:

```typescript
import { compile, Executor, createDataAdapter } from '@stratiqx/cal-runtime';

// Compile CAL script
const { actionPlan } = compile(`
  FORAGE entities
  WHERE sound > 7
  SURFACE results
`);

// Create executor with data
const executor = new Executor({
  dataAdapter: createDataAdapter({
    type: 'memory',
    initialData: { entities: myEntities }
  })
});

// Execute
const result = await executor.execute(actionPlan);
console.log(result.outputs.results);
```

Or use the CLI:

```bash
cal run analysis.cal --data entities.json
```

## Architecture

```
┌─────────────────────────────────────────────┐
│                  CLI Tool                   │
│         (cal run, analyze, validate)        │
└─────────────────┬───────────────────────────┘
                  │
    ┌─────────────┴─────────────┐
    │                           │
┌───▼──────┐            ┌──────▼────┐
│  Parser  │            │ Validator │
│ (Peggy)  │            │           │
└───┬──────┘            └───────────┘
    │
    │ ActionPlan
    │
┌───▼─────────────────────────────────────────┐
│              Executor                       │
│  • Query (FORAGE)                          │
│  • Analyze (DIVE)                          │
│  • Measure (DRIFT)                         │
│  • Decide (FETCH)                          │
│  • Observe (PERCH/LISTEN)                  │
│  • Alert (CHIRP)                           │
└────┬──────────────────────┬─────────────────┘
     │                      │
┌────▼──────┐         ┌────▼──────┐
│   Data    │         │  Alert    │
│ Adapters  │         │ Adapters  │
│           │         │           │
│ • JSON    │         │ • Console │
│ • Memory  │         │ • File    │
│ • Custom  │         │ • Webhook │
└───────────┘         └───────────┘
```

## Core Modules

### Parser
Transforms CAL source code into executable action plans using Peggy grammar.

**[Learn more →](/runtime/getting-started)**

### Analyzer
Implements the three core formulas:
- **3D Lens**: `(Sound × Space × Time) / 10`
- **DRIFT**: `Methodology - Performance`
- **FETCH**: `Chirp × |DRIFT| × Confidence`

**[Learn more →](/frameworks/drift)**

### Executor
Executes action plans with full support for all CAL keywords and the 6D methodology.

**[Learn more →](/runtime/getting-started)**

### Adapters
Pluggable data sources and alert channels for flexible integration.

**[Learn more →](/runtime/data-adapters)**

### Validator
Entity and formula validation ensuring data integrity.

**[Learn more →](/runtime/validation)**

### Configuration
Project configuration with sensible defaults and flexible overrides.

**[Learn more →](/runtime/configuration)**

## Use Cases

### Cascade Analysis
Detect and measure cascading effects across 6 dimensions of organizational impact.

```cal
FORAGE entities
WHERE sound > 7 AND impact = "high"
ACROSS D1, D2, D3, D5, D6
DEPTH 3
SURFACE cascade_map
```

### Gap Measurement
Measure the gap between methodology expectations and actual performance.

```cal
DRIFT target_entities
METHODOLOGY 85
PERFORMANCE 40
```

### Intelligent Decision Making
Use FETCH to determine action routing based on threshold analysis.

```cal
FETCH cascade_map
THRESHOLD 1000
ON EXECUTE CHIRP critical "Immediate action required"
ON CONFIRM CHIRP warning "Review recommended"
```

### Real-Time Monitoring
Set up watchers for ongoing signal detection.

```cal
PERCH ON segment:"open-source"
LISTEN FOR disruption signals
WAKE AFTER 30d
CHIRP warning
```

## Documentation Structure

- **[Installation](/runtime/installation)** - Setup and package management
- **[Getting Started](/runtime/getting-started)** - First steps with the runtime
- **[Configuration](/runtime/configuration)** - Project config and .calrc files
- **[Validation](/runtime/validation)** - Entity and formula validation
- **[Data Adapters](/runtime/data-adapters)** - Connect to data sources
- **[Alert Adapters](/runtime/alert-adapters)** - Configure alert channels
- **[CLI Reference](/runtime/cli-reference)** - Command-line interface
- **[Examples](/runtime/examples)** - Real-world usage examples
- **[API Reference](/runtime/api-reference)** - TypeScript API documentation

## Repository

The CAL Runtime is open source and available on GitHub:

**[github.com/semanticintent/cal-runtime](https://github.com/semanticintent/cal-runtime)**

## Next Steps

Ready to get started? Choose your path:

::: tip For Developers
Start with **[Installation](/runtime/installation)** to set up your development environment.
:::

::: tip For Users
Jump to **[CLI Reference](/runtime/cli-reference)** to use the command-line tool.
:::

::: tip For Contributors
Check the **[GitHub repository](https://github.com/semanticintent/cal-runtime)** for contribution guidelines.
:::
