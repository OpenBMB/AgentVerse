from __future__ import annotations

from agentverse.logging import get_logger
from colorama import Fore
import bdb
from string import Template
from typing import TYPE_CHECKING, List, Any

from agentverse.message import ExecutorMessage, Message, SolverMessage
from agentverse.utils import AgentFinish, AgentAction

from agentverse.agents import agent_registry
from agentverse.agents.base import BaseAgent
import requests

logger = get_logger()


@agent_registry.register("executor")
class ExecutorAgent(BaseAgent):
    max_history: int = 5

    def step(
        self, task_description: str, solution: str, tools: List[dict] = [], **kwargs
    ) -> ExecutorMessage:
        logger.debug("", self.name, Fore.MAGENTA)
        prepend_prompt, append_prompt = self.get_all_prompts(
            task_description=task_description,
            solution=solution,
            agent_name=self.name,
            **kwargs,
        )

        history = self.memory.to_messages(self.name, start_index=-self.max_history)
        parsed_response = None
        for i in range(self.max_retry):
            try:
                response = self.llm.generate_response(
                    prepend_prompt, history, append_prompt, tools
                )
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
        if isinstance(parsed_response, AgentFinish):
            message = ExecutorMessage(
                content=parsed_response.return_values["output"],
                sender=self.name,
                sender_agent=self,
            )
        elif isinstance(parsed_response, AgentAction):
            message = ExecutorMessage(
                content=parsed_response.log,
                sender=self.name,
                sender_agent=self,
                tool_name=parsed_response.tool,
                tool_input=parsed_response.tool_input,
            )
        else:
            raise ValueError(
                f"Error response type: {type(parsed_response)}. Only support \
                    AgentFinish and AgentAction. Modify your output parser."
            )
        return message

    async def astep(
        self, task_description: str, solution: str, tools: List[dict] = [], **kwargs
    ) -> ExecutorMessage:
        logger.debug("", self.name, Fore.MAGENTA)
        prepend_prompt, append_prompt = self.get_all_prompts(
            task_description=task_description,
            solution=solution,
            agent_name=self.name,
            **kwargs,
        )

        history = self.memory.to_messages(self.name, start_index=-self.max_history)
        parsed_response = None
        for i in range(self.max_retry):
            try:
                response = await self.llm.agenerate_response(
                    prepend_prompt, history, append_prompt, tools
                )
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
            parsed_response = AgentAction(tool="", tool_input="", log="")
        if isinstance(parsed_response, AgentFinish):
            message = ExecutorMessage(
                content=parsed_response.return_values["output"],
                sender=self.name,
                sender_agent=self,
            )
        elif isinstance(parsed_response, AgentAction):
            message = ExecutorMessage(
                content=parsed_response.log,
                sender=self.name,
                sender_agent=self,
                tool_name=parsed_response.tool,
                tool_input=parsed_response.tool_input,
            )
        else:
            raise ValueError(
                f"Error response type: {type(parsed_response)}. Only support \
                    AgentFinish and AgentAction. Modify your output parser."
            )
        return message

    def add_message_to_memory(self, messages: List[Message]) -> None:
        self.memory.add_message(messages)

    def reset(self) -> None:
        """Reset the agent"""
        self.memory.reset()
        # TODO: reset receiver
