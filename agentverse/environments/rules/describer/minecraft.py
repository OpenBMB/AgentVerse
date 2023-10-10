from __future__ import annotations

from typing import TYPE_CHECKING, Any, List

from . import describer_registry as DescriberRegistry
from .base import BaseDescriber

if TYPE_CHECKING:
    from agentverse.environments import MinecraftEnvironment


@DescriberRegistry.register("minecraft")
class MinecraftDescriber(BaseDescriber):
    total_discussion_round: int = 8

    def get_env_description(self, environment: MinecraftEnvironment) -> List[str]:
        """Return the environment description for each agent"""
        return [
            f"(Round {(environment.cnt_turn+1) % (self.total_discussion_round+2)}/{self.total_discussion_round})"
            for _ in environment.agents
        ]
