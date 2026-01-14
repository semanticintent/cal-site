# Validation

Entity and formula validation for data integrity and semantic correctness.

## Overview

The CAL Runtime provides comprehensive validation utilities to ensure your entities, dimensions, and formulas meet the requirements of the 6D methodology. Validation happens at multiple levels:

- **Entity validation** - Check entities have required fields and proper structure
- **Formula validation** - Validate 3D Lens, DRIFT, and FETCH inputs
- **Data file validation** - Ensure JSON data files are properly formatted
- **Dimension validation** - Verify dimension IDs and coordinate ranges

## Entity Validation

### Basic Entity Schema

Validate entities against the default schema:

```typescript
import { validateEntity } from '@stratiqx/cal-runtime';

const entity = {
  id: 'entity-1',
  name: 'My Entity',
  type: 'customer',
  sound: 8,
  space: 7,
  time: 9
};

const result = validateEntity(entity);

if (!result.valid) {
  console.error('Validation errors:', result.errors);
}
```

### Default Schema Requirements

The default entity schema requires:

```typescript
{
  requireId: true,           // Entity must have 'id' field
  requireName: true,          // Entity must have 'name' field
  requireType: true,          // Entity must have 'type' field
  requireSound: true,         // Sound coordinate required (0-10)
  requireSpace: true,         // Space coordinate required (0-10)
  requireTime: true,          // Time coordinate required (0-10)
  allowAdditionalFields: true // Extra fields allowed
}
```

### Custom Schema

Create custom validation rules:

```typescript
import { validateEntity, EntitySchema } from '@stratiqx/cal-runtime';

const customSchema: EntitySchema = {
  requireId: true,
  requireName: true,
  requireType: false,           // Type is optional
  requireSound: true,
  requireSpace: true,
  requireTime: true,
  requireDimensions: ['D1', 'D2', 'D3'], // Require these dimensions
  allowAdditionalFields: true
};

const result = validateEntity(entity, customSchema);
```

### Validation Results

Validation returns structured error information:

```typescript
interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

interface ValidationError {
  field: string;
  message: string;
  value?: any;
}
```

Example with errors:

```typescript
const invalidEntity = {
  id: 'test',
  sound: 15,  // Invalid: > 10
  space: -2,  // Invalid: < 0
};

const result = validateEntity(invalidEntity);

// result.valid === false
// result.errors === [
//   { field: 'name', message: 'Entity name is required', value: undefined },
//   { field: 'sound', message: 'sound must be between 0 and 10', value: 15 },
//   { field: 'space', message: 'space must be between 0 and 10', value: -2 },
// ]
```

## Coordinate Validation

### 3D Coordinates (Sound, Space, Time)

All coordinates must be in the range 0-10:

```typescript
// Valid coordinates
{ sound: 8, space: 7, time: 9 }   // ✓ All in range
{ sound: 0, space: 10, time: 5 }  // ✓ Boundaries allowed

// Invalid coordinates
{ sound: 15, space: 7, time: 9 }  // ✗ sound > 10
{ sound: 8, space: -2, time: 9 }  // ✗ space < 0
{ sound: 'high', space: 7 }       // ✗ must be numbers
```

Validation checks:
- Type: Must be `number`
- Range: Must be between 0 and 10 (inclusive)
- Required: Cannot be `null` or `undefined`

## Dimension Validation

### Dimension Structure

Dimensions must have proper 3D coordinates:

```typescript
const entity = {
  id: 'test',
  name: 'Test Entity',
  sound: 8,
  space: 7,
  time: 9,
  dimensions: {
    D1: { sound: 7, space: 6, time: 8 },  // ✓ Valid
    D2: { sound: 8, space: 7, time: 7 },  // ✓ Valid
    D3: { sound: 15, space: 8, time: 9 }  // ✗ Invalid: sound > 10
  }
};

const schema: EntitySchema = {
  requireDimensions: ['D1', 'D2', 'D3']
};

const result = validateEntity(entity, schema);
// Will report error for D3.sound
```

### Dimension IDs

Validate dimension identifiers:

```typescript
import { isValidDimensionId, getDimensionName } from '@stratiqx/cal-runtime';

// Valid dimension IDs
isValidDimensionId('D1');   // true
isValidDimensionId('D6');   // true
isValidDimensionId('ALL');  // true

// Invalid dimension IDs
isValidDimensionId('D7');   // false
isValidDimensionId('d1');   // false (case-sensitive)

// Get dimension names
getDimensionName('D1');  // 'Customer'
getDimensionName('D2');  // 'Employee'
getDimensionName('D3');  // 'Revenue'
```

