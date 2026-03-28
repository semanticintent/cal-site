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

## RECALL

Retrieve and validate prognostic predictions against observed outcomes. The cormorant recalls where it hunted, what it caught, and whether conditions matched. RECALL is the read side of the memory system — WAKE stores patterns, RECALL retrieves and verifies them.

Used at review dates to formally assess whether WATCH triggers fired, measure calibration accuracy, and record evidence for the episodic memory store.

```cal
RECALL <target> ON <date>
  WATCH <trigger_id> STATUS <fired|not_fired|partial>
    [FIRED_DATE <date>]
    [EVIDENCE <string>]
  [WATCH ...]
  TRIGGERS <fired>/<total>
  CONFIDENCE_STATED <0-1>
  CONFIDENCE_ACTUAL <0-1>
  CALIBRATION <aligned|over|under>
  [DRIFT_AFTER <score>]
  [SURFACE validation AS <format>]
```

### Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `target` | Yes | The case entity being recalled (matches the original SURFACE entity) |
| `ON date` | Yes | The review date (ISO format `"YYYY-MM-DD"`) |
| `WATCH trigger STATUS` | Yes (per trigger) | Outcome for each trigger: `fired`, `not_fired`, or `partial` |
| `FIRED_DATE` | No | Date the trigger fired (ISO format), if applicable |
| `EVIDENCE` | No | Observable evidence supporting the status determination |
| `TRIGGERS n/m` | Yes | Aggregate: triggers fired out of total |
| `CONFIDENCE_STATED` | Yes | The confidence value from the original analysis |
| `CONFIDENCE_ACTUAL` | Yes | The observed hit rate (triggers fired / total) |
| `CALIBRATION` | Yes | Assessment: `aligned` (within 10pp), `over` (stated > actual), `under` (stated < actual) |
| `DRIFT_AFTER` | No | Updated DRIFT score post-review, if conditions changed |
| `SURFACE validation` | No | Output the validation record in specified format |

### Status Values

| Status | Meaning |
|--------|---------|
| `fired` | Trigger condition was met within the review window |
| `not_fired` | Trigger condition was not met within the review window |
| `partial` | Trigger condition partially met — some elements present, threshold not fully crossed |

### Calibration Calculation

```
CALIBRATION = |CONFIDENCE_STATED - CONFIDENCE_ACTUAL|

  aligned:  difference <= 0.10 (within 10 percentage points)
  over:     CONFIDENCE_STATED > CONFIDENCE_ACTUAL + 0.10
  under:    CONFIDENCE_STATED < CONFIDENCE_ACTUAL - 0.10
```

### Example: UC-062 Review

```cal
-- The Escape Hatch: Review at 30 days
RECALL escape_hatch ON "2026-04-15"

  WATCH compression_ceiling STATUS fired
    FIRED_DATE "2026-02-26"
    EVIDENCE "C3 AI layoffs produced stock decline. First AI layoff → negative reaction."

  WATCH consumer_collapse STATUS not_fired
    EVIDENCE "NFP remained positive through review window. Retail sales stable."

  WATCH infrastructure_plateau STATUS not_fired
    EVIDENCE "AI infrastructure revenue still growing despite broad software sell-off."

  TRIGGERS 1/3
  CONFIDENCE_STATED 0.33
  CONFIDENCE_ACTUAL 0.33
  CALIBRATION aligned

SURFACE validation AS json
```

### Example: UC-080 Review

```cal
-- The Canadian Feedback Loop: Review at review date
RECALL canadian_feedback_loop ON "2026-04-29"

  WATCH labour_crack STATUS fired
    FIRED_DATE "2026-04-10"
    EVIDENCE "March LFS: unemployment 7.1%. Healthcare vacancies 5.8%. Both thresholds crossed."

  WATCH cusma_rupture STATUS partial
    EVIDENCE "Review scheduled July 1. Trump rhetoric escalating. BoC flagged risk. No adverse outcome yet."

  WATCH rate_hike STATUS not_fired
    EVIDENCE "BoC held at 2.25% on Apr 29. Trapped but did not hike."

  TRIGGERS 1/3
  CONFIDENCE_STATED 0.40
  CONFIDENCE_ACTUAL 0.33
  CALIBRATION aligned

  DRIFT_AFTER 55  -- gap widened; structural trap confirmed but triggers only partially fired

SURFACE validation AS json
```

### Integration with GESA

RECALL outputs become immutable episodes in the GESA episodic memory store:

- **Episode context:** Original case dimensions, FETCH score, trigger definitions
- **Episode outcome:** RECALL results — which triggers fired, calibration assessment
- **Feedback loop:** CONFIDENCE_ACTUAL feeds into the calibration curve across all validated prognostics

At scale (50+ RECALL records), the system can answer: "For cases with D2 origin and confidence 0.40, what is the actual trigger fire rate?" That's the self-correcting loop — predict, validate, calibrate, predict better.

### Connection to Backtest Strategy

RECALL uses the same syntax for both live prognostic reviews and retroactive backtests (UC-BT series). The only difference:

| Field | Live Prognostic | Backtested Prognostic |
|-------|----------------|----------------------|
| `ON date` | Future date, now arrived | Historical date, already passed |
| `EVIDENCE` | Real-time observation | Historical record with information cutoff |
| `CALIBRATION` | Measures live prediction accuracy | Measures retroactive prediction accuracy |

Same keyword. Same syntax. Same validation logic. The framework doesn't distinguish between forward and backward validation — it measures both the same way.

*Added in v1.2 (UC-062/UC-080: first prognostic review window, April 2026).*

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
| RECALL | Validate | Retrieve and validate prognostic predictions | v1.2 |
| SURFACE | Act | Output results (+ scheduled review via `ON`) | v1.0 (ON: v1.1) |

## Next Steps

- [Learn Operators](/language/operators)
- [Explore Dimensions](/language/dimensions)
- [See Full Examples](/language/examples)
