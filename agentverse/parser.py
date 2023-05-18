from agentverse.registry import Registry
from typing import NamedTuple
from abc import abstractmethod
from agentverse.llms.base import LLMResult
from pydantic import BaseModel

output_parser_registry = Registry(name="OutputParserRegistry")


class OutputParserError(Exception):
    """Exception raised when parsing output from a command fails."""

    def __init__(self, message):
        self.message = message

    def __str__(self):
        return "Failed to parse output of the model:%s\n " % self.message


class OutputParser(BaseModel):
    """Base class for output parsers."""

    @abstractmethod
    def parse(self, output: LLMResult) -> NamedTuple:
        pass
