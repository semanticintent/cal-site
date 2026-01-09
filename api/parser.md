# Parser API (cal.js)

## Overview

The parser converts CAL source code into an Abstract Syntax Tree (AST) and compiles it into executable action plans.

## Installation

```javascript
const cal = require('./cal.js');
```

## Functions

### `parse(source)`

Parse CAL source code into AST.

**Parameters:**
- `source` (string) - CAL source code

**Returns:**
- AST object

**Example:**
```javascript
const cal = require('./cal.js');

const ast = cal.parse(`
  FORAGE entities
  WHERE sound > 7
  SURFACE results
`);

console.log(ast);
// {
//   type: 'Program',
//   statements: [
//     {
//       type: 'ForageStatement',
//       target: 'entities',
//       where: { ... },
//       surface: 'results'
//     }
//   ]
// }
```

---

### `compile(source)`

Parse and compile to action plan.

**Parameters:**
- `source` (string) - CAL source code

**Returns:**
- Compilation result object with:
  - `success` (boolean) - Whether compilation succeeded
  - `ast` (object) - Abstract Syntax Tree
  - `actionPlan` (array) - Executable action plan
  - `error` (object) - Error details if failed

**Example:**
```javascript
const result = cal.compile(`
  FORAGE entities
  WHERE sound > 7
  ACROSS D1, D2, D3
  DEPTH 2
  SURFACE cascade_map
`);

if (result.success) {
  console.log('Action Plan:', result.actionPlan);
  // Execute the plan...
} else {
  console.error('Compilation error:', result.error);
}
```

**Success Result:**
```javascript
{
  success: true,
  ast: { type: 'Program', statements: [...] },
  actionPlan: [
    {
      action: 'query',
      target: 'entities',
      conditions: { sound: { op: '>', value: 7 } },
      dimensions: ['D1', 'D2', 'D3'],
      depth: 2,
      output: 'cascade_map'
    }
  ]
}
```

**Error Result:**
```javascript
{
  success: false,
  error: {
    message: 'Expected target after FORAGE',
    location: { line: 2, column: 10 },
    found: 'WHERE'
  }
}
```

---

### `toActionPlan(ast)`

Convert AST to action plan.

**Parameters:**
- `ast` (object) - Abstract Syntax Tree from `parse()`

**Returns:**
- Action plan array

**Example:**
```javascript
const ast = cal.parse(source);
const actionPlan = cal.toActionPlan(ast);

console.log(actionPlan);
// [
//   { action: 'query', target: 'entities', ... },
//   { action: 'drift', target: 'cascade_map', ... },
//   { action: 'fetch', target: 'cascade_map', ... }
// ]
```

---

## AST Structure

### Program Node
```javascript
{
  type: 'Program',
  statements: [
    // Statement nodes...
  ]
}
```

### Forage Statement
```javascript
{
  type: 'ForageStatement',
  target: 'entities',
  where: {
    type: 'BinaryExpression',
    operator: '>',
    left: { type: 'Identifier', name: 'sound' },
    right: { type: 'Literal', value: 7 }
  },
  across: ['D1', 'D2', 'D3'],
  depth: 2,
  surface: 'cascade_map'
}
```

### Drift Statement
```javascript
{
  type: 'DriftStatement',
  target: 'cascade_map',
  methodology: 85,
  performance: 35,
  gapType: 'auto'
}
```

### Fetch Statement
```javascript
{
  type: 'FetchStatement',
  target: 'cascade_map',
  threshold: 1000,
  actions: {
    execute: { type: 'ChirpAction', level: 'critical', message: '...' },
    confirm: { type: 'ChirpAction', level: 'warning', message: '...' },
    queue: { type: 'SurfaceAction', output: 'queue_report' },
    wait: { type: 'PerchAction', target: 'segment:"monitor"' }
  }
}
```

---

## Action Plan Structure

### Query Action
```javascript
{
  action: 'query',
  type: 'forage',
  target: 'entities',
  conditions: {
    sound: { op: '>', value: 7 },
    segment: { op: '=', value: 'enterprise' }
  },
  dimensions: ['D1', 'D2', 'D3'],
  depth: 2,
  output: 'cascade_map'
}
```

### Drift Action
```javascript
{
  action: 'drift',
  target: 'cascade_map',
  methodology: 85,
  performance: 35,
  gapType: 'auto'
}
```

### Fetch Action
```javascript
{
  action: 'fetch',
  target: 'cascade_map',
  threshold: 1000,
  confidence: 70,
  executeAction: { action: 'chirp', level: 'critical', message: '...' },
  confirmAction: { action: 'chirp', level: 'warning', message: '...' },
  queueAction: { action: 'surface', output: 'queue_report' },
  waitAction: { action: 'perch', target: 'segment:"monitor"' }
}
```

### Alert Action
```javascript
{
  action: 'alert',
  type: 'chirp',
  level: 'critical',
  message: 'Immediate action required'
}
```

### Output Action
```javascript
{
  action: 'output',
  type: 'surface',
  target: 'cascade_map',
  format: 'json'
}
```

---

## Error Handling

### Parse Errors
```javascript
try {
  const ast = cal.parse(source);
} catch (error) {
  console.error('Parse error:', error.message);
  console.error('Location:', error.location);
  console.error('Expected:', error.expected);
  console.error('Found:', error.found);
}
```

### Compilation Errors
```javascript
const result = cal.compile(source);

if (!result.success) {
  console.error('Compilation failed');
  console.error('Error:', result.error.message);
  console.error('Line:', result.error.location.line);
  console.error('Column:', result.error.location.column);
}
```

---

## Advanced Usage

### Custom Parser Options
```javascript
const ast = cal.parse(source, {
  startRule: 'Program',
  allowComments: true
});
```

### Validation
```javascript
const result = cal.compile(source);

if (result.success) {
  // Validate action plan
  const isValid = validateActionPlan(result.actionPlan);
  if (isValid) {
    // Execute...
  }
}
```

### AST Transformation
```javascript
const ast = cal.parse(source);

// Transform AST (e.g., optimize, analyze)
const transformedAST = transformAST(ast);

// Convert to action plan
const actionPlan = cal.toActionPlan(transformedAST);
```

---

## Next Steps

- [Learn Executor API](/api/executor)
- [Explore Adapters](/api/adapters)
- [See Full Examples](/language/examples)
