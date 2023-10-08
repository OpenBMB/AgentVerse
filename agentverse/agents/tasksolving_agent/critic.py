from __future__ import annotations

import json
from colorama import Fore
from agentverse.logging import get_logger
import bdb
from string import Template
from typing import TYPE_CHECKING, List, Union

from agentverse.message import Message

from agentverse.agents import agent_registry
from agentverse.agents.base import BaseAgent
from agentverse.utils import AgentCriticism
from agentverse.message import CriticMessage

logger = get_logger()


@agent_registry.register("critic")
class CriticAgent(BaseAgent):
    max_history: int = 3
    tools: List[dict] = []
    tool_names: List[str] = []
    tool_descriptions: str = ""

    def __init__(self, *args, **kwargs):
        tool_config_file = kwargs.pop("tool_config", "")
        tools = []
        tool_names = []
        tool_descriptions = ""
        if tool_config_file != "":
            try:
                with open(tool_config_file, "r") as f:
                    tools_dict = json.load(f)
                tools = tools_dict["tools_json"]
                tool_names = [t["name"] for t in tools]
                tool_descriptions = "\n".join(
                    [f"- {t['name']}: " + t["description"] for t in tools]
                )
                kwargs.update('tools', tools)
                kwargs.update('tool_names', tool_names)
                kwargs.update('tool_descriptions', tool_descriptions)
            except Exception as e:
                logger.error(e)
                logger.warn("Failed to load tool config file.")
        super().__init__(
            *args,
            **kwargs,
        )

    def step(self, env_description: str = "") -> CriticMessage:
        pass

    async def astep(
        self,
        preliminary_solution: str,
        advice: str = "No advice yet.",
        task_description: str = "",
        all_roles: str = "",
        **kwargs,
    ) -> CriticMessage:
        """Asynchronous version of step"""
        logger.debug("", self.name, Fore.MAGENTA)
        prepend_prompt, append_prompt = self.get_all_prompts(
            preliminary_solution=preliminary_solution,
            advice=advice,
            task_description=task_description,
            role_description=self.role_description,
            agent_name=self.name,
            all_roles=all_roles,
            # tool_names=self.tool_names,
            tool_descriptions=self.tool_descriptions,
        )
        history = self.memory.to_messages(self.name, start_index=-self.max_history)
        parsed_response: Union[AgentCriticism, None] = None
        for i in range(self.max_retry):
            try:
                response = await self.llm.agenerate_response(
                    prepend_prompt, history, append_prompt
                )
                parsed_response = self.output_parser.parse(response)
                break
            except (KeyboardInterrupt, bdb.BdbQuit):
                raise
            except Exception as e:
                logger.error(e)
                logger.warn("Retrying...")
                continue

        if parsed_response is None:
            logger.error(f"{self.name} failed to generate valid response.")

        message = CriticMessage(
            content=parsed_response.criticism if parsed_response is not None else "",
            sender=self.name,
            sender_agent=self,
            is_agree=parsed_response.is_agree if parsed_response is not None else False,
        )
        return message

    def _fill_prompt_template(
        self, preliminary_solution: str, advice: str, task_description: str
    ) -> str:
        """Fill the placeholders in the prompt template

        In the conversation agent, three placeholders are supported:
        - ${role_description}
        - ${task_description}
        - ${preliminary_solution}
        - ${advice}
        """
        input_arguments = {
            "role_description": self.role_description,
            "task_description": task_description,
            "preliminary_solution": preliminary_solution,
            "advice": advice,
        }
        return Template(self.prompt_template).safe_substitute(input_arguments)

    def add_message_to_memory(self, messages: List[Message]) -> None:
        self.memory.add_message(messages)

    def reset(self) -> None:
        """Reset the agent"""
        self.memory.reset()
        # TODO: reset receiver
