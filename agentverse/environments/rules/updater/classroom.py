from __future__ import annotations

from typing import TYPE_CHECKING, List, Tuple

from . import updater_registry as UpdaterRegistry
from .base import BaseUpdater

if TYPE_CHECKING:
    from agentverse.environments import BaseEnvironment


@UpdaterRegistry.register("classroom")
class ClassroomUpdater(BaseUpdater):
    def update_memory(self, environment: BaseEnvironment):
        added = False
        for message in environment.last_messages:
            if len(message.tool_response) > 0:
                self.add_tool_response(message.sender, environment.agents, message.tool_response)
            if message.content == "":
                continue
            added |= self.add_message_to_all_agents(environment.agents, message)
        # If no one speaks in this turn. Add an empty message to all agents
        if not added:
            for agent in environment.agents:
                agent.memory.add_user_message("[Silence]")
        if environment.rule_params.get("is_grouped", False):
            # When discussing, telling the professor that the group is discussing
            environment.agents[0].memory.add_user_message("[Discussing]")
