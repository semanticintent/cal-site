# API Reference

Complete TypeScript API documentation for the CAL Runtime.

## Installation

```bash
npm install @stratiqx/cal-runtime
```

## Core Modules

### Parser

Parse CAL source code into executable action plans.

#### compile()

Compile CAL source code into an executable action plan.

```typescript
import { compile } from '@stratiqx/cal-runtime';

function compile(source: string): CompileResult;

type CompileResult =
  | {
      success: true;
      source: string;
      ast: Program;
      actionPlan: ActionPlan;
    }
  | {
      success: false;
      error: {
        message: string;
        location?: any;
        expected?: any[];
        found?: string;
      };
    };
```

**Example:**

```typescript
const result = compile('FORAGE entities WHERE sound > 7 SURFACE results');

if (result.success) {
  console.log('Action plan:', result.actionPlan);
} else {
  console.error('Parse error:', result.error.message);
}
```

### Executor

Execute compiled action plans.

#### Executor Class

```typescript
import { Executor } from '@stratiqx/cal-runtime';

class Executor {
  constructor(config?: ExecutorConfig);
  execute(actionPlan: ActionPlan, context?: Record<string, any>): Promise<ExecutionResult>;
  executeAction(action: Action): Promise<any>;
  getResult(key: string): any;
  getAllResults(): Record<string, any>;
}

interface ExecutorConfig {
  dataAdapter?: DataAdapter;
  alertAdapter?: AlertAdapter;
  context?: Record<string, any>;
}
```

**Example:**

```typescript
const executor = new Executor({
  dataAdapter: createDataAdapter({ type: 'json', basePath: './data' }),
  alertAdapter: createAlertAdapter({ type: 'console' })
});

const { actionPlan } = compile(calSource);
const result = await executor.execute(actionPlan);

console.log('Outputs:', result.outputs);
console.log('Success:', result.success);
```

#### ExecutionResult

```typescript
interface ExecutionResult {
  type: 'ExecutionResult';
  started: string;
  completed: string | null;
  methodology: string;
  actions: ActionResult[];
  outputs: Record<string, any>;
  alerts: Alert[];
  watchers: Watcher[];
  scheduledTasks: ScheduledTask[];
  success: boolean;
  error?: string;
}
```

### Analyzer

Calculate formulas and analyze entities.

#### calculate3DScore()

Calculate 3D Lens score: `(Sound × Space × Time) / 10`

```typescript
import { calculate3DScore } from '@stratiqx/cal-runtime';

function calculate3DScore(signals: {
  sound: number;
  space: number;
  time: number;
}): number;
```

**Example:**

```typescript
const score = calculate3DScore({ sound: 8, space: 7, time: 9 });
// score = (8 × 7 × 9) / 10 = 50.4
```

#### calculateDrift()

Calculate DRIFT: `Methodology - Performance`

```typescript
import { calculateDrift, DriftResult, GapType } from '@stratiqx/cal-runtime';

function calculateDrift(
  methodology: number,
  performance: number,
  gapType?: GapType | 'auto'
): DriftResult;

type GapType = 'curiosity' | 'teaching';

interface DriftResult {
  readonly target: string;
  readonly drift: number;
  readonly absDrift: number;
  readonly methodology: number;
  readonly performance: number;
  readonly gapType: GapType;
  readonly driftQuality: 'optimal' | 'moderate' | 'minimal' | 'extreme';
  readonly interpretation: string;
}
```

**Example:**

```typescript
const result = calculateDrift(85, 40);

console.log('DRIFT:', result.drift);        // 45
console.log('Gap type:', result.gapType);   // 'teaching'
console.log('Quality:', result.driftQuality); // 'extreme'
console.log(result.interpretation);         // 'Over-explanation - may cause cognitive overload'
```

#### calculateFetch()

Calculate FETCH: `Chirp × |DRIFT| × Confidence`

```typescript
import { calculateFetch, FetchResult, FetchLevel } from '@stratiqx/cal-runtime';

function calculateFetch(
  chirp: number,
  drift: number,
  confidence: number,
  threshold: number
): FetchResult;

type FetchLevel = 'EXECUTE' | 'CONFIRM' | 'QUEUE' | 'WAIT';

interface FetchResult {
  readonly target: string;
  readonly fetchScore: number;
  readonly threshold: number;
  readonly level: FetchLevel;
  readonly components: {
    readonly chirp: number;
    readonly drift: number;
    readonly confidence: number;
  };
  readonly recommendation: string;
}
```

