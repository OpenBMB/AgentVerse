from __future__ import annotations

import re
import ast
from typing import Union, List, Tuple

from agentverse.utils import AgentAction, AgentFinish, AgentCriticism

from agentverse.parser import OutputParserError, output_parser_registry, OutputParser
from agentverse.llms import LLMResult
from agentverse.logging import get_logger

logger = get_logger()


@output_parser_registry.register("role_description_name_assigner")
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


@output_parser_registry.register("tool-using-critic")
class ToolUsingCriticParser(OutputParser):
    def parse(self, output: LLMResult) -> AgentCriticism:
        text = output.content
        return AgentCriticism(False, text)
