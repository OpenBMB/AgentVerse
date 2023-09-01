from __future__ import annotations

import re
from typing import Union, List, Tuple

from agentverse.utils import AgentAction, AgentFinish, AgentCriticism

from agentverse.parser import OutputParserError, output_parser_registry, OutputParser
from agentverse.llms import LLMResult
from agentverse.logging import get_logger

logger = get_logger()


@output_parser_registry.register("commongen")
class CommongenParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        return AgentFinish({"output": output.content}, output.content)


@output_parser_registry.register("commongen-solver")
class CommongenSolverParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        text = output.content
        end_pos = text.rfind("```")
        if end_pos == -1:
            raise OutputParserError(text)
        text = text[:end_pos]
        cleaned_output = text.strip().strip("```").strip()
        if cleaned_output.startswith("python"):
            cleaned_output = cleaned_output[6:].strip()
        elif cleaned_output.startswith("python3"):
            cleaned_output = cleaned_output[7:].strip()
        return AgentFinish({"output": cleaned_output}, text)


@output_parser_registry.register("commongen-evaluator")
class CommongenEvaluatorParser(OutputParser):
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
                        score.append(bool(pattern.findall(check)[0]))
                        break
            advice = re.findall(r"(?:\d.\s*)?Advice:\s*(.+)", checks[-1])[0]
            # logger.info("Evaluator give the following advice:\n" + advice)
        except (IndexError, ValueError):
            # logger.error("Bad response from evaluator!")
            raise OutputParserError(text)
        return score[0], advice


@output_parser_registry.register("commongen-critic")
class CommongenCriticParser(OutputParser):
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
                # logger.error("Bad response from critic!")
                # raise OutputParserError(text)
                criticism = "I think the solution is not correct. Please think carefully and correct it."
            return AgentCriticism(False, criticism)
        else:
            raise OutputParserError(text)
