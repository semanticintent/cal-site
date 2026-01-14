# Data Adapters

Connect CAL Runtime to multiple data sources through a flexible adapter system.

## Overview

Data adapters provide a unified interface for querying entities from different sources. The runtime includes three built-in adapters and supports custom implementations.

**Built-in Adapters:**
- **Memory** - In-memory collections for testing and small datasets
- **JSON** - File-based storage with automatic caching
- **Composite** - Query multiple sources and merge results

All adapters implement the same `DataAdapter` interface, making them interchangeable.

## DataAdapter Interface

```typescript
interface DataAdapter {
  /**
   * Query entities from the data source
   * @param target - Collection/table name
   * @param filters - Optional filter conditions
   * @returns Array of entities matching filters
   */
  query(target: string, filters?: FilterCondition[]): Promise<Entity[]>;
}

interface FilterCondition {
  field: string;
  operator: '=' | '!=' | '>' | '<' | '>=' | '<=';
  value: any;
}
```

## Memory Data Adapter

In-memory storage for fast access without file I/O.

### Basic Usage

```typescript
import { MemoryDataAdapter } from '@stratiqx/cal-runtime';

const adapter = new MemoryDataAdapter({
  entities: [
    {
      id: 'entity-1',
      name: 'First Entity',
      type: 'customer',
      sound: 8,
      space: 7,
      time: 9
    },
    {
      id: 'entity-2',
      name: 'Second Entity',
      type: 'customer',
      sound: 6,
      space: 5,
      time: 7
    }
  ]
});

// Query all entities
const all = await adapter.query('entities');

// Query with filters
const high = await adapter.query('entities', [
  { field: 'sound', operator: '>', value: 7 }
]);
```

### Multiple Collections

Store different entity types in separate collections:

```typescript
const adapter = new MemoryDataAdapter({
  customers: [
    { id: 'c1', name: 'Customer 1', sound: 8, space: 7, time: 9 }
  ],
  employees: [
    { id: 'e1', name: 'Employee 1', sound: 6, space: 5, time: 7 }
  ],
  products: [
    { id: 'p1', name: 'Product 1', sound: 7, space: 8, time: 6 }
  ]
});

// Query specific collection
const customers = await adapter.query('customers');
const employees = await adapter.query('employees');
```

### Dynamic Updates

Add or update collections at runtime:

```typescript
const adapter = new MemoryDataAdapter();

// Set initial data
adapter.setCollection('entities', [
  { id: '1', name: 'Entity 1', sound: 8, space: 7, time: 9 }
]);

// Add more data later
adapter.setCollection('events', [
  { id: 'e1', name: 'Event 1', sound: 9, space: 8, time: 10 }
]);

// List collections
const collections = adapter.getCollectionNames();
// ['entities', 'events']
```

### Use Cases

**Testing:**
```typescript
// Quick test data setup
const testAdapter = new MemoryDataAdapter({
  entities: mockEntities
});

const executor = new Executor({ dataAdapter: testAdapter });
```

**Small Datasets:**
```typescript
// Load from API or database once, use in memory
const data = await fetchFromAPI();
const adapter = new MemoryDataAdapter({ entities: data });
```

## JSON Data Adapter

File-based storage with automatic caching and lazy loading.

### Basic Usage

```typescript
import { JSONDataAdapter } from '@stratiqx/cal-runtime';

// Point to directory containing JSON files
const adapter = new JSONDataAdapter('./data');

// Query loads from ./data/entities.json
const entities = await adapter.query('entities');

// Query loads from ./data/customers.json
const customers = await adapter.query('customers');
```

### File Structure

JSON files can use two formats:

**Array format:**
```json
[
  {
    "id": "entity-1",
    "name": "Entity 1",
    "sound": 8,
    "space": 7,
    "time": 9
  }
]
```

**Object format:**
```json
{
  "entities": [
    {
      "id": "entity-1",
      "name": "Entity 1",
      "sound": 8,
      "space": 7,
      "time": 9
    }
  ]
}
```

Both formats work identically.

### Caching

The adapter automatically caches loaded files:

```typescript
const adapter = new JSONDataAdapter('./data');

// First query loads from disk
const result1 = await adapter.query('entities');

// Subsequent queries use cache (no disk I/O)
const result2 = await adapter.query('entities');
const result3 = await adapter.query('entities');

// Clear cache to reload from disk
adapter.clearCache('entities');

// Or clear all caches
adapter.clearCache();
```

### Filtering

Query with conditions:

```typescript
const adapter = new JSONDataAdapter('./data');

// Single filter
const high = await adapter.query('entities', [
  { field: 'sound', operator: '>', value: 7 }
]);

// Multiple filters (AND logic)
const filtered = await adapter.query('entities', [
  { field: 'sound', operator: '>', value: 7 },
  { field: 'impact', operator: '=', value: 'high' }
]);

// Nested field access
const segmented = await adapter.query('entities', [
  { field: 'metadata.segment', operator: '=', value: 'enterprise' }
]);
```

### Supported Operators