**Example:**

```typescript
const result = calculateFetch(45, 30, 0.8, 1000);

console.log('FETCH score:', result.fetchScore);  // 1080
console.log('Level:', result.level);             // 'EXECUTE'
console.log('Components:', result.components);   // { chirp: 45, drift: 30, confidence: 0.8 }
```

#### analyze6D()

Analyze entity across 6D dimensions.

```typescript
import { analyze6D, CascadeAnalysis, DimensionID } from '@stratiqx/cal-runtime';

function analyze6D(
  entity: Entity,
  options?: {
    dimensions?: DimensionID[];
    depth?: number;
    baseCost?: number;
  }
): CascadeAnalysis;
```

**Example:**

```typescript
const entity = {
  id: 'entity-1',
  name: 'My Entity',
  sound: 8,
  space: 7,
  time: 9,
  baseCost: 100000,
  dimensions: {
    D1: { sound: 7, space: 6, time: 8 },
    D2: { sound: 8, space: 7, time: 7 },
    D3: { sound: 9, space: 8, time: 9 }
  }
};

const analysis = analyze6D(entity, {
  dimensions: ['D1', 'D2', 'D3'],
  depth: 3,
  baseCost: 100000
});

console.log('Dimensions affected:', analysis.summary.dimensionsAffected);
console.log('Average score:', analysis.summary.averageScore);
console.log('Financial impact:', analysis.summary.estimatedImpact);
```

#### Other Analyzer Functions

```typescript
// Cascade probability assessment
function cascadeProbability(score: number): {
  level: 'critical' | 'high' | 'medium' | 'low' | 'minimal';
  probability: number;
  label: string;
};

// Financial multiplier estimation
function estimateMultiplier(
  dimensionsAffected: number,
  cascadeDepth: number
): MultiplierRange;

// Financial impact calculation
function calculateFinancialImpact(
  baseCost: number,
  multiplier: MultiplierRange,
  currency?: string
): FinancialImpact;

// Signal scoring (normalize to 1-10)
function scoreSignal(
  value: any,
  options?: {
    min?: number;
    max?: number;
    invert?: boolean;
  }
): number;
```

### Validator

Validate entities, dimensions, and formulas.

#### validateEntity()

Validate entity against schema.

```typescript
import { validateEntity, ValidationResult, EntitySchema } from '@stratiqx/cal-runtime';

function validateEntity(
  entity: any,
  schema?: EntitySchema
): ValidationResult;

interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

interface EntitySchema {
  requireId?: boolean;
  requireName?: boolean;
  requireType?: boolean;
  requireDimensions?: DimensionID[];
  requireSound?: boolean;
  requireSpace?: boolean;
  requireTime?: boolean;
  allowAdditionalFields?: boolean;
}
```

**Example:**

```typescript
const entity = {
  id: 'test',
  name: 'Test Entity',
  sound: 8,
  space: 7,
  time: 9
};

const result = validateEntity(entity);

if (!result.valid) {
  result.errors.forEach(error => {
    console.error(`${error.field}: ${error.message}`);
  });
}
```

#### Other Validation Functions

```typescript
// Validate multiple entities
function validateEntities(
  entities: any[],
  schema?: EntitySchema
): ValidationResult;

// Validate 3D Lens inputs
function validate3DLens(
  sound: number,
  space: number,
  time: number
): ValidationResult;

// Validate DRIFT inputs
function validateDrift(
  methodology: number,
  performance: number
): ValidationResult;

// Validate FETCH inputs
function validateFetch(
  chirp: number,
  drift: number,
  confidence: number
): ValidationResult;

// Validate data file structure
function validateDataFile(data: any): ValidationResult;

// Check dimension ID validity
function isValidDimensionId(dimId: string): dimId is DimensionID;

// Get dimension name
function getDimensionName(dimId: DimensionID): string;

// Format validation errors
function formatValidationErrors(errors: ValidationError[]): string;
```

### Data Adapters

Query entities from data sources.

#### DataAdapter Interface

```typescript
interface DataAdapter {
  query(target: string, filters?: FilterCondition[]): Promise<Entity[]>;
}

interface FilterCondition {
  field: string;
  operator: '=' | '!=' | '>' | '<' | '>=' | '<=';
  value: any;
}
```

#### MemoryDataAdapter

