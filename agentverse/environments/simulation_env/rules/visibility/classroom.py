from __future__ import annotations

import random
from typing import TYPE_CHECKING, Any, List, Union

from . import visibility_registry as VisibilityRegistry
from .base import BaseVisibility

if TYPE_CHECKING:
    from agentverse.environments import BaseEnvironment


@VisibilityRegistry.register("classroom")
class ClassroomVisibility(BaseVisibility):
    """
    Visibility function for classroom, supports group discussion.

    Args:
        student_per_group:
            The number of students per group.
        num_discussion_turn:
            The number of turns for group discussion.
        grouping:
            The grouping information. If it is a string, then it should be a
            grouping method, options are ["random", "sequential"]. If it is a
            list of list of int, then it should be the grouping information.
    """

    grouping: Union[str, List[List[int]]]
    student_per_group: int = 4
    num_discussion_turn: int = 5
    current_turn: int = 0

    def update_visible_agents(self, environment: BaseEnvironment):
        # We turn on grouping mode when the professor launches a group discussion
        if len(environment.last_messages) == 1 and environment.last_messages[
            0
        ].content.startswith("[GroupDiscuss]"):
            environment.rule_params["is_grouped"] = True
            # We randomly group the students
            environment.rule_params["groups"] = self.group_students(environment)
            # Update the receiver for each agent
            self.update_receiver(environment)
        else:
            # If now in grouping mode, then we check if the group discussion is over
            if environment.rule_params.get("is_grouped", False):
                self.current_turn += 1
                if self.current_turn >= self.num_discussion_turn:
                    self.reset()
                    environment.rule_params["is_grouped"] = False
                    environment.rule_params["is_grouped_ended"] = True
                    self.update_receiver(environment, reset=True)

    def group_students(self, environment: BaseEnvironment) -> List[List[int]]:
        if isinstance(self.grouping, str):
            student_index = list(range(1, len(environment.agents)))
            result = []
            if self.grouping == "random":
                random.shuffle(student_index)
                for i in range(0, len(student_index), self.student_per_group):
                    result.append(student_index[i : i + self.student_per_group])
            elif self.grouping == "sequential":
                for i in range(0, len(student_index), self.student_per_group):
                    result.append(student_index[i : i + self.student_per_group])
            else:
                raise ValueError(f"Unsupported grouping method {self.grouping}")
            return result
        else:
            # If the grouping information is provided, then we use it directly
            return self.grouping

    def update_receiver(self, environment: BaseEnvironment, reset=False):
        if reset:
            for agent in environment.agents:
                agent.set_receiver(set({"all"}))
        else:
            groups = environment.rule_params["groups"]
            for group in groups:
                group_name = set({environment.agents[i].name for i in group})
                for agent_id in group:
                    environment.agents[agent_id].set_receiver(group_name)

    def reset(self):
        self.current_turn = 0
