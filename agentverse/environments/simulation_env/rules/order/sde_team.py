from __future__ import annotations

import logging
import re
import random
from typing import TYPE_CHECKING, Any, List, Optional

from . import order_registry as OrderRegistry
from .base import BaseOrder

if TYPE_CHECKING:
    from agentverse.environments import BaseEnvironment


@OrderRegistry.register("sde_team")
class SdeTeamOrder(BaseOrder):
    """The order for a code problem solving
    """
    next_agent_idx: int = 2
    
    def get_next_agent_idx(self, environment: BaseEnvironment) -> List[int]:
        if self.next_agent_idx == 2:
            self.next_agent_idx = 0
            return [2] * 5 # TODO set the number in yaml
        elif self.next_agent_idx == 0:
            self.next_agent_idx = 1
            return [0]
        elif self.next_agent_idx == 1:
            self.next_agent_idx = 0
            return [1]