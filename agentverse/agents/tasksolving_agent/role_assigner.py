from __future__ import annotations

import asyncio
from colorama import Fore

from agentverse.logging import get_logger
import bdb
from string import Template
from typing import TYPE_CHECKING, List

from agentverse.message import RoleAssignerMessage, Message

from agentverse.agents import agent_registry
from agentverse.agents.base import BaseAgent


logger = get_logger()


@agent_registry.register("role_assigner")
class RoleAssignerAgent(BaseAgent):
    def step(
        self, advice: str, task_description: str, cnt_critic_agents: int
    ) -> RoleAssignerMessage:
        logger.debug("", self.name, Fore.MAGENTA)
        prepend_prompt, append_prompt = self.get_all_prompts(
            advice=advice,
            task_description=task_description,
            cnt_critic_agents=cnt_critic_agents,
        )
        history = self.memory.to_messages(self.name)
        parsed_response = None
        for i in range(self.max_retry):
            try:
                response = self.llm.generate_response(
                    prepend_prompt, history, append_prompt
                )
                parsed_response = self.output_parser.parse(response)
                if len(parsed_response) < cnt_critic_agents:
                    logger.warn(
                        f"Number of generate roles ({len(parsed_response)}) and number of group members ({cnt_critic_agents}) do not match."
                    )
                    logger.warn("Retrying...")
                    continue
                break
            except (KeyboardInterrupt, bdb.BdbQuit):
                raise
            except Exception as e:
                logger.error(e)
                logger.warn("Retrying...")
                continue

        if parsed_response is None:
            logger.error(f"{self.name} failed to generate valid response.")

        message = RoleAssignerMessage(
            content=parsed_response, sender=self.name, sender_agent=self
        )
        return message

    async def astep(self, env_description: str = "") -> RoleAssignerMessage:
        """Asynchronous version of step"""
        pass

    def _fill_prompt_template(
        self, advice, task_description: str, cnt_critic_agents: int
    ) -> str:
        """Fill the placeholders in the prompt template

        In the role_assigner agent, three placeholders are supported:
        - ${task_description}
        - ${cnt_critic_agnets}
        - ${advice}
        """
        input_arguments = {
            "task_description": task_description,
            "cnt_critic_agents": cnt_critic_agents,
            "advice": advice,
        }
        return Template(self.prompt_template).safe_substitute(input_arguments)

    def add_message_to_memory(self, messages: List[Message]) -> None:
        self.memory.add_message(messages)

    def reset(self) -> None:
        """Reset the agent"""
        self.memory.reset()
        # TODO: reset receiver
