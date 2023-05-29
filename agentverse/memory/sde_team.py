import re
from string import Template
from typing import List

from pydantic import Field, validator

from agentverse.initialization import load_llm
from agentverse.llms.base import BaseLLM
from agentverse.message import Message

from . import memory_registry
from .base import BaseMemory


@memory_registry.register("sde_team")
class SdeTeamMemory(BaseMemory):
    """SdeTeamMemory is a memory for SdeTeamEnvironment.
    It is a simple memory that only stores the most recent info in the buffer.
    TODO: add summarized history
    """
    buffer: str = Field(default="")

    def add_message(self, messages: List[Message]) -> None:
        new_lines = "\n".join([message.content for message in messages])
        if messages[0].sender == "code_writer":
            self.buffer = new_lines
        elif messages[0].sender == "code_tester":
            self.buffer += "\n\n"
            self.buffer += new_lines
        elif messages[0].sender == "code_reviewer":
            self.buffer += "\n\n"
            self.buffer += new_lines

    def to_string(self, *args, **kwargs) -> str:
        return self.buffer

    def reset(self) -> None:
        self.buffer = ""
