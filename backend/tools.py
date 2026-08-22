import os
from tavily import TavilyClient
from dotenv import load_dotenv
load_dotenv()
tavily = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

def search_news(query, competitor):
    res = tavily.search(f"{query} {competitor} news", max_results=5)
    return str([r['content'] for r in res['results']])

def search_research(query):
    res = tavily.search(f"{query} research papers", max_results=5)
    return str([r['content'] for r in res['results']])

def search_patents(query, competitor):
    res = tavily.search(f"{query} {competitor} patents", max_results=3)
    return str([r['content'] for r in res['results']])