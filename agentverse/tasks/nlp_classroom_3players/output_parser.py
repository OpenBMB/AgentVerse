from __future__ import annotations

import re
from typing import Union

from agentverse.parser import OutputParser, LLMResult

from agentverse.utils import AgentAction, AgentFinish

from agentverse.parser import OutputParserError, output_parser_registry


@output_parser_registry.register("nlp_classroom_3players")
class NlpClassroom3PlayersParser(OutputParser):
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
        else:
            raise OutputParserError(text)
