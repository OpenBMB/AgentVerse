import logging
from string import Template
from typing import List, NamedTuple, Optional, Union

from langchain.tools import BaseTool
from pydantic import Field


from agentverse.memory import BaseMemory, ChatHistoryMemory
from agentverse.message import Message
from agentverse.utils import AgentAction, AgentFinish

#from . import agent_registry
#from .base import BaseAgent

from agentverse.agents import agent_registry
from agentverse.agents.base import BaseAgent

class ToolNotExistError(BaseException):
    """Exception raised when parsing output from a command fails."""

    def __init__(self, tool_name=""):
        self.tool_name = tool_name

    def __str__(self):
        return f"Tool {self.tool_name} does not exist."


@agent_registry.register("tool")
class ToolAgent(BaseAgent):
    tools: List[BaseTool] = Field(default=[])
    tool_memory: BaseMemory = Field(default_factory=ChatHistoryMemory)
    verbose: bool = Field(default=False)

    def step(self, env_description: str = "") -> Message:
        parsed_response = None
        tool_observation = [self.tool_memory.to_string()]
        while True:
            prompt = self._fill_prompt_template(env_description, tool_observation)

            for i in range(self.max_retry):
                try:
                    response = self.llm.generate_response(prompt)
                    parsed_response = self.output_parser.parse(response)
                    if isinstance(parsed_response, AgentAction):
                        observation = self._call_tool(parsed_response)
                        tool_observation.append(
                            parsed_response.log.strip()
                            + f"\nObservation: {observation.strip()}"
                        )
                    break
                except BaseException as e:
                    logging.error(e)
                    logging.warning("Retrying...")
                    continue
            if parsed_response is None or isinstance(parsed_response, AgentFinish):
                break

        if parsed_response is None:
            logging.error(f"{self.name} failed to generate valid response.")

        self._update_tool_memory(tool_observation)

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
        parsed_response = None
        # Initialize the tool_observation with tool_memory
        tool_observation = [self.tool_memory.to_string()]
        while True:
            prompt = self._fill_prompt_template(env_description, tool_observation)

            for i in range(self.max_retry):
                try:
                    response = await self.llm.agenerate_response(prompt)
                    parsed_response = self.output_parser.parse(response)
                    if isinstance(parsed_response, AgentAction):
                        # If the response is an action, call the tool
                        # and append the observation to tool_observation
                        observation = await self._acall_tool(parsed_response)
                        tool_observation.append(
                            parsed_response.log.strip()
                            + f"\nObservation: {observation.strip()}"
                        )
                    break
                except BaseException as e:
                    logging.error(e)
                    logging.warning("Retrying...")
                    continue
            if parsed_response is None or isinstance(parsed_response, AgentFinish):
                break

        if parsed_response is None:
            logging.error(f"{self.name} failed to generate valid response.")

        self._update_tool_memory(tool_observation)

        message = Message(
            content=""
            if parsed_response is None
            else parsed_response.return_values["output"],
            sender=self.name,
            receiver=self.get_receiver(),
        )
        return message

    def _call_tool(self, response: NamedTuple) -> str:
        """Call a tool and return the output"""
        name_to_tool = {tool.name: tool for tool in self.tools}
        if response.tool not in name_to_tool:
            raise ToolNotExistError(response.tool)
        tool = name_to_tool[response.tool]
        observation = tool.run(response.tool_input, verbose=self.verbose)
        return observation

    async def _acall_tool(self, response: NamedTuple) -> str:
        """Call a tool and return the output"""
        name_to_tool = {tool.name: tool for tool in self.tools}
        if response.tool not in name_to_tool:
            raise ToolNotExistError(response.tool)
        tool = name_to_tool[response.tool]
        observation = await tool.arun(response.tool_input, verbose=self.verbose)
        return observation

    def _update_tool_memory(self, tool_observation: List[str]):
        """Update the memory of the tool"""
        if len(tool_observation) == 1:
            # If no tool is called this turn, do nothing
            return
        messages = [
            Message(content=observation) for observation in tool_observation[1:]
        ]
        self.tool_memory.add_message(messages)

    def _fill_prompt_template(
        self, env_description: str = "", tool_observation: List[str] = []
    ) -> str:
        """Fill the placeholders in the prompt template

        In the tool agent, these placeholders are supported:
        - ${agent_name}: the name of the agent
        - ${env_description}: the description of the environment
        - ${role_description}: the description of the role of the agent
        - ${chat_history}: the chat history of the agent
        - ${tools}: the list of tools and their usage
        - ${tool_names}: the list of tool names
        - ${tool_observations}: the observation of the tool in this turn
        """
        tools = "\n".join([f"> {tool.name}: {tool.description}" for tool in self.tools])
        tools = tools.replace("{{", "{").replace("}}", "}")
        tool_names = ", ".join([tool.name for tool in self.tools])
        input_arguments = {
            "agent_name": self.name,
            "env_description": env_description,
            "role_description": self.role_description,
            "chat_history": self.memory.to_string(add_sender_prefix=True),
            "tools": tools,
            "tool_names": tool_names,
            "tool_observation": "\n".join(tool_observation),
        }
        return Template(self.prompt_template).safe_substitute(input_arguments)

    def add_message_to_memory(self, messages: List[Message]) -> None:
        self.memory.add_message(messages)

    def reset(self) -> None:
        """Reset the agent"""
        self.memory.reset()
        # TODO: reset receiver
