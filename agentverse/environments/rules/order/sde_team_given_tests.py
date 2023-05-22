from __future__ import annotations

import logging
import re
import random
from typing import TYPE_CHECKING, Any, List, Optional

from . import order_registry as OrderRegistry
from .base import BaseOrder

if TYPE_CHECKING:
    from agentverse.environments import BaseEnvironment


@OrderRegistry.register("sde_team_given_tests")
class SdeTeamGivenTestsOrder(BaseOrder):
    """The order for a code problem solving given unit tests
    """
    next_agent_idx: int = 0
    
    def get_next_agent_idx(self, environment: BaseEnvironment) -> List[int]:
        if self.next_agent_idx == 0:
            self.next_agent_idx = 1
            return [0]
        elif self.next_agent_idx == 1:
            self.next_agent_idx = 0
            return [1]