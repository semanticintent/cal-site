# Code Examples

## Basic Query

```cal
-- Find high-urgency situations
FORAGE entities
WHERE sound > 7
SURFACE results
```

## Multi-Dimension Analysis

```cal
-- Analyze across customer, employee, and revenue
FORAGE situations
WHERE sound > 7
ACROSS D1, D2, D3
DEPTH 3
SURFACE cascade_analysis
```

## Complete Closed-Loop

```cal
-- Full sense-analyze-measure-decide-act cycle
FORAGE entities
WHERE sound > 7 AND segment = "enterprise"
ACROSS D1, D2, D3, D5, D6
DEPTH 3
SURFACE cascade_map

DRIFT cascade_map
METHODOLOGY 85
PERFORMANCE 35

FETCH cascade_map
THRESHOLD 1000
ON EXECUTE CHIRP critical "Immediate action required"
ON CONFIRM CHIRP warning "Management review needed"
ON QUEUE SURFACE queue_report
ON WAIT PERCH ON segment:"monitor"
```

## Time-Based Monitoring

```cal
-- Wake up after 7 days and check status
WAKE AFTER 7d
FORAGE customers
WHERE segment = "at-risk"
ACROSS D1, D3
DEPTH 2
SURFACE weekly_report
```

## Deep Dive Analysis

```cal
-- Deep cascade investigation
DIVE INTO revenue_decline
WHEN decline > 50
TRACE cascade
ACROSS ALL
EMIT full_impact_report
```

## Multi-Signal Listening

```cal
-- Monitor multiple signal types
LISTEN FOR churn signals, attrition signals
PERCH ON segment:"high-value"
FORAGE affected_entities
ACROSS D1, D2
DEPTH 2
SURFACE risk_assessment
```

## Conditional Alerting

```cal
-- Different alerts based on severity
FORAGE critical_situations
WHERE sound > 8
ACROSS ALL
DEPTH 3
SURFACE cascade_map

DRIFT cascade_map
METHODOLOGY 90
PERFORMANCE 30

FETCH cascade_map
THRESHOLD 2000
ON EXECUTE CHIRP critical "RED ALERT: Act immediately"
ON CONFIRM CHIRP warning "AMBER: Management review within 24h"
ON QUEUE SURFACE monitoring_queue
ON WAIT PERCH ON status:"watch"
```

## Enterprise Customer Focus

```cal
-- Monitor enterprise accounts
FORAGE customers
WHERE sound > 6
AND segment = "enterprise"
AND arr > 100000
ACROSS D1, D2, D3
DEPTH 2
SURFACE enterprise_risks

DRIFT enterprise_risks
METHODOLOGY 80
PERFORMANCE 45

FETCH enterprise_risks
THRESHOLD 800
ON EXECUTE CHIRP alert "CSM intervention needed"
```

## Product Launch Analysis

```cal
-- Analyze product launch delays
FORAGE launches
WHERE sound > 7
AND status = "delayed"
ACROSS D2, D3, D5, D6
DEPTH 3
SURFACE launch_cascade

DRIFT launch_cascade
METHODOLOGY 85
PERFORMANCE 40

FETCH launch_cascade
THRESHOLD 1200
ON EXECUTE CHIRP critical "Executive escalation required"
ON CONFIRM CHIRP warning "PM review needed"
```

## Real Example: Tailwind CSS Case

Based on the real UC-002 case study:

```cal
-- Tailwind CSS 75% layoff cascade analysis
FORAGE entities
WHERE sound > 7
AND name = "Tailwind CSS Layoffs"
ACROSS D1, D2, D3, D5, D6
DEPTH 2
SURFACE tailwind_cascade

-- Direct impact: $300K visible
-- Expected cascade: $2.1M - $3.4M (7-11× multiplier)

DRIFT tailwind_cascade
METHODOLOGY 85
PERFORMANCE 35
-- Gap: 50 (extreme teaching gap)

FETCH tailwind_cascade
THRESHOLD 1000
ON EXECUTE CHIRP critical "Major org restructure needed"
-- Fetch score: ~3600 (far exceeds threshold)
```

## Prognostic Analysis (Forward-Looking)

Based on UC-062: The Escape Hatch — the first prognostic case. Uses `WATCH` for trigger monitoring and `SURFACE ON` for scheduled review.

```cal
-- The Escape Hatch: AI severance-to-investment cascade
-- Forward analysis with checkable predictions
FORAGE cross_sector_meta_pattern
WHERE ai_layoff_stock_surge = true
  AND severance_capital_available = true
  AND investment_window_open = true
ACROSS D2, D1, D3, D6, D5, D4
DEPTH 3
SURFACE escape_hatch_cascade

DIVE INTO severance_investment_paradox
WHEN displaced_workers_can_invest_in_displacer = true
TRACE escape_hatch_cascade
EMIT paradox_signal

-- Monitor three trigger conditions over time
WATCH trigger_1 WHEN layoff_announcement_produces_stock_decline
WATCH trigger_2 WHEN nfp_negative_2_consecutive AND retail_sales_declining
WATCH trigger_3 WHEN ai_infra_revenue_growth_declining_2q

DRIFT escape_hatch_cascade
METHODOLOGY 85
PERFORMANCE 35

FETCH escape_hatch_cascade
THRESHOLD 1000
ON EXECUTE CHIRP critical "Forward analysis: window open, 3 triggers monitored"

SURFACE analysis AS json
SURFACE review ON "2026-04-15"
```

**Key patterns:**
- `WATCH` defines conditions to monitor between now and the review date
- `SURFACE analysis AS json` outputs the analysis immediately
- `SURFACE review ON "2026-04-15"` schedules the formal reassessment
- When a WATCH trigger fires, it changes the window status from OPEN toward CLOSED

## Next Steps

- [Understand DRIFT Framework](/frameworks/drift)
- [Master Fetch Decisions](/frameworks/fetch)
- [Explore the 6D Methodology](/frameworks/6d)
- [Try the Playground](/playground)
