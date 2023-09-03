from __future__ import annotations

from typing import TYPE_CHECKING, List, Tuple

from agentverse.agents import BaseAgent

from pydantic import BaseModel

from abc import abstractmethod

if TYPE_CHECKING:
    from agentverse.message import SolverMessage


class BaseDecisionMaker(BaseModel):
    """
    The base class of decision making class.
    """

    name: str = "base"

    @abstractmethod
    async def astep(
        self,
        agents: List[BaseAgent],
        task_description: str,
        previous_plan: str = "No solution yet.",
        advice: str = "No advice yet.",
        *args,
        **kwargs,
    ) -> SolverMessage:
        pass

    def reset(self):
        pass
