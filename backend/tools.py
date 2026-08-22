from tavily import TavilyClient
import os
from dotenv import load_dotenv

load_dotenv()
client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

def research_paper_search(query: str):
    """Search latest research papers"""
    try:
        result = client.search(
            query=f"{query} research paper arxiv semantic scholar",
            search_depth="advanced",
            max_results=5,
            include_answer=True
        )
        return {"type": "research", "data": result}
    except Exception as e:
        return {"error": str(e)}

def patent_search(query: str):
    """Search recent patents"""
    try:
        result = client.search(
            query=f"{query} patent filing",
            include_domains=["patents.google.com", "uspto.gov"],
            max_results=5
        )
        return {"type": "patents", "data": result}
    except Exception as e:
        return {"error": str(e)}

def competitor_news_search(company: str):
    """Track competitor news, funding, launches"""
    try:
        result = client.search(
            query=f"{company} funding launch news announcement",
            topic="news",
            max_results=5,
            time_range="week"
        )
        return {"type": "competitor", "company": company, "data": result}
    except Exception as e:
        return {"error": str(e)}

def social_and_industry_scan(query: str):
    """Scan industry news + social buzz"""
    try:
        result = client.search(
            query=f"{query} industry trends 2026",
            max_results=5,
            include_answer=True
        )
        return {"type": "industry", "data": result}
    except Exception as e:
        return {"error": str(e)}