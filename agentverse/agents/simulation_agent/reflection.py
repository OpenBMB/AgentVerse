from __future__ import annotations

"""
An agent based upon Observation-Planning-Reflection architecture.
"""

import ast
import re
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

    def _parse_and_call(self, output: str):
        """Safely parse LLM output and call the corresponding method.

        Replaces insecure eval() call with safe parsing.
        LLM output format: "say(description, target)" or "act(description, target)"

        Args:
            output: LLM output string to parse

        Returns:
            Tuple of (reaction, target) from the called method,
            or (None, None) if parsing fails or do_nothing
        """
        output = output.strip()

        # Check which method to call
        if output.startswith("say("):
            method_name = "_say"
            # Extract content between parentheses
            match = re.match(r"^say\(\s*(.*?)\s*\)\s*$", output, re.DOTALL)
            if not match:
                return None, None
            args_str = match.group(1)
        elif output.startswith("act("):
            method_name = "_act"
            match = re.match(r"^act\(\s*(.*?)\s*\)\s*$", output, re.DOTALL)
            if not match:
                return None, None
            args_str = match.group(1)
        elif output.startswith("do_nothing("):
            return None, None
        else:
            return None, None

        # Get the method
        method = getattr(self, method_name, None)
        if method is None:
            return None, None

        # Parse arguments safely
        try:
            if not args_str.strip():
                return method()
            # Try to parse as a literal (handles strings, numbers, etc.)
            args = ast.literal_eval(f"({args_str},)")
            return method(*args)
        except Exception:
            # Fallback: try simple string parsing for backward compatibility
            try:
                # Handle simple case: single unquoted string
                return method(args_str.strip())
            except Exception:
                return None, None

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

                reaction, target = self._parse_and_call(
                    parsed_response.return_values["output"]
                )
                if reaction is None and target is None:
                    # Check if it was a valid but unparseable output
                    output = parsed_response.return_values["output"]
                    if not any(x in output for x in ["say(", "act(", "do_nothing("]):
                        raise Exception(
                            f"no valid parsed_response detected, "
                            f"cur response {output}"
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

                reaction, target = self._parse_and_call(
                    parsed_response.return_values["output"]
                )
                if reaction is None and target is None:
                    # Check if it was a valid but unparseable output
                    output = parsed_response.return_values["output"]
                    if not any(x in output for x in ["say(", "act(", "do_nothing("]):
                        raise Exception(
                            f"no valid parsed_response detected, "
                            f"cur response {output}"
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
