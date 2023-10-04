from __future__ import annotations

import re
from typing import Union, TYPE_CHECKING

# from langchain.agents import AgentOutputParser
from agentverse.parser import OutputParser, LLMResult
#from langchain.schema import AgentAction, AgentFinish
from agentverse.utils import AgentAction, AgentFinish
from agentverse.parser import OutputParserError, output_parser_registry

if TYPE_CHECKING:
    from agentverse.agents.base import BaseAgent
    from agentverse.environments.base import BaseEnvironment


@output_parser_registry.register("prisoner_dilemma")
class PrisonerDilemmaParser(OutputParser):
    # make sure 1 1 2 2 3 3
    cur_round: int = 1
    encounter_cur_round: bool = False

    def parse(
        self, agent: "BaseAgent", environment: "BaseEnvironment", output: LLMResult
    ) -> Union[AgentAction, AgentFinish]:
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
                if environment.cnt_turn == (environment.max_turns - 4):
                    action_input = (
                        "Attention! You are now required to made your final decision and I will made the "
                        "final judgement to both of you based on this time, Please Answer now !"
                    )

                elif environment.cnt_turn == (environment.max_turns - 2):
                    action_input = "Attention! Suspect2, it's now your time to make your final decision, Please Answer now !"

                # elif self.cur_round == 1:
                #     action_input = "Hey Listen! You are both arrested, and I am going to give you both a chance to walk out of here," \
                #                    "But you should comply with the following rules:" \
                #                    "- If one of you are willing to testifies against the other and the other one remains silent, then the one who testifies will be released IMMEDIATELY, while the silent one will be sentenced to TEN years in prison." \
                #                    "- If both of you remain silent, you will each receive a sentence of ONE year in prison." \
                #                    "- It seems that always testifying is a goog strategy, So! if you both choose to testify against each other, you will each receive a sentence of FIVE years in prison." \
                #                    "Now, it's your time to consider testifying or remaining silent. Remember this is a best chance you might ever have to walk out of here without guilty." \
                #                    "I will noticed both of you WHEN you have to make your final decision! Before that, try to make your best!" \

                self.cur_round += 1

            return AgentFinish({"output": action_input}, text)
        else:
            raise OutputParserError(text)
