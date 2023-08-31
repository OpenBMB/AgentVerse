from __future__ import annotations

from typing import TYPE_CHECKING, List, Tuple

from agentverse.agents import BaseAgent

from pydantic import BaseModel

from abc import abstractmethod


class BaseDecisionMaker(BaseModel):
    """
    The base class of decision making class.
    """

    @abstractmethod
    async def astep(
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
