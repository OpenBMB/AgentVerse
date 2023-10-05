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
from agentverse.utils import AgentCriticism

import random
from rapidfuzz import fuzz


logger = get_logger()


@agent_registry.register("manager")
class ManagerAgent(BaseAgent):
    prompt_template: str

    def step(
        self,
        former_solution: str,
        candidate_critic_opinions: List[AgentCriticism],
        advice: str,
        task_description: str = "",
        previous_sentence: str = "",
    ) -> Message:
        logger.debug("", self.name, Fore.MAGENTA)

        prompt = self._fill_prompt_template(
            former_solution,
            candidate_critic_opinions,
            advice,
            task_description,
            previous_sentence,
        )

        logger.debug(f"Prompt:\n{prompt}", "Manager", Fore.CYAN)
        parsed_response = None
        for i in range(self.max_retry):
            try:
                # LLM Manager
                # response = self.llm.generate_response(prompt)
                # parsed_response = self.output_parser.parse(response)
                selected_role_description = self.llm.generate_response(prompt).content
                candidate_score_list = [
                    fuzz.ratio(candidate.sender, selected_role_description)
                    for candidate in candidate_critic_opinions
                ]
                selected_index = candidate_score_list.index(max(candidate_score_list))
                candidate_critic_opinion = candidate_critic_opinions[selected_index]

                # Random Manager
                # parsed_response = random.choice(candidate_critic_opinions)
                break
            except (KeyboardInterrupt, bdb.BdbQuit):
                raise
            except Exception as e:
                logger.error(e)
                logger.warn("Retrying...")
                continue
        return candidate_critic_opinion

    async def astep(self, env_description: str = "") -> Message:
        """Asynchronous version of step"""
        pass

    def _fill_prompt_template(
        self,
        former_solution: str,
        candidate_critic_opinions: List[AgentCriticism],
        advice: str,
        task_description: str,
        previous_sentence: str,
    ) -> str:
        """Fill the placeholders in the prompt template

        In the role_assigner agent, three placeholders are supported:
        - ${task_description}
        - ${former_solution}
        - ${critic_messages}
        - ${advice}
        - ${previous_sentence}
        """
        input_arguments = {
            "task_description": task_description,
            "former_solution": former_solution,
            "previous_sentence": previous_sentence,
            "critic_opinions": "\n".join(
                [
                    f"Role: {critic.sender}. {critic.sender_agent.role_description} said: {critic.content}"
                    for critic in candidate_critic_opinions
                ]
            ),
            "advice": advice,
        }

        # manger select the proper sentence
        template = Template(self.prompt_template)
        return template.safe_substitute(input_arguments)

    def add_message_to_memory(self, messages: List[Message]) -> None:
        self.memory.add_message(messages)

    def reset(self) -> None:
        """Reset the agent"""
        self.memory.reset()
        # TODO: reset receiver
