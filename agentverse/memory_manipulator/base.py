from abc import abstractmethod
from typing import Dict, List

from pydantic import BaseModel, Field

from agentverse.message import Message


class BaseMemoryManipulator(BaseModel):

    @abstractmethod
    def manipulate_memory(self) -> None:
        pass

    @abstractmethod
    def reset(self) -> None:
        pass
