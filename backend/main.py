from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import run_agent
import traceback

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

class GoalRequest(BaseModel):
    goal: str

@app.get("/")
def home():
    return {"status": "Agent is Live"}

@app.post("/solve")
def solve(req: GoalRequest):
    try:
        result = run_agent(req.goal)
        return result
    except Exception as e:
        print(traceback.format_exc())
        return {"logs": [f"ERROR: {str(e)}\n{traceback.format_exc()}"], "answer": f"Backend Error: {e}"}
