from __future__ import annotations

from typing import TYPE_CHECKING, List

from . import decision_maker_registry
from .base import BaseDecisionMaker

if TYPE_CHECKING:
    from agentverse.agents.base import BaseAgent


@decision_maker_registry.register("horizontal")
class HorizontalDecisionMaker(BaseDecisionMaker):
    """
    Discuss in a horizontal manner.
    """

    def step(
        self,
        agents: List[BaseAgent],
        task_description: str,
        previous_plan: str = "No solution yet.",
        advice: str = "No advice yet.",
        *args,
        **kwargs,
    ) -> List[str]:
        pass

    def reset(self):
        pass
