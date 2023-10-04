import asyncio
import logging
from typing import Any, Dict, List

from datetime import datetime as dt
import datetime

from pydantic import Field

from agentverse.agents.simulation_agent.conversation import BaseAgent

# from agentverse.environments.simulation_env.rules.base import Rule
from agentverse.environments.simulation_env.rules.base import SimulationRule as Rule
from agentverse.message import Message

from . import env_registry as EnvironmentRegistry
from ..base import BaseEnvironment

from pydantic import validator


@EnvironmentRegistry.register("reflection")
class ReflectionEnvironment(BaseEnvironment):
    """
    Environment used in Observation-Planning-Reflection agent architecture.

    Args:
        agents: List of agents
        rule: Rule for the environment
        max_turns: Maximum number of turns
        cnt_turn: Current turn number
        last_messages: Messages from last turn
        rule_params: Variables set by the rule
        current_time
        time_delta: time difference between steps
    """

    agents: List[BaseAgent]
    rule: Rule
    max_turns: int = 10
    cnt_turn: int = 0
    last_messages: List[Message] = []
    rule_params: Dict = {}
    current_time: dt = dt.now()
    time_delta: int = 120
    #

    # @validator("time_delta")
    # def convert_str_to_timedelta(cls, string):
    #
    #     return datetime.timedelta(seconds=int(string))

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

        logging.log(logging.INFO, f"Tick tock. Current time: {self.current_time}")

        # Get the next agent index
        agent_ids = self.rule.get_next_agent_idx(self)

        # Generate current environment description
        env_descriptions = self.rule.get_env_description(self)

        # Generate the next message
        messages = await asyncio.gather(
            *[
                self.agents[i].astep(self.current_time, env_descriptions[i])
                for i in agent_ids
            ]
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

        # update current_time
        self.tick_tock()

        return selected_messages

    def print_messages(self, messages: List[Message]) -> None:
        for message in messages:
            if message is not None:
                logging.info(f"{message.sender}: {message.content}")

    def reset(self) -> None:
        """Reset the environment"""
        self.cnt_turn = 0
        self.rule.reset()
        BaseAgent.update_forward_refs()
        for agent in self.agents:
            agent.reset(environment=self)

    def is_done(self) -> bool:
        """Check if the environment is done"""
        return self.cnt_turn >= self.max_turns

    def tick_tock(self) -> None:
        """Increment the time"""
        self.current_time = self.current_time + datetime.timedelta(
            seconds=self.time_delta
        )
