from __future__ import annotations

from agentverse.logging import get_logger
import bdb
from string import Template
from typing import TYPE_CHECKING, List, Union

from agentverse.message import Message

from agentverse.agents import agent_registry
from agentverse.agents.base import BaseAgent
from agentverse.utils import AgentCriticism

logger = get_logger(__name__)


@agent_registry.register("critic")
class CriticAgent(BaseAgent):
    environment: object = None
    def step(self, env_description: str = "") -> Message:
        pass

    async def astep(self, preliminary_solution: str,
                    advice: str = "") -> AgentCriticism:
        """Asynchronous version of step"""
        prompt = self._fill_prompt_template(preliminary_solution, advice)
        # logger.info(f"Prompt:\n{prompt}")
        parsed_response: Union[AgentCriticism, None] = None
        for i in range(self.max_retry):
            try:
                # if self.name == "Code Reviewer":
                response = await self.llm.agenerate_response(prompt)
                # logger.info(f"{self.name}'s request result:"
                #              f" {response.content}")
                parsed_response = self.output_parser.parse(response)
                break
            except (KeyboardInterrupt, bdb.BdbQuit):
                raise
            except Exception as e:
                logger.error(e)
                logger.warning("Retrying...")
                continue
        if parsed_response is None:
            return AgentCriticism(True, "LLM failed.")
        parsed_response = AgentCriticism(parsed_response.is_agree,
                                         parsed_response.criticism,
                                         self)
        return parsed_response

    def _fill_prompt_template(self, preliminary_solution: str,
                              advice: str) -> str:
        """Fill the placeholders in the prompt template

        In the conversation agent, three placeholders are supported:
        - ${role_description}
        - ${task_description}
        - ${preliminary_solution}
        - ${advice}
        """
        input_arguments = {
            "role_description": self.role_description,
            "task_description": self.environment.task_description,
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
