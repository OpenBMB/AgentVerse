from __future__ import annotations

from typing import TYPE_CHECKING, List, Tuple

from agentverse.agents import BaseAgent

from pydantic import BaseModel

from abc import abstractmethod
from . import role_assigner_registry

if TYPE_CHECKING:
    from agentverse.agents import RoleAssignerAgent, CriticAgent


class BaseRoleAssigner(BaseModel):
    """
    The base class of role assignment class.
    """

    @abstractmethod
    def step(
        self,
        role_assigner: RoleAssignerAgent,
        group_members: List[CriticAgent],
        advice: str = "No advice yet.",
        task_description: str = "",
        *args,
        **kwargs,
    ) -> List[CriticAgent]:
        pass

    def reset(self):
        pass


@role_assigner_registry.register("dummy")
class DummyRoleAssigner(BaseRoleAssigner):
    """
    The base class of role assignment class.
    """

    def step(
        self,
        role_assigner: RoleAssignerAgent,
        group_members: List[CriticAgent],
        advice: str = "No advice yet.",
        task_description: str = "",
        *args,
        **kwargs,
    ) -> List[CriticAgent]:
        return group_members

    def reset(self):
        pass
