from __future__ import annotations

import asyncio
from colorama import Fore

from agentverse.logging import get_logger
import bdb
from string import Template
from typing import TYPE_CHECKING, List, Tuple

from agentverse.message import Message

from agentverse.agents import agent_registry
from agentverse.agents.base import BaseAgent


logger = get_logger()


@agent_registry.register("evaluator")
class EvaluatorAgent(BaseAgent):
    def step(self, result: str, task_description: str) -> Tuple[List[int], str]:
        prompt = self._fill_prompt_template(result, task_description)
        logger.debug(f"Prompt:\n{prompt}", "Evaluator", Fore.CYAN)
        parsed_response = None, None
        for i in range(self.max_retry):
            try:
                response = self.llm.generate_response(prompt)
                parsed_response = self.output_parser.parse(response)
                break
            except (KeyboardInterrupt, bdb.BdbQuit):
                raise
            except Exception as e:
                logger.error(e)
                logger.warn("Retrying...")
                continue

        if parsed_response is None:
            logger.error(f"{self.name} failed to generate valid response.")
        return parsed_response

    async def astep(self, solution: str) -> Message:
        """Asynchronous version of step"""
        pass

    def _fill_prompt_template(self, solution: str, task_description: str) -> str:
        """Fill the placeholders in the prompt template

        In the role_assigner agent, three placeholders are supported:
        - ${task_description}
        - ${solution}
        """
        input_arguments = {
            "task_description": task_description,
            "solution": solution,
        }
        return Template(self.prompt_template).safe_substitute(input_arguments)

    def add_message_to_memory(self, messages: List[Message]) -> None:
        self.memory.add_message(messages)

    def reset(self) -> None:
        """Reset the agent"""
        self.memory.reset()
        # TODO: reset receiver
