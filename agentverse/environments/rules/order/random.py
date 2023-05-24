from __future__ import annotations

import random
from typing import TYPE_CHECKING, List

from . import order_registry as OrderRegistry
from .base import BaseOrder

if TYPE_CHECKING:
    from agentverse.environments import BaseEnvironment


@OrderRegistry.register("random")
class RandomOrder(BaseOrder):
    """
    Order for random conversation
    The agents speak in a random order
    """

    def get_next_agent_idx(self, environment: BaseEnvironment) -> List[int]:
        return [random.randint(0, len(environment.agents) - 1)]
