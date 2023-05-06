from typing import List, Tuple

from langchain.schema import AgentAction, ChatMessage


class Message(ChatMessage):
    sender: str
    receiver: List[str]
    tool_response: List[Tuple[AgentAction, str]]
