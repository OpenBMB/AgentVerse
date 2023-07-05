from __future__ import annotations

import re
from typing import Union

from agentverse.utils import AgentAction, AgentFinish

from agentverse.parser import OutputParserError, output_parser_registry, OutputParser
from agentverse.llms import LLMResult


@output_parser_registry.register("nlp_classroom_9players_group")
class NlpClassroom9PlayersGroupParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        text = output.content
        cleaned_output = text.strip()
        cleaned_output = re.sub(r"\n+", "\n", cleaned_output)
        cleaned_output = cleaned_output.split("\n")
        if not (
            len(cleaned_output) == 2
            and cleaned_output[0].startswith("Action:")
            and cleaned_output[1].startswith("Action Input:")
        ):
            raise OutputParserError(text)
        action = cleaned_output[0][len("Action:") :].strip()
        action_input = cleaned_output[1][len("Action Input:") :].strip()
        if action == "Speak":
            return AgentFinish({"output": action_input}, text)
        elif action in ["CallOn", "RaiseHand", "GroupDiscuss"]:
            return AgentFinish({"output": f"[{action}] {action_input}"}, text)
        elif action == "Listen":
            return AgentFinish({"output": ""}, text)
        else:
            return AgentAction(action, action_input, text)