```typescript
import { MemoryDataAdapter } from '@stratiqx/cal-runtime';

class MemoryDataAdapter implements DataAdapter {
  constructor(initialData?: Record<string, Entity[]>);
  query(target: string, filters?: FilterCondition[]): Promise<Entity[]>;
  setCollection(name: string, entities: Entity[]): void;
  getCollectionNames(): string[];
}
```

**Example:**

```typescript
const adapter = new MemoryDataAdapter({
  entities: [
    { id: '1', name: 'Entity 1', sound: 8, space: 7, time: 9 }
  ]
});

const results = await adapter.query('entities', [
  { field: 'sound', operator: '>', value: 7 }
]);
```

#### JSONDataAdapter

```typescript
import { JSONDataAdapter } from '@stratiqx/cal-runtime';

class JSONDataAdapter implements DataAdapter {
  constructor(basePath?: string);
  query(target: string, filters?: FilterCondition[]): Promise<Entity[]>;
  clearCache(target?: string): void;
}
```

**Example:**

```typescript
const adapter = new JSONDataAdapter('./data');

// Loads from ./data/entities.json
const entities = await adapter.query('entities');

// Clear cache
adapter.clearCache('entities');
```

#### CompositeDataAdapter

```typescript
import { CompositeDataAdapter } from '@stratiqx/cal-runtime';

class CompositeDataAdapter implements DataAdapter {
  constructor(adapters: DataAdapter[]);
  query(target: string, filters?: FilterCondition[]): Promise<Entity[]>;
  addAdapter(adapter: DataAdapter): void;
}
```

**Example:**

```typescript
const composite = new CompositeDataAdapter([
  new MemoryDataAdapter({ entities: liveData }),
  new JSONDataAdapter('./historical')
]);

// Queries both sources, deduplicates by ID
const results = await composite.query('entities');
```

#### createDataAdapter()

Factory function for creating data adapters.

```typescript
function createDataAdapter(config: {
  type: 'memory' | 'json' | 'composite';
  basePath?: string;
  initialData?: Record<string, Entity[]>;
  adapters?: DataAdapter[];
}): DataAdapter;
```

**Example:**

```typescript
const adapter = createDataAdapter({
  type: 'json',
  basePath: './data'
});
```

### Alert Adapters

Send alerts and notifications.

#### AlertAdapter Interface

```typescript
interface AlertAdapter {
  send(alert: Alert): Promise<void>;
}

interface Alert {
  type: AlertLevel;
  message: string;
  timestamp?: Date;
  metadata?: Record<string, any>;
}

type AlertLevel = 'critical' | 'warning' | 'info' | 'success' | 'alert';
```

#### ConsoleAlertAdapter

```typescript
import { ConsoleAlertAdapter } from '@stratiqx/cal-runtime';

class ConsoleAlertAdapter implements AlertAdapter {
  send(alert: Alert): Promise<void>;
}
```

**Example:**

```typescript
const adapter = new ConsoleAlertAdapter();

await adapter.send({
  type: 'warning',
  message: 'High cascade risk detected',
  metadata: { score: 85 }
});
```

#### FileAlertAdapter

```typescript
import { FileAlertAdapter } from '@stratiqx/cal-runtime';

class FileAlertAdapter implements AlertAdapter {
  constructor(filePath: string);
  send(alert: Alert): Promise<void>;
}
```

**Example:**

```typescript
const adapter = new FileAlertAdapter('./logs/alerts.log');

await adapter.send({
  type: 'critical',
  message: 'Immediate action required'
});
```

#### WebhookAlertAdapter

```typescript
import { WebhookAlertAdapter } from '@stratiqx/cal-runtime';

class WebhookAlertAdapter implements AlertAdapter {
  constructor(
    webhookUrl: string,
    format?: 'slack' | 'discord' | 'generic'
  );
  send(alert: Alert): Promise<void>;
}
```

**Example:**

```typescript
const adapter = new WebhookAlertAdapter(
  'https://hooks.slack.com/services/YOUR/WEBHOOK/URL',
  'slack'
);

await adapter.send({
  type: 'warning',
  message: 'Cascade detected',
  metadata: { entity: 'tailwind-css' }
});
```

#### JSONAlertAdapter

```typescript
import { JSONAlertAdapter } from '@stratiqx/cal-runtime';

class JSONAlertAdapter implements AlertAdapter {
  send(alert: Alert): Promise<void>;
  getAlerts(): readonly Alert[];
  getAlertsByType(type: AlertLevel): readonly Alert[];
  clear(): void;
  toJSON(): string;
}
```

