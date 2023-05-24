from __future__ import annotations

from typing import TYPE_CHECKING, List

from . import order_registry as OrderRegistry
from .base import BaseOrder

if TYPE_CHECKING:
    from agentverse.environments import BaseEnvironment


@OrderRegistry.register("concurrent")
class ConcurrentOrder(BaseOrder):
    """
    The agents speak concurrently
    """

    def get_next_agent_idx(self, environment: BaseEnvironment) -> List[int]:
        return list(range(len(environment.agents)))
