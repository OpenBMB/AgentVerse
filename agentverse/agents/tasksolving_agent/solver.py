from __future__ import annotations

import asyncio
from colorama import Fore

from agentverse.logging import get_logger
import bdb
from string import Template
from typing import TYPE_CHECKING, List, Tuple

# from agentverse.environments import PipelineEnvironment
from agentverse.message import SolverMessage, Message, CriticMessage

from agentverse.agents import agent_registry
from agentverse.agents.base import BaseAgent
from agentverse.utils import AgentCriticism


logger = get_logger()


@agent_registry.register("solver")
class SolverAgent(BaseAgent):
    max_history: int = 3

    def step(
        self, former_solution: str, advice: str, task_description: str = "", **kwargs
    ) -> SolverMessage:
        logger.debug("", self.name, Fore.MAGENTA)
        # prompt = self._fill_prompt_template(
        #     former_solution, critic_opinions, advice, task_description
        # )
        prepend_prompt, append_prompt = self.get_all_prompts(
            former_solution=former_solution,
            task_description=task_description,
            advice=advice,
            role_description=self.role_description,
            **kwargs,
        )
        history = self.memory.to_messages(self.name, start_index=-self.max_history)
        parsed_response = None
        for i in range(self.max_retry):
            try:
                response = self.llm.generate_response(
                    prepend_prompt, history, append_prompt
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

        message = SolverMessage(
            content=""
            if parsed_response is None
            else parsed_response.return_values["output"],
            sender=self.name,
            receiver=self.get_receiver(),
        )
        return message

    async def astep(self, env_description: str = "") -> SolverMessage:
        """Asynchronous version of step"""
        pass

    def _fill_prompt_template(
        self,
        former_solution: str,
        critic_opinions: List[AgentCriticism],
        advice: str,
        task_description: str,
    ) -> str:
        """Fill the placeholders in the prompt template

        In the role_assigner agent, three placeholders are supported:
        - ${task_description}
        - ${former_solution}
        - ${critic_messages}
        - ${advice}
        """
        input_arguments = {
            "task_description": task_description,
            "former_solution": former_solution,
            "critic_opinions": "\n".join(
                [
                    f"{critic.sender_agent.role_description} said: {critic.criticism}"
                    for critic in critic_opinions
                ]
            ),
            "advice": advice,
        }
        # if discussion_mode:
        #     template = Template(self.prompt_template[1])
        # else:
        template = Template(self.prompt_template)
        return template.safe_substitute(input_arguments)

    def add_message_to_memory(self, messages: List[Message]) -> None:
        self.memory.add_message(messages)

    def reset(self) -> None:
        """Reset the agent"""
        self.memory.reset()
        # TODO: reset receiver
