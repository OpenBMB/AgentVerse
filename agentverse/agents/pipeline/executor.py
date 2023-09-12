from __future__ import annotations

from agentverse.logging import get_logger
from colorama import Fore
import bdb
from string import Template
from typing import TYPE_CHECKING, List, Any

from agentverse.message import ExecutorMessage, Message

from agentverse.agents import agent_registry
from agentverse.agents.base import BaseAgent
import requests

logger = get_logger()


@agent_registry.register("executor")
class ExecutorAgent(BaseAgent):
    def step(self, task_description: str, solution: str,tools:str='') -> ExecutorMessage:
        logger.debug("", self.name, Fore.MAGENTA)
        prepend_prompt, append_prompt = self.get_all_prompts(
            task_description=task_description, solution=solution,tools=tools
        )
        parsed_response = None
        for i in range(self.max_retry):
            try:
                response = self.llm.generate_response(prepend_prompt, [], append_prompt)
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
        message = ExecutorMessage(
            sender=self.name,
            sender_agent=self,
            content=parsed_response.return_values["output"],
        )
        return message

    async def astep(self, solution: str) -> ExecutorMessage:
        """Asynchronous version of step"""
        pass

    def add_message_to_memory(self, messages: List[Message]) -> None:
        self.memory.add_message(messages)

    def reset(self) -> None:
        """Reset the agent"""
        self.memory.reset()
        # TODO: reset receiver
