from __future__ import annotations

from typing import TYPE_CHECKING, Any, List

from . import describer_registry as DescriberRegistry
from .base import BaseDescriber

if TYPE_CHECKING:
    from agentverse.environments import BaseEnvironment


@DescriberRegistry.register("basic")
class BasicDescriber(BaseDescriber):
    def get_env_description(self, environment: BaseEnvironment) -> List[str]:
        """Return the environment description for each agent"""
        return ["" for _ in range(len(environment.agents))]
