# Alert Adapters

Configure alert channels for CHIRP notifications and signal broadcasting.

## Overview

Alert adapters handle CHIRP notifications from CAL scripts, routing them to different destinations. The runtime includes five built-in adapters and supports custom implementations.

**Built-in Adapters:**
- **Console** - Pretty-printed terminal output with emoji icons
- **File** - JSON Lines log files for persistent storage
- **Webhook** - HTTP webhooks for Slack, Discord, and generic services
- **JSON** - In-memory accumulation for testing
- **Multi** - Broadcast to multiple channels simultaneously

All adapters implement the same `AlertAdapter` interface, making them interchangeable.

## AlertAdapter Interface

```typescript
interface AlertAdapter {
  /**
   * Send an alert through this channel
   * @param alert - Alert message with metadata
   */
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

## Console Alert Adapter

Terminal output with emoji icons and pretty formatting.

### Basic Usage

```typescript
import { ConsoleAlertAdapter } from '@stratiqx/cal-runtime';

const adapter = new ConsoleAlertAdapter();

await adapter.send({
  type: 'warning',
  message: 'High cascade risk detected'
});

await adapter.send({
  type: 'critical',
  message: 'Immediate action required',
  metadata: {
    entity: 'tailwind-css',
    score: 85,
    dimensions: ['D2', 'D3', 'D6']
  }
});
```

### Output Format

```
⚠️ ═══════════════════════════════════════════════
   CHIRP: WARNING
   TIME: 2026-01-14T10:30:00.000Z
   ───────────────────────────────────────────────
   High cascade risk detected
   ───────────────────────────────────────────────
   METADATA:
   • entity: "tailwind-css"
   • score: 85
   • dimensions: ["D2","D3","D6"]
   ═══════════════════════════════════════════════
```

### Alert Levels and Icons

| Level | Icon | Use Case |
|-------|------|----------|
| `critical` | 🚨 | Urgent issues requiring immediate action |
| `warning` | ⚠️ | Important issues needing attention |
| `info` | ℹ️ | General information |
| `success` | ✅ | Successful operations |
| `alert` | 🔔 | General notifications |

### Use Cases

**Development:**
```typescript
// Quick feedback during development
const adapter = new ConsoleAlertAdapter();
const executor = new Executor({ alertAdapter: adapter });
```

**Debugging:**
```typescript
// See alerts immediately in terminal
await adapter.send({
  type: 'info',
  message: 'Processing entity',
  metadata: { id: entity.id, stage: 'analysis' }
});
```

## File Alert Adapter

Persistent JSON Lines log files for audit trails and post-processing.

### Basic Usage

```typescript
import { FileAlertAdapter } from '@stratiqx/cal-runtime';

const adapter = new FileAlertAdapter('./logs/cal-alerts.log');

await adapter.send({
  type: 'warning',
  message: 'Gap detected',
  metadata: {
    drift: 45,
    methodology: 85,
    performance: 40
  }
});
```

### File Format

Each alert is a single line of JSON (JSON Lines format):

```json
{"timestamp":"2026-01-14T10:30:00.000Z","type":"warning","message":"Gap detected","metadata":{"drift":45,"methodology":85,"performance":40}}
{"timestamp":"2026-01-14T10:31:00.000Z","type":"critical","message":"Immediate action required","metadata":{"score":85}}
```

### Reading Log Files

Process logs with standard tools:

```bash
# View recent alerts
tail -f logs/cal-alerts.log

# Pretty print
cat logs/cal-alerts.log | jq .

# Filter by type
cat logs/cal-alerts.log | jq 'select(.type == "critical")'

# Count by type
cat logs/cal-alerts.log | jq -r .type | sort | uniq -c
```

Or programmatically:

```typescript
import * as fs from 'fs/promises';

const content = await fs.readFile('./logs/cal-alerts.log', 'utf-8');
const alerts = content
  .split('\n')
  .filter(line => line.trim())
  .map(line => JSON.parse(line));

// Filter critical alerts
const critical = alerts.filter(a => a.type === 'critical');
console.log(`${critical.length} critical alerts`);
```

### Use Cases

**Production Logging:**
```typescript
// Persistent alert history
const adapter = new FileAlertAdapter('/var/log/cal/alerts.log');
```

**Audit Trails:**
```typescript
// Keep complete record for compliance
const adapter = new FileAlertAdapter('./audit/cascade-alerts.log');
```

**Analysis:**
```typescript
// Collect data for later analysis
const adapter = new FileAlertAdapter('./data/alerts.jsonl');
```

## Webhook Alert Adapter

Send alerts to external services via HTTP webhooks.

### Generic Webhooks

```typescript
import { WebhookAlertAdapter } from '@stratiqx/cal-runtime';

