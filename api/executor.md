# Executor API (executor.js)

## Overview

The Executor runs CAL action plans, manages data access, and handles alerts.

## Installation

```javascript
const { createExecutor } = require('./lib/executor.js');
```

## Creating an Executor

```javascript
const { createExecutor } = require('./lib/executor.js');
const { createDataAdapter } = require('./lib/data-adapters.js');
const { createAlertAdapter } = require('./lib/alert-adapters.js');

// Create adapters
const dataAdapter = createDataAdapter({
  type: 'json',
  filePath: './data.json'
});

const alertAdapter = createAlertAdapter({
  type: 'console'
});

// Create executor
const executor = createExecutor({
  dataAdapter,
  alertAdapter
});
```

---

## Methods

### `execute(actionPlan, context)`

Execute an action plan.

**Parameters:**
- `actionPlan` (array) - Action plan from parser
- `context` (object) - Execution context (optional)

**Returns:**
- Promise&lt;ExecutionResult&gt;

**Example:**
```javascript
const cal = require('./cal.js');
const { createExecutor } = require('./lib/executor.js');

// Compile CAL
const result = cal.compile(source);

// Create executor
const executor = createExecutor({ dataAdapter, alertAdapter });

// Execute
const execResult = await executor.execute(result.actionPlan, {
  variables: {},
  verbose: true
});

console.log(execResult);
// {
//   success: true,
//   outputs: {
//     cascade_map: { count: 3, dimensions: 5, ... }
//   },
//   alerts: [
//     { level: 'critical', message: '...', timestamp: '...' }
//   ]
// }
```

---

### `handleQuery(action, context)`

Execute FORAGE or DIVE query.

**Parameters:**
- `action` (object) - Query action
- `context` (object) - Execution context

**Returns:**
- Promise&lt;QueryResult&gt;

**Example:**
```javascript
const action = {
  action: 'query',
  type: 'forage',
  target: 'entities',
  conditions: { sound: { op: '>', value: 7 } },
  dimensions: ['D1', 'D2', 'D3'],
  depth: 2,
  output: 'cascade_map'
};

const result = await executor.handleQuery(action, context);
// {
//   count: 3,
//   entities: [...],
//   dimensionsAffected: 3,
//   averageScore: 42.5
// }
```

---

### `handleDrift(action, context)`

Execute DRIFT analysis.

**Parameters:**
- `action` (object) - Drift action
- `context` (object) - Execution context

**Returns:**
- Promise&lt;DriftResult&gt;

**Example:**
```javascript
const action = {
  action: 'drift',
  target: 'cascade_map',
  methodology: 85,
  performance: 35,
  gapType: 'auto'
};

const result = await executor.handleDrift(action, context);
// {
//   drift: 50,
//   absDrift: 50,
//   gapType: 'teaching',
//   driftQuality: 'extreme',
//   interpretation: 'Over-explanation - cognitive overload'
// }
```

---

### `handleFetch(action, context)`

Execute FETCH decision.

**Parameters:**
- `action` (object) - Fetch action
- `context` (object) - Execution context

**Returns:**
- Promise&lt;FetchResult&gt;

**Example:**
```javascript
const action = {
  action: 'fetch',
  target: 'cascade_map',
  threshold: 1000,
  executeAction: { action: 'chirp', level: 'critical', message: '...' }
};

const result = await executor.handleFetch(action, context);
// {
//   score: 3600,
//   threshold: 1000,
//   decision: 'EXECUTE',
//   confidence: 0.8,
//   actionTaken: { level: 'critical', message: '...' }
// }
```

---

### `handleAlert(action, context)`

Execute CHIRP alert.

**Parameters:**
- `action` (object) - Alert action
- `context` (object) - Execution context

**Returns:**
- Promise&lt;void&gt;

**Example:**
```javascript
const action = {
  action: 'alert',
  type: 'chirp',
  level: 'critical',
  message: 'Immediate action required'
};

await executor.handleAlert(action, context);
// Alert sent via alert adapter
```

---

### `handleOutput(action, context)`

Execute SURFACE output.

**Parameters:**
- `action` (object) - Output action
- `context` (object) - Execution context

**Returns:**
- Promise&lt;void&gt;

**Example:**
```javascript
const action = {
  action: 'output',
  type: 'surface',
  target: 'cascade_map',
  format: 'json'
};

await executor.handleOutput(action, context);
// Output produced via console or file
```

---

## Execution Context

The context object tracks execution state:

```javascript
{
  variables: {
    cascade_map: { count: 3, entities: [...] },
    drift_analysis: { drift: 50, gapType: 'teaching' }
  },
  outputs: {
    'results.json': { path: './results.json', format: 'json' }
  },
  alerts: [
    { level: 'critical', message: '...', timestamp: '2026-01-09T12:00:00Z' }
  ],
  verbose: true,
  startTime: 1704801600000
}
```

---

## Execution Result

```javascript
{
  success: true,
  duration: 125,  // milliseconds
  outputs: {
    cascade_map: {
      count: 3,
      dimensionsAffected: 5,
      averageScore: 48.3,
      impactRange: '$1.2M - $1.8M',
      entities: [...]
    }
  },
  alerts: [
    {
      level: 'critical',
      message: 'Immediate action required',
      timestamp: '2026-01-09T12:00:00Z'
    }
  ],
  drift: {
    drift: 50,
    gapType: 'teaching',
    quality: 'extreme'
  },
  fetch: {
    score: 3600,
    decision: 'EXECUTE',
    threshold: 1000
  }
}
```

---

## Error Handling

### Execution Errors
```javascript
try {
  const result = await executor.execute(actionPlan, context);
} catch (error) {
  console.error('Execution failed:', error.message);
  console.error('Action:', error.action);
  console.error('Context:', error.context);
}
```

### Data Adapter Errors
```javascript
const executor = createExecutor({
  dataAdapter,
  alertAdapter,
  onError: (error) => {
    console.error('Data error:', error);
  }
});
```

---

## Advanced Usage

### Custom Execution Flow
```javascript
const executor = createExecutor({
  dataAdapter,
  alertAdapter,
  hooks: {
    beforeQuery: async (action, context) => {
      console.log('About to query:', action.target);
    },
    afterQuery: async (result, context) => {
      console.log('Query returned:', result.count, 'items');
    }
  }
});
```

### Streaming Results
```javascript
const executor = createExecutor({
  dataAdapter,
  alertAdapter,
  streaming: true
});

executor.on('result', (data) => {
  console.log('Intermediate result:', data);
});

await executor.execute(actionPlan);
```

### Parallel Execution
```javascript
// Execute multiple plans in parallel
const results = await Promise.all([
  executor.execute(plan1, context1),
  executor.execute(plan2, context2),
  executor.execute(plan3, context3)
]);
```

---

## Integration with Parser

```javascript
const cal = require('./cal.js');
const { createExecutor } = require('./lib/executor.js');

// Full pipeline
async function runCAL(source, data) {
  // 1. Parse & compile
  const compiled = cal.compile(source);
  if (!compiled.success) {
    throw new Error('Compilation failed: ' + compiled.error.message);
  }

  // 2. Create executor
  const executor = createExecutor({
    dataAdapter: createDataAdapter({ type: 'memory', data }),
    alertAdapter: createAlertAdapter({ type: 'console' })
  });

  // 3. Execute
  const result = await executor.execute(compiled.actionPlan);

  return result;
}

// Usage
const result = await runCAL(calSource, myData);
```

---

## Next Steps

- [Learn Adapters API](/api/adapters)
- [Understand Parser API](/api/parser)
- [See Full Examples](/language/examples)
