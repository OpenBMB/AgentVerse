from __future__ import annotations

import re
from typing import Union


# from langchain.schema import AgentAction, AgentFinish
from agentverse.utils import AgentAction, AgentFinish

from agentverse.parser import OutputParserError, output_parser_registry
from agentverse.parser import OutputParser
from agentverse.llms.base import LLMResult


@output_parser_registry.register("db_diag")
class DBDiag(OutputParser):
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
        if action in ["Speak"]:
            return AgentFinish({"output": action_input}, text)
        elif action == "CallOn":
            return AgentFinish({"output": "[CallOn] " + action_input}, text)
        elif action == "RaiseHand":
            return AgentFinish({"output": "[RaiseHand] " + action_input}, text)
        elif action == "Listen":
            return AgentFinish({"output": ""}, text)
        else:
            return AgentAction(action.lower(), action_input, text)
