from __future__ import annotations

import logging
from string import Template
from typing import TYPE_CHECKING, List

from agentverse.message import Message

# from . import agent_registry
# from .base import BaseAgent
from agentverse.agents import agent_registry
from agentverse.agents.base import BaseAgent

if TYPE_CHECKING:
    from agentverse.environments.base import BaseEnvironment


class PrisonerDilemaAgent(BaseAgent):
    def step(
        self,
        environment: BaseEnvironment,
        env_description: str = "",
    ) -> Message:
        prompt = self._fill_prompt_template(env_description)

        parsed_response = None
        for i in range(self.max_retry):
            try:
                response = self.llm.generate_response(prompt)
                parsed_response = self.output_parser.parse(self, environment, response)
                break
            except Exception as e:
                logging.error(e)
                logging.warning("Retrying...")
                continue

        if parsed_response is None:
            logging.error(f"{self.name} failed to generate valid response.")

        message = Message(
            content=""
            if parsed_response is None
            else parsed_response.return_values["output"],
            sender=self.name,
            receiver=self.get_receiver(),
        )
        return message

    async def astep(
        self, environment: BaseEnvironment, env_description: str = ""
    ) -> Message:
        """Asynchronous version of step"""
        prompt = self._fill_prompt_template(env_description)

        parsed_response = None
        for i in range(self.max_retry):
            try:
                response = await self.llm.agenerate_response(prompt)
                parsed_response = self.output_parser.parse(self, environment, response)
                break
            except Exception as e:
                logging.error(e)
                logging.warning("Retrying...")
                continue

        if parsed_response is None:
            logging.error(f"{self.name} failed to generate valid response.")

        message = Message(
            content=""
            if parsed_response is None
            else parsed_response.return_values["output"],
            sender=self.name,
            receiver=self.get_receiver(),
        )
        return message

    def _fill_prompt_template(self, env_description: str = "") -> str:
        """Fill the placeholders in the prompt template

        In the conversation agent, three placeholders are supported:
        - ${agent_name}: the name of the agent
        - ${env_description}: the description of the environment
        - ${role_description}: the description of the role of the agent
        - ${chat_history}: the chat history of the agent
        """
        input_arguments = {
            "agent_name": self.name,
            "env_description": env_description,
            "role_description": self.role_description,
            "chat_history": self.memory.to_string(add_sender_prefix=True),
        }
        return Template(self.prompt_template).safe_substitute(input_arguments)

    def add_message_to_memory(self, messages: List[Message]) -> None:
        self.memory.add_message(messages)

    def reset(self) -> None:
        """Reset the agent"""
        self.memory.reset()
        # TODO: reset receiver


@agent_registry.register("police")
class PoliceAgent(PrisonerDilemaAgent):
    interrogating_form: str

    def _fill_prompt_template(self, env_description: str = "") -> str:
        """Fill the placeholders in the prompt template

        In the conversation agent, three placeholders are supported:
        - ${agent_name}: the name of the agent
        - ${env_description}: the description of the environment
        - ${role_description}: the description of the role of the agent
        - ${chat_history}: the chat history of the agent
        """
        input_arguments = {
            "agent_name": self.name,
            "env_description": env_description,
            "role_description": self.role_description,
            "chat_history": self.memory.to_string(add_sender_prefix=True),
        }

        role_argument = {
            "interrogating_form": self.interrogating_form,
        }

        role_description = Template(self.role_description).safe_substitute(
            role_argument
        )
        input_arguments["role_description"] = role_description

        return Template(self.prompt_template).safe_substitute(input_arguments)


@agent_registry.register("prisoner")
class PrisonerAgent(PrisonerDilemaAgent):
    personality: str
    relationship_with_another: str

    def _fill_prompt_template(self, env_description: str = "") -> str:
        """Fill the placeholders in the prompt template

        In the conversation agent, three placeholders are supported:
        - ${agent_name}: the name of the agent
        - ${env_description}: the description of the environment
        - ${role_description}: the description of the role of the agent
        - ${chat_history}: the chat history of the agent
        """
        input_arguments = {
            "agent_name": self.name,
            "env_description": env_description,
            "role_description": self.role_description,
            "chat_history": self.memory.to_string(add_sender_prefix=True),
        }

        role_argument = {
            "personality": self.personality,
            "relationship_with_another": self.relationship_with_another,
        }

        role_description = Template(self.role_description).safe_substitute(
            role_argument
        )
        input_arguments["role_description"] = role_description

        return Template(self.prompt_template).safe_substitute(input_arguments)
