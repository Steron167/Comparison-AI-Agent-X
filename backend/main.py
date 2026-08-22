from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import run_agent
import os

app = FastAPI(title="Research & Competitor Tracking Agent")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TrackRequest(BaseModel):
    query: str
    competitor: str = ""

@app.get("/")
def home():
    return {"status": "Agent Live", "theme": "Research & Competitor Tracking"}

@app.post("/track")
def track(req: TrackRequest):
    result = run_agent(req.query, req.competitor)
    return result

@app.get("/health")
def health():
    return {"status": "ok"}
