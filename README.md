Skip to content
Steron167
AI-SECOND-BRAIN
Repository navigation
Code
Issues
Pull requests
Agents
Actions
Projects
Wiki
Security and quality
Insights
Settings
Files
Go to file
t
T
app
lib
public
.gitignore
AGENTS.md
CLAUDE.md
README.md
eslint.config.mjs
next.config.ts
package-lock.json
package.json
postcss.config.mjs
tsconfig.json
AI-SECOND-BRAIN
/
README.md
in
main

Edit

Preview
Indent mode

Spaces
Indent size

2
Line wrap mode

Soft wrap
Editing README.md file contents
  1
  2
  3
  4
  5
  6
  7
  8
  9
 10
 11
 12
 13
 14
 15
 16
 17
 18
 19
 20
 21
 22
 23
 24
 25
 26
 27
 28
 29
 30
 31
 32
 33
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 CHRONICLE — AI Second Brain with Multi-Agent Memory | InfraBot Startup Memory System built with Next.js, Groq Llama-3.3 & Vercel. Short-Term (RAM) + Long-Term (Vault) architecture.

TEAM MEMBERS
- YASH SONAR (Team Lead)
- NILESH KALE (Backend Developer )
- SAMIKSHA GONDKAR ( Frontend Developer )
- TANISHKA SHINDE (AI/Research)

  # AI Second Brain - Research Intelligence

> Agentic Research System with Dual Memory, ReAct Reasoning, Tool Resilience & Task 6 Evaluation

**Live:** https://ai-second-brain-nu.vercel.app 

**Evaluation Dashboard:** https://ai-second-brain-nu.vercel.app/evaluation

**TRACING AND OBSERVIBLITY** https://ai-second-brain-nu.vercel.app/tracing


---

## Tasks Covered (1-8)

### Task 1 - Core Architecture
- Next.js 14 App Router, Vercel deployed
- `app/api/chat/route.ts` - Main orchestrator
- Streaming research flow: Planner → Recaller → Researcher → Resolver → Evaluator → Librarian

### Task 2 - Agentic Capabilities
**6 Agents in Left Sidebar:**
1.  **Planner Agent:** Parses `TOPIC_A vs TOPIC_B` → creates research plan
2.  **Recaller Agent:** Searches long-term memory (vaultTool)
3.  **Researcher Agent x2:** Parallel tool calls - `web_search` (Tavily) + `fallback` evidence
4.  **Resolver Agent:** Resolves contradictions (e.g. Spot $10 vs $74k) with evidence citation
5.  **Evaluator Agent:** Confidence (0-1), retries, groundedness, hallucination check
6.  **Librarian Agent:** Stores insight to memory graph

**ReAct Format enforced in every agent log:**


### Task 3 - Memory Architecture
- **Short-term (5/5):** `localStorage` rolling window, visible in Memory Graph
- **Long-term (10 slots):** Persistent vault, survives refresh, `CLEAR` to wipe
- **Recaller:** Before research, checks if topic exists in memory → reuses or researches
- Fixes hardcode bug: No more `AYURVEDA` always, dynamic topic from planner

### Task 4 - Tooling & Resilience
- `web_search`: Tavily API with retry (429 → exponential backoff)
- `vaultTool`: Memory read/write with failure simulation `[SIMULATE 429]`
- Fallback evidence when web_search fails
- Metrics: `RETRIES` counter tracks tool recovery
Use Control + Shift + m to toggle the tab key moving focus. Alternatively, use esc then tab to move to the next interactive element on the page.
No file chosen
Attach files by dragging & dropping, selecting or pasting them.
 
