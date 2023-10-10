from __future__ import annotations

from logging import getLogger
from typing import List, TYPE_CHECKING

from . import memory_manipulator_registry
from .base import BaseMemoryManipulator
from ..message import Message

if TYPE_CHECKING:
    from agentverse.memory import VectorStoreMemory
    from agentverse.agents.reflection_agent import ReflectionAgent

logger = getLogger(__file__)

PLAN_PROMPT = """Now you are act for as an agent named ${agent_name} in a virtual world.
You might need to performing reaction to the observation.
Based on the following information:
(1) The agent's description: ${role_description}
(2) Current time is ${current_time}
(3) Your history memory is ${chat_history}

Now is ${current_time}. If all plans are expired, you have to plan for\
the next time periods.
Do you need to generate new plans?
If yes, tell me the new plan, including the time period.
If no, just tell me No."""


@memory_manipulator_registry.register("plan")
class Plan(BaseMemoryManipulator):
    """
    Memory manipulator for plan.
    """
    memory: VectorStoreMemory = None
    agent: ReflectionAgent = None  # specify ReflectionAgent
    # later considering removing current_time to be more general
    # and then change to BaseAgent
    plan: List[str] = []

    def manipulate_memory(self) -> str:
        """
        Generate new plans
        """
        prompt = self._fill_prompt_template()
        result = self.agent.llm.generate_response(prompt).content
        result = result.strip('.')
        logger.info(f"{self.agent.name}'s new plan: {result}")
        if result == "No":
            return ""
        else:
            self.plan.append(result)
            plan_message = Message(
                content=result,
                sender=self.agent.name,
                receiver={self.agent.name})
            self.agent.memory.add_message([plan_message])
            return result


    def _fill_prompt_template(self) -> str:
        """Fill the placeholders in the prompt template

        In the conversation agent, three placeholders are supported:
        - ${agent_name}: the name of the agent
        - ${env_description}: the description of the environment
        - ${role_description}: the description of the role of the agent
        - ${chat_history}: the chat history of the agent
        """
        input_arguments = {
            "agent_name": self.agent.name,
            "role_description": self.agent.role_description,
            "chat_history": self.agent.memory.to_string(add_sender_prefix=True),
            "current_time": self.agent.current_time,
        }
        return PLAN_PROMPT.format(**input_arguments)

    def reset(self) -> None:
        pass
