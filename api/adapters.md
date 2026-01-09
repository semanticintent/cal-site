# Adapters API

## Overview

Adapters provide pluggable data sources and alert destinations for the CAL executor.

## Data Adapters

Data adapters load entities for analysis.

### Creating Data Adapters

```javascript
const { createDataAdapter } = require('./lib/data-adapters.js');
```

---

### JSON File Adapter

Load data from JSON files.

**Example:**
```javascript
const adapter = createDataAdapter({
  type: 'json',
  filePath: './data.json'
});

// Use with executor
const executor = createExecutor({ dataAdapter: adapter });
```

**data.json:**
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
        "D2": { "sound": 8, "space": 7, "time": 8 }
      }
    }
  ]
}
```

---

### CSV File Adapter

Load data from CSV files.

**Example:**
```javascript
const adapter = createDataAdapter({
  type: 'csv',
  filePath: './data.csv',
  options: {
    headers: true,
    delimiter: ','
  }
});
```

**data.csv:**
```csv
id,name,sound,space,time,baseCost,segment
situation-001,Product Launch Delay,7,6,8,50000,enterprise
situation-002,Customer Churn,8,7,9,75000,high-value
```

---

### Memory Adapter

Use in-memory data (useful for testing).

**Example:**
```javascript
const adapter = createDataAdapter({
  type: 'memory',
  collections: {
    entities: [
      {
        id: 'situation-001',
        name: 'Product Launch Delay',
        sound: 7,
        space: 6,
        time: 8,
        baseCost: 50000
      }
    ],
    customers: [
      { id: 'cust-001', segment: 'enterprise', arr: 100000 }
    ]
  }
});
```

---

### Composite Adapter

Combine multiple data sources.

**Example:**
```javascript
const adapter = createDataAdapter({
  type: 'composite',
  adapters: {
    entities: createDataAdapter({ type: 'json', filePath: './entities.json' }),
    customers: createDataAdapter({ type: 'csv', filePath: './customers.csv' }),
    events: createDataAdapter({ type: 'memory', data: eventsData })
  }
});

// Query specific collection
const results = await adapter.query('customers', { segment: 'enterprise' });
```

---

### Custom Data Adapter

Create your own adapter:

```javascript
class DatabaseAdapter {
  constructor(connectionString) {
    this.db = connectToDatabase(connectionString);
  }

  async query(collection, conditions) {
    const query = buildQuery(conditions);
    const results = await this.db.query(query);
    return results;
  }

  async getAll(collection) {
    return await this.db.collection(collection).find().toArray();
  }
}

const adapter = new DatabaseAdapter('postgresql://...');
```

---

## Alert Adapters

Alert adapters send notifications and alerts.

### Creating Alert Adapters

```javascript
const { createAlertAdapter } = require('./lib/alert-adapters.js');
```

---

### Console Adapter

Output alerts to console.

**Example:**
```javascript
const adapter = createAlertAdapter({
  type: 'console',
  format: 'pretty'  // or 'json'
});

await adapter.send({
  level: 'critical',
  message: 'Immediate action required',
  timestamp: new Date().toISOString()
});

// Output:
// 🚨 CRITICAL: Immediate action required
//    Timestamp: 2026-01-09T12:00:00Z
```

---

### File Adapter

Log alerts to file.

**Example:**
```javascript
const adapter = createAlertAdapter({
  type: 'file',
  logPath: './alerts.log',
  format: 'json',
  append: true
});

await adapter.send({
  level: 'warning',
  message: 'Review recommended',
  context: { fetch_score: 1500 }
});
```

**alerts.log:**
```json
{"level":"warning","message":"Review recommended","context":{"fetch_score":1500},"timestamp":"2026-01-09T12:00:00Z"}
```

---

### Webhook Adapter

Send alerts to webhooks (Slack, Teams, etc).

**Example:**
```javascript
const adapter = createAlertAdapter({
  type: 'webhook',
  url: 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL',
  format: 'slack',
  headers: {
    'Content-Type': 'application/json'
  }
});

await adapter.send({
  level: 'critical',
  message: 'Cascade threshold exceeded',
  data: {
    fetch_score: 3600,
    threshold: 1000
  }
});
```

**Slack message:**
```
🚨 CRITICAL ALERT

Cascade threshold exceeded

Details:
• Fetch Score: 3600
• Threshold: 1000
• Decision: EXECUTE