const adapter = new WebhookAlertAdapter(
  'https://your-webhook-endpoint.com/alerts',
  'generic'
);

await adapter.send({
  type: 'warning',
  message: 'Cascade detected',
  metadata: { score: 75 }
});
```

Generic format payload:

```json
{
  "type": "warning",
  "message": "Cascade detected",
  "timestamp": "2026-01-14T10:30:00.000Z",
  "metadata": {
    "score": 75
  }
}
```

### Slack Integration

```typescript
const adapter = new WebhookAlertAdapter(
  'https://hooks.slack.com/services/YOUR/WEBHOOK/URL',
  'slack'
);

await adapter.send({
  type: 'critical',
  message: 'Immediate action required',
  metadata: {
    entity: 'tailwind-css',
    drift: 45,
    fetch: 1250
  }
});
```

Slack format (automatically formatted):

```json
{
  "text": "*CRITICAL*: Immediate action required",
  "attachments": [{
    "color": "danger",
    "fields": [
      {"title": "entity", "value": "\"tailwind-css\"", "short": true},
      {"title": "drift", "value": "45", "short": true},
      {"title": "fetch", "value": "1250", "short": true}
    ],
    "ts": 1736851800
  }]
}
```

Slack colors by type:
- `critical`: Red (danger)
- `warning`: Orange (warning)
- `info`: Green (#36a64f)
- `success`: Green (good)
- `alert`: Purple (#764FA5)

### Discord Integration

```typescript
const adapter = new WebhookAlertAdapter(
  'https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN',
  'discord'
);

await adapter.send({
  type: 'warning',
  message: 'High cascade risk',
  metadata: {
    dimensions: ['D2', 'D3', 'D6'],
    score: 85
  }
});
```

Discord format (automatically formatted):

```json
{
  "embeds": [{
    "title": "🪶 WARNING",
    "description": "High cascade risk",
    "color": 16753920,
    "fields": [
      {"name": "dimensions", "value": "[\"D2\",\"D3\",\"D6\"]", "inline": true},
      {"name": "score", "value": "85", "inline": true}
    ],
    "timestamp": "2026-01-14T10:30:00.000Z"
  }]
}
```

Discord colors by type:
- `critical`: Red (0xFF0000)
- `warning`: Orange (0xFFA500)
- `info`: Blue (0x3498DB)
- `success`: Green (0x00FF00)
- `alert`: Purple (0x9B59B6)

### Error Handling

```typescript
const adapter = new WebhookAlertAdapter('https://api.example.com/alerts');

try {
  await adapter.send({
    type: 'warning',
    message: 'Test alert'
  });
} catch (error) {
  console.error('Failed to send webhook:', error.message);
  // Webhook returned 404, 500, timeout, etc.
}
```

### Use Cases

**Team Notifications:**
```typescript
// Send to Slack channel
const slack = new WebhookAlertAdapter(
  process.env.SLACK_WEBHOOK_URL!,
  'slack'
);
```

**Integration with Monitoring:**
```typescript
// Send to monitoring service
const monitoring = new WebhookAlertAdapter(
  'https://monitoring.example.com/api/alerts',
  'generic'
);
```

**PagerDuty/Opsgenie:**
```typescript
// Critical alerts to on-call
const oncall = new WebhookAlertAdapter(
  process.env.PAGERDUTY_WEBHOOK!,
  'generic'
);
```

## JSON Alert Adapter

In-memory alert accumulation for testing and inspection.

### Basic Usage

```typescript
import { JSONAlertAdapter } from '@stratiqx/cal-runtime';

const adapter = new JSONAlertAdapter();

// Send alerts
await adapter.send({ type: 'info', message: 'Processing started' });
await adapter.send({ type: 'warning', message: 'High risk detected' });
await adapter.send({ type: 'success', message: 'Analysis complete' });

// Retrieve alerts
const alerts = adapter.getAlerts();
console.log(`Received ${alerts.length} alerts`);
```

### Filter by Type

```typescript
const adapter = new JSONAlertAdapter();

await adapter.send({ type: 'warning', message: 'Warning 1' });
await adapter.send({ type: 'critical', message: 'Critical 1' });
await adapter.send({ type: 'warning', message: 'Warning 2' });

// Get only warnings
const warnings = adapter.getAlertsByType('warning');
console.log(`${warnings.length} warnings`);  // 2
```

### Export and Clear

```typescript
const adapter = new JSONAlertAdapter();

