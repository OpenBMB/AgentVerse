from __future__ import annotations

import re
import json
from typing import Union

from agentverse.parser import OutputParser, LLMResult

from agentverse.utils import AgentAction, AgentFinish

from agentverse.parser import OutputParserError, output_parser_registry


@output_parser_registry.register("minecraft")
class Minecraft2PlayersParser(OutputParser):
    def parse(self, output: LLMResult, status: str) -> Union[AgentAction, AgentFinish]:
        # if status == "discussion":
        text = output.content
        cleaned_output = text.strip()
        # elif status == "summarization":
        #     text = output.content
        #     cleaned_output = text.strip()
        #     first_bracket = cleaned_output.find("[")
        #     last_bracket = cleaned_output.rfind("]")
        #     cleaned_output = json.loads(
        #         cleaned_output[first_bracket : last_bracket + 1]
        #     )
        return AgentFinish({"output": cleaned_output}, text)
