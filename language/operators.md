# Operators

## Comparison Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `=` | Equals | `WHERE status = "active"` |
| `!=` | Not equals | `WHERE status != "closed"` |
| `>` | Greater than | `WHERE sound > 7` |
| `<` | Less than | `WHERE score < 50` |
| `>=` | Greater or equal | `WHERE risk >= 8` |
| `<=` | Less or equal | `WHERE priority <= 3` |
| `IS` | Equals (alt) | `WHERE status IS "active"` |
| `IS NOT` | Not equals (alt) | `WHERE status IS NOT "closed"` |

## Logical Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `AND` | Both true | `WHERE sound > 7 AND space > 5` |
| `OR` | Either true | `WHERE risk > 8 OR priority = 1` |

## Combining Conditions

```cal
FORAGE entities
WHERE sound > 7
AND impact = "high"
AND segment = "enterprise"
OR priority = 1
```

## Examples

### Simple Comparison
```cal
FORAGE customers
WHERE sound > 7
SURFACE results
```

### Multiple Conditions
```cal
FORAGE entities
WHERE sound > 7
AND space > 5
AND time > 6
ACROSS D1, D2, D3
DEPTH 2
SURFACE high_urgency
```

### Complex Logic
```cal
FORAGE situations
WHERE (sound > 8 AND segment = "enterprise")
OR (priority = 1 AND status = "active")
SURFACE critical_cases
```

### String Matching
```cal
FORAGE customers
WHERE segment = "enterprise"
AND status != "inactive"
SURFACE active_enterprise
```

## Best Practices

1. **Use clear comparisons** - Be explicit with your conditions
2. **Combine logically** - Use AND/OR to build complex filters
3. **Test incrementally** - Start simple, add complexity

## Next Steps

- [Explore Dimensions](/language/dimensions)
- [See Full Examples](/language/examples)
- [Learn DRIFT Framework](/frameworks/drift)
