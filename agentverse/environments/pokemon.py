import asyncio
import time
import logging
from typing import Any, Dict, List, Optional

# from agentverse.agents.agent import Agent
from agentverse.agents.conversation_agent import BaseAgent
from agentverse.environments.rules.base import Rule
from agentverse.message import Message

from . import env_registry as EnvironmentRegistry
from .base import BaseEnvironment


@EnvironmentRegistry.register("pokemon")
class PokemonEnvironment(BaseEnvironment):
    """
    An environment for Pokémon demo.

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

    async def step(
        self, player_content: str, receiver: str, receiver_id: Optional[int] = None
    ) -> List[Message]:
        """Run one step of the environment"""

        # Get the next agent index
        # time.sleep(8)
        # return [Message(content="Test", sender="May", receiver=["May"])]
        if receiver_id is None:
            for agent in self.agents:
                if agent.name == receiver:
                    receiver_id = agent.agent_id
                    break
        agent_ids = [receiver_id]
        agent_name = receiver
        player_message = Message(
            sender="Brenden", content=player_content, receiver=[agent_name]
        )
        import pdb

        pdb.set_trace()

        # Update the set of visible agents for each agent
        self.rule.update_visible_agents(self)

        # Generate current environment description
        env_descriptions = self.rule.get_env_description(self, player_content)

        # Generate the next message
        messages = await asyncio.gather(
            *[self.agents[i].astep(env_descriptions[i]) for i in agent_ids]
        )

        # Some rules will select certain messages from all the messages
        selected_messages = self.rule.select_message(self, messages)

        # Update the memory of the agents
        self.last_messages = [player_message, *selected_messages]
        self.rule.update_memory(self)
        self.print_messages(selected_messages)

        self.cnt_turn += 1

        return selected_messages

    def print_messages(self, messages: List[Message]) -> None:
        for message in messages:
            if message is not None:
                logging.info(f"{message.sender}: {message.content}")

    def reset(self) -> None:
        """Reset the environment"""
        self.cnt_turn = 0
        self.rule.reset()
        for agent in self.agents:
            agent.reset()

    def is_done(self) -> bool:
        """Check if the environment is done"""
        return self.cnt_turn >= self.max_turns
