from __future__ import annotations

from typing import TYPE_CHECKING, List

from . import order_registry as OrderRegistry
from .base import BaseOrder

if TYPE_CHECKING:
    from agentverse.environments import BaseEnvironment


@OrderRegistry.register("sequential")
class SequentialOrder(BaseOrder):
    """
    Order for sequential conversation
    The agents speak in a round-robin fashion
    """

    next_agent_idx: int = 0

    def get_next_agent_idx(self, environment: BaseEnvironment) -> List[int]:
        """Return the index of the next agent to speak"""
        ret = self.next_agent_idx
        self.next_agent_idx = (self.next_agent_idx + 1) % len(environment.agents)
        return [ret]

    def reset(self) -> None:
        self.next_agent_idx = 0
