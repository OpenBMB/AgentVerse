from pydantic import BaseModel, Field
from typing import List, Dict
from agentverse.message import Message
from abc import abstractmethod


class BaseMemory(BaseModel):
    @abstractmethod
    def add_message(self, message: Message) -> None:
        pass

    @abstractmethod
    def to_string(self) -> str:
        pass

    @abstractmethod
    def reset(self) -> None:
        pass
