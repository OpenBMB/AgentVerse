from __future__ import annotations

from typing import TYPE_CHECKING, List, Tuple

from . import updater_registry as UpdaterRegistry
from .basic import BasicUpdater
from agentverse.message import Message

if TYPE_CHECKING:
    from agentverse.environments import BaseEnvironment


@UpdaterRegistry.register("traffic_all")
class TrafficAllUpdater(BasicUpdater):
    def update_other_coordinate(self, environment: BaseEnvironment):

        for agent in environment.agents:
            for other_agent in environment.agents:
                if agent.name == other_agent.name:
                    continue
                agent.others_coordinate[other_agent.name] = other_agent.coordinate
