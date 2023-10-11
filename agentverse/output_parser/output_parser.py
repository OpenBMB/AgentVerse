from __future__ import annotations

import re
from abc import abstractmethod
import json
from typing import Union, List, Tuple, NamedTuple, TYPE_CHECKING

from . import output_parser_registry

from agentverse.utils import AgentAction, AgentFinish, AgentCriticism

from agentverse.llms import LLMResult
from agentverse.logging import logger

from pydantic import BaseModel

if TYPE_CHECKING:
    from agentverse.agents.base import BaseAgent
    from agentverse.environments.base import BaseEnvironment

class OutputParserError(Exception):
    """Exception raised when parsing output from a command fails."""

    def __init__(self, message):
        self.message = message

    def __str__(self):
        return "Failed to parse output of the model:%s\n " % self.message


class OutputParser(BaseModel):
    """Base class for output parsers."""

    @abstractmethod
    def parse(self, output: LLMResult) -> NamedTuple:
        pass


@output_parser_registry.register("alice_home")
class AliceHomeParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        text = output.content
        cleaned_output = text.strip()
        cleaned_output = re.sub(r"\n+", "\n", cleaned_output)
        cleaned_output = cleaned_output.split("\n")
        if not (
            len(cleaned_output) == 2
            and cleaned_output[0].startswith("Thought:")
            and cleaned_output[1].startswith("Action:")
        ):
            raise OutputParserError(text)

        action = cleaned_output[1][len("Action:") :].strip()

        return AgentFinish({"output": action}, text)


@output_parser_registry.register("db_diag")
@output_parser_registry.register("nlp_classroom_3players_withtool")
class CommonParser1(OutputParser):
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


@output_parser_registry.register("math_problem_2players_tools")
class MathProblem2PlayersToolsParser(OutputParser):
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
            return AgentAction(action, action_input, text)


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


@output_parser_registry.register("nlp_classroom_9players")
class NlpClassroom9PlayersParser(OutputParser):
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
        elif action == "CallOn":
            return AgentFinish({"output": "[CallOn] " + action_input}, text)
        elif action == "RaiseHand":
            return AgentFinish({"output": "[RaiseHand] " + action_input}, text)
        elif action == "Listen":
            return AgentFinish({"output": ""}, text)
        else:
            return AgentAction(action, action_input, text)


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


@output_parser_registry.register("sde_team/sde_team_2players")
@output_parser_registry.register("sde_team/sde_team_3players")
@output_parser_registry.register("commongen")
@output_parser_registry.register("humaneval-manager")
@output_parser_registry.register("mgsm")
@output_parser_registry.register("dummy")
@output_parser_registry.register("responsegen")
class CommonParser2(OutputParser):
    # def parse(self, agent, env, output: LLMResult) -> Union[AgentAction, AgentFinish]:
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        return AgentFinish({"output": output.content}, output.content)


@output_parser_registry.register("role_assigner")
class RoleAssignerParser(OutputParser):
    cnt_critic_agents: int = 0

    def parse(self, output: LLMResult) -> List[str]:
        text = output.content
        pattern = re.compile(r"\d\.\s*(.+)")
        roles = pattern.findall(text)
        if len(roles) < self.cnt_critic_agents:
            logger.error(
                f"Role assigner failed to assign roles to {self.cnt_critic_agents} critics!"
            )
            raise OutputParserError(text)
        return roles


@output_parser_registry.register("evaluator")
class EvaluatorParser(OutputParser):
    dimensions: List[str] = None

    def parse(self, output: LLMResult) -> Tuple[List[int], str]:
        text = output.content
        cleaned_output = re.sub(r"\n+", "\n", text.strip())
        checks = cleaned_output.split("\n")
        patterns = [
            re.compile(r"(?:\d\.\s*)?" + dimension + r":\s*(\d)")
            for dimension in self.dimensions
        ]
        try:
            # find score and advice
            score = [
                int(pattern.findall(checks[i])[0]) for i, pattern in enumerate(patterns)
            ]
            advice_text = "".join(checks[len(self.dimensions) :])
            advice = re.findall(r"(?:\d\.\s*)?Advice:\s*(.+)", advice_text)[0]
            # logger.info("Evaluator give the following advice:\n" + advice)
        except (IndexError, ValueError):
            # logger.error("Bad response from evaluator!")
            raise OutputParserError(text)
        return score, advice


@output_parser_registry.register("humaneval-solver")
class HumanevalSolverParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        text = output.content
        # start_pos = text.find("```")
        # end_pos = text.rfind("```")
        # if end_pos == -1:
        #     raise OutputParserError(text)
        # text = text[start_pos:end_pos]
        # cleaned_output = text.strip().strip("```").strip()
        # if cleaned_output.startswith("python"):
        #     cleaned_output = cleaned_output[6:].strip()
        # elif cleaned_output.startswith("python3"):
        #     cleaned_output = cleaned_output[7:].strip()
        code = re.findall(r"```.*?\n(.+?)```", text, re.DOTALL)[-1]

        return AgentFinish({"output": code}, text)


