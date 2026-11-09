# Fetch Framework

## What is Fetch?

Fetch is the **action decision layer** that answers: "Should I act NOW?"

## Formula

```
Fetch = Chirp × |DRIFT| × Confidence

Where:
  Chirp      = average of the scored dimensions D1-D6 (0-100)
  DRIFT      = |Methodology - Performance| (gap size)
  Confidence = the analyst's rating of evidence quality (0-1):
               how well sourced the analysis is
```

Chirp is computed from the dimension scores, so anyone can reproduce it from a case page. Confidence is a judgment and is stated explicitly in every FETCH statement; there is no default.

## Decision Thresholds

Levels are fractions of the threshold **T** (`THRESHOLD`, default 1,000):

| Fetch Score | Level | Action |
|-------------|-------|--------|
| ≥ 2T | **EXECUTE** (high priority) | Act immediately, first |
| ≥ T | **EXECUTE** | Act immediately |
| ≥ 0.75T | **CONFIRM** | Verify first |
| ≥ 0.5T | **QUEUE** | Log for later |
| below 0.5T | **WAIT** | Keep observing |

At T = 1,000 the bands are 2,000 / 1,000 / 750 / 500. The FETCH **level** is computed; a case's written **verdict** (for example MONITOR or WATCH) is the analyst's separate reading and can differ from it.

## CAL Syntax

```cal
FETCH <target>
[THRESHOLD <n>]
[CONFIDENCE <0-1>]
[ON EXECUTE <action>]
[ON CONFIRM <action>]
[ON QUEUE <action>]
[ON WAIT <action>]
```

## Example

```cal
FETCH cascade_map
THRESHOLD 1000
CONFIDENCE 0.8
ON EXECUTE CHIRP critical "Immediate action required"
ON CONFIRM CHIRP warning "Review recommended"
ON QUEUE SURFACE queue_report
ON WAIT PERCH ON segment:"monitor"
```

## Calculation Example

Given:
- Dimension scores 80, 90, 100 → Chirp = 90
- DRIFT = 50 (Methodology 85, Performance 35)
- Confidence = 0.8

```
Fetch = 90 × 50 × 0.8 = 3,600
```

With threshold = 1,000:
- 3,600 ≥ 2,000 → **EXECUTE (high priority)**

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

### EXECUTE (≥ T; high priority at ≥ 2T)
**Immediate action required**
- Highest priority
- Skip review process
- Act within minutes/hours
- Example: Critical customer escalation

### CONFIRM (≥ 0.75T)
**Management review needed**
- Medium-high priority
- Get approval first
- Act within 24-48 hours
- Example: Budget reallocation

### QUEUE (≥ 0.5T)
**Add to backlog**
- Medium priority
- Schedule for sprint
- Act within weeks
- Example: Process improvement

### WAIT (below 0.5T)
**Keep monitoring**
- Low priority
- Continue observation
- No immediate action
- Example: Watch-list item

## Real-World Example

**UC-342, Now the Work Begins** ([uc-342.stratiqx.com](https://uc-342.stratiqx.com)), with its published inputs:

```cal
-- Dimension scores: D1 70, D2 88, D4 74, D5 82, D6 76 (D3 not scored)
-- Chirp = (70 + 88 + 74 + 82 + 76) / 5 = 78
DRIFT now_the_work_begins
METHODOLOGY 88
PERFORMANCE 42   -- DRIFT = 46

FETCH now_the_work_begins
THRESHOLD 1000
CONFIDENCE 0.78  -- stated by the analyst; the case passes it via its workflow
-- Fetch = 78 × 46 × 0.78 = 2,799 → EXECUTE (high priority, ≥ 2,000)
ON EXECUTE SURFACE case_page
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

### Stating Confidence
```cal
FETCH analysis
THRESHOLD 1000
CONFIDENCE 0.7  -- the analyst's evidence-quality rating; 70 is read as 0.7
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