**Example:**

```typescript
const adapter = new JSONAlertAdapter();

await adapter.send({ type: 'info', message: 'Test' });

const alerts = adapter.getAlerts();
const warnings = adapter.getAlertsByType('warning');
```

#### MultiAlertAdapter

```typescript
import { MultiAlertAdapter } from '@stratiqx/cal-runtime';

class MultiAlertAdapter implements AlertAdapter {
  constructor(adapters: AlertAdapter[]);
  send(alert: Alert): Promise<void>;
  addAdapter(adapter: AlertAdapter): void;
  clear(): void;
}
```

**Example:**

```typescript
const multi = new MultiAlertAdapter([
  new ConsoleAlertAdapter(),
  new FileAlertAdapter('./logs/alerts.log')
]);

// Sends to both adapters
await multi.send({ type: 'warning', message: 'Alert' });
```

#### createAlertAdapter()

Factory function for creating alert adapters.

```typescript
function createAlertAdapter(config: {
  type: 'console' | 'file' | 'webhook' | 'json' | 'multi';
  filePath?: string;
  webhookUrl?: string;
  webhookFormat?: 'slack' | 'discord' | 'generic';
  adapters?: AlertAdapter[];
}): AlertAdapter;
```

**Example:**

```typescript
const adapter = createAlertAdapter({
  type: 'webhook',
  webhookUrl: 'https://...',
  webhookFormat: 'slack'
});
```

### Configuration

Load and manage project configuration.

#### loadConfig()

Load configuration from file.

```typescript
import { loadConfig, CALConfig } from '@stratiqx/cal-runtime';

function loadConfig(configPath?: string): Promise<CALConfig>;

interface CALConfig {
  name?: string;
  version?: string;
  data?: {
    path?: string;
    files?: string[];
    adapter?: 'json' | 'memory' | 'composite';
  };
  alerts?: {
    type?: 'console' | 'file' | 'json' | 'multi';
    file?: string;
    webhooks?: Array<{
      url: string;
      format: 'slack' | 'discord' | 'generic';
    }>;
  };
  execution?: {
    cascadeDepth?: number;
    dimensions?: DimensionID[];
    timeout?: number;
  };
  thresholds?: {
    lens?: number;
    drift?: number;
    fetch?: number;
  };
  validation?: {
    requireAllDimensions?: boolean;
    requireMetadata?: boolean;
  };
  output?: {
    format?: 'json' | 'yaml' | 'text';
    directory?: string;
    pretty?: boolean;
  };
}
```

**Example:**

```typescript
const config = await loadConfig('./cal.config.json');

console.log('Project:', config.name);
console.log('Data path:', config.data?.path);
```

#### Other Configuration Functions

```typescript
// Merge configurations
function mergeConfig(base: CALConfig, override: CALConfig): CALConfig;

// Validate configuration
function validateConfig(config: CALConfig): ValidationResult;

// Get/set nested values
function getConfigValue(config: CALConfig, path: string): any;
function setConfigValue(config: CALConfig, path: string, value: any): CALConfig;

// Save configuration
function saveConfig(config: CALConfig, filePath: string): Promise<void>;

// Initialize project
function initProject(name: string, options?: Partial<CALConfig>): Promise<CALConfig>;

// Default configuration
const DEFAULT_CONFIG: CALConfig;
```

## Type Definitions

### Core Types

#### Entity

```typescript
interface Entity {
  id: string;
  name: string;
  type: string;
  sound: number;      // 0-10
  space: number;      // 0-10
  time: number;       // 0-10
  baseCost?: number;
  currency?: string;
  dimensions?: Partial<Record<DimensionID, DimensionSignal>>;
  [key: string]: any;
}
```

#### DimensionSignal

```typescript
interface DimensionSignal {
  sound: number;  // 1-10
  space: number;  // 1-10
  time: number;   // 1-10
  notes?: string;
}
```

#### CascadeAnalysis

```typescript
interface CascadeAnalysis {
  entity: string;
  timestamp: string;
  methodology: string;
  lens: {
    sound: number;
    space: number;
    time: number;
  };
  dimensions: Record<DimensionID, DimensionAnalysis>;
  summary: EntitySummary;
  cascades: CascadePathway[];
}
```

#### DimensionAnalysis

