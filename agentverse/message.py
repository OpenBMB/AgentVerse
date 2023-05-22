from pydantic import BaseModel, Field
from typing import List, Tuple, Set

# from langchain.schema import AgentAction, ChatMessage
from agentverse.utils import AgentAction


class Message(BaseModel):
    content: str = Field(default="")
    sender: str = Field(default="")
    receiver: Set[str] = Field(default=set({"all"}))
    tool_response: List[Tuple[AgentAction, str]] = Field(default=[])