@output_parser_registry.register("humaneval-executor")
class HumanevalSolverParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        text = output.content
        try:
            parsed_result = re.findall(
                r"Thought:(.+?)Reasoning:(.+?)Criticism:(.+?)File Path:(.+?)Code:(.+?)Command:(.+)",
                text,
                re.DOTALL,
            )[0]
            cleaned_output = {
                "thought": parsed_result[0].strip(),
                "reasoning": parsed_result[1].strip(),
                "criticism": parsed_result[2].strip(),
                "file_path": parsed_result[3].strip().strip("`"),
                "code": parsed_result[4]
                .strip()
                .strip("```")
                .strip("python")
                .strip("python3"),
                "command": parsed_result[5].strip().strip("`"),
            }
        except BaseException as e:
            raise OutputParserError(text)

        return AgentFinish({"output": cleaned_output}, text)


@output_parser_registry.register("humaneval-evaluator")
class HumanevalEvaluatorParser(OutputParser):
    dimensions: List[str] = None

    def parse(self, output: LLMResult) -> Tuple[List[int], str]:
        text = output.content
        cleaned_output = re.sub(r"\n+", "\n", text.strip())
        checks = cleaned_output.split("\n")

        patterns = [
            re.compile(r"(?:\d.\s*)?" + dimension + r":\s*(\d)")
            for dimension in self.dimensions
        ]

        advice = ""
        for check in reversed(checks):
            advice = check + advice
            if check.startswith("Advice:"):
                break
        checks[-1] = advice
        try:
            # find score and advice
            score = []
            for pattern in patterns:
                for check in checks[:-1]:
                    if pattern.findall(check):
                        score.append(bool(int(pattern.findall(check)[0])))
                        break
            advice = re.findall(r"(?:\d.\s*)?Advice:\s*(.+)", checks[-1])[0]
            # logger.info("Evaluator give the following advice:\n" + advice)
        except (IndexError, ValueError):
            # logger.error("Bad response from evaluator!")
            raise OutputParserError(text)
        return score[0], advice


@output_parser_registry.register("humaneval-critic-agree")
class HumanevalyCriticParser(OutputParser):
    def parse(self, output: LLMResult) -> AgentCriticism:
        text = output.content
        if "[Agree]" in text:
            return AgentCriticism(True, "")
        else:
            return AgentCriticism(False, text)


@output_parser_registry.register("mgsm-evaluator")
class MGSMEvaluatorParser(OutputParser):
    dimensions: List[str] = None

    def parse(self, output: LLMResult) -> Tuple[List[int], str]:
        text = output.content
        cleaned_output = re.sub(r"\n+", "\n", text.strip())
        # checks = cleaned_output.split("\n")

        patterns = [
            re.compile(r"(?:\d.\s*)?" + dimension + r":\s*(\d)")
            for dimension in self.dimensions
        ]
        try:
            # find score and advice
            score_num = [
                int(pattern.findall(cleaned_output)[0])
                for i, pattern in enumerate(patterns)
            ][0]
            if score_num == 0:
                score = False
            elif score_num == 1:
                score = True
            else:
                raise ValueError("Bad score!")
            pat = re.compile(r"(?:\d.\s*)?Response:\s*(.+)", re.DOTALL)
            advice = pat.findall(cleaned_output)[0]
            # logger.info("Evaluator give the following advice:\n" + advice)
        except (IndexError, ValueError):
            # logger.error("Bad response from evaluator!")
            raise OutputParserError(text)
        return score, advice


@output_parser_registry.register("mgsm-critic-agree")
class MGSMCriticAgreeParser(OutputParser):
    def parse(self, output: LLMResult) -> AgentCriticism:
        text = output.content
        text = re.sub(r"\n+", "\n", text.strip())
        # checks = text.split("\n")
        # if not text.startswith("Thought:"):
        #     raise OutputParserError(text)
        # if not (checks[0].startswith("Action:")):
        #     raise OutputParserError(text)
        # if checks[0].strip(". ") == "Action: Agree":
        #     return AgentCriticism(True, "")
        if "[Agree]" in text:
            return AgentCriticism(True, "")
        else:
            # pattern = re.compile(r"Action Input: ([\S\n ]+)")
            # try:
            # criticism = pattern.findall(text)[0].strip()
            # criticism = (
            #     re.findall(r"Output:\S?(.+)", text)[0].replace("[Wrong]", "")
            # ).strip()
            criticism = text.replace("[Disagree]", "").strip()
            # except IndexError:
            # logger.error("Bad response from critic!")
            # raise OutputParserError(text)
            # criticism = "I think the solution is not correct. Please think carefully and correct it."
            return AgentCriticism(False, criticism)
        # else:
        #     raise OutputParserError(text)


