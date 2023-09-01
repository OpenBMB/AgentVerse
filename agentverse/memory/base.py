from abc import abstractmethod
from typing import Dict, List

from pydantic import BaseModel, Field

from agentverse.message import Message


class BaseMemory(BaseModel):
    @abstractmethod
    def add_message(self, messages: List[Message]) -> None:
        pass

    @abstractmethod
    def to_string(self) -> str:
        pass

    @abstractmethod
    def reset(self) -> None:
        pass

    def to_messages(self) -> List[dict]:
        pass
