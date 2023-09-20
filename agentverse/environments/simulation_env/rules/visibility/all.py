from __future__ import annotations

from typing import TYPE_CHECKING, Any

from . import visibility_registry as VisibilityRegistry
from .base import BaseVisibility

if TYPE_CHECKING:
    from agentverse.environments import BaseEnvironment


@VisibilityRegistry.register("all")
class AllVisibility(BaseVisibility):
    """All the messages can be seen by all the agents"""

    def update_visible_agents(self, environment: BaseEnvironment):
        pass
