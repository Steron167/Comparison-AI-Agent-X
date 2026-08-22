from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import run_agent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class TrackRequest(BaseModel):
    query: str
    competitor: str

@app.get("/")
def home():
    return {"status": "Agent Running"}

@app.post("/track")
def track(req: TrackRequest):
    result = run_agent(req.query, req.competitor)
    return result