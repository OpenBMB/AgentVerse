from __future__ import annotations

import random
from typing import TYPE_CHECKING, Any, List, Union

from . import visibility_registry as VisibilityRegistry
from .base import BaseVisibility

if TYPE_CHECKING:
    from agentverse.environments import BaseEnvironment


@VisibilityRegistry.register("sde_team")
class SdeTeamVisibility(BaseVisibility):
    """
    Visibility function for code problem. No need to change visibility.

    """

    def update_visible_agents(self, environment: BaseEnvironment):
        return
    
    def reset(self):
        return