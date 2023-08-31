from abc import abstractmethod
from typing import Dict, List

from pydantic import BaseModel, Field

from agentverse.message import Message
from agentverse.memory_manipulator import BaseMemoryManipulator
from . import memory_manipulator_registry

@memory_manipulator_registry.register("basic")
class BasicMemoryManipulator(BaseMemoryManipulator):

    def manipulate_memory(self) -> None:
        pass

    def reset(self) -> None:
        pass
