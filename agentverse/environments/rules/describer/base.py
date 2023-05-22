from __future__ import annotations

from typing import TYPE_CHECKING, Any, List

from pydantic import BaseModel

from . import describer_registry as DescriberRegistry
from abc import abstractmethod

if TYPE_CHECKING:
    from agentverse.environments import BaseEnvironment


class BaseDescriber(BaseModel):
    @abstractmethod
    def get_env_description(
        self, environment: BaseEnvironment, *args, **kwargs
    ) -> List[str]:
        """Return the environment description for each agent"""
        pass

    def reset(self) -> None:
        pass
