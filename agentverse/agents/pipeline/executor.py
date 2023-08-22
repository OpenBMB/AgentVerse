from __future__ import annotations

from agentverse.logging import get_logger
import bdb
from string import Template
from typing import TYPE_CHECKING, List, Any

# from agentverse.environments import PipelineEnvironment
from agentverse.message import Message

from agentverse.agents import agent_registry
from agentverse.agents.base import BaseAgent


logger = get_logger(__name__)


@agent_registry.register("executor")
class ExecutorAgent(BaseAgent):
    environment: object = None

    def step(self, solution: str) -> Any:
        # TODO: implement the executor
        return solution

    async def astep(self, env_description: str = "") -> Message:
        """Asynchronous version of step"""
        pass

    def add_message_to_memory(self, messages: List[Message]) -> None:
        self.memory.add_message(messages)

    def reset(self) -> None:
        """Reset the agent"""
        self.memory.reset()
        # TODO: reset receiver
