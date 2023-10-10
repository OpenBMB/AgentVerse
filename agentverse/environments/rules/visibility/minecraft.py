from __future__ import annotations

from typing import TYPE_CHECKING, Any

from . import visibility_registry as VisibilityRegistry
from .base import BaseVisibility

if TYPE_CHECKING:
    from agentverse.environments import MinecraftEnvironment


@VisibilityRegistry.register("minecraft")
class MinecraftVisibility(BaseVisibility):
    def update_visible_agents(self, environment: MinecraftEnvironment):
        for i, agent in enumerate(environment.agents):
            if i % 2 == 0:
                agent.set_receiver({"all"})
            else:
                agent.set_receiver({environment.agents[i - 1].name})
