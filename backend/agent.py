import os
from groq import Groq
from dotenv import load_dotenv
from tools import search_news, search_research, search_patents

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def run_agent(query, competitor):
    news = search_news(query, competitor)
    research = search_research(query)
    patents = search_patents(query, competitor)

    prompt = f"""
    Topic: {query}
    Competitor: {competitor}

    NEWS: {news[:3000]}
    RESEARCH: {research[:3000]}
    PATENTS: {patents[:3000]}

    Write a clear summary with:
    1. Key Insights (3 points)
    2. Recent Developments
    3. Competitive Threats
    4. Opportunities
    Keep it short and simple.
    """

    completion = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.6
    )

    return {
        "query": query,
        "competitor": competitor,
        "insights": completion.choices[0].message.content,
        "news": news,
        "research": research,
        "patents": patents
    }