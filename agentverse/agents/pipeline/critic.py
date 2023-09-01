from __future__ import annotations

from colorama import Fore
from agentverse.logging import get_logger
import bdb
from string import Template
from typing import TYPE_CHECKING, List, Union

from agentverse.message import Message

from agentverse.agents import agent_registry
from agentverse.agents.base import BaseAgent
from agentverse.utils import AgentCriticism
from agentverse.message import CriticMessage

logger = get_logger()


@agent_registry.register("critic")
class CriticAgent(BaseAgent):
    def step(self, env_description: str = "") -> CriticMessage:
        pass

    async def astep(
        self,
        preliminary_solution: str,
        advice: str = "No advice yet.",
        task_description: str = "",
    ) -> CriticMessage:
        """Asynchronous version of step"""
        prepend_prompt, append_prompt = self.get_all_prompts(
            preliminary_solution=preliminary_solution,
            advice=advice,
            task_description=task_description,
            role_description=self.role_description,
        )
        history = self.memory.to_messages()
        parsed_response: Union[AgentCriticism, None] = None
        for i in range(self.max_retry):
            try:
                response = await self.llm.agenerate_response(
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
        # if parsed_response is None:
        #     return AgentCriticism(True, "LLM failed.", self)
        # parsed_response = AgentCriticism(
        #     parsed_response.is_agree, parsed_response.criticism, self
        # )

        if parsed_response is None:
            logger.error(f"{self.name} failed to generate valid response.")

        message = CriticMessage(
            content=parsed_response.criticism if parsed_response is not None else "",
            sender=self.name,
            sender_agent=self,
            is_agree=parsed_response.is_agree if parsed_response is not None else False,
        )
        return message

    def _fill_prompt_template(
        self, preliminary_solution: str, advice: str, task_description: str
    ) -> str:
        """Fill the placeholders in the prompt template

        In the conversation agent, three placeholders are supported:
        - ${role_description}
        - ${task_description}
        - ${preliminary_solution}
        - ${advice}
        """
        input_arguments = {
            "role_description": self.role_description,
            "task_description": task_description,
            "preliminary_solution": preliminary_solution,
            "advice": advice,
        }
        return Template(self.prompt_template).safe_substitute(input_arguments)

    def add_message_to_memory(self, messages: List[Message]) -> None:
        self.memory.add_message(messages)

    def reset(self) -> None:
        """Reset the agent"""
        self.memory.reset()
        # TODO: reset receiver
