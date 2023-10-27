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
    max_history: int = 5

    def step(
        self, advice: str, task_description: str, cnt_critic_agents: int
    ) -> RoleAssignerMessage:
        pass

    async def astep(
        self, advice: str, task_description: str, cnt_critic_agents: int
    ) -> RoleAssignerMessage:
        """Asynchronous version of step"""
        logger.debug("", self.name, Fore.MAGENTA)
        prepend_prompt, append_prompt, prompt_token = self.get_all_prompts(
            advice=advice,
            task_description=task_description,
            cnt_critic_agents=cnt_critic_agents,
        )

        max_send_token = self.llm.send_token_limit(self.llm.args.model)
        max_send_token -= prompt_token

        history = await self.memory.to_messages(
            self.name,
            start_index=-self.max_history,
            max_send_token=max_send_token,
            model=self.llm.args.model,
        )
        parsed_response = None
        for i in range(self.max_retry):
            try:
                response = await self.llm.agenerate_response(
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
