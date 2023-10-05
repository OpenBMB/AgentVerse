from __future__ import annotations

import re
from typing import Union, List, Tuple

from agentverse.utils import AgentAction, AgentFinish, AgentCriticism

from agentverse.parser import OutputParserError, output_parser_registry, OutputParser
from agentverse.llms import LLMResult
from agentverse.logging import get_logger

logger = get_logger()


@output_parser_registry.register("responsegen")
class ResponseGenParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        return AgentFinish({"output": output.content}, output.content)


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
class ResponseGenCriticParser(OutputParser):
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
                criticism = "I think the can be further improved."
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
