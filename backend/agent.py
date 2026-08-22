import os
from groq import Groq
from dotenv import load_dotenv
from tools import research_paper_search, patent_search, competitor_news_search, social_and_industry_scan

load_dotenv()
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def run_agent(user_query: str, competitor: str = ""):
    # Step 1: Gather data from all sources in parallel
    research = research_paper_search(user_query)
    patents = patent_search(user_query)
    industry = social_and_industry_scan(user_query)
    comp_data = competitor_news_search(competitor) if competitor else None

    # Step 2: Create context for LLM
    context = f"""
    User Tracking Request: {user_query}
    Competitor: {competitor}

    RESEARCH PAPERS: {str(research)[:3000]}
    PATENTS: {str(patents)[:3000]}
    INDUSTRY NEWS: {str(industry)[:3000]}
    COMPETITOR NEWS: {str(comp_data)[:3000] if comp_data else 'None'}
    """

    # Step 3: Generate actionable insights
    prompt = f"""
    You are a Research & Competitor Tracking Agent.
    Analyze the data and give:
    1. Top 3 Research Trends (concise)
    2. Patent Insights - what competitors are patenting
    3. Competitor Moves - funding, launches
    4. Actionable Opportunities & Threats
    5. Real-time Recommendation

    Data:
    {context}

    Format in clean markdown with emojis.
    Be concise, actionable, real-time focused.
    """

    completion = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7
    )

    insights = completion.choices[0].message.content

    return {
        "query": user_query,
        "competitor": competitor,
        "research": research,
        "patents": patents,
        "industry": industry,
        "competitor_data": comp_data,
        "insights": insights
    }