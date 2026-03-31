# EMBER — Semantic Intent Language

**EMBER is the artifact language of Project Phoenix.**
**Extension: `.sil` — Semantic Intent Language**

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.18904231.svg)](https://doi.org/10.5281/zenodo.18904231)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## What EMBER Is

EMBER is the second DSL in the methodology-as-infrastructure family.

Where CAL is **methodology-as-executor** — a language that runs cascade analysis
and produces decisions — EMBER is **methodology-as-memory** — a language that
carries the artifacts of a transformation pipeline forward, across agents and
humans, in a format both can read without a manual.

```
CAL     →  methodology becomes computation
            write it, something executes it, decisions emerge

EMBER   →  methodology becomes representation
            write it, agents and humans read it,
            the pipeline carries it forward as permanent state
```

Neither is more correct. They operate at different layers of the same pattern.

---

## The Pattern Family

Both CAL and EMBER instantiate **Methodology-as-Infrastructure** — the concept
that analytical frameworks can be compiled into deterministic infrastructure
other systems build upon.

| Property | CAL | EMBER |
|---|---|---|
| Domain | Cascade analysis | Legacy modernization |
| Execution | Runs — produces scores and alerts | Represents — carries artifacts forward |
| Layer | Runtime / executor | Memory / intermediate representation |
| Pipeline | 6D Foraging → Sense → Analyze → Decide → Act | Phoenix → Extract → Synthesize → Build → Certify |
| Keywords | `FORAGE` `DRIFT` `FETCH` `CHIRP` ... | `SIGNAL` `WORKFLOW` `SCREEN` `SPEC` `EPISODE` |
| Output | Analysis scores, cascade maps, action alerts | Mission briefs, process traces, specs, certification |

---

## Why EMBER Exists

Project Phoenix extracts business logic from legacy systems and rebuilds them
from zero in a modern stack. Seven agents run in sequence — each one producing
artifacts the next agent reads.

Without a shared format, those artifacts are documents. Prose. Ambiguous.
Lossy at every handoff.

EMBER makes every handoff typed. Every agent produces `.sil` files. Every
agent reads `.sil` files. Humans read `.sil` files without a manual.

The name reflects what the language captures: the business logic that survives
the legacy system — the ember from which the new system rises.

---

## The Five Constructs

EMBER has five constructs. One file format. One header rule.

### File Header

Every `.sil` file opens with:

```
CONSTRUCT  <type>
ID         <domain.name>
VERSION    <integer>
─────────────────────────────────────────
```

Everything below the separator is the construct body.

---

### SIGNAL

Produced by **A-00 — Signal Extraction**.
The pre-forage knowledge unit. Written before extraction begins.
What the forage agent reads to arrive oriented rather than discovering blind.

```sil
CONSTRUCT  signal
ID         cart.checkout
VERSION    1
─────────────────────────────────────────
type:      workflow
entry:     POST /cart/submit
entities:  Cart, Order, Payment, User
boundary:  Stripe, SendGrid, PostgreSQL
source:    route table, API docs
notes:     High abandonment reported at payment step
```

---

### WORKFLOW

Produced by **A-01 — Business Logic Extractor**.
The server-side trace. Flow and I/O. Nothing else.
One file per business process — human readable as a footprint of what the
system actually does.

```sil
CONSTRUCT  workflow
ID         cart.checkout
VERSION    1
─────────────────────────────────────────
entry:  POST /cart/submit
actor:  authenticated user

  validateCart(cartId, userId)
  calculateTotal(items, promoCode)
  chargePayment(total, method)      → Stripe
  createOrder(cartId, chargeId)     → DB write
  sendConfirmation(userId, orderId) → SendGrid

out:    orderId, 200 OK
error:  payment failure → 402, order not created

confidence:  high
```

---

### SCREEN

Produced by **A-02 — UI Archaeologist**.
The UI layer trace. ASCII wireframes — every screen of every workflow,
in sequence, with transitions named.

```sil
CONSTRUCT  screen
ID         cart.checkout
VERSION    1
─────────────────────────────────────────
SCREEN 1 — Cart review
┌─────────────────────────────────────┐
│  Your Cart                          │
│  ─────────────────────────────────  │
│  [ ] Product name          $24.00   │
│  Promo code:  [______________]      │
│  Subtotal:                 $36.00   │
│  [Checkout →]                       │
└─────────────────────────────────────┘
on: "Checkout →" → SCREEN 2

SCREEN 2 — Shipping
┌─────────────────────────────────────┐
│  Name:    [________________]        │
│  Address: [________________]        │
│  Delivery: ( ) Standard             │
│            ( ) Express              │
│  [← Back]           [Continue →]   │
└─────────────────────────────────────┘
on: "Continue →" → SCREEN 3

SCREEN 3 — Payment
┌─────────────────────────────────────┐
│  Card:    [____________________]    │
│  Expiry:  [______]   CVV: [____]    │
│  [← Back]         [Place Order →]  │
└─────────────────────────────────────┘
on: "Place Order →" → SCREEN 4

SCREEN 4 — Confirmation
┌─────────────────────────────────────┐
│  Order Confirmed ✓                  │
│  Order #:  84921                    │
│  [Continue Shopping]                │
└─────────────────────────────────────┘
on: "Continue Shopping" → home

server:  workflows/cart.checkout.sil
mapping:
  SCREEN 1  →  display only
  SCREEN 2  →  validateCart(), calculateTotal()
  SCREEN 3  →  chargePayment(), createOrder()
  SCREEN 4  →  sendConfirmation() → result displayed

confidence:  high
```

---

### SPEC

Produced by **A-03 — Requirements Synthesizer**.
The semantic intent specification. One spec per workflow.
Answers one question: what was this actually trying to accomplish?

This is the document the original system never had.
It is what A-04 reads to choose the stack.
It is what A-05 reads to build.
It is what A-06 reads to certify.

```sil
CONSTRUCT  spec
ID         cart.checkout
VERSION    1
─────────────────────────────────────────
intent:
  Allow a customer to purchase items in their cart
  and receive order confirmation

journey:
  Cart review → Shipping → Payment → Confirmation

inputs:
  promoCode       optional
  address         required
  deliveryOption  required
  cardDetails     required

rules:
  - Promo applied before total calculated
  - Charge must succeed before order is created
  - Confirmation sent only on successful order
  - Guest checkout allowed — login not required

outputs:
  orderId
  confirmation to user via email

boundaries:
  Stripe    → payment processing
  SendGrid  → order confirmation email
  DB        → order record persistence

confidence:
  server:  high
  ui:      high
  spec:    high

gaps:
  - none
```

---

### EPISODE

Written by any agent or human when a change occurs.
The memory layer of the pipeline. Every agent reads open episodes before
starting its work. Change propagates surgically — only to what it affects.

```sil
CONSTRUCT  episode
ID         ep-042
VERSION    1
─────────────────────────────────────────
date:     2026-03-15
trigger:  client requirement change
status:   open

change:
  Add guest checkout — purchase without login required

reason:
  Client data shows 40% cart abandonment at registration

affects:
  A-01  → add guest.checkout workflow
  A-02  → add guest path screens to cart.checkout
  A-03  → update spec — guest vs authenticated intent
  A-05  → new UI pass and API route for guest flow
  A-06  → extend test coverage to include guest path

skip:
  A-00  → brief unchanged
  A-04  → stack unchanged

status:   open
```

**Episode status values:**

| Status | Meaning |
|---|---|
| `open` | recorded, agents have not yet processed it |
| `active` | one or more agents currently working on it |
| `resolved` | all affected steps completed and verified |

Episodes are never deleted. They are the audit trail.

---

## The Phoenix Pipeline

EMBER artifacts flow through seven agents:

```
A-00  SIGNAL    →  mission brief — the heads-up
A-01  WORKFLOW  →  server-side trace per workflow
A-02  SCREEN    →  UI trace per workflow
A-03  SPEC      →  synthesizes both → semantic intent
A-04            →  reads SPEC + mission → stack + blueprint
A-05            →  reads SPEC + SCREEN → builds system
A-06            →  reads SPEC → certifies system

EPISODE         →  any agent writes, all agents read
```

---

## File Structure on Disk

```
/phoenix-project/
  ├── _mission.sil
  ├── /signals/
  │   └── domain.workflow.sil
  ├── /workflows/
  │   └── domain.workflow.sil
  ├── /screens/
  │   └── domain.workflow.sil
  ├── /specs/
  │   └── domain.workflow.sil
  └── /episodes/
      └── ep-NNN.sil
```

Naming convention: `domain.workflow.sil` — lowercase, dot-separated.
The construct type is declared inside the file, not encoded in the filename.

---

## Core Rules

1. Every `.sil` file begins with the three-line header — no exceptions
2. One construct per file
3. Human readable always — no algorithmic notation, no jargon
4. Indent with two spaces
5. Comments begin with `#`
6. Filenames follow `domain.workflow.sil`

---

## What EMBER Is Not

- **Not a programming language** — nothing in a `.sil` file executes
- **Not a schema language** — no type enforcement, no validators
- **Not documentation** — it is a working artifact, not an explanation
- **Not CAL** — CAL computes. EMBER represents.

Both are methodology-as-infrastructure. Different layers. Different jobs.

---

## Comparison: CAL vs EMBER

```
CAL script                          EMBER spec

FORAGE entities WHERE sound > 7     CONSTRUCT  spec
ACROSS D1, D2, D3, D5, D6          ID         cart.checkout
DEPTH 3                             VERSION    1
SURFACE cascade_map                 ─────────────────────────────
                                    intent:
DRIFT cascade_map                     Allow a customer to purchase
  METHODOLOGY 85                      and receive confirmation
  PERFORMANCE 35
FETCH cascade_map THRESHOLD 1000    rules:
ON EXECUTE CHIRP critical "Act now"   - Charge before order created
                                      - Promo before total

↓ executes → produces scores        ↓ read by agents → informs build
```

CAL tells the system what to decide.
EMBER tells the system what was meant.

---

## Relationship to Methodology-as-Infrastructure

EMBER is the second instantiation of the MaI concept:

> *Methodology-as-Infrastructure is the practice of encoding an analytical
> methodology into a deterministic, executable runtime layer that other systems
> can build upon.*

EMBER extends this into the **representation layer** — methodology encoded not
as execution but as typed, persistent, human-readable artifacts that carry
intent forward across a multi-agent pipeline.

CAL proved the pattern works for analysis.
EMBER proves it generalizes to transformation.

---

## Citation

```bibtex
@misc{shatny2026ember,
  author = {Shatny, Michael},
  title = {EMBER: Semantic Intent Language for Project Phoenix},
  year = {2026},
  publisher = {Zenodo},
  doi = {10.5281/zenodo.18904231},
  note = {ORCID: 0009-0006-2011-3258}
}
```

---

## Related

- [CAL Language Reference](/cal) — the executor sibling DSL
- [Project Phoenix](https://semanticintent.ai) — the pipeline EMBER serves
- [Methodology-as-Infrastructure](https://doi.org/10.5281/zenodo.18946631) — the concept both instantiate
- [6D Foraging Methodology](https://6d.cormorantforaging.dev) — the framework CAL encodes

---

*EMBER v0.1 — Semantic Intent — March 2026*
*Part of the Cormorant Foraging methodology family*
