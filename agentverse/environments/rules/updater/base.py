from __future__ import annotations

from typing import TYPE_CHECKING, List, Tuple

from pydantic import BaseModel

# from agentverse.agents import Agent
from abc import abstractmethod

from . import updater_registry as UpdaterRegistry

if TYPE_CHECKING:
    from agentverse.environments import BaseEnvironment


@UpdaterRegistry.register("base")
class BaseUpdater(BaseModel):
    """
    The base class of updater class.
    """

    @abstractmethod
    def update_memory(self, environment: BaseEnvironment):
        pass

    def reset(self):
        pass
