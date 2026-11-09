<script setup lang="ts">
import { ref, computed } from 'vue'

interface Example {
  id: string
  title: string
  description: string
  code: string
  output: string
  category: string
}

const examples: Example[] = [
  {
    id: 'basic-forage',
    title: 'Basic FORAGE',
    description: 'Simple entity discovery with cascade mapping',
    category: 'basics',
    code: `FORAGE entities WHERE sound > 7
ACROSS D1, D2, D3, D5, D6
DEPTH 3
SURFACE cascade_map`,
    output: `✓ FORAGE Complete

Found: 3 entities with sound > 7

Cascade Map Generated:
┌─────────────────────────────────────┐
│ Entity: design-system-v2            │
│ Sound: 8.5 │ Space: wide │ Time: ⚡│
├─────────────────────────────────────┤
│ D1 (Customer)    → score 70         │
│ D2 (Employee)    → score 58         │
│ D3 (Revenue)     → score 86         │
│ D5 (Quality)     → score 64         │
│ D6 (Operational) → score 52         │
└─────────────────────────────────────┘

Chirp: 66 (average of scored dimensions)
Depth: 3 levels analyzed`
  },
  {
    id: 'drift-measurement',
    title: 'DRIFT Measurement',
    description: 'Measure the gap between methodology and performance',
    category: 'analysis',
    code: `FORAGE entities WHERE sound > 6
SURFACE cascade_map

DRIFT cascade_map
  METHODOLOGY 85
  PERFORMANCE 35`,
    output: `✓ FORAGE Complete: 5 entities found
✓ Cascade map generated

━━━ DRIFT MEASUREMENT ━━━

Methodology Score: 85/100
Performance Score:  35/100

Gap: 50 points (58.8% below target)

Status: 🔴 CRITICAL GAP

Analysis:
• You know what to do (85/100)
• You're not doing it (35/100)
• Classic execution gap

Recommendation: FETCH for action thresholds`
  },
  {
    id: 'fetch-decision',
    title: 'FETCH Decision',
    description: 'Automated decision-making with thresholds',
    category: 'automation',
    code: `FORAGE entities WHERE sound > 7
SURFACE cascade_map

DRIFT cascade_map METHODOLOGY 85 PERFORMANCE 30

FETCH cascade_map THRESHOLD 1000 CONFIDENCE 0.8
ON EXECUTE CHIRP critical "Cascade exceeds threshold"
ON WAIT CHIRP info "Below action threshold"`,
    output: `✓ FORAGE Complete: 3 entities
✓ DRIFT Gap: 55 points (CRITICAL)
✓ FETCH Decision: EXECUTE

━━━ FETCH RESULT ━━━

Chirp:        72 (average of scored dimensions)
DRIFT:        55 (85 − 30)
Confidence:   0.8
FETCH:        72 × 55 × 0.8 = 3,168
Threshold:    1,000
Decision:     🔴 EXECUTE (high priority, ≥ 2 × threshold)

Action Triggered:
🔊 CHIRP [CRITICAL]: Cascade exceeds threshold

Next Steps:
→ Review high-impact entities
→ Prioritize D3 (Revenue): highest dimension score
→ Address execution gap (DRIFT: 55)`
  },
  {
    id: 'full-pipeline',
    title: 'Full Pipeline',
    description: 'Complete CAL workflow from discovery to action',
    category: 'complete',
    code: `# Complete CAL Pipeline Example

# 1. Discover entities
FORAGE entities
  WHERE sound > 6 AND space == 'wide'
ACROSS D1, D2, D3, D5, D6
DEPTH 3
SURFACE cascade_map

# 2. Measure the gap
DRIFT cascade_map
  METHODOLOGY 90
  PERFORMANCE 40

# 3. Decide action
FETCH cascade_map
  THRESHOLD 800
  CONFIDENCE 0.8
ON EXECUTE {
  CHIRP critical "High-impact cascade detected"
  PERCH cascade_map AS "Q1-priorities"
}
ON WAIT {
  CHIRP info "No immediate action needed"
}`,
    output: `✓ FORAGE Complete
  → 8 entities discovered
  → 5 meet criteria (sound>6, space=wide)

✓ Cascade Analysis (dimension scores, 0-100)
  → D1 (Customer): 72
  → D2 (Employee): 58
  → D3 (Revenue): 84
  → D5 (Quality): 66
  → D6 (Operational): 50
  → Chirp: 66 (average of scored dimensions)

✓ DRIFT Measurement
  → Methodology: 90/100 (you know what to do)
  → Performance: 40/100 (you're not doing it)
  → Gap: 50 points (55.6% below target)
  → Status: 🔴 CRITICAL EXECUTION GAP

✓ FETCH Decision: EXECUTE (high priority)
  → FETCH = 66 × 50 × 0.8 = 2,640
  → Threshold 800; 2,640 ≥ 2 × 800

🔊 CHIRP [CRITICAL]: High-impact cascade detected

💾 PERCH: Saved to "Q1-priorities"
   → 5 entities persisted
   → Available for DIVE analysis

━━━ CLOSED-LOOP COMPLETE ━━━
Sense → Analyze → Measure → Decide → Act ✓`
  },
  {
    id: 'uc-342-case',
    title: 'Real Case: UC-342',
    description: 'Published inputs from UC-342, Now the Work Begins',
    category: 'case-study',
    code: `# UC-342: Now the Work Begins (uc-342.stratiqx.com)
# Inputs as published on the case page

DRIFT now_the_work_begins
  METHODOLOGY 88
  PERFORMANCE 42

FETCH now_the_work_begins
  THRESHOLD 1000
  CONFIDENCE 0.78
ON EXECUTE
  SURFACE case_page`,
    output: `━━━ 6D SCORES ━━━
D1 Customer     70
D2 Employee     88
D3 Revenue      not scored
D4 Regulatory   74
D5 Quality      82   ← origin
D6 Operational  76

Cascade: D5 > D2+D6 > D4+D1
Chirp:   (70 + 88 + 74 + 82 + 76) / 5 = 78

━━━ DRIFT ━━━
Methodology 88 − Performance 42 = 46

━━━ FETCH ━━━
78 × 46 × 0.78 = 2,799
Threshold 1,000 → EXECUTE (high priority, ≥ 2,000)

Verdict on the case page is the analyst's own reading.`
  }
]

