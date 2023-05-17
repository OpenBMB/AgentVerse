from __future__ import annotations

import re
from typing import Union

from langchain.agents import AgentOutputParser
from langchain.schema import AgentAction, AgentFinish

from agentverse.parser import OutputParserError, output_parser_registry


@output_parser_registry.register("nlp_classroom_3players")
class NlpClassroom3PlayersParser(AgentOutputParser):
    def parse(self, text: str) -> Union[AgentAction, AgentFinish]:
        cleaned_output = text.strip()
        cleaned_output = re.sub(r"\n+", "\n", cleaned_output)
        cleaned_output = cleaned_output.split("\n")
        if not (
            len(cleaned_output) == 2
            and cleaned_output[0].startswith("Action:")
            and cleaned_output[1].startswith("Action Input:")
        ):
            raise OutputParserError("Output Format Error")
        action = cleaned_output[0][len("Action:") :].strip()
        action_input = cleaned_output[1][len("Action Input:") :].strip()
        if action in ["Speak", "Listen"]:
            return AgentFinish({"output": action_input}, text)
        else:
            return AgentAction(action, action_input, text)