Valid dimension IDs: `D1`, `D2`, `D3`, `D4`, `D5`, `D6`, `ALL`

## Formula Validation

### 3D Lens Validation

Validate inputs for 3D Lens calculation:

```typescript
import { validate3DLens } from '@stratiqx/cal-runtime';

const result = validate3DLens(8, 7, 9);

if (!result.valid) {
  console.error('Invalid 3D Lens inputs:', result.errors);
}

// Invalid example
const invalid = validate3DLens(15, 7, 9);
// invalid.errors: [{ field: 'sound', message: 'sound must be between 0 and 10', value: 15 }]
```

Requirements:
- All three coordinates (sound, space, time) must be numbers
- Each must be in range 0-10
- None can be null or undefined

### DRIFT Validation

Validate DRIFT calculation inputs:

```typescript
import { validateDrift } from '@stratiqx/cal-runtime';

const result = validateDrift(85, 40);

if (!result.valid) {
  console.error('Invalid DRIFT inputs:', result.errors);
}

// Invalid examples
validateDrift(150, 40);   // ✗ methodology > 100
validateDrift(85, -10);   // ✗ performance < 0
validateDrift('high', 40); // ✗ must be numbers
```

Requirements:
- Both methodology and performance must be numbers
- Each must be in range 0-100
- None can be null or undefined

### FETCH Validation

Validate FETCH calculation inputs:

```typescript
import { validateFetch } from '@stratiqx/cal-runtime';

const result = validateFetch(45, 30, 0.8);

if (!result.valid) {
  console.error('Invalid FETCH inputs:', result.errors);
}

// Invalid examples
validateFetch(-5, 30, 0.8);   // ✗ chirp < 0
validateFetch(45, 30, 1.5);   // ✗ confidence > 1
validateFetch(45, 30, -0.2);  // ✗ confidence < 0
```

Requirements:
- **chirp**: Must be number ≥ 0 (no upper limit)
- **drift**: Must be number (any value)
- **confidence**: Must be number in range 0-1

## Multiple Entity Validation

Validate arrays of entities:

```typescript
import { validateEntities } from '@stratiqx/cal-runtime';

const entities = [
  { id: '1', name: 'Entity 1', sound: 8, space: 7, time: 9 },
  { id: '2', name: 'Entity 2', sound: 15, space: 7, time: 9 },  // Invalid
  { id: '3', name: 'Entity 3', sound: 6, space: 5, time: 4 }
];

const result = validateEntities(entities);

if (!result.valid) {
  result.errors.forEach(error => {
    console.error(error.field, error.message);
  });
}

// Error format includes array index:
// entities[1].sound: sound must be between 0 and 10 (got: 15)
```

## Data File Validation

Validate complete data files:

```typescript
import { validateDataFile } from '@stratiqx/cal-runtime';
import * as fs from 'fs/promises';

// Load JSON data
const data = JSON.parse(await fs.readFile('entities.json', 'utf-8'));

// Validate structure
const result = validateDataFile(data);

if (!result.valid) {
  console.error('Data file errors:');
  result.errors.forEach(error => {
    console.error(`  ${error.field}: ${error.message}`);
  });
  process.exit(1);
}
```

Data file requirements:
- Must be valid JSON object
- Must have `entities` array
- All entities must pass validation

Valid structure:

```json
{
  "entities": [
    {
      "id": "entity-1",
      "name": "My Entity",
      "type": "customer",
      "sound": 8,
      "space": 7,
      "time": 9
    }
  ]
}
```

## Error Formatting

Format validation errors for display:

```typescript
import { formatValidationErrors } from '@stratiqx/cal-runtime';

const result = validateEntity(invalidEntity);

if (!result.valid) {
  const formatted = formatValidationErrors(result.errors);
  console.error(formatted);
}

// Output:
// 1. sound: sound must be between 0 and 10 (got: 15)
// 2. space: space must be between 0 and 10 (got: -2)
// 3. name: Entity name is required (got: undefined)
```

## Integration with Runtime

### CLI Validation

The CLI automatically validates data files:

```bash
# Validate script syntax
cal validate analysis.cal

# Runtime validates data during execution
cal run analysis.cal --data entities.json
```

If validation fails, execution stops with detailed error messages.

### Programmatic Validation

Validate before execution:

```typescript
import { compile, Executor, createDataAdapter, validateDataFile } from '@stratiqx/cal-runtime';
import * as fs from 'fs/promises';

// Load and validate data
const data = JSON.parse(await fs.readFile('entities.json', 'utf-8'));
const validation = validateDataFile(data);

if (!validation.valid) {
  throw new Error(`Invalid data: ${formatValidationErrors(validation.errors)}`);
}

// Compile script
const { actionPlan } = compile(await fs.readFile('script.cal', 'utf-8'));

// Execute with validated data
const executor = new Executor({
  dataAdapter: createDataAdapter({
    type: 'memory',
    initialData: data
  })
});

const result = await executor.execute(actionPlan);
```

## Best Practices

### 1. Validate Early

Validate data before execution to catch errors early:

```typescript
// Good: Validate before processing
const validation = validateDataFile(data);
if (!validation.valid) {
  handleErrors(validation.errors);
  return;
}
processData(data);

// Bad: Skip validation
processData(data);  // May fail mid-execution
```

### 2. Use Custom Schemas

Define schemas that match your use case:

```typescript
// Minimal schema for testing
const testSchema: EntitySchema = {
  requireId: true,
  requireName: true,
  requireSound: true,
  requireSpace: true,
  requireTime: true,
  allowAdditionalFields: true
};

// Strict schema for production
const prodSchema: EntitySchema = {
  requireId: true,
  requireName: true,
  requireType: true,
  requireSound: true,
  requireSpace: true,
  requireTime: true,
  requireDimensions: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6'],
  allowAdditionalFields: false  // Strict mode
};
```

### 3. Handle Validation Errors Gracefully

Provide clear error messages to users:

```typescript
const result = validateEntities(entities);

if (!result.valid) {
  const errorCount = result.errors.length;
  console.error(`❌ Validation failed with ${errorCount} error(s):\n`);

  result.errors.forEach((error, i) => {
    console.error(`${i + 1}. ${error.field}: ${error.message}`);
    if (error.value !== undefined) {
      console.error(`   Current value: ${JSON.stringify(error.value)}`);
    }
  });

  process.exit(1);
}
```

### 4. Validate Configuration

Validate configuration files:

```typescript
import { loadConfig, validateConfig } from '@stratiqx/cal-runtime';

const config = await loadConfig();
const validation = validateConfig(config);

if (!validation.valid) {
  throw new Error(`Invalid configuration: ${validation.errors.join(', ')}`);
}
```

## Common Validation Errors

### Missing Required Fields

```typescript
// Error: Entity name is required
{ id: 'test', sound: 8, space: 7, time: 9 }  // Missing 'name'

// Fix: Add required field
{ id: 'test', name: 'Test', sound: 8, space: 7, time: 9 }
```

### Out of Range Values

```typescript
// Error: sound must be between 0 and 10
{ sound: 15, space: 7, time: 9 }

// Fix: Use valid range
{ sound: 10, space: 7, time: 9 }
```

### Type Errors

```typescript
// Error: sound must be a number
{ sound: 'high', space: 7, time: 9 }

// Fix: Use numeric values
{ sound: 8, space: 7, time: 9 }
```

### Missing Dimensions

```typescript
// Error: Dimension D1 is required
const schema = { requireDimensions: ['D1', 'D2'] };
const entity = {
  dimensions: {
    D1: { sound: 7, space: 6, time: 8 }
    // D2 missing
  }
};

// Fix: Include all required dimensions
const entity = {
  dimensions: {
    D1: { sound: 7, space: 6, time: 8 },
    D2: { sound: 8, space: 7, time: 7 }
  }
};
```

## Testing with Validation

Use validation in tests:

```typescript
import { validateEntity, validateDrift, validateFetch } from '@stratiqx/cal-runtime';

describe('Entity validation', () => {
  it('should accept valid entity', () => {
    const entity = {
      id: 'test',
      name: 'Test',
      type: 'customer',
      sound: 8,
      space: 7,
      time: 9
    };

    const result = validateEntity(entity);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject invalid coordinates', () => {
    const entity = {
      id: 'test',
      name: 'Test',
      sound: 15  // Invalid
    };

    const result = validateEntity(entity);
    expect(result.valid).toBe(false);
    expect(result.errors).toContainEqual({
      field: 'sound',
      message: 'sound must be between 0 and 10',
      value: 15
    });
  });
});
```

## Next Steps

- **[Data Adapters](/runtime/data-adapters)** - Connect validated data sources
- **[CLI Reference](/runtime/cli-reference)** - Validation commands
- **[Examples](/runtime/examples)** - See validation in action
- **[Configuration](/runtime/configuration)** - Configure validation rules