// Send multiple alerts
await adapter.send({ type: 'info', message: 'Message 1' });
await adapter.send({ type: 'info', message: 'Message 2' });

// Export as JSON string
const json = adapter.toJSON();
fs.writeFileSync('./alerts.json', json);

// Clear for next run
adapter.clear();
const alerts = adapter.getAlerts();  // []
```

### Use Cases

**Testing:**
```typescript
// Verify alerts were sent
const adapter = new JSONAlertAdapter();
const executor = new Executor({ alertAdapter: adapter });

await executor.execute(actionPlan);

const alerts = adapter.getAlerts();
expect(alerts).toHaveLength(3);
expect(alerts[0].type).toBe('warning');
expect(alerts[0].message).toContain('cascade');
```

**Inspection:**
```typescript
// Collect alerts for analysis
const adapter = new JSONAlertAdapter();

// Run analysis...
await executor.execute(actionPlan);

// Check what was alerted
const critical = adapter.getAlertsByType('critical');
if (critical.length > 0) {
  console.log('Critical alerts:', critical);
}
```

## Multi Alert Adapter

Broadcast alerts to multiple channels simultaneously.

### Basic Usage

```typescript
import { MultiAlertAdapter, ConsoleAlertAdapter, FileAlertAdapter } from '@stratiqx/cal-runtime';

const multi = new MultiAlertAdapter([
  new ConsoleAlertAdapter(),
  new FileAlertAdapter('./logs/alerts.log')
]);

// Sends to both console and file
await multi.send({
  type: 'warning',
  message: 'High risk detected'
});
```

### Dynamic Configuration

```typescript
const multi = new MultiAlertAdapter([
  new ConsoleAlertAdapter()
]);

// Add more adapters based on environment
if (process.env.NODE_ENV === 'production') {
  multi.addAdapter(new FileAlertAdapter('/var/log/cal/alerts.log'));
}

if (process.env.SLACK_WEBHOOK) {
  multi.addAdapter(new WebhookAlertAdapter(
    process.env.SLACK_WEBHOOK,
    'slack'
  ));
}
```

### Error Handling

All adapters are called in parallel. If one fails, others still execute:

```typescript
const multi = new MultiAlertAdapter([
  new ConsoleAlertAdapter(),          // Always succeeds
  new WebhookAlertAdapter('https://broken.com'),  // Might fail
  new FileAlertAdapter('./logs/alerts.log')       // Might fail
]);

// All adapters attempt send, failures logged but don't stop others
await multi.send({ type: 'info', message: 'Test' });
```

### Use Cases

**Development + Production:**
```typescript
// Console for development, file for production
const multi = new MultiAlertAdapter([
  new ConsoleAlertAdapter(),
  new FileAlertAdapter('./logs/alerts.log')
]);
```

**Multiple Notification Channels:**
```typescript
// Alert team via Slack AND page on-call for critical
const multi = new MultiAlertAdapter([
  new WebhookAlertAdapter(slackUrl, 'slack'),
  new WebhookAlertAdapter(pagerdutyUrl, 'generic'),
  new FileAlertAdapter('./logs/alerts.log')
]);
```

## Factory Function

Create adapters with configuration objects:

```typescript
import { createAlertAdapter } from '@stratiqx/cal-runtime';

// Console adapter
const console = createAlertAdapter({
  type: 'console'
});

// File adapter
const file = createAlertAdapter({
  type: 'file',
  filePath: './logs/alerts.log'
});

// Webhook adapter
const webhook = createAlertAdapter({
  type: 'webhook',
  webhookUrl: 'https://hooks.slack.com/...',
  webhookFormat: 'slack'
});

// JSON adapter
const json = createAlertAdapter({
  type: 'json'
});

// Multi adapter
const multi = createAlertAdapter({
  type: 'multi',
  adapters: [console, file, webhook]
});
```

## Custom Alert Adapters

Implement the interface for custom destinations:

### Email Adapter

```typescript
import { AlertAdapter, Alert } from '@stratiqx/cal-runtime';
import { sendEmail } from 'your-email-library';

class EmailAlertAdapter implements AlertAdapter {
  private recipients: string[];

  constructor(recipients: string[]) {
    this.recipients = recipients;
  }

  async send(alert: Alert): Promise<void> {
    const subject = `[${alert.type.toUpperCase()}] CAL Alert`;
    const body = `
      ${alert.message}

      Time: ${alert.timestamp?.toISOString()}

      Metadata:
      ${JSON.stringify(alert.metadata, null, 2)}
    `;

    await sendEmail({
      to: this.recipients,
      subject,
      body
    });
  }
}

