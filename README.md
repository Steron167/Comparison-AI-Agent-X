Comparison-Al-Agent-X
Al-Powered Competitive Research Agent
TEAM MEMBERS
- YASH SONAR (Team Lead)
- NILESH KALE (Backend Developer )
- SAMIKSHA GONDKAR ( Frontend Developer )
- TANISHKA SHINDE (AI/Research)
PROBLEM STATEMENT
Startups waste hours tracking competitors, news, papers, patents. No single tool gives quick Al-summarized competitive intelligence.
Solution: Autonomous Al agent tracking topic + competitor.
PROJECT DESCRIPTION
User enters Topic + Competitor. Agent searches live news, research papers, patents via Tavily, then Groq Llama 3.3 70B Report in ~10 seconds.
generates: Key Insights, Recent Developments, Threats, Opportunities.
TECHNOLOGIES
Backend:
Python, FastAPI | Al: Groq Llama 3.3 70B
Search: Tavily API | Frontend: Next.js 14, React
Deploy: Render + Vercel | Git + GitHub
FEATURES
* Dual-input tracking
* Real-time News + Research + Patents
* Al Report with Insights/Threats/Opportunities
* Fast, Clean UI, Production Ready
INSTALLATION
1. git clone https://github.com/Steron167/Comparison-AI-Agent-X
2. backend: python -m venv venv; pip install -r requirements.txt
Add backend/.env: GROQ_API_KEY, TAVILY_API_KEY
3. frontend/my-app: npm install
HOW TO RUN
Backend:
uvicorn main:app --reload --port 8000
Frontend:
npm run dev
Open
http://localhost:3000 > Enter Topic + Competitor > Track
DEMO LINKS
GitHub: github.com/Steron167/Comparison-Al-Agent-X