@output_parser_registry.register("responsegen-evaluator")
class ResponseGenEvaluatorParser(OutputParser):
    dimensions: List[str] = None

    def parse(self, output: LLMResult) -> Tuple[List[int], str]:
        text = output.content
        cleaned_output = re.sub(r"\n+", "\n", text.strip())
        checks = cleaned_output.split("\n")

        patterns = [
            re.compile(r"(?:\d.\s*)?" + dimension + r":\s*(\d+)")
            for dimension in self.dimensions
        ]

        advice = ""
        for check in reversed(checks):
            advice = check + advice
            if check.startswith("Advice:"):
                break
        checks[-1] = advice
        try:
            # find score and advice
            score = [
                int(pattern.findall(checks[i])[0]) for i, pattern in enumerate(patterns)
            ]
            advice = re.findall(r"(?:\d.\s*)?Advice:\s*(.+)", checks[-1])[0]
            # logger.info("Evaluator give the following advice:\n" + advice)
        except (IndexError, ValueError):
            # logger.error("Bad response from evaluator!")
            raise OutputParserError(text)
        return score, advice


@output_parser_registry.register("responsegen-critic")
@output_parser_registry.register("critic")
class CommonParser3(OutputParser):
    def parse(self, output: LLMResult) -> AgentCriticism:
        text = output.content
        text = re.sub(r"\n+", "\n", text.strip())
        checks = text.split("\n")
        if not (checks[0].startswith("Action:")):
            raise OutputParserError(text)
        if checks[0].strip(". ") == "Action: Agree":
            return AgentCriticism(True, "")
        elif checks[0].strip(". ") == "Action: Disagree":
            pattern = re.compile(r"Action Input: ([\S\n ]+)")
            try:
                criticism = pattern.findall(text)[0].strip()
            except IndexError:
                criticism = (
                    "I think it is not correct. Please think carefully and improve it."
                )
                # raise OutputParserError(text)
            return AgentCriticism(False, criticism)
        else:
            raise OutputParserError(text)


@output_parser_registry.register("responsegen-critic-2")
class ResponseGenCriticParser(OutputParser):
    def parse(self, output: LLMResult) -> AgentCriticism:
        text = output.content
        # text = re.sub(r"\n+", "\n", text.strip())
        # checks = text.split("\n")
        # if not (checks[0].startswith("Action:")):
        #     raise OutputParserError(text)
        # if checks[0].strip(". ") == "Action: Agree":
        #     return AgentCriticism(True, "")
        # elif checks[0].strip(". ") == "Action: Disagree":
        #     pattern = re.compile(r"Action Input: ([\S\n ]+)")
        #     try:
        #         criticism = pattern.findall(text)[0].strip()
        #     except IndexError:
        #         # criticism = "I think the solution is not correct. Please think carefully and correct it."
        #         raise OutputParserError(text)
        #     return AgentCriticism(False, criticism)
        # else:
        #     raise OutputParserError(text)
        result = re.findall(r"Decision:(.+?)Response:(.+)", text, re.DOTALL)
        if len(result) == 0:
            result = ["Disagree", "I think the response can be further improved."]
        else:
            result = result[0]
        if "Agree" in result[0]:
            return AgentCriticism(True, "")
        else:
            return AgentCriticism(False, result[1].strip())


@output_parser_registry.register("role-description-name-assigner")
class RoleAssignerParser(OutputParser):
    cnt_critic_agents: int = 0

    def parse(self, output: LLMResult) -> List[str]:
        text = output.content
        pattern = re.compile(r"\d+?\.\s*(.+?) - (.+)")
        roles = pattern.findall(text)
        if len(roles) < self.cnt_critic_agents:
            logger.error(
                f"Role assigner failed to assign roles to {self.cnt_critic_agents} critics!"
            )
            raise OutputParserError(text)
        res = []
        for role in roles:
            res.append({"name": role[0], "description": role[1]})
        return res


@output_parser_registry.register("tool-using-solver")
class SolverParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        text = output.content
        pattern = re.compile(r"\d+?\.\s*(.+?) - (.+)")
        tasks = pattern.findall(text)
        if len(tasks) == 0:
            raise OutputParserError(text)
        return AgentFinish({"output": tasks}, text)


@output_parser_registry.register("tool-using-executor")
class ToolUsingSolverParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        if output.function_name != "":
            return AgentAction(
                tool=output.function_name,
                tool_input=output.function_arguments,
                log=output.content,
            )
        else:
            return AgentFinish({"output": output.content}, output.content)


@output_parser_registry.register("tool-using-evaluator")
class HumanevalEvaluatorParser(OutputParser):
    def parse(self, output: LLMResult) -> Tuple[List[int], str]:
        text = output.content
        try:
            result = re.findall(r"Status:(.+?)Speak:(.+)", text, re.DOTALL)[0]
            score = bool(int(result[0]))
            words = result[1].strip()
        except (IndexError, ValueError):
            # logger.error("Bad response from evaluator!")
            raise OutputParserError(text)
        return score, words