// Usage
const adapter = new EmailAlertAdapter(['team@example.com']);
```

### Database Adapter

```typescript
class DatabaseAlertAdapter implements AlertAdapter {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async send(alert: Alert): Promise<void> {
    await this.db.query(
      'INSERT INTO alerts (type, message, timestamp, metadata) VALUES (?, ?, ?, ?)',
      [
        alert.type,
        alert.message,
        alert.timestamp || new Date(),
        JSON.stringify(alert.metadata)
      ]
    );
  }
}
```

### SMS Adapter

```typescript
class SMSAlertAdapter implements AlertAdapter {
  private phoneNumbers: string[];
  private smsService: SMSService;

  constructor(phoneNumbers: string[], smsService: SMSService) {
    this.phoneNumbers = phoneNumbers;
    this.smsService = smsService;
  }

  async send(alert: Alert): Promise<void> {
    // Only send critical alerts via SMS
    if (alert.type !== 'critical') {
      return;
    }

    const message = `[CAL CRITICAL] ${alert.message}`;

    for (const phone of this.phoneNumbers) {
      await this.smsService.send(phone, message);
    }
  }
}
```

## Integration with Executor

### TypeScript

```typescript
import { compile, Executor, createAlertAdapter } from '@stratiqx/cal-runtime';

// Create alert adapter
const alertAdapter = createAlertAdapter({
  type: 'multi',
  adapters: [
    createAlertAdapter({ type: 'console' }),
    createAlertAdapter({
      type: 'file',
      filePath: './logs/alerts.log'
    })
  ]
});

// Create executor
const executor = new Executor({ alertAdapter });

// Execute script with alerts
const calSource = `
  FORAGE entities WHERE sound > 7 SURFACE results
  CHIRP warning "High cascade risk detected"
`;
const { actionPlan } = compile(calSource);
await executor.execute(actionPlan);
```

### CLI

The CLI creates adapters based on flags:

```bash
# Console adapter (default)
cal run script.cal

# File adapter
cal run script.cal --alert file --alert-file ./logs/alerts.log

# Quiet mode (no console output)
cal run script.cal --quiet
```

## Best Practices

### 1. Choose Appropriate Levels

Use semantic alert levels:

```typescript
// Critical: Requires immediate action
await adapter.send({
  type: 'critical',
  message: 'Cascade in progress - immediate action required'
});

// Warning: Needs attention soon
await adapter.send({
  type: 'warning',
  message: 'High risk detected - review recommended'
});

// Info: Informational
await adapter.send({
  type: 'info',
  message: 'Analysis complete'
});

// Success: Positive outcome
await adapter.send({
  type: 'success',
  message: 'All systems nominal'
});
```

### 2. Include Relevant Metadata

```typescript
// Good: Rich context
await adapter.send({
  type: 'warning',
  message: 'DRIFT gap detected',
  metadata: {
    entity: 'tailwind-css',
    drift: 45,
    methodology: 85,
    performance: 40,
    gapType: 'teaching',
    quality: 'extreme'
  }
});

// Less useful: No context
await adapter.send({
  type: 'warning',
  message: 'Gap detected'
});
```

### 3. Use Multi-Channel Wisely

```typescript
// Development: Console only
const dev = new ConsoleAlertAdapter();

// Production: Multiple channels
const prod = new MultiAlertAdapter([
  new FileAlertAdapter('/var/log/cal/alerts.log'),
  new WebhookAlertAdapter(slackUrl, 'slack')
]);

const adapter = process.env.NODE_ENV === 'production' ? prod : dev;
```

### 4. Handle Sensitive Data

```typescript
// Avoid logging sensitive information
await adapter.send({
  type: 'warning',
  message: 'Authentication issue',
  metadata: {
    userId: user.id,  // OK
    // password: user.password  // Never include passwords/tokens
  }
});
```

### 5. Test Alert Flows

```typescript
// Use JSON adapter for testing
const testAdapter = new JSONAlertAdapter();
const executor = new Executor({ alertAdapter: testAdapter });

await executor.execute(actionPlan);

// Verify alerts
const alerts = testAdapter.getAlerts();
expect(alerts).toContainEqual(
  expect.objectContaining({
    type: 'warning',
    message: expect.stringContaining('cascade')
  })
);
```

## Next Steps

- **[CLI Reference](/runtime/cli-reference)** - CLI alert options
- **[Examples](/runtime/examples)** - See alerts in real scripts
- **[Validation](/runtime/validation)** - Validate before alerting
- **[API Reference](/runtime/api-reference)** - Full TypeScript API
