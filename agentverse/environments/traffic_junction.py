import asyncio
import logging
from typing import Any, Dict, List
from collections import defaultdict

# from agentverse.agents.agent import Agent
import numpy as np

from agentverse.agents.conversation_agent import BaseAgent
from agentverse.environments.rules.base import Rule
from agentverse.message import Message

from . import env_registry as EnvironmentRegistry
from .base import BaseEnvironment


@EnvironmentRegistry.register("traffic")
class TrafficEnvironment(BaseEnvironment):
    class Config:
        arbitrary_types_allowed = True
    """
    A basic environment implementing the logic of conversation.

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
    grids: np.ndarray = None
    # 1 0 1
    # 0 0 0
    # 1 0 1
    grids_dim: int = 6
    # key: coordinate, value: car_nums
    grids_occupancy: defaultdict = defaultdict(int)

    last_messages: List[Message] = []
    rule_params: Dict = {}

    def __init__(self, rule, **kwargs):
        rule_config = rule
        order_config = rule_config.get("order", {"type": "sequential"})
        visibility_config = rule_config.get("visibility", {"type": "all"})
        selector_config = rule_config.get("selector", {"type": "basic"})
        updater_config = rule_config.get("updater", {"type": "basic"})
        describer_config = rule_config.get("describer", {"type": "basic"})
        rule = Rule(
            order_config,
            visibility_config,
            selector_config,
            updater_config,
            describer_config,
        )
        super().__init__(rule=rule, **kwargs)

    async def step(self) -> List[Message]:
        """Run one step of the environment"""

        # Get the next agent index
        agent_ids = self.rule.get_next_agent_idx(self)

        # Generate current environment description
        env_descriptions = self.rule.get_env_description(self)

        # Update the set of visible agents for each agent
        self.rule.update_visible_agents(self)

        # Generate the next message
        messages = await asyncio.gather(
            *[self.agents[i].astep(env_descriptions[i]) for i in agent_ids]
        )

        # Some rules will select certain messages from all the messages
        selected_messages = self.rule.select_message(self, messages)
        self.last_messages = selected_messages
        self.print_messages(selected_messages)

        # Update the memory of the agents
        self.rule.update_memory(self)

        # Update vision about other agents' position
        self.rule.updater.update_other_coordinate(self)

        self.cnt_turn += 1

        return selected_messages

    def print_messages(self, messages: List[Message]) -> None:
        for message in messages:
            if message is not None:
                logging.info(f"{message.sender}: {message.content}")

    def reset(self) -> None:
        """Reset the environment"""
        self.cnt_turn = 0

        # TODO circle the grid afterwards marked as 2
        self.grids = np.ones([self.grids_dim, self.grids_dim])

        assert (self.grids_dim - 2) % 2 == 0
        road_start_line = (self.grids_dim - 2) // 2

        for column_index in range(self.grids_dim):
            self.grids[road_start_line][column_index] = 0
            self.grids[road_start_line + 1][column_index] = 0
        for row_index in range(self.grids_dim):
            self.grids[row_index][road_start_line] = 0
            self.grids[row_index][road_start_line + 1] = 0

        self.rule.reset()
        for agent in self.agents:
            agent.reset(environment=self)

    def is_done(self) -> bool:
        """Check if the environment is done"""
        return self.cnt_turn >= self.max_turns

    def _check_crush(self, ) -> bool:

        for _x in range(self.grids_dim):
            for _y in range(self.grids_dim):
                if (_x, _y) in self.grids_occupancy and self.grids_occupancy[(_x, _y)] > 1:
                    return False

        return True
