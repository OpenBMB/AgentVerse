from __future__ import annotations

import re
from typing import Union

from agentverse.parser import OutputParserError, output_parser_registry, OutputParser
from agentverse.llms.base import LLMResult
from agentverse.utils import AgentAction, AgentFinish


@output_parser_registry.register("math_problem_2players_tools")
class MathProblem2PlayersToolsParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        text = output.content
        cleaned_output = text.strip()
        cleaned_output = re.sub(r"\n+", "\n", cleaned_output)
        cleaned_output = cleaned_output.split("\n")
        if not (
            len(cleaned_output) == 2
            and
            # cleaned_output[0].startswith("THOUGHT:") and
            cleaned_output[0].startswith("ACTION:")
            and cleaned_output[1].startswith("ACTION INPUT:")
        ):
            print(text)
            raise OutputParserError("Output Format Error")
        action = cleaned_output[0][len("ACTION:") :].strip()
        action_input = cleaned_output[1][len("ACTION INPUT:") :].strip()
        if action == "Speak":
            return AgentFinish({"output": action_input}, text)
        else:
            return AgentAction(action, action_input, text)
