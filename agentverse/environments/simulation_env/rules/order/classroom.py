from __future__ import annotations

import logging
import re
from typing import TYPE_CHECKING, Any, List, Optional

from . import order_registry as OrderRegistry
from .base import BaseOrder

if TYPE_CHECKING:
    from agentverse.environments import BaseEnvironment


@OrderRegistry.register("classroom")
class ClassroomOrder(BaseOrder):
    """The order for a classroom discussion
    The agents speak in the following order:
    1. The professor speaks first
    2. Then the professor can continue to speak, and the students can raise hands
    3. The professor can call on a student, then the student can speak or ask a question
    4. In the group discussion, the students in the group can speak in turn
    """

    def get_next_agent_idx(self, environment: BaseEnvironment) -> List[int]:
        # `is_grouped_ended`: whether the group discussion just ended
        # `is_grouped`: whether it is currently in a group discussion
        if environment.rule_params.get("is_grouped_ended", False):
            return [0]
        if environment.rule_params.get("is_grouped", False):
            return self.get_next_agent_idx_grouped(environment)
        else:
            return self.get_next_agent_idx_ungrouped(environment)

    def get_next_agent_idx_ungrouped(self, environment: BaseEnvironment) -> List[int]:
        if len(environment.last_messages) == 0:
            # If the class just begins or no one speaks in the last turn, we let only the professor speak
            return [0]
        elif len(environment.last_messages) == 1:
            message = environment.last_messages[0]
            sender = message.sender
            content = message.content
            if sender.startswith("Professor"):
                if content.startswith("[CallOn]"):
                    # 1. professor calls on someone, then the student should speak
                    result = re.search(r"\[CallOn\] Yes, ([sS]tudent )?(\w+)", content)
                    if result is not None:
                        name_to_id = {
                            agent.name[len("Student ") :]: i
                            for i, agent in enumerate(environment.agents)
                        }
                        return [name_to_id[result.group(2)]]
                else:
                    # 2. professor normally speaks, then anyone can act
                    return list(range(len(environment.agents)))
            elif sender.startswith("Student"):
                # 3. student ask question after being called on, or
                # 4. only one student raises hand, and the professor happens to listen
                # 5. the group discussion is just over, and there happens to be only a student speaking in the last turn
                return [0]
        else:
            # If len(last_messages) > 1, then
            # 1. there must be at least one student raises hand or speaks.
            # 2. the group discussion is just over.
            return [0]
        assert (
            False
        ), f"Should not reach here, last_messages: {environment.last_messages}"

    def get_next_agent_idx_grouped(self, environment: BaseEnvironment) -> List[int]:
        # Get the grouping information
        # groups: A list of list of agent ids, the i-th list contains
        #   the agent ids in the i-th group
        # group_speaker_mapping: A mapping from group id to the id of
        #   the speaker in the group
        # `groups` should be set in the corresponding `visibility`,
        # and `group_speaker_mapping` should be maintained here.
        if "groups" not in environment.rule_params:
            logging.warning(
                "The environment is grouped, but the grouping information is not provided."
            )
        groups = environment.rule_params.get(
            "groups", [list(range(len(environment.agents)))]
        )
        group_speaker_mapping = environment.rule_params.get(
            "group_speaker_mapping", {i: 0 for i in range(len(groups))}
        )

        # For grouped environment, we let the students speak in turn within each group
        next_agent_idx = []
        for group_id in range(len(groups)):
            speaker_index = group_speaker_mapping[group_id]
            speaker = groups[group_id][speaker_index]
            next_agent_idx.append(speaker)

        # Maintain the `group_speaker_mapping`
        for k, v in group_speaker_mapping.items():
            group_speaker_mapping[k] = (v + 1) % len(groups[k])
        environment.rule_params["group_speaker_mapping"] = group_speaker_mapping

        return next_agent_idx
