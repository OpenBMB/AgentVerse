from __future__ import annotations

from abc import abstractmethod
from typing import TYPE_CHECKING, Any

from pydantic import BaseModel

if TYPE_CHECKING:
    from agentverse.environments import BaseEnvironment


class BaseVisibility(BaseModel):
    @abstractmethod
    def update_visible_agents(self, environment: BaseEnvironment):
        """Update the set of visible agents for the agent"""

    def reset(self):
        pass
