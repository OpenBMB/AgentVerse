from __future__ import annotations

import re
import json
from typing import Union

from agentverse.parser import OutputParser, LLMResult

# from langchain.schema import AgentAction, AgentFinish
from agentverse.utils import AgentAction, AgentFinish

from agentverse.parser import OutputParserError, output_parser_registry


@output_parser_registry.register("pokemon")
class PokemonParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        text = output.content
        cleaned_output = text.strip()
        cleaned_output = re.sub(r"\n+", "\n", cleaned_output)
        cleaned_output = cleaned_output.split("\n")
        if not (
            len(cleaned_output) == 3
            and cleaned_output[0].startswith("Thought:")
            and cleaned_output[1].startswith("Action:")
            and cleaned_output[2].startswith("Action Input:")
        ):
            raise OutputParserError(text)
        action = cleaned_output[1][len("Action:") :].strip()
        action_input = cleaned_output[2][len("Action Input:") :].strip()
        try:
            action_input = json.loads(action_input)
        except json.JSONDecodeError:
            raise OutputParserError(text)
        action_input["action"] = action
        return AgentFinish({"output": json.dumps(action_input)}, text)
