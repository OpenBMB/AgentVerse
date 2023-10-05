import asyncio
import datetime
import logging
from typing import Any, Dict, List, Optional, Set

# from agentverse.agents.agent import Agent
from agentverse.agents.simulation_agent.conversation import BaseAgent

# from agentverse.environments.simulation_env.rules.base import Rule
from agentverse.environments.simulation_env.rules.base import SimulationRule as Rule
from agentverse.message import Message

from .. import env_registry as EnvironmentRegistry
from ..base import BaseEnvironment


@EnvironmentRegistry.register("pokemon")
class PokemonEnvironment(BaseEnvironment):
    """
    An environment for Pokémon demo.

    Args:
        agents: List of agents
        locations: A dict of locations to agents within them
        rule: Rule for the environment
        max_turns: Maximum number of turns
        cnt_turn: Current turn number
        last_messages: Messages from last turn
        rule_params: Variables set by the rule
    """

    agents: List[BaseAgent]
    locations_to_agents: Dict[str, Set[str]]
    # locations_descriptions: Dict[str, str]
    time: datetime.datetime = datetime.datetime(2021, 1, 1, 8, 0, 0)
    rule: Rule
    max_turns: int = 10
    cnt_turn: int = 0
    last_messages: List[Message] = []
    rule_params: Dict = {}

    def __init__(self, rule, locations, **kwargs):
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
        locations_to_agents = {}
        # locations_descriptions = {}
        locations_config = locations
        for loc in locations_config:
            locations_to_agents[loc["name"]] = set(loc["init_agents"])
            # locations_descriptions[loc["name"]] = loc["description"]
        super().__init__(
            rule=rule,
            locations_to_agents=locations_to_agents,
            # locations_descriptions=locations_descriptions,
            **kwargs,
        )

    async def step(
        self,
        is_player: bool = False,
        player_content: str = None,
        receiver: str = None,
        receiver_id: Optional[int] = None,
        agent_ids: Optional[List[int]] = None,
    ) -> List[Message]:
        """Run one step of the environment"""

        # Get the next agent index
        # time.sleep(8)
        # return [Message(content="Test", sender="May", receiver=["May"])]
        if is_player:
            return await self._respond_to_player(player_content, receiver, receiver_id)
        else:
            return await self._routine_step(agent_ids)

    async def _routine_step(self, agent_ids) -> List[Message]:
        self.rule.update_visible_agents(self)

        # agent_ids = self.rule.get_next_agent_idx(self)

        # Generate current environment description
        env_descriptions = self.rule.get_env_description(self)

        # Generate the next message
        messages = await asyncio.gather(
            *[self.agents[i].astep(env_descriptions[i]) for i in agent_ids]
        )
        # messages = self.get_test_messages()

        # Some rules will select certain messages from all the messages
        selected_messages = self.rule.select_message(self, messages)

        # Update the memory of the agents
        self.last_messages = selected_messages
        self.rule.update_memory(self)
        self.print_messages(selected_messages)

        self.cnt_turn += 1
        self.time += datetime.timedelta(minutes=5)

        return selected_messages

    async def _respond_to_player(
        self,
        player_content: str = None,
        receiver: str = None,
        receiver_id: Optional[int] = None,
    ) -> List[Message]:
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

        # Update the set of visible agents for each agent
        self.rule.update_visible_agents(self)

        # Generate current environment description
        env_descriptions = self.rule.get_env_description(self, player_content)

        # Generate the next message
        messages = await asyncio.gather(
            *[self.agents[i].astep(env_descriptions[i]) for i in agent_ids]
        )

        # Some rules will select certain messages from all the messages
        # selected_messages = self.rule.select_message(self, messages)

        # Update the memory of the agents
        self.last_messages = [player_message, *messages]
        self.rule.update_memory(self)
        self.print_messages(messages)

        self.cnt_turn += 1

        return messages

    def update_state(self, agent_location: Dict[str, str]):
        for agent_name, location in agent_location.items():
            # original_location = self.get_agent_to_location()[agent_name]
            # self.locations_to_agents[original_location].remove(agent_name)
            self.locations_to_agents[location].add(agent_name)

    def get_agent_to_location(self) -> Dict[str, str]:
        ret = {}
        for location, agent_names in self.locations_to_agents.items():
            for agent in agent_names:
                ret[agent] = location
        return ret

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

    def get_test_messages(self) -> List[Message]:
        messages = [
            Message(
                content='{"to": "Birch", "action": "Speak", "text": "Hi!!!"}',
                sender="May",
                receiver={"May", "Birch"},
                tool_response=[],
            ),
            Message(
                content='{"to": "May", "text": "Good morning, May! How is your research going?", "action": "Speak"}',
                sender="Birch",
                receiver={"May", "Birch"},
                tool_response=[],
            ),
            Message(
                content='{"to": "Pokémon Center", "action": "MoveTo"}',
                sender="Steven",
                receiver={"Steven"},
                tool_response=[],
            ),
            Message(
                content='{"to": "Shop", "last_time": "10 minutes", "action": "MoveTo"}',
                sender="Maxie",
                receiver={"Maxie"},
                tool_response=[],
            ),
            Message(
                content='{"to": "Pok\\u00e9mon Center", "action": "MoveTo"}',
                sender="Archie",
                receiver={"Archie"},
                tool_response=[],
            ),
            Message(
                content='{"to": "Shop", "action": "MoveTo"}',
                sender="Joseph",
                receiver={"Joseph"},
                tool_response=[],
            ),
        ]
        return messages
