# Constructs

EMBER has five construct types. Each maps to a specific pipeline stage. One construct per `.sil` file.

---

## SIGNAL

Produced by **A-00**. The pre-forage knowledge unit. One signal per known workflow — written before extraction begins. Signals are what the forage agent reads to orient itself before touching the system.

```
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

**Fields**

| Field    | Required | Description                                      |
|----------|----------|--------------------------------------------------|
| type     | yes      | `workflow` / `background` / `integration`        |
| entry    | yes      | known entry point — route, job name, event       |
| entities | yes      | business nouns this workflow touches             |
| boundary | yes      | external systems it talks to                     |
| source   | yes      | where this signal came from                      |
| notes    | no       | anything worth flagging before extraction starts |

---

## WORKFLOW

Produced by **A-01**. The server-side trace. One workflow per business process. Flow and I/O — nothing else.

```
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
```

**Rules**

- Each line is one function call or one I/O operation
- Boundary calls are marked with `→ SystemName`
- DB writes are marked with `→ DB write`
- DB reads are marked with `→ DB read`
- Keep function names as found in the source — do not rename
- `out` is the success terminus
- `error` covers known failure paths only

---

## SCREEN

Produced by **A-02**. The UI layer trace. One file per workflow — all screens for that workflow in sequence. ASCII wireframes showing what the user sees and what they do to move forward.

```
CONSTRUCT  screen
ID         cart.checkout
VERSION    1
─────────────────────────────────────────
SCREEN 1 — Cart
┌─────────────────────────────────────┐
│  Your Cart                          │
│  ─────────────────────────────────  │
│  [ ] Product name          $24.00   │
│  [ ] Product name          $12.00   │
│  ─────────────────────────────────  │
│  Promo code:  [______________]      │
│  Subtotal:                 $36.00   │
│                                     │
│  [Checkout →]                       │
└─────────────────────────────────────┘
on: "Checkout →" → SCREEN 2

SCREEN 2 — Payment
┌─────────────────────────────────────┐
│  Payment                            │
│  ─────────────────────────────────  │
│  Card:    [____________________]    │
│  Expiry:  [______]   CVV: [____]    │
│                                     │
│  [← Back]         [Place Order →]   │
└─────────────────────────────────────┘
on: "Place Order →" → SCREEN 3
```

**Rules**

- Every screen has a label after the `SCREEN N —` marker
- Every screen ends with one or more `on:` transitions
- Inputs shown as `[____]`, selects as `( )`, checkboxes as `[ ]`
- No styling, no colors, no component names — layout only
- Screens in sequence top to bottom

---

## SPEC

Produced by **A-03**. The semantic intent specification. One spec per workflow. This is the artifact A-04 reads to choose the stack and A-05 reads to build.

```
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

gaps:
  - Partial refund logic not found in UI — check A-01
```

---

## EPISODE

Written by any agent or human when a change occurs mid-engagement. The memory layer of the pipeline. Every subsequent agent reads open episodes before doing their work.

```
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
  Client data shows 40% cart abandonment at registration step

affects:
  A-01  → add guest.checkout workflow
  A-02  → add guest path screens to cart.checkout
  A-03  → update spec — guest vs authenticated intent
  A-05  → new UI pass and API route for guest flow
  A-06  → extend test coverage to include guest path

skip:
  A-00  → brief unchanged
  A-04  → stack unchanged

reference:
  stakeholder: Sarah Chen, Product Lead
  meeting:     2026-03-14 product review
```

**Status values**

| Status   | Meaning                                           |
|----------|---------------------------------------------------|
| `open`     | change recorded, agents have not yet processed it |
| `active`   | one or more agents currently working on it        |
| `resolved` | all affected steps completed and verified         |