Timestamp: 2026-01-09 12:00:00 UTC
```

---

### Email Adapter

Send email alerts.

**Example:**
```javascript
const adapter = createAlertAdapter({
  type: 'email',
  smtp: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'alerts@yourcompany.com',
      pass: 'your-password'
    }
  },
  from: 'CAL Alerts <alerts@yourcompany.com>',
  to: ['team@yourcompany.com']
});

await adapter.send({
  level: 'critical',
  message: 'Executive escalation required',
  data: { ... }
});
```

---

### Multi Adapter

Send to multiple destinations.

**Example:**
```javascript
const adapter = createAlertAdapter({
  type: 'multi',
  adapters: [
    createAlertAdapter({ type: 'console' }),
    createAlertAdapter({ type: 'file', logPath: './alerts.log' }),
    createAlertAdapter({ type: 'webhook', url: slackWebhookUrl })
  ],
  // Send critical to all, others only to file
  filter: (alert, adapterType) => {
    if (alert.level === 'critical') return true;
    if (adapterType === 'file') return true;
    return false;
  }
});
```

---

### Custom Alert Adapter

Create your own adapter:

```javascript
class PagerDutyAdapter {
  constructor(apiKey, serviceKey) {
    this.apiKey = apiKey;
    this.serviceKey = serviceKey;
  }

  async send(alert) {
    const payload = {
      routing_key: this.serviceKey,
      event_action: 'trigger',
      payload: {
        summary: alert.message,
        severity: alert.level,
        source: 'CAL',
        timestamp: alert.timestamp
      }
    };

    await fetch('https://events.pagerduty.com/v2/enqueue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }
}

const adapter = new PagerDutyAdapter('api-key', 'service-key');
```

---

## Adapter Interface

### Data Adapter Interface

```javascript
interface DataAdapter {
  // Query collection with conditions
  query(collection: string, conditions: object): Promise&lt;Array&gt;

  // Get all items from collection
  getAll(collection: string): Promise&lt;Array&gt;

  // Get single item by ID
  getById(collection: string, id: string): Promise&lt;object&gt;

  // Optional: Update item
  update?(collection: string, id: string, data: object): Promise&lt;void&gt;
}
```

### Alert Adapter Interface

```javascript
interface AlertAdapter {
  // Send alert
  send(alert: object): Promise&lt;void&gt;

  // Optional: Batch send
  sendBatch?(alerts: Array): Promise&lt;void&gt;

  // Optional: Get alert history
  getHistory?(): Promise&lt;Array&gt;
}
```

---

## Advanced Usage

### Data Adapter with Caching

```javascript
class CachedDataAdapter {
  constructor(baseAdapter, ttl = 60000) {
    this.adapter = baseAdapter;
    this.cache = new Map();
    this.ttl = ttl;
  }

  async query(collection, conditions) {
    const key = JSON.stringify({ collection, conditions });
    const cached = this.cache.get(key);

    if (cached && Date.now() - cached.timestamp < this.ttl) {
      return cached.data;
    }

    const data = await this.adapter.query(collection, conditions);
    this.cache.set(key, { data, timestamp: Date.now() });
    return data;
  }
}
```

### Alert Adapter with Rate Limiting

```javascript
class RateLimitedAdapter {
  constructor(baseAdapter, maxPerMinute = 10) {
    this.adapter = baseAdapter;
    this.maxPerMinute = maxPerMinute;
    this.queue = [];
    this.sent = [];
  }

  async send(alert) {
    // Remove old entries
    const now = Date.now();
    this.sent = this.sent.filter(t => now - t < 60000);

    if (this.sent.length < this.maxPerMinute) {
      await this.adapter.send(alert);
      this.sent.push(now);
    } else {
      this.queue.push(alert);
      // Process queue later...
    }
  }
}
```

### Adapter Factory Pattern

```javascript
function createAdapter(config) {
  switch (config.type) {
    case 'production':
      return createDataAdapter({
        type: 'composite',
        adapters: {
          entities: createDataAdapter({ type: 'database', ... }),
          cache: createDataAdapter({ type: 'redis', ... })
        }
      });

    case 'development':
      return createDataAdapter({
        type: 'json',
        filePath: './dev-data.json'
      });

    case 'test':
      return createDataAdapter({
        type: 'memory',
        data: mockData
      });
  }
}
```

---

## Next Steps

- [Learn Executor API](/api/executor)
- [Understand Parser API](/api/parser)
- [See Full Examples](/language/examples)
