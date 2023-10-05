from __future__ import annotations

import re
from typing import Union, List, Tuple

from agentverse.utils import AgentAction, AgentFinish, AgentCriticism

from agentverse.parser import OutputParserError, output_parser_registry, OutputParser
from agentverse.llms import LLMResult
from agentverse.logging import get_logger


logger = get_logger()


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


@output_parser_registry.register("critic")
class CriticParser(OutputParser):
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
                logger.error("Bad response from critic!")
                raise OutputParserError(text)
            return AgentCriticism(False, criticism)
        else:
            raise OutputParserError(text)


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
