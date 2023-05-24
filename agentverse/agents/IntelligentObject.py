import logging
import json
from typing import Dict, List
from agentverse.memory import agent_reflection_memory
from agentverse.memory.agent_reflection_memory import ReflectionMemory
import os

from .base import BaseAgent

logging = logging.get_logger(__name__)


class IntelligentObject(BaseAgent):
    """A basic implementation of environment element."""

    traits: str
    whole_day_plan: Dict[str, List[str]]

    def __init__(
        self,
        agent_file,
        environment,
        clear_memory=False,
    ):
        """Intialize an agent."""
        # base system
        self.observation = []  # TODO to remove
        self.agent_file = agent_file
        self.file_dir = os.path.dirname(self.agent_file)
        self.id = os.path.splitext(os.path.basename(self.agent_file))[0]
        new_state_dict = self.load_from_file(agent_file)
        state_dict = new_state_dict
        self.state_dict = state_dict
        self.environment = environment

        self.name = self.state_dict.get("name", None)
        self.traits = self.state_dict.get("traits", None)
        self.description = self.state_dict.get("description", [])

        # geography
        self.location = state_dict.get("location", None)
        self.target_id = self.id
        self.eid = state_dict.get("eid", None)
        self.movement = self.state_dict.get("movement", False)
        self.max_velocity = self.state_dict.get("max_velocity", 1)

        # interaction
        self.incoming_invoice = (
            []
        )  # empty str represents no invoice, later can be changed to list

        self.incoming_interactions = state_dict.get("incoming_interactions", [])

        self.incoming_observation = state_dict.get("incoming_observation", [])
        self.pending_observation = (
            []
        )  # active observation will first go here, then go to incomming observation
        self.background_observation = []  # passive observation will go here

        # current status information
        self.default_status = "none"
        self.status = self.state_dict.get("status", self.default_status)
        if len(self.status.strip("")) == 0:
            self.status = self.default_status
        self.status_duration = self.state_dict.get("status_duration", 0)
        self.status_start_time = self.state_dict.get("status_start_time", None)

        # memory
        # Long term memory is serialized/deserialized by orjson so only file name is provided here.
        self.long_term_memory = ReflectionMemory(
            self.state_dict,
            os.path.dirname(agent_file),
            self.environment.uilogging,
            clear_memory=clear_memory,
        )
        # Short term memory is a queue of observations recording recent observations.
        self.short_term_memory = self.state_dict.get("short_term_memory", [])

        # the agent is calling language model
        self.blocking = False

        self.max_observation_handle = (
            2  # handle at most N incoming observation each step.
        )

        # the total number of steps the agent has gone through
        self.step_cnt = 0  # TODO: Later add this key into the dictionary of agent static files and import that value

        # how many logical frames to do a summary
        self.summary_interval = 1000

        # how many logical frames to do a reflection
        self.reflection_interval = 100

        return

    def load_from_file(self, agent_file):
        if os.path.exists(agent_file):
            with open(agent_file, "r") as f:
                print(agent_file)
                data = json.load(f)
            state_dict = data
            return state_dict
        else:
            logging.warning(f"No config of {agent_file} found!")
            return {}

    def mount_to_environment(
        self, environment, environment_id: str = None, location: List[List[int]] = None
    ):
        """Mount the agent to the environment
        :param environment: the environment to which the agent will be mounted
        :param environment_id: the unique id of this environment
        :param location: the initial location of this agent in the environment
        """

        self.environment = environment
        self.environment_id = environment_id

        # If location is not specified, allocate an available seat to this agent
        if location is None:
            location = self.environment.pop_available_seats()
        self.location = location

        # Call environment method to sync the change to environment
        self.environment.mount_agent(self, self.location)

        return

    def observe(self, limit=None, dropout=0.0):
        """Update observation of around environment
        Should return string, or subject predicate object/predicative
        observation has a upper limit
        Agent has a chance to react to old incoming observations for a second time by dropping out short term memory


        Observations : list[dict], each item of list is a dict of {observed_entity: "doing something"}
        """
        logging.debug(f"{self.name} is observing and generate short-term memory...")

        if limit is None:
            import math

            limit = math.inf

        if self.environment is not None:
            self.background_observation = self.environment.get_neighbor_environment(
                self.id
            )

        # dropout
        import random

        r = [random.random() for _ in range(len(self.short_term_memory))]
        self.short_term_memory = [
            s for i, s in enumerate(self.short_term_memory) if r[i] > dropout
        ]

        for ob in self.incoming_observation:
            if ob not in self.short_term_memory:
                self.short_term_memory = [
                    s
                    for s in self.short_term_memory
                    if not s.split("is")[0] == ob.split("is")[0]
                ]
                self.short_term_memory.append(ob)

        logging.debug(
            "incoming_observation: {}\nbackground_observation: {}".format(
                self.incoming_observation, self.background_observation
            )
        )

    def reflect(
        self,
    ):
        """While the time is right, do reflection for memory"""
        logging.debug(f"{self.name} maybe reflect...")
        return self.long_term_memory.maybe_reflect(self.current_time)

    def add_observation(self, observation):
        self.pending_observation.append(observation)

    def sync(
        self,
    ):
        self._move_pending_observation_or_invoice()

    def _move_pending_observation_or_invoice(self):
        if len(self.incoming_invoice) > 0:
            self.incoming_observation.append(self.incoming_invoice[0])
            self.incoming_invoice.pop(0)
        elif len(self.pending_observation) > 0:
            self.incoming_observation.extend(
                self.pending_observation[: self.max_observation_handle]
            )
            self.pending_observation = self.pending_observation[
                self.max_observation_handle :
            ]
        logging.debug(
            f"{self.name} now has incoming observation: {self.incoming_observation}"
        )

    def set_invoice(self, message):
        logging.debug("Adding invoice: {} to {}".format(message, self.name))
        self.incoming_invoice.append(message)