```typescript
interface DimensionAnalysis {
  id: DimensionID;
  name: string;
  description: string;
  signals: DimensionSignal;
  score: number;
  cascade: {
    level: 'minimal' | 'low' | 'medium' | 'high' | 'critical';
    probability: number;
    label: string;
  };
  affected: boolean;
}
```

### Dimension Types

```typescript
type DimensionID = 'D1' | 'D2' | 'D3' | 'D4' | 'D5' | 'D6' | 'ALL';

const DIMENSION_SEMANTICS: Record<DimensionID, {
  id: DimensionID;
  name: string;
  description: string;
  domain: string;
}>;
```

Dimension meanings:
- **D1**: Customer (external stakeholders)
- **D2**: Employee (internal people)
- **D3**: Revenue (financial impact)
- **D4**: Regulatory (compliance)
- **D5**: Quality (product/service)
- **D6**: Operational (processes)

### Type Guards

```typescript
// CAL keyword validation
function isValidCALKeyword(keyword: string): keyword is CALKeyword;

// Action type guards
function isDriftAction(action: Action): action is DriftAction;
function isFetchAction(action: Action): action is FetchAction;

// Gap type checks
function isCuriosityGap(result: DriftResult): boolean;
function isTeachingGap(result: DriftResult): boolean;

// Fetch level check
function shouldExecute(result: FetchResult): boolean;

// Dimension validation
function isValidDimension(id: string): id is DimensionID;
```

## Usage Examples

### Complete TypeScript Example

```typescript
import {
  compile,
  Executor,
  createDataAdapter,
  createAlertAdapter,
  validateDataFile,
  analyze6D,
  calculateDrift,
  calculateFetch
} from '@stratiqx/cal-runtime';

// Load and validate data
const data = {
  entities: [
    {
      id: 'entity-1',
      name: 'Test Entity',
      type: 'customer',
      sound: 8,
      space: 7,
      time: 9,
      baseCost: 100000
    }
  ]
};

const validation = validateDataFile(data);
if (!validation.valid) {
  throw new Error('Invalid data');
}

// Create adapters
const dataAdapter = createDataAdapter({
  type: 'memory',
  initialData: data
});

const alertAdapter = createAlertAdapter({
  type: 'console'
});

// Compile CAL script
const calSource = `
  FORAGE entities
  WHERE sound > 7
  SURFACE results

  DRIFT results
  METHODOLOGY 85
  PERFORMANCE 40

  FETCH results
  THRESHOLD 1000
  ON EXECUTE CHIRP critical "Action required"
`;

const compileResult = compile(calSource);

if (!compileResult.success) {
  throw new Error(`Parse error: ${compileResult.error.message}`);
}

// Execute
const executor = new Executor({ dataAdapter, alertAdapter });
const result = await executor.execute(compileResult.actionPlan);

// Process results
console.log('Success:', result.success);
console.log('Outputs:', result.outputs);
console.log('Actions:', result.actions.length);
```

### Manual Analysis

```typescript
import { analyze6D, calculateDrift, calculateFetch } from '@stratiqx/cal-runtime';

const entity = {
  id: 'test',
  name: 'Test',
  sound: 8,
  space: 7,
  time: 9,
  baseCost: 100000,
  dimensions: {
    D1: { sound: 7, space: 6, time: 8 },
    D2: { sound: 8, space: 7, time: 7 },
    D3: { sound: 9, space: 8, time: 9 }
  }
};

// 6D Analysis
const analysis = analyze6D(entity, {
  dimensions: ['D1', 'D2', 'D3'],
  depth: 3,
  baseCost: 100000
});

console.log('Dimensions affected:', analysis.summary.dimensionsAffected);
console.log('Impact:', analysis.summary.estimatedImpact);

// DRIFT Calculation
const drift = calculateDrift(85, 40);
console.log('DRIFT:', drift.drift);
console.log('Gap type:', drift.gapType);

// FETCH Decision
const fetch = calculateFetch(
  analysis.summary.averageScore,
  drift.absDrift,
  0.8,
  1000
);
console.log('FETCH level:', fetch.level);
console.log('Score:', fetch.fetchScore);
```

## Next Steps

- **[Getting Started](/runtime/getting-started)** - Basic usage guide
- **[Examples](/runtime/examples)** - Real-world examples
- **[CLI Reference](/runtime/cli-reference)** - Command-line usage
- **[GitHub Repository](https://github.com/semanticintent/cal-runtime)** - Source code
