from __future__ import annotations

import re
from typing import Union, TYPE_CHECKING

# from langchain.agents import AgentOutputParser
from agentverse.parser import OutputParser, LLMResult
from langchain.schema import AgentAction, AgentFinish
from agentverse.parser import OutputParserError, output_parser_registry

if TYPE_CHECKING:
    from agentverse.agents.base import BaseAgent
    from agentverse.environments.base import BaseEnvironment

@output_parser_registry.register("prisoner_dilema/base")
class PrisonerDilemaParser(OutputParser):

    # make sure 1 1 2 2 3 3
    cur_round: int = 1
    encounter_cur_round: bool = False

    def parse(self, agent: BaseAgent, environment: BaseEnvironment, output: LLMResult) -> Union[AgentAction, AgentFinish]:

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
            
            if agent.name == "Police":

                if environment.cnt_turn == (environment.max_turns - 4):

                    action_input = "Attention! You are now required to made your final decision and I will made the " \
                                   "final judgement to both of you based on this time, Please Answer now !"

                elif environment.cnt_turn == (environment.max_turns - 2):

                    action_input = "Attention! Suspect2, it's now your time to make your final decision, Please Answer now !"

                self.cur_round += 1

            return AgentFinish({"output": action_input}, text)
        else:
            raise OutputParserError(text)