- `=` - Equals
- `!=` - Not equals
- `>` - Greater than
- `<` - Less than
- `>=` - Greater than or equal
- `<=` - Less than or equal

### Error Handling

```typescript
const adapter = new JSONDataAdapter('./data');

try {
  // File not found returns empty array (not an error)
  const missing = await adapter.query('nonexistent');
  // missing === []

  // Parse errors throw exceptions
  const invalid = await adapter.query('malformed');
} catch (error) {
  console.error('Failed to load:', error.message);
}
```

### Use Cases

**Production Data:**
```typescript
// Load entities from files
const adapter = new JSONDataAdapter('./production-data');
const executor = new Executor({ dataAdapter: adapter });
```

**Development:**
```typescript
// Use sample data during development
const adapter = new JSONDataAdapter('./dev-data');
```

## Composite Data Adapter

Query multiple sources simultaneously and merge results.

### Basic Usage

```typescript
import { CompositeDataAdapter, MemoryDataAdapter, JSONDataAdapter } from '@stratiqx/cal-runtime';

// Create source adapters
const memory = new MemoryDataAdapter({
  entities: [{ id: 'm1', name: 'Memory Entity', sound: 8, space: 7, time: 9 }]
});

const json = new JSONDataAdapter('./data');

// Combine them
const composite = new CompositeDataAdapter([memory, json]);

// Query all sources
const results = await composite.query('entities');
// Returns entities from both memory and JSON, deduplicated by ID
```

### Deduplication

Composite adapter automatically deduplicates by entity ID:

```typescript
const adapter1 = new MemoryDataAdapter({
  entities: [
    { id: 'shared', name: 'From Adapter 1', sound: 8, space: 7, time: 9 }
  ]
});

const adapter2 = new MemoryDataAdapter({
  entities: [
    { id: 'shared', name: 'From Adapter 2', sound: 9, space: 8, time: 10 }
  ]
});

const composite = new CompositeDataAdapter([adapter1, adapter2]);
const results = await composite.query('entities');

// Only one entity with id='shared' (first occurrence wins)
// results.length === 1
```

### Dynamic Adapters

Add adapters after creation:

```typescript
const composite = new CompositeDataAdapter([]);

// Add adapters as needed
composite.addAdapter(new JSONDataAdapter('./data'));
composite.addAdapter(new MemoryDataAdapter({ entities: liveData }));

// Query all sources
const results = await composite.query('entities');
```

### Use Cases

**Multi-Source Analysis:**
```typescript
// Combine historical data (files) with live data (memory)
const composite = new CompositeDataAdapter([
  new JSONDataAdapter('./historical'),
  new MemoryDataAdapter({ entities: currentData })
]);
```

**Fallback Sources:**
```typescript
// Try primary source, fallback to backup
const composite = new CompositeDataAdapter([
  new JSONDataAdapter('./primary'),
  new JSONDataAdapter('./backup')
]);
```

## Factory Function

Create adapters with configuration objects:

```typescript
import { createDataAdapter } from '@stratiqx/cal-runtime';

// Memory adapter
const memory = createDataAdapter({
  type: 'memory',
  initialData: {
    entities: myEntities
  }
});

// JSON adapter
const json = createDataAdapter({
  type: 'json',
  basePath: './data'
});

// Composite adapter
const composite = createDataAdapter({
  type: 'composite',
  adapters: [memory, json]
});
```

## Custom Data Adapters

Implement the interface for custom sources:

### Database Adapter

```typescript
import { DataAdapter, FilterCondition, Entity } from '@stratiqx/cal-runtime';
import { Database } from 'your-db-library';

class DatabaseAdapter implements DataAdapter {
  private db: Database;

  constructor(connectionString: string) {
    this.db = new Database(connectionString);
  }

  async query(target: string, filters?: FilterCondition[]): Promise<Entity[]> {
    // Build SQL query
    let sql = `SELECT * FROM ${target}`;

    if (filters && filters.length > 0) {
      const conditions = filters.map(f => {
        return `${f.field} ${f.operator} ?`;
      });
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    // Execute and return
    const rows = await this.db.query(sql, filters?.map(f => f.value));
    return rows as Entity[];
  }
}

// Usage
const adapter = new DatabaseAdapter('postgresql://localhost/mydb');
const executor = new Executor({ dataAdapter: adapter });
```

### API Adapter

```typescript
class APIAdapter implements DataAdapter {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async query(target: string, filters?: FilterCondition[]): Promise<Entity[]> {
    // Build query parameters
    const params = new URLSearchParams();
    filters?.forEach(f => {
      params.append(f.field, `${f.operator}${f.value}`);
    });

    // Fetch from API
    const response = await fetch(
      `${this.baseUrl}/${target}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  }
}

// Usage
const adapter = new APIAdapter('https://api.example.com/v1');
```

### CSV Adapter

```typescript
import * as fs from 'fs/promises';
import { parse } from 'csv-parse/sync';

