import asyncio
import logging
from typing import Any, Dict, List

from agentverse.agents.conversation_agent import BaseAgent
from agentverse.environments.rules.base import Rule
from agentverse.message import Message
from agentverse.utils import AsyncBarrier

from . import env_registry as EnvironmentRegistry

# from .base import BaseEnvironment
from .basic import BasicEnvironment


@EnvironmentRegistry.register("minecraft")
class MinecraftEnvironment(BasicEnvironment):
    """
    Environment for Minecraft.

    Args:
        agents: List of agents
        rule: Rule for the environment
        max_turns: Maximum number of turns
        cnt_turn: Current turn number
        last_messages: Messages from last turn
        rule_params: Variables set by the rule
    """

    rule_params: Dict = {"status": "discussion"}

    class Config:
        arbitrary_types_allowed = True

    async def step(self) -> List[Message]:
        """Run one step of the environment"""
        status = self.rule_params["status"]
        if status == "execution":
            for agent in self.agents:
                agent.set_barrier_num(len(self.agents))
        # Get the next agent index
        agent_ids = self.rule.get_next_agent_idx(self)

        # Generate current environment description
        env_descriptions = self.rule.get_env_description(self)

        # Generate the next message
        messages = await asyncio.gather(
            *[self.agents[i].astep(env_descriptions[i], status) for i in agent_ids]
        )

        # Some rules will select certain messages from all the messages
        selected_messages = self.rule.select_message(self, messages)
        self.last_messages = selected_messages
        self.print_messages(selected_messages)

        # Update the memory of the agents
        self.rule.update_memory(self)

        # Update the set of visible agents for each agent
        self.rule.update_visible_agents(self)

        self.cnt_turn += 1

        return selected_messages
