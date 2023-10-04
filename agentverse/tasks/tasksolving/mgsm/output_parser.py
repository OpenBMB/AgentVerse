from __future__ import annotations

import re
from typing import Union, List, Tuple

from agentverse.utils import AgentAction, AgentFinish, AgentCriticism

from agentverse.parser import OutputParserError, output_parser_registry, OutputParser
from agentverse.llms import LLMResult
from agentverse.logging import get_logger


logger = get_logger()


@output_parser_registry.register("mgsm")
class MGSMParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        return AgentFinish({"output": output.content}, output.content)


@output_parser_registry.register("mgsm-solver-autogpt")
class MGSMSolverParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        text = output.content
        try:
            parsed_result = re.findall(
                r"Thought:(.+?)Reasoning:(.+?)Criticism:(.+?)Solution:(.+)",
                text,
                re.DOTALL,
            )[0]
        except BaseException as e:
            raise OutputParserError(text)
        return AgentFinish({"output": re.sub(r"\n+", "\n", text.strip())}, text)


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


@output_parser_registry.register("mgsm-evaluator-autogpt")
class MGSMCriticParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        text = output.content
        try:
            parsed_result = re.findall(
                r"Thought:(.+?)Reasoning:(.+?)Criticism:(.+?)Speak:(.+?)Correctness:(.+)",
                text,
                re.DOTALL,
            )[0]
            score = int(parsed_result[-1])
            advice = parsed_result[-2]
        except BaseException as e:
            raise OutputParserError(text)
        return score, advice


@output_parser_registry.register("mgsm-critic")
class MGSMCriticParser(OutputParser):
    def parse(self, output: LLMResult) -> AgentCriticism:
        text = output.content
        return AgentCriticism(False, text)
        # text = re.sub(r"\n+", "\n", text.strip())
        # checks = text.split("\n")
        # if not text.startswith("Thought:"):
        #     raise OutputParserError(text)
        # if not (checks[0].startswith("Action:")):
        #     raise OutputParserError(text)
        # if checks[0].strip(". ") == "Action: Agree":
        #     return AgentCriticism(True, "")
        if "[Correct]" in text:
            return AgentCriticism(True, "")
        else:
            # pattern = re.compile(r"Action Input: ([\S\n ]+)")
            # try:
            # criticism = pattern.findall(text)[0].strip()
            # criticism = (
            #     re.findall(r"Output:\S?(.+)", text)[0].replace("[Wrong]", "")
            # ).strip()
            criticism = text.replace("[Wrong]", "").strip()
            # except IndexError:
            # logger.error("Bad response from critic!")
            # raise OutputParserError(text)
            # criticism = "I think the solution is not correct. Please think carefully and correct it."
            return AgentCriticism(False, criticism)
        # else:
        #     raise OutputParserError(text)


@output_parser_registry.register("mgsm-critic-autogpt")
class MGSMCriticParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        text = output.content
        try:
            parsed_result = re.findall(
                r"Thought:(.+?)Reasoning:(.+?)Criticism:(.+?)Speak:(.+?)Decision:(.+)",
                text,
                re.DOTALL,
            )[0]
        except BaseException as e:
            raise OutputParserError(text)
        if "[Agree]" in parsed_result[-1]:
            return AgentCriticism(True, "")
        else:
            return AgentCriticism(False, parsed_result[-2])


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
