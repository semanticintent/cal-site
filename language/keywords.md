# Keywords Reference

## FORAGE

Query and analyze entities.

```cal
FORAGE <target>
[WHERE <conditions>]
[ACROSS <dimensions>]
[DEPTH <n>]
[SURFACE <output>]
```

**Example:**
```cal
FORAGE customers
WHERE sound > 7 AND segment = "enterprise"
ACROSS D1, D2, D3
DEPTH 3
SURFACE high_risk_customers
```

---

## DIVE

Deep cascade analysis.

```cal
DIVE INTO <target>
[WHEN <condition>]
[TRACE cascade]
[EMIT <output>]
```

**Example:**
```cal
DIVE INTO revenue
WHEN decline > 50
TRACE cascade
EMIT financial_impact
```

---

## PERCH

Set observation position (Space dimension).

```cal
PERCH ON <target>
```

**Example:**
```cal
PERCH ON segment:"high-value"
```

---

## LISTEN

Monitor for signals (Sound dimension).

```cal
LISTEN FOR <signal_list>
```

**Example:**
```cal
LISTEN FOR churn signals, attrition signals
```

---

## WAKE

Time-based trigger (Time dimension).

```cal
WAKE AFTER <duration>
```

**Example:**
```cal
WAKE AFTER 7d
WAKE AFTER 4h
```

---

## CHIRP

Send alert/notification.

```cal
CHIRP <alert_type> ["message"]
```

**Alert Types:** `alert`, `warning`, `critical`, `info`, `success`

**Example:**
```cal
CHIRP critical "Cascade threshold exceeded"
CHIRP warning
```

---

## TRACE

Follow cascade pathways.

```cal
TRACE cascade
```

Used with DIVE to map cascade flow.

---

## SURFACE

Output results.

```cal
SURFACE <output> [AS <format>]
```

**Formats:** `json`, `summary`, `report`

**Example:**
```cal
SURFACE results AS json
SURFACE cascade_map
```

---

## DRIFT

Measure gap between methodology and performance.

```cal
DRIFT <target>
METHODOLOGY <score>
PERFORMANCE <score>
[GAP <type>]
```

**Gap Types:** `curiosity`, `teaching`, `auto`

**Example:**
```cal
DRIFT cascade_map
METHODOLOGY 85
PERFORMANCE 35
```

**Output:** drift score, gap type, quality assessment

---

## FETCH

Calculate action decision score.

```cal
FETCH <target>
[THRESHOLD <n>]
[ON EXECUTE <action>]
[ON CONFIRM <action>]
[ON QUEUE <action>]
[ON WAIT <action>]
```

**Formula:** `Fetch = Chirp × |DRIFT| × Confidence`

**Example:**
```cal
FETCH cascade_map
THRESHOLD 1000
ON EXECUTE CHIRP critical "Act immediately"
ON CONFIRM CHIRP warning "Review first"
ON QUEUE SURFACE queue_report
ON WAIT PERCH ON segment:"monitor"
```

---

## Keyword Summary

| Keyword | Layer | Purpose |
|---------|-------|---------|
| FORAGE | Sense | Query and search |
| LISTEN | Sense | Monitor signals |
| PERCH | Sense | Observe position |
| WAKE | Sense | Time trigger |
| DIVE | Analyze | Deep analysis |
| TRACE | Analyze | Follow paths |
| DRIFT | Measure | Gap measurement |
| FETCH | Decide | Action decision |
| CHIRP | Act | Send alert |
| SURFACE | Act | Output results |

## Next Steps

- [Learn Operators](/language/operators)
- [Explore Dimensions](/language/dimensions)
- [See Full Examples](/language/examples)
