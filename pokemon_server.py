from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Set
from agentverse.agentverse import AgentVerse
from agentverse.message import Message


class UserRequest(BaseModel):
    content: str = Field(default="")
    sender: str = Field(default="Brendan")
    receiver: str
    receiver_id: int


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent_verse = AgentVerse.from_task("pokemon")


@app.get("/")
def health_check():
    return {"status": "ok"}


@app.post("/chat")
def chat(message: UserRequest):
    content = message.content
    receiver = message.receiver
    receiver_id = message.receiver_id
    response = agent_verse.next(content, receiver, receiver_id)
    return response[0].dict()