const selectedExample = ref<Example | null>(null)
const isRunning = ref(false)
const showOutput = ref(false)

const categories = computed(() => {
  const cats = new Set(examples.map(e => e.category))
  return Array.from(cats)
})

function selectExample(example: Example) {
  selectedExample.value = example
  showOutput.value = false
  isRunning.value = false
}

function runCode() {
  if (!selectedExample.value) return

  isRunning.value = true
  showOutput.value = false

  // Simulate execution delay
  setTimeout(() => {
    showOutput.value = true
    isRunning.value = false
  }, 800)
}

function resetPlayground() {
  selectedExample.value = null
  showOutput.value = false
  isRunning.value = false
}

function getCategoryLabel(cat: string): string {
  const labels: Record<string, string> = {
    'basics': 'Basics',
    'analysis': 'Analysis',
    'automation': 'Automation',
    'complete': 'Complete Workflow',
    'case-study': 'Case Study'
  }
  return labels[cat] || cat
}
</script>

<template>
  <div class="playground-container">
    <!-- Example Selection -->
    <div v-if="!selectedExample" class="example-selection">
      <div class="playground-header">
        <h2>🎮 CAL Playground</h2>
        <p>Try CAL syntax with pre-loaded examples</p>
        <div class="coming-soon-badge">
          <span class="badge-icon">🚧</span>
          <span>Live execution coming soon - Currently showing example outputs</span>
        </div>
      </div>

      <div class="examples-grid">
        <div
          v-for="example in examples"
          :key="example.id"
          class="example-card"
          @click="selectExample(example)"
        >
          <div class="example-category">{{ getCategoryLabel(example.category) }}</div>
          <h3>{{ example.title }}</h3>
          <p>{{ example.description }}</p>
          <div class="example-footer">
            <span class="try-button">Try Example →</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Code Editor -->
    <div v-else class="code-playground">
      <div class="playground-toolbar">
        <button class="toolbar-button back" @click="resetPlayground">
          ← Back to Examples
        </button>
        <div class="example-title">
          <h3>{{ selectedExample.title }}</h3>
          <span class="example-desc">{{ selectedExample.description }}</span>
        </div>
        <button
          class="toolbar-button run"
          @click="runCode"
          :disabled="isRunning"
        >
          <span v-if="isRunning">⏳ Running...</span>
          <span v-else>▶ Run Code</span>
        </button>
      </div>

      <div class="editor-container">
        <!-- Code Input -->
        <div class="editor-pane code-pane">
          <div class="pane-header">
            <span class="pane-icon">📝</span>
            <span class="pane-title">CAL Code</span>
          </div>
          <pre class="code-editor"><code>{{ selectedExample.code }}</code></pre>
        </div>

        <!-- Output -->
        <div class="editor-pane output-pane">
          <div class="pane-header">
            <span class="pane-icon">📊</span>
            <span class="pane-title">Output</span>
            <span v-if="!showOutput" class="output-hint">Click "Run Code" to see output</span>
          </div>
          <div v-if="isRunning" class="output-loading">
            <div class="spinner"></div>
            <p>Executing CAL code...</p>
          </div>
          <pre v-else-if="showOutput" class="output-result"><code>{{ selectedExample.output }}</code></pre>
          <div v-else class="output-empty">
            <div class="empty-icon">🎯</div>
            <p>Output will appear here</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.playground-container {
  max-width: 100%;
  margin: 2rem auto;
  padding: 0 1rem;
}