class CSVAdapter implements DataAdapter {
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  async query(target: string, filters?: FilterCondition[]): Promise<Entity[]> {
    // Read CSV file
    const filePath = `${this.basePath}/${target}.csv`;
    const content = await fs.readFile(filePath, 'utf-8');

    // Parse CSV
    const records = parse(content, {
      columns: true,
      skip_empty_lines: true
    });

    // Apply filters
    if (!filters || filters.length === 0) {
      return records;
    }

    return records.filter((record: any) => {
      return filters.every(f => {
        const value = record[f.field];
        return this.evaluateCondition(value, f.operator, f.value);
      });
    });
  }

  private evaluateCondition(value: any, operator: string, expected: any): boolean {
    switch (operator) {
      case '=': return value === expected;
      case '!=': return value !== expected;
      case '>': return value > expected;
      case '<': return value < expected;
      case '>=': return value >= expected;
      case '<=': return value <= expected;
      default: return false;
    }
  }
}
```

## Integration with Executor

### TypeScript

```typescript
import { compile, Executor, createDataAdapter } from '@stratiqx/cal-runtime';

// Create adapter
const dataAdapter = createDataAdapter({
  type: 'json',
  basePath: './data'
});

// Create executor
const executor = new Executor({ dataAdapter });

// Compile and execute
const calSource = 'FORAGE entities WHERE sound > 7 SURFACE results';
const { actionPlan } = compile(calSource);
const result = await executor.execute(actionPlan);

console.log(result.outputs.results);
```

### CLI

The CLI creates adapters based on flags:

```bash
# JSON adapter from single file
cal run script.cal --data entities.json

# JSON adapter from directory
cal run script.cal --data-path ./data

# Memory adapter (no data source)
cal run script.cal --inline "FORAGE entities SURFACE results"
```

## Best Practices

### 1. Choose the Right Adapter

**Use Memory when:**
- Dataset is small (< 1000 entities)
- Data changes frequently
- Running tests
- Data comes from API or database

**Use JSON when:**
- Data is file-based
- Dataset is moderate (< 100,000 entities)
- Caching benefits performance
- Working with static data

**Use Composite when:**
- Combining multiple sources
- Need deduplication
- Implementing fallback logic

### 2. Optimize Filtering

Filter at the data source when possible:

```typescript
// Good: Filter in query (leverages indexes, caching)
const high = await adapter.query('entities', [
  { field: 'sound', operator: '>', value: 7 }
]);

// Less efficient: Filter after query
const all = await adapter.query('entities');
const high = all.filter(e => e.sound > 7);
```

### 3. Use Caching Wisely

```typescript
const adapter = new JSONDataAdapter('./data');

// Cache is good for read-heavy workloads
const result1 = await adapter.query('entities');  // Load from disk
const result2 = await adapter.query('entities');  // Use cache

// Clear cache if data changes
await updateDataFile();
adapter.clearCache('entities');
```

### 4. Handle Missing Data

```typescript
const adapter = new JSONDataAdapter('./data');

// Query returns empty array if target doesn't exist
const results = await adapter.query('nonexistent');

// Check before processing
if (results.length === 0) {
  console.log('No entities found');
}
```

### 5. Test with Mock Adapters

```typescript
// Create test adapter with known data
const testAdapter = new MemoryDataAdapter({
  entities: [
    { id: 't1', name: 'Test 1', sound: 8, space: 7, time: 9 },
    { id: 't2', name: 'Test 2', sound: 6, space: 5, time: 7 }
  ]
});

// Use in tests
const executor = new Executor({ dataAdapter: testAdapter });
const result = await executor.execute(actionPlan);

// Verify results
expect(result.outputs.results.count).toBe(2);
```

## Performance Considerations

### Memory Usage

```typescript
// Memory adapter: Full dataset in RAM
const memory = new MemoryDataAdapter({
  entities: largeDataset  // ⚠️ All loaded at once
});

// JSON adapter: Lazy loading + caching
const json = new JSONDataAdapter('./data');
await json.query('entities');  // Loads on first query only
```

### Query Efficiency

```typescript
// Efficient: Single query with filters
const filtered = await adapter.query('entities', [
  { field: 'sound', operator: '>', value: 7 },
  { field: 'type', operator: '=', value: 'customer' }
]);

// Less efficient: Multiple queries
const all = await adapter.query('entities');
const filtered = all.filter(e => e.sound > 7 && e.type === 'customer');
```

### Caching Strategy

```typescript
const adapter = new JSONDataAdapter('./data');

// Good: Cache rarely-changing data
const static = await adapter.query('dimensions');  // Cache this

// Consider: Clear cache for frequently-changing data
const live = await adapter.query('events');
// Update data...
adapter.clearCache('events');
const updated = await adapter.query('events');
```

## Next Steps

- **[Alert Adapters](/runtime/alert-adapters)** - Configure alert channels
- **[Validation](/runtime/validation)** - Validate data from adapters
- **[Examples](/runtime/examples)** - See adapters in real scripts
- **[API Reference](/runtime/api-reference)** - Full TypeScript API
