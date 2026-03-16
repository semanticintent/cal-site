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

## WATCH

Monitor conditions over time (temporal extension of Sense layer). Used in prognostic analyses to define trigger conditions that are evaluated on an ongoing basis.

```cal
WATCH <trigger_id> WHEN <condition>
```

**Example:**
```cal
WATCH trigger_1 WHEN layoff_announcement_produces_stock_decline
WATCH trigger_2 WHEN nfp_negative_2_consecutive AND retail_sales_declining
WATCH trigger_3 WHEN ai_infra_revenue_growth_declining_2q
```

Where `FORAGE` senses signals at a point in time, `WATCH` defines conditions to sense *over time*. When a WATCH condition fires, it changes the analysis state. Used with `SURFACE review ON` to schedule formal reassessment.

*Added in v1.1 (UC-062: The Escape Hatch — first prognostic case).*

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

Output results. Supports immediate output and scheduled reassessment.

```cal
SURFACE <output> [AS <format>]
SURFACE <output> ON <date>
```

**Formats:** `json`, `summary`, `report`

**Modifiers:**
- `AS <format>` — output now in the specified format
- `ON <date>` — schedule a future reassessment (ISO format: `"YYYY-MM-DD"`)

**Example:**
```cal
SURFACE results AS json
SURFACE cascade_map
SURFACE review ON "2026-04-15"
```

The `ON` modifier extends SURFACE from immediate output to scheduled output. When used with `WATCH` triggers, it defines when to formally check whether monitored conditions have fired.

*`ON` modifier added in v1.1 (UC-062).*

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

| Keyword | Layer | Purpose | Since |
|---------|-------|---------|-------|
| FORAGE | Sense | Query and search | v1.0 |
| LISTEN | Sense | Monitor signals | v1.0 |
| PERCH | Sense | Observe position | v1.0 |
| WATCH | Sense (temporal) | Monitor conditions over time | v1.1 |
| WAKE | Sense | Time trigger | v1.0 |
| DIVE | Analyze | Deep analysis | v1.0 |
| TRACE | Analyze | Follow paths | v1.0 |
| DRIFT | Measure | Gap measurement | v1.0 |
| FETCH | Decide | Action decision | v1.0 |
| CHIRP | Act | Send alert | v1.0 |
| SURFACE | Act | Output results (+ scheduled review via `ON`) | v1.0 (ON: v1.1) |

## Next Steps

- [Learn Operators](/language/operators)
- [Explore Dimensions](/language/dimensions)
- [See Full Examples](/language/examples)
