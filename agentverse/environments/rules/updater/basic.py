from __future__ import annotations

from typing import TYPE_CHECKING, List, Tuple

from . import updater_registry as UpdaterRegistry
from .base import BaseUpdater
from agentverse.message import Message

if TYPE_CHECKING:
    from agentverse.environments import BaseEnvironment
    from agentverse.agents import BaseAgent


@UpdaterRegistry.register("basic")
class BasicUpdater(BaseUpdater):
    """
    The basic version of updater.
    The messages will be seen by all the receiver specified in the message.
    """

    def update_memory(self, environment: BaseEnvironment):
        added = False
        for message in environment.last_messages:
            if len(message.tool_response) > 0:
                self.add_tool_response(
                    message.sender, environment.agents, message.tool_response
                )
            if message.content == "":
                continue
            added |= self.add_message_to_all_agents(environment.agents, message)
        # If no one speaks in this turn. Add an empty message to all agents
        if not added:
            for agent in environment.agents:
                agent.add_message_to_memory([Message(content="[Silence]")])

    def add_tool_response(
        self,
        name: str,
        agents: List[BaseAgent],
        tool_response: List[str],
    ):
        for agent in agents:
            if agent.name != name:
                continue
            if agent.tool_memory is not None:
                agent.tool_memory.add_message(tool_response)
            break

    def add_message_to_all_agents(
        self, agents: List[BaseAgent], message: Message
    ) -> bool:
        if "all" in message.receiver:
            # If receiver is all, then add the message to all agents
            for agent in agents:
                agent.add_message_to_memory([message])
            return True
        else:
            # If receiver is not all, then add the message to the specified agents
            receiver_set = message.receiver
            for agent in agents:
                if agent.name in receiver_set:
                    agent.add_message_to_memory([message])
                    receiver_set.remove(agent.name)
            if len(receiver_set) > 0:
                missing_receiver = ", ".join(list(receiver_set))
                raise ValueError(
                    "Receiver {} not found. Message discarded".format(missing_receiver)
                )
            return True
