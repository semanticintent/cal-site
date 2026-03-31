# File Structure

## Directory Layout

Every Phoenix project follows this structure on disk:

```
/phoenix-project/
  ├── _mission.sil              ← A-00 mission brief
  │
  ├── /signals/
  │   └── domain.workflow.sil   ← one per known workflow
  │
  ├── /workflows/
  │   └── domain.workflow.sil   ← one per business process
  │
  ├── /screens/
  │   └── domain.workflow.sil   ← one per workflow (all screens)
  │
  ├── /specs/
  │   └── domain.workflow.sil   ← one per workflow
  │
  └── /episodes/
      └── ep-NNN.sil            ← one per change event
```

The `.phoenix/` directory holds pipeline state — managed by the runtime, not written by hand.

---

## Naming Convention

All artifact files follow: `domain.workflow.sil` — lowercase, dot-separated.

| Example | What it is |
|---------|-----------|
| `cart.checkout.sil` | checkout workflow in the cart domain |
| `user.registration.sil` | registration workflow in the user domain |
| `order.fulfillment.sil` | fulfillment workflow in the order domain |
| `ep-042.sil` | episode 42 — a mid-engagement change |
| `_mission.sil` | the mission brief — underscore prefix, one per project |

---

## Versioning

The `VERSION` field in the header is an integer. Increment it when the construct changes meaningfully — not on every edit.

```
CONSTRUCT  spec
ID         cart.checkout
VERSION    2             ← bumped when guest checkout was added
─────────────────────────────────────────
```

Git history is the full version record. The VERSION field is a human-readable signal, not a diff tool.

---

## The `.phoenix/` Directory

Managed entirely by `phoenix-runtime`. Never edit by hand.

```
.phoenix/
  └── state.json    ← pipeline state — which agents are complete,
                       which gates are approved, open episodes
```

`state.json` is human readable and git diffable. It travels with the project.

---

## Runtime Commands

```bash
phoenix init my-project      # creates directory structure + state
phoenix run a-00             # produces the A-00 prompt
phoenix status               # shows pipeline state
phoenix gate pass-1 --approve --notes "looks correct"
phoenix episode new          # record a mid-engagement change
phoenix validate a-01        # count artifacts for a given agent
```

Full runtime documentation: [Runtime](./runtime)
