from __future__ import annotations

from typing import TYPE_CHECKING, Any, List
from string import Template

from . import describer_registry as DescriberRegistry
from .basic import BasicDescriber

if TYPE_CHECKING:
    from agentverse.environments import BaseEnvironment


@DescriberRegistry.register("classroom")
class ClassroomDescriber(BasicDescriber):
    start_prompt: str
    end_prompt: str

    def get_env_description(self, environment: BaseEnvironment) -> List[str]:
        if not environment.rule_params.get("is_grouped", False):
            if environment.rule_params.get("is_grouped_ended", False):
                # If the group discussion is just ended
                environment.rule_params["is_grouped_ended"] = False
                return [self.end_prompt for _ in range(len(environment.agents))]
            else:
                return super().get_env_description(environment)
        description = []
        for i, agent in enumerate(environment.agents):
            if i == 0:
                # Professor will not participate in group discussion
                description.append("")
            else:
                description.append(
                    Template(self.start_prompt).safe_substitute(
                        {"receiver_name": ", ".join(agent.receiver)}
                    )
                )
        return description

    def reset(self) -> None:
        pass
