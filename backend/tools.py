import os
import requests
from dotenv import load_dotenv
load_dotenv()

def search_web(query: str):
    key = os.getenv("TAVILY_API_KEY")
    if not key or key == "anything":
        return f"Mock: Best laptops for {query} - Dell Inspiron 3520 55k, Lenovo Ideapad Slim 3 52k, HP 15s 58k, Acer Aspire 5 54k"

    try:
        r = requests.post(
            "https://api.tavily.com/search",
            json={"api_key": key, "query": query, "max_results": 5}
        )
        data = r.json()
        results = data.get("results", [])
        text = ""
        for res in results:
            text += f"{res.get('title')}: {res.get('content')[:200]} | "
        return text if text else f"No results for {query}"
    except Exception as e:
        return f"Search error {e} - using mock for {query}"