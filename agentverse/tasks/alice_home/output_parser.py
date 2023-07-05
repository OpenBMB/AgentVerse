from __future__ import annotations

import re
from typing import Union

from agentverse.parser import OutputParser, LLMResult

from agentverse.utils import AgentAction, AgentFinish

from agentverse.parser import OutputParserError, output_parser_registry


@output_parser_registry.register("alice_home")
class AliceHomeParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        text = output.content
        cleaned_output = text.strip()
        cleaned_output = re.sub(r"\n+", "\n", cleaned_output)
        cleaned_output = cleaned_output.split("\n")
        if not (
            len(cleaned_output) == 2
            and cleaned_output[0].startswith("Thought:")
            and cleaned_output[1].startswith("Action:")
        ):
            raise OutputParserError(text)

        action = cleaned_output[1][len("Action:"):].strip()

        return AgentFinish({"output": action}, text)
