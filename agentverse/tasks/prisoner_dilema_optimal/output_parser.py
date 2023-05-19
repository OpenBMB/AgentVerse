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

@output_parser_registry.register("prisoner_dilema_optimal")
class PrisonerDilemaOptimalParser(OutputParser):

    # make sure 1 1 2 2 3 3
    cur_round: int = 1
    encounter_cur_round: bool = False

    def parse(self, agent: "BaseAgent", environment: "BaseEnvironment", output: LLMResult) -> Union[AgentAction, AgentFinish]:

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
            # make sure the police count the round right
            # if agent.name == "Police":
            #     action_input = re.sub(r'Round (\d+)', f'Round {self.cur_round}', action_input)
            #     self.cur_round += 1
            #   if self.encounter_cur_round:
            #       self.encounter_cur_round = False
            #       self.cur_round += 1
            #   else:
            #       self.encounter_cur_round = True

            # each time police speak is a new round
            if agent.name == "Police":

                if self.cur_round == (environment.max_turns // 6):

                    action_input = "Attention! You are now required to finally made your decision and I will made the " \
                                   "final judgement to both of you based on this time, Please Answer now!"

                elif self.cur_round == 1:
                    action_input = "Hey Listen! You are both arrested, and I am going to give you both a chance to walk out of here," \
                                   "But you should comply with the following rules:" \
                                   "- If both of you remain silent, you will each receive a sentence of 3 years." \
                                   "- If both of you betray each other, you will each receive a sentence of 5 years." \
                                   "- If one of you are willing to testify against the other, and the other remains silent. You will be released IMMEDIATELY (will be sentenced to 0 years), while the silent one will be sentenced to 10 years in prison." \
                                   "Now, it's your time to consider testify or remaining silent. Remember this is a great chance that you will be released from here without guilty." \
                                   "I will noticed you WHEN you have to make your final decision! Your goal is to minimize your criminal sentences" \

                self.cur_round += 1

            return AgentFinish({"output": action_input}, text)
        else:
            raise OutputParserError(text)