.playground-header {
  text-align: center;
  margin-bottom: 3rem;
}

.playground-header h2 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(120deg, #4a9eff, #64ffda);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.playground-header p {
  font-size: 1.125rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
}

.coming-soon-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--vp-c-yellow-soft);
  color: var(--vp-c-yellow-darker);
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid var(--vp-c-yellow-dimm-1);
}

.badge-icon {
  font-size: 1.125rem;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.example-card {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.example-card:hover {
  border-color: #4a9eff;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(74, 158, 255, 0.2);
}

.example-category {
  display: inline-block;
  background: rgba(74, 158, 255, 0.1);
  color: #4a9eff;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.example-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.example-card p {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.example-footer {
  display: flex;
  justify-content: flex-end;
}

.try-button {
  color: #4a9eff;
  font-weight: 600;
  font-size: 0.875rem;
}

.code-playground {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}

.playground-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: var(--vp-c-bg);
  border-bottom: 2px solid var(--vp-c-divider);
  gap: 1rem;
  flex-wrap: wrap;
}

.toolbar-button {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-size: 0.875rem;
}

.toolbar-button.back {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.toolbar-button.back:hover {
  border-color: #4a9eff;
  color: #4a9eff;
}

.toolbar-button.run {
  background: #4a9eff;
  color: white;
}

.toolbar-button.run:hover:not(:disabled) {
  background: #6eb7ff;
  transform: translateY(-2px);
}

.toolbar-button.run:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.example-title {
  flex: 1;
  min-width: 200px;
}

.example-title h3 {
  margin: 0;
  font-size: 1.125rem;
}

.example-desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.editor-container {
  display: grid;
  grid-template-columns: 2fr 3fr;
  min-height: 600px;
}

.editor-pane {
  display: flex;
  flex-direction: column;
}

.code-pane {
  border-right: 2px solid var(--vp-c-divider);
}

.pane-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  font-weight: 600;
  font-size: 0.875rem;
}

.pane-icon {
  font-size: 1.125rem;
}

.output-hint {
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-weight: 400;
  font-style: italic;
}

.code-editor, .output-result {
  flex: 1;
  margin: 0;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  overflow: auto;
  color: var(--vp-c-text-1);
}

.code-editor code {
  color: var(--vp-c-text-1);
}

.output-result {
  background: #0d1117;
  color: #e6edf3;
}

.output-loading, .output-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-3);
  padding: 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--vp-c-divider);
  border-top-color: #4a9eff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

@media (max-width: 968px) {
  .editor-container {
    grid-template-columns: 1fr;
  }

  .code-pane {
    border-right: none;
    border-bottom: 2px solid var(--vp-c-divider);
  }

  .playground-toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .toolbar-button {
    width: 100%;
  }
}
</style>
