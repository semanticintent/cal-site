# EMBER — Semantic Intent Language

**EMBER** is the methodology language of Project Phoenix. Every artifact every agent produces is written in `.sil` format.

It is not a programming language. It does not execute. It is the format in which agents read, write, and communicate the artifacts of a legacy modernization engagement.

The name reflects what the language captures — the business logic that survives the legacy system. The new system rises from it.

---

## Why `.sil`?

Every `.sil` file is:

- **Human readable** without a manual — open one and immediately understand it
- **Agent parseable** without a schema — line-oriented, no grammar required
- **Git diffable** — plain text, one construct per file, changes are visible
- **Permanent** — no binary formats, no locked tooling, no dependencies

The artifact trail is not a byproduct of the pipeline. It is the product. When an engagement is complete, the `.sil` files are the evidence that nothing was lost.

---

## Core Rules

1. Every `.sil` file begins with a three-line header — no exceptions
2. One construct per file
3. Human readable always — no algorithmic notation, no jargon
4. Indent with two spaces
5. Comments begin with `#`
6. Filenames follow the pattern `domain.workflow.sil`

---

## File Header

Every `.sil` file — regardless of construct type — opens with:

```
CONSTRUCT  <type>
ID         <domain.name>
VERSION    <integer>
─────────────────────────────────────────
```

The separator line uses Unicode `─` (U+2500). Everything below it is the construct body.

---

## How the Constructs Chain

```
A-00  SIGNAL    →  tells each agent what to look for
A-01  WORKFLOW  →  server-side trace per business process
A-02  SCREEN    →  UI trace per workflow
A-03  SPEC      →  synthesizes WORKFLOW + SCREEN → intent
A-04            →  reads SPEC + _mission.sil → stack decision
A-05            →  reads SPEC + SCREEN → builds system
A-06            →  reads SPEC → certifies system
      EPISODE   →  any step can write one, all steps read open ones
```

Each construct type is covered in [Constructs](./constructs).

---

## What EMBER Is Not

- **Not a programming language** — nothing in a `.sil` file executes
- **Not a schema language** — no type enforcement, no validators
- **Not a documentation format** — a working artifact, not an explanation
- **Not version-controlled separately** — lives in the same repo as the code

---

## Reference Implementation

EMBER is implemented in [`@semanticintent/phoenix-runtime`](https://www.npmjs.com/package/@semanticintent/phoenix-runtime) — the CLI that orchestrates the pipeline, parses `.sil` files, and manages artifact state.

```bash
npm install @semanticintent/phoenix-runtime
```

DOI: [10.5281/zenodo.19360782](https://doi.org/10.5281/zenodo.19360782)

---

*EMBER v0.1 — Project Phoenix — [10.5281/zenodo.19360727](https://doi.org/10.5281/zenodo.19360727)*
