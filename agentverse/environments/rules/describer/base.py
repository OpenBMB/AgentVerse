from __future__ import annotations

from typing import TYPE_CHECKING, Any, List

from pydantic import BaseModel

from . import describer_registry as DescriberRegistry

if TYPE_CHECKING:
    from agentverse.environments import BaseEnvironment


@DescriberRegistry.register("base")
class BaseDescriber(BaseModel):
    def get_env_description(self, environment: BaseEnvironment) -> List[str]:
        """Return the environment description for each agent"""
        return ["" for _ in range(len(environment.agents))]

    def reset(self) -> None:
        pass
