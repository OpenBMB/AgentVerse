from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Set, List, Dict
from agentverse.simulation import Simulation
from agentverse.message import Message


class UserRequest(BaseModel):
    content: str = Field(default="")
    sender: str = Field(default="Brendan")
    receiver: str
    receiver_id: int


class RoutineRequest(BaseModel):
    agent_ids: List[int]


class UpdateRequest(BaseModel):
    agent_locations: Dict[str, str]


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent_verse = Simulation.from_task("pokemon")


@app.get("/")
def health_check():
    return {"status": "ok"}


@app.post("/chat")
def chat(message: UserRequest):
    content = message.content
    receiver = message.receiver
    receiver_id = message.receiver_id
    response = agent_verse.next(
        is_player=True,
        player_content=content,
        receiver=receiver,
        receiver_id=receiver_id,
    )
    return response[0].dict()


@app.post("/make_decision")
def update(message: RoutineRequest):
    response = agent_verse.next(is_player=False, agent_ids=message.agent_ids)
    return [r.dict() for r in response]
    # import json

    # return [
    #     # {
    #     #     "content": json.dumps(
    #     #         {
    #     #             "to": "Maxie",
    #     #             "action": "Speak",
    #     #             "text": "Hello Hello Hello Hello Hello Hello",
    #     #         }
    #     #     )
    #     # }
    #     {"content": json.dumps({"to": "Pokémon Center", "action": "MoveTo"})}
    # ]


@app.post("/update_location")
def update_location(message: UpdateRequest):
    agent_verse.update_state(message.agent_locations)
