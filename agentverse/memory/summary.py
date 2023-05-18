import re
from string import Template
from typing import List

from pydantic import Field, validator

from agentverse.initialization import load_llm
from agentverse.llms.base import BaseLLM
from agentverse.message import Message

from . import memory_registry
from .base import BaseMemory


@memory_registry.register("summary")
class SummaryMemory(BaseMemory):
    llm: BaseLLM
    messages: List[Message] = Field(default=[])
    buffer: str = Field(default="")
    recursive: bool = Field(default=False)
    prompt_template: str = Field(default="")

    def __init__(self, *args, **kwargs):
        llm_config = kwargs.pop("llm")
        llm = load_llm(llm_config)
        super().__init__(llm=llm, *args, **kwargs)

    @validator("prompt_template")
    def check_prompt_template(cls, v, values):
        """Check if the prompt template is valid.
        When recursive is True, the prompt template should contain the following arguments:
        - $summary: The summary so far.
        - $new_lines: The new lines to be added to the summary.

        Otherwise, the prompt template should only contain $new_lines
        """
        recursive = values.get("recursive")
        summary_pat = re.compile(r"\$\{?summary\}?")
        new_lines_pat = re.compile(r"\$\{?new_lines\}?")
        if recursive:
            if not summary_pat.search(v):
                raise ValueError(
                    "When recursive is True, the prompt template should contain $summary."
                )
            if not new_lines_pat.search(v):
                raise ValueError(
                    "When recursive is True, the prompt template should contain $new_lines."
                )
        else:
            if summary_pat.search(v):
                raise ValueError(
                    "When recursive is False, the prompt template should not contain $summary."
                )
            if not new_lines_pat.search(v):
                raise ValueError(
                    "When recursive is False, the prompt template should contain $new_lines."
                )
        return v

    def add_message(self, messages: List[Message]) -> None:
        new_lines = "\n".join([message.content for message in messages])
        self.update_buffer(new_lines)

    def update_buffer(self, new_message: str):
        prompt = self._fill_in_prompt_template(new_message)
        response = self.llm.generate_response(prompt)
        if self.recursive:
            self.buffer = response.content
        else:
            self.buffer = "\n" + response.content

    def _fill_in_prompt_template(self, new_lines: str) -> str:
        """Fill in the prompt template with the given arguments.

        SummaryMemory supports the following arguments:
        - summary: The summary so far.
        - new_lines: The new lines to be added to the summary.
        """
        input_arguments = {"summary": self.buffer, "new_lines": new_lines}
        return Template(self.prompt_template).safe_substitute(input_arguments)

    def to_string(self, *args, **kwargs) -> str:
        return self.buffer

    def reset(self) -> None:
        self.messages = []
        self.buffer = ""
