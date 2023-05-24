import logging
from abc import abstractmethod
from typing import List, NamedTuple, Set, Union

from pydantic import BaseModel, Field

from agentverse.llms import BaseLLM
from agentverse.memory import BaseMemory, ChatHistoryMemory
from agentverse.message import Message
from agentverse.parser import OutputParser


class BaseAgent(BaseModel):
    name: str
    llm: BaseLLM
    output_parser: OutputParser
    prompt_template: str
    role_description: str = Field(default="")
    memory: BaseMemory = Field(default_factory=ChatHistoryMemory)
    max_retry: int = Field(default=3)
    receiver: Set[str] = Field(default=set({"all"}))
    async_mode: bool = Field(default=True)

    @abstractmethod
    def step(self, env_description: str = "") -> Message:
        """Get one step response"""
        pass

    @abstractmethod
    def astep(self, env_description: str = "") -> Message:
        """Asynchronous version of step"""
        pass

    @abstractmethod
    def reset(self) -> None:
        """Reset the agent"""
        pass

    @abstractmethod
    def add_message_to_memory(self, messages: List[Message]) -> None:
        """Add a message to the memory"""
        pass

    def get_receiver(self) -> Set[str]:
        return self.receiver

    def set_receiver(self, receiver: Union[Set[str], str]) -> None:
        if isinstance(receiver, str):
            self.receiver = set({receiver})
        elif isinstance(receiver, set):
            self.receiver = receiver
        else:
            raise ValueError(
                "input argument `receiver` must be a string or a set of string"
            )

    def add_receiver(self, receiver: Union[Set[str], str]) -> None:
        if isinstance(receiver, str):
            self.receiver.add(receiver)
        elif isinstance(receiver, set):
            self.receiver = self.receiver.union(receiver)
        else:
            raise ValueError(
                "input argument `receiver` must be a string or a set of string"
            )

    def remove_receiver(self, receiver: Union[Set[str], str]) -> None:
        if isinstance(receiver, str):
            try:
                self.receiver.remove(receiver)
            except KeyError as e:
                logging.warning(f"Receiver {receiver} not found.")
        elif isinstance(receiver, set):
            self.receiver = self.receiver.difference(receiver)
        else:
            raise ValueError(
                "input argument `receiver` must be a string or a set of string"
            )
