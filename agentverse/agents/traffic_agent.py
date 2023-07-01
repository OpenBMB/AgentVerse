from __future__ import annotations

import logging
import bdb
from string import Template
from typing import TYPE_CHECKING, List
import re
import ast

from agentverse.message import Message

from . import agent_registry
from .base import BaseAgent

if TYPE_CHECKING:
    from agentverse.environments.base import BaseEnvironment

@agent_registry.register("traffic")
class TrafficAgent(BaseAgent):

    environment: BaseEnvironment = None
    coordinate: list = None
    others_coordinate: dict = {}

    def step(self, env_description: str = "") -> Message:
        prompt = self._fill_prompt_template(env_description)

        parsed_response = None
        for i in range(self.max_retry):
            try:
                response = self.llm.generate_response(prompt)
                parsed_response = self.output_parser.parse(response)
                break
            except KeyboardInterrupt:
                raise
            except Exception as e:
                logging.error(e)
                logging.warning("Retrying...")
                continue

        if parsed_response is None:
            logging.error(f"{self.name} failed to generate valid response.")

        message = Message(
            content=""
            if parsed_response is None
            else parsed_response.return_values["output"],
            sender=self.name,
            receiver=self.get_receiver(),
        )
        return message

    async def astep(self, env_description: str = "") -> Message:
        """Asynchronous version of step"""
        prompt = self._fill_prompt_template(env_description)

        parsed_response = None
        reached = False

        for i in range(self.max_retry):
            try:
                valid = True
                response = await self.llm.agenerate_response(prompt)
                parsed_response = self.output_parser.parse(response)

                if "move" in parsed_response.return_values["output"]:
                    direction = re.search(re.compile('move\((.*?)\)'), parsed_response.return_values["output"]).group(1)

                    if not self._check_validation(ast.literal_eval(direction)):
                        valid = False
                        raise Exception("You encounter the block")

                    reached = self._move(ast.literal_eval(direction))

                elif "brake" in parsed_response.return_values["output"]:

                    reached = self._brake()

                break

            except (KeyboardInterrupt, bdb.BdbQuit):
                raise
            except Exception as e:
                logging.error(e)
                logging.warning("Retrying...")
                continue

        if not valid:
            # "I failed to give the correct response (always moving towards block cell) ." \
            # "so I will brake, staying at where I were before"
            parsed_response = None

        if reached:
            # TODO check how to discard car here
            pass

        if parsed_response is None:
            logging.error(f"{self.name} failed to generate valid response.")


        # TODO check if it is necessary to use parsed_response.log parsed_response.return_values["output"]

        message = Message(
            content="I failed to give the correct response (always moving towards block cell) ." \
            "so I will brake, staying at where I were before"
            if parsed_response is None
            else parsed_response.log,
            sender=self.name,
            receiver=self.get_receiver(),
        )
        return message

    def _fill_prompt_template(self, env_description: str = "") -> str:
        """Fill the placeholders in the prompt template

        In the conversation agent, three placeholders are supported:
        - ${agent_name}: the name of the agent
        - ${env_description}: the description of the environment
        - ${role_description}: the description of the role of the agent
        - ${chat_history}: the chat history of the agent
        """
        input_arguments = {
            "agent_name": self.name,
            "env_description": env_description,
            "role_description": self.role_description,
            "chat_history": self.memory.to_string(add_sender_prefix=True),
            "grids_dim": self.environment.grids_dim,
            "coordinate": self.coordinate,
            "others_coordinate": self.others_coordinate
        }
        return Template(self.prompt_template).safe_substitute(input_arguments)

    def add_message_to_memory(self, messages: List[Message]) -> None:
        self.memory.add_message(messages)

    def reset(self, environment) -> None:
        """Reset the agent"""
        self.memory.reset()
        self.environment = environment

        # initiate others agents' coordinate
        others_agents = []
        for agent in self.environment.agents:
            if agent.name != self.name:
                others_agents.append(agent.name)
        for others_agent in others_agents:
            self.others_coordinate[others_agent] = "Not Known"


        # TODO: reset receiver

    def _move(self, direction:list) -> bool:

        delta_x, delta_y = direction
        cur_x, cur_y = self.coordinate

        if f"{cur_x}_{cur_y}" in self.environment.grids_occupancy:
            self.environment.grids_occupancy[f"{cur_x}_{cur_y}"] -= 1

        # update map occupancy
        self.environment.grids_occupancy[f"{cur_x+delta_x}_{cur_y+delta_y}"] += 1

        # update self coordinate
        self.coordinate[0] = cur_x + delta_x
        self.coordinate[1] = cur_y + delta_y

        #  2 (exit), then choose to discard the car or not
        if self.environment.grids[self.coordinate[0]][self.coordinate[1]] == 2:
            return True
        else:
            return False

    def _brake(self, ) -> bool:
        # do nothing but brake
        return False

    def _check_validation(self, direction:list) -> bool:

        delta_x, delta_y = direction
        cur_x, cur_y = self.coordinate

        # not 1 (unavailable path)  or 2 (exit)
        if self.environment.grids[cur_x + delta_x][cur_y + delta_y] == 1:
            return False
        else:
            return True

    #TODO add communication here
    def _talk(self, target: str):
        pass


