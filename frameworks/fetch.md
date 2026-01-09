# Fetch Framework

## What is Fetch?

Fetch is the **action decision layer** that answers: "Should I act NOW?"

## Formula

```
Fetch = Chirp × |DRIFT| × Confidence

Where:
  Chirp      = Signal strength (urgency, 0-100)
  DRIFT      = Gap size (absolute value)
  Confidence = min(Perch, Wake) / 100 (readiness, 0-1)
```

## Decision Thresholds

| Fetch Score | Level | Action |
|-------------|-------|--------|
| > threshold | **EXECUTE** | Act immediately |
| > threshold × 0.5 | **CONFIRM** | Verify first |
| > threshold × 0.1 | **QUEUE** | Log for later |
| < threshold × 0.1 | **WAIT** | Keep observing |

## CAL Syntax

```cal
FETCH <target>
[THRESHOLD <n>]
[CONFIDENCE <min>]
[ON EXECUTE <action>]
[ON CONFIRM <action>]
[ON QUEUE <action>]
[ON WAIT <action>]
```

## Example

```cal
FETCH cascade_map
THRESHOLD 1000
ON EXECUTE CHIRP critical "Immediate action required"
ON CONFIRM CHIRP warning "Review recommended"
ON QUEUE SURFACE queue_report
ON WAIT PERCH ON segment:"monitor"
```

## Calculation Example

Given:
- Chirp = 90 (high urgency)
- DRIFT = 50 (large gap)
- Perch = 80, Wake = 80

```
Confidence = min(80, 80) / 100 = 0.8
Fetch = 90 × 50 × 0.8 = 3,600
```

With threshold = 1000:
- 3,600 > 1,000 → **EXECUTE**

## The Closed Loop

```
SENSE (signals)
    → DRIFT (measure gap)
    → FETCH (decide action)
    → ACT (execute/confirm/queue/wait)
    → SENSE (new signals)
    → [repeat]
```

## Decision Levels Explained

### EXECUTE (> threshold)
**Immediate action required**
- Highest priority
- Skip review process
- Act within minutes/hours
- Example: Critical customer escalation

### CONFIRM (> threshold × 0.5)
**Management review needed**
- Medium-high priority
- Get approval first
- Act within 24-48 hours
- Example: Budget reallocation

### QUEUE (> threshold × 0.1)
**Add to backlog**
- Medium priority
- Schedule for sprint
- Act within weeks
- Example: Process improvement

### WAIT (< threshold × 0.1)
**Keep monitoring**
- Low priority
- Continue observation
- No immediate action
- Example: Watch-list item

## Real-World Example

**Tailwind CSS Case (UC-002):**

```cal
-- Given:
-- Chirp = 90 (75% layoffs = very urgent)
-- DRIFT = 50 (extreme gap)
-- Perch = 80, Wake = 80

FETCH tailwind_cascade
THRESHOLD 1000

-- Calculation:
-- Confidence = min(80, 80) / 100 = 0.8
-- Fetch = 90 × 50 × 0.8 = 3,600

-- Result: 3,600 > 1,000
-- Decision: EXECUTE immediately
ON EXECUTE CHIRP critical "Major restructure required"
```

## Adjusting Thresholds

### Conservative (Risk-Averse)
```cal
FETCH analysis
THRESHOLD 500  -- Lower = more sensitive
```

### Aggressive (Action-Oriented)
```cal
FETCH analysis
THRESHOLD 2000  -- Higher = less sensitive
```

### Custom Confidence Requirement
```cal
FETCH analysis
THRESHOLD 1000
CONFIDENCE 70  -- Minimum 70% confidence required
```

## Use Cases

### 1. Customer Escalation
```cal
FETCH customer_risk
THRESHOLD 800
ON EXECUTE CHIRP alert "CSM intervention"
ON CONFIRM CHIRP warning "QBR schedule"
ON QUEUE SURFACE monitoring_queue
```

### 2. Security Incidents
```cal
FETCH security_events
THRESHOLD 1500
ON EXECUTE CHIRP critical "Incident response team"
ON CONFIRM CHIRP warning "Security review"
```

### 3. Financial Anomalies
```cal
FETCH revenue_anomaly
THRESHOLD 1200
ON EXECUTE CHIRP critical "CFO notification"
ON CONFIRM CHIRP warning "Finance review"
```

## Next Steps

- [Understand DRIFT](/frameworks/drift)
- [Learn 6D Methodology](/frameworks/6d)
- [See Full Examples](/language/examples)
- [Try the Playground](/playground)
