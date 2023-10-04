from pydantic import BaseModel, Field
from typing import List, Tuple, Set, Union, Any

from agentverse.utils import AgentAction


class Message(BaseModel):
    content: Any = Field(default="")
    sender: str = Field(default="")
    receiver: Set[str] = Field(default=set({"all"}))
    sender_agent: object = Field(default=None)
    tool_response: List[Tuple[AgentAction, str]] = Field(default=[])


class SolverMessage(Message):
    pass


class CriticMessage(Message):
    is_agree: bool
    criticism: str = ""


class ExecutorMessage(Message):
    tool_name: str = Field(default="")
    tool_input: Any = None


class EvaluatorMessage(Message):
    score: Union[bool, List[bool], int, List[int]]
    advice: str = Field(default="")


class RoleAssignerMessage(Message):
    pass
