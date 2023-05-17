from .base import BaseMemory
from typing import List
from pydantic import Field
from agentverse.message import Message


class ChatHistoryMemory(BaseMemory):
    messages: List[Message] = Field(default=[])

    def add_message(self, message: Message) -> None:
        self.messages.append(message)

    def to_string(self, add_sender_prefix: bool = False) -> str:
        if add_sender_prefix:
            return "\n".join(
                [
                    f"[{message.sender}]: {message.content}"
                    if message.sender != ""
                    else message.content
                    for message in self.messages
                ]
            )
        else:
            return "\n".join([message.content for message in self.messages])

    def reset(self) -> None:
        self.messages = []
