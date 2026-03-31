# Phoenix Runtime

The Phoenix Runtime is the CLI orchestration layer for the EMBER pipeline. It manages `.sil` artifact state, enforces human gates, injects episode context, and produces agent prompts ready to run in any AI interface.

---

## Install

```bash
npm install @semanticintent/phoenix-runtime
```

- **npm:** [@semanticintent/phoenix-runtime](https://www.npmjs.com/package/@semanticintent/phoenix-runtime)
- **GitHub:** [semanticintent/phoenix-runtime](https://github.com/semanticintent/phoenix-runtime)
- **DOI:** [10.5281/zenodo.19360782](https://doi.org/10.5281/zenodo.19360782)
- **License:** MIT

---

## How It Works

The runtime does not call an AI API. It produces prompts. You paste them into Claude Code, Claude CLI, or any AI interface. This keeps the runtime lightweight, model-agnostic, and free of API key management.

```
phoenix run a-01
  → reads state.json (prerequisites met?)
  → reads open episodes (any affect a-01?)
  → loads agent prompt from agents/A-01-BUSINESS-LOGIC-EXTRACTOR.md
  → assembles: episode context + project context + agent instructions
  → outputs: ready-to-run prompt
```

---

## CLI Reference

```bash
# Initialise a new project
phoenix init <project-name>

# Run an agent — produces the prompt
phoenix run <agent-id>
phoenix run a-01 --output prompt.md   # write to file instead of stdout

# Show pipeline status
phoenix status

# Approve or return a human gate
phoenix gate <gate-id> --approve --notes "looks correct"
phoenix gate <gate-id> --return  --notes "missing error state"

# Episode management
phoenix episode new             # interactive — record a change
phoenix episode list            # show all episodes
phoenix episode resolve <id>    # mark an episode resolved

# Validate artifacts for an agent
phoenix validate <agent-id>
```

---

## Pipeline State

State lives in `.phoenix/state.json` — plain JSON, git diffable, travels with the project.

```json
{
  "projectName": "acme-order-system",
  "completedAgents": { "a-00": { "completedAt": "...", "outputCount": 12 } },
  "gates": { "pass-1": { "status": "approved", "notes": "looks correct" } },
  "openEpisodes": ["ep-042"]
}
```

---

## Agent Prompts

All seven agent prompts ship bundled with the package in the `agents/` directory:

| File | Agent |
|------|-------|
| `A-00-SIGNAL-EXTRACTION.md` | Signal Extraction |
| `A-01-BUSINESS-LOGIC-EXTRACTOR.md` | Business Logic Extractor |
| `A-02-UI-ARCHAEOLOGIST.md` | UI Archaeologist |
| `A-03-REQUIREMENTS-SYNTHESIZER.md` | Requirements Synthesizer |
| `A-04-SOLUTION-ARCHITECT.md` | Solution Architect |
| `A-05-BUILDER.md` | Builder |
| `A-06-VALIDATOR-CERTIFIER.md` | Validator & Certifier |

---

## Relationship to CAL Runtime

```
cal-runtime                    phoenix-runtime
───────────────────────────    ────────────────────────────
PEG grammar parser             Line-oriented .sil parser
Executes CAL scripts           Orchestrates agent pipeline
Produces scores + alerts       Produces prompts + artifact state
npm: @stratiqx/cal-runtime     npm: @semanticintent/phoenix-runtime
Methodology: 6D + DRIFT        Methodology: Phoenix + EMBER
```

Both are open source, MIT licensed, published under the `semanticintent` organisation.
