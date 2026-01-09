# Language Syntax

## Basic Structure

```cal
-- Comments start with --
// Or double slash

KEYWORD target
CLAUSE value
CLAUSE value
```

## Case Insensitivity

Keywords are case-insensitive:
```cal
FORAGE entities    -- works
forage entities    -- works
Forage Entities    -- works
```

## Identifiers

Valid identifiers:
```cal
entities           -- simple
cascade_map        -- with underscore
myResults123       -- with numbers
```

## Strings

Double-quoted:
```cal
CHIRP alert "This is a message"
```

## Numbers

```cal
WHERE sound > 7        -- integer
WHERE score > 45.5     -- decimal
```

## Durations

```cal
WAKE AFTER 7d         -- 7 days
WAKE AFTER 4h         -- 4 hours
WAKE AFTER 30m        -- 30 minutes
WAKE AFTER 2w         -- 2 weeks
WAKE AFTER 6mo        -- 6 months
```

## Target Specifications

Simple:
```cal
FORAGE entities
```

Keyed:
```cal
PERCH ON segment:"enterprise"
PERCH ON status:"active"
```

## Dimension Lists

```cal
ACROSS D1, D2, D3            -- specific
ACROSS D1, D2, D3, D4, D5, D6  -- all
ACROSS ALL                    -- shorthand for all
```

## Complete Example

```cal
-- Enterprise customer monitoring
FORAGE customers
WHERE sound > 7 AND segment = "enterprise"
ACROSS D1, D2, D3
DEPTH 3
SURFACE high_risk_customers

-- Measure gap
DRIFT high_risk_customers
METHODOLOGY 85
PERFORMANCE 40

-- Decide action
FETCH high_risk_customers
THRESHOLD 1000
ON EXECUTE CHIRP critical "Immediate action required"
ON WAIT PERCH ON segment:"monitor"
```

## Next Steps

- [Learn All Keywords](/language/keywords)
- [Understand Operators](/language/operators)
- [Explore Dimensions](/language/dimensions)
- [See Code Examples](/language/examples)
