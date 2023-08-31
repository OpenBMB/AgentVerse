from __future__ import annotations

from typing import TYPE_CHECKING, List

from . import role_assigner_registry
from .base import BaseRoleAssigner

if TYPE_CHECKING:
    from agentverse.agents.base import BaseAgent


@role_assigner_registry.register("role_description")
class DescriptionAssigner(BaseRoleAssigner):
    """
    Generates descriptions for each agent.
    """

    cnt_agents: int = 0

    def step(
        self,
        role_assigner: BaseAgent,
        group_members: List[BaseAgent],
        advice: str = "No advice yet.",
        task_description: str = "",
        *args,
        **kwargs,
    ) -> List[BaseAgent]:
        assert task_description != ""
        assert self.cnt_agents > 0

        roles = role_assigner.step(advice, task_description, self.cnt_agents)
        if len(roles) != len(group_members):
            raise ValueError(
                f"Number of roles ({len(roles)}) and number of group members ({len(group_members)}) do not match."
            )
        for role, member in zip(roles, group_members):
            member.role_description = role.strip().strip(".")
        return group_members

    def reset(self):
        pass
