from __future__ import annotations
import asyncio
import logging
from typing import Any, Dict, List, TYPE_CHECKING
from abc import abstractmethod

from pydantic import BaseModel

# from agentverse.agents.agent import Agent

if TYPE_CHECKING:
    from agentverse.environments.rules.base import Rule
    from agentverse.message import Message
    from agentverse.agents.base import BaseAgent


class BaseEnvironment(BaseModel):
    """
    Base class for environment.

    Args:
        agents: List of agents
        rule: Rule for the environment
        max_turns: Maximum number of turns
        cnt_turn: Current turn number
        last_messages: Messages from last turn
        rule_params: Variables set by the rule
    """

    agents: List[BaseAgent]
    rule: Rule
    max_turns: int = 10
    cnt_turn: int = 0
    last_messages: List[Message] = []
    rule_params: Dict = {}

    @abstractmethod
    async def step(self) -> List[Message]:
        """Run one step of the environment"""
        pass

    @abstractmethod
    def reset(self) -> None:
        """Reset the environment"""
        pass

    def is_done(self) -> bool:
        """Check if the environment is done"""
        return self.cnt_turn >= self.max_turns
