import asyncio
import logging
from typing import Any, Dict, List
import json

from agentverse.agents.simulation_agent.conversation import BaseAgent

# from agentverse.environments.simulation_env.rules.base import Rule
from agentverse.environments.simulation_env.rules.base import SimulationRule as Rule
from agentverse.message import Message

from .. import env_registry as EnvironmentRegistry
from ..base import BaseEnvironment

from agentverse.initialization import load_tools


@EnvironmentRegistry.register("sde_team_given_tests")
class SdeTeamGivenTestsEnvironment(BaseEnvironment):
    """
    A basic environment implementing the logic of conversation to craft code.

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
    unit_tests: str = ""
    # # variables for experiment
    # task_name: str = "test"
    # experiment_name: str = ""

    def __init__(self, rule, **kwargs):
        rule_config = rule
        order_config = rule_config.get("order", {"type": "sde_team_given_tests"})
        visibility_config = rule_config.get("visibility", {"type": "base"})
        selector_config = rule_config.get("selector", {"type": "sde_team_given_tests"})
        updater_config = rule_config.get("updater", {"type": "sde_team"})
        describer_config = rule_config.get("describer", {"type": "base"})
        rule = Rule(
            order_config,
            visibility_config,
            selector_config,
            updater_config,
            describer_config,
        )
        super().__init__(rule=rule, **kwargs)
        self.rule_params["first_round"] = True
        self.rule_params["end_flag"] = False

        # # Set up logging for experiment
        # filename = self.task_name.replace("/", "_")
        # import os
        # import os.path
        # if not os.path.exists(f"human_eval_experiments/{self.experiment_name}/log"):
        #     os.makedirs(f"human_eval_experiments/{self.experiment_name}/log")
        # file_handler = logging.FileHandler(f"human_eval_experiments/{self.experiment_name}/log/{filename}.txt")
        # logging.getLogger().addHandler(file_handler)

    async def step(self) -> List[Message]:
        """Run one step of the environment"""

        # Get the next agent index
        agent_ids = self.rule.get_next_agent_idx(self)  # order

        # Generate current environment description
        # env_descriptions = self.rule.get_env_description(self)  # describer

        # # Generate the next message
        # messages = await asyncio.gather(
        #     *[self.agents[i].astep(env_descriptions[i]) for i in agent_ids]
        # )   # call chatgpt api

        messages = await asyncio.gather(*[self.agents[i].astep("") for i in agent_ids])

        # Track the messages to get the role of the sender
        self.last_messages = messages

        # Some rules will select certain messages from all the messages
        selected_messages = self.rule.select_message(self, messages)  # selector
        self.last_messages = selected_messages
        self.print_messages(selected_messages)

        # Update the memory of the agents
        self.rule.update_memory(self)  # updater: update memory

        # Update the set of visible agents for each agent
        self.rule.update_visible_agents(self)  # change receiver

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
        if self.cnt_turn >= self.max_turns or self.rule_params["end_flag"]:
            # # Write to file for experiment
            # with open(f"human_eval_experiments/{self.experiment_name}/record_human_eval_prediction.jsonl", "a") as f:
            #     wd = dict()
            #     wd['task_id'] = self.task_name
            #     wd['code'] = self.rule_params['code']
            #     # print(wd)
            #     f.write(json.dumps(wd) + "\n")
            # logging.getLogger().handlers.pop()
            return True
        return False
