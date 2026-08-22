from groq import Groq
import os
from tools import search_web
from dotenv import load_dotenv
load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def run_agent(user_goal: str):
    logs = []
    try:
        plan_res = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[{"role": "system", "content": "You are laptop expert."}, {"role": "user", "content": f"Goal: {user_goal}. Make plan."}]
        )
        plan = plan_res.choices[0].message.content
        logs.append(f"🧠 PLAN: {plan}")
        search_result = search_web(user_goal)
        logs.append(f"🔧 Searched: {user_goal}")
        logs.append(f"👀 Found: {search_result[:300]}")
        final = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[{"role": "system", "content": "Give top 3 laptops in table."}, {"role": "user", "content": f"Goal:{user_goal} Search:{search_result}"}]
        )
        return {"logs": logs, "answer": final.choices[0].message.content}
    except Exception as e:
        return {"logs": [f"ERROR: {e} - Check your GROQ key in.env file! Current key: {os.getenv('GROQ_API_KEY')[:10]}..."], "answer": f"Error: {e}"}