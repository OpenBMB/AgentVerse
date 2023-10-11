from __future__ import annotations

"""
An agent based upon Observation-Planning-Reflection architecture.
"""

from logging import getLogger

from abc import abstractmethod
from typing import List, Set, Union, NamedTuple, TYPE_CHECKING

from pydantic import BaseModel, Field, validator

from agentverse.llms import BaseLLM
from agentverse.memory import BaseMemory, ChatHistoryMemory
from agentverse.message import Message
from agentverse.output_parser import OutputParser

from agentverse.message import Message
from agentverse.agents.base import BaseAgent

from datetime import datetime as dt
import datetime

#from . import agent_registry
from string import Template

from agentverse.agents import agent_registry
from agentverse.agents.base import BaseAgent

logger = getLogger(__file__)

if TYPE_CHECKING:
    from agentverse.environments.base import BaseEnvironment


@agent_registry.register("reflection")
class ReflectionAgent(BaseAgent):
    async_mode: bool = (True,)
    current_time: str = (None,)
    environment: BaseEnvironment = None
    step_cnt: int = 0

    manipulated_memory: str = Field(
        default="", description="one fragment used in prompt construction"
    )

    @validator("current_time")
    def convert_str_to_dt(cls, current_time):
        if not isinstance(current_time, str):
            raise ValueError("current_time should be str")
        return dt.strptime(current_time, "%Y-%m-%d %H:%M:%S")

    def step(self, current_time: dt, env_description: str = "") -> Message:
        """
        Call this method at each time frame
        """
        self.current_time = current_time

        self.manipulated_memory = self.memory_manipulator.manipulate_memory()

        prompt = self._fill_prompt_template(env_description)

        parsed_response, reaction, target = None, None, None
        for i in range(self.max_retry):
            try:
                response = self.llm.agenerate_response(prompt)
                parsed_response = self.output_parser.parse(response)

                if "say(" in parsed_response.return_values["output"]:
                    reaction, target = eval(
                        "self._" + parsed_response.return_values["output"].strip()
                    )
                elif "act(" in parsed_response.return_values["output"]:
                    reaction, target = eval(
                        "self._" + parsed_response.return_values["output"].strip()
                    )
                elif "do_nothing(" in parsed_response.return_values["output"]:
                    reaction, target = None, None
                else:
                    raise Exception(
                        f"no valid parsed_response detected, "
                        f"cur response {parsed_response.return_values['output']}"
                    )
                break

            except Exception as e:
                logger.error(e)
                logger.warn("Retrying...")
                continue

        if parsed_response is None:
            logger.error(f"{self.name} failed to generate valid response.")

        if reaction is None:
            reaction = "Keep doing last action ..."

        message = Message(
            content="" if reaction is None else reaction,
            sender=self.name,
            receiver=self.get_receiver()
            if target is None
            else self.get_valid_receiver(target),
        )

        self.step_cnt += 1

        return message

    async def astep(self, current_time: dt, env_description: str = "") -> Message:
        """Asynchronous version of step"""
        # use environment's time to update agent's time
        self.current_time = current_time
        # Before the agent step, we check current status,
        # TODO add this func after
        # self.check_status_passive()

        self.manipulated_memory = self.memory_manipulator.manipulate_memory()

        prompt = self._fill_prompt_template(env_description)

        parsed_response, reaction, target = None, None, None
        for i in range(self.max_retry):
            try:
                response = await self.llm.agenerate_response(prompt)
                parsed_response = self.output_parser.parse(response)

                if "say(" in parsed_response.return_values["output"]:
                    reaction, target = eval(
                        "self._" + parsed_response.return_values["output"].strip()
                    )
                elif "act(" in parsed_response.return_values["output"]:
                    reaction, target = eval(
                        "self._" + parsed_response.return_values["output"].strip()
                    )
                elif "do_nothing(" in parsed_response.return_values["output"]:
                    reaction, target = None, None
                else:
                    raise Exception(
                        f"no valid parsed_response detected, "
                        f"cur response {parsed_response.return_values['output']}"
                    )

                break

            except Exception as e:
                logger.error(e)
                logger.warn("Retrying...")
                continue

        if parsed_response is None:
            logger.error(f"{self.name} failed to generate valid response.")

        if reaction is None:
            reaction = "Keep doing last action ..."

        message = Message(
            content="" if reaction is None else reaction,
            sender=self.name,
            receiver=self.get_receiver()
            if target is None
            else self.get_valid_receiver(target),
        )

        self.step_cnt += 1

        return message

    def _act(self, description=None, target=None):
        if description is None:
            return ""
        if target is None:
            reaction_content = f"{self.name} performs action: '{description}'."
        else:
            reaction_content = (
                f"{self.name} performs action to {target}: '{description}'."
            )
        # self.environment.broadcast_observations(self, target, reaction_content)
        return reaction_content, target

    def _say(self, description, target=None):
        if description is None:
            return ""
        if target is None:
            reaction_content = f"{self.name} says: '{description}'."
        else:
            reaction_content = f"{self.name} says to {target}: '{description}'."
        # self.environment.broadcast_observations(self, target, reaction_content)
        return reaction_content, target

    def get_valid_receiver(self, target: str) -> set():
        all_agents_name = []
        for agent in self.environment.agents:
            all_agents_name.append(agent.name)

        if not (target in all_agents_name):
            return {"all"}
        else:
            return {target}

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
            "role_description": self.role_description,
            "chat_history": self.memory.to_string(add_sender_prefix=True),
            "current_time": self.current_time,
            "env_description": env_description,
        }
        return Template(self.prompt_template).safe_substitute(input_arguments)

    def add_message_to_memory(self, messages: List[Message]) -> None:
        self.memory.add_message(messages)

    def reset(self, environment: BaseEnvironment) -> None:
        """Reset the agent"""
        self.environment = environment
        self.memory.reset()
        self.memory_manipulator.agent = self
        self.memory_manipulator.memory = self.memory
