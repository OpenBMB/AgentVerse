from __future__ import annotations

from typing import TYPE_CHECKING, Any

from . import visibility_registry as VisibilityRegistry
from .base import BaseVisibility

if TYPE_CHECKING:
    from agentverse.environments import BaseEnvironment


@VisibilityRegistry.register("oneself")
class OneselfVisibility(BaseVisibility):
    """Only the agent itself can see the message"""

    def update_visible_agents(self, environment: BaseEnvironment):
        for agent in environment.agents:
            agent.set_receiver(set({agent.name}))
