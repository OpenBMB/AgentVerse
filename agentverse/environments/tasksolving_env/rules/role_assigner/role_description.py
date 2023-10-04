from __future__ import annotations

from typing import TYPE_CHECKING, List

from . import role_assigner_registry
from .base import BaseRoleAssigner

if TYPE_CHECKING:
    from agentverse.message import RoleAssignerMessage
    from agentverse.agents import CriticAgent, RoleAssignerAgent


@role_assigner_registry.register("role_description")
class DescriptionAssigner(BaseRoleAssigner):
    """
    Generates descriptions for each agent.
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
        assert task_description != ""
        assert len(group_members) > 0

        roles = role_assigner.step(advice, task_description, len(group_members))
        if len(roles.content) < len(group_members):
            raise ValueError(
                f"Number of roles ({len(roles.content)}) and number of group members ({len(group_members)}) do not match."
            )
        for role, member in zip(roles.content[: len(group_members)], group_members):
            description = role.strip().strip(".")
            member.role_description = description
            member.name = description

        return group_members

    def reset(self):
        pass


@role_assigner_registry.register("role_description_name")
class DescriptionNameAssigner(BaseRoleAssigner):
    """
    Generates description and name for each agent.
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
        assert task_description != ""
        assert len(group_members) > 0

        # roles: [{'name': 'xxx', 'description': 'xxx'}, ...]
        roles = role_assigner.step(advice, task_description, len(group_members))

        if len(group_members) < 2:
            pass
        else:
            if len(roles.content) != len(group_members):
                raise ValueError(
                    f"Number of roles ({len(roles.content)}) and number of group members ({len(group_members)}) do not match."
                )

        for role_dict, member in zip(roles.content, group_members):
            description = role_dict["description"].strip().strip(".")
            member.role_description = description
            member.name = role_dict["name"].strip()

        return group_members
