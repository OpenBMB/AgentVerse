from __future__ import annotations

from typing import TYPE_CHECKING, List, Tuple

from agentverse.agents import BaseAgent

from pydantic import BaseModel

from abc import abstractmethod


class BaseRoleAssigner(BaseModel):
    """
    The base class of role assignment class.
    """

    @abstractmethod
    def step(
        self,
        role_assigner: BaseAgent,
        group_members: List[BaseAgent],
        advice: str = "No advice yet.",
        task_description: str = "",
        *args,
        **kwargs,
    ) -> List[str]:
        pass

    def reset(self):
        pass
