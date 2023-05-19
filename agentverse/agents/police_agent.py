import logging
from string import Template


from typing import List, TYPE_CHECKING


from agentverse.message import Message

from . import agent_registry
from .base import BaseAgent
from .conversation_agent import ConversationAgent


if TYPE_CHECKING:
    from agentverse.environments.base import BaseEnvironment

@agent_registry.register("police")
class PoliceAgent(ConversationAgent):
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

        role_description = Template(self.role_description).safe_substitute(role_argument)
        input_arguments["role_description"] = role_description

        return Template(self.prompt_template).safe_substitute(input_arguments)

