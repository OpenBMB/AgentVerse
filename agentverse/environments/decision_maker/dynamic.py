
from __future__ import annotations
import asyncio
from colorama import Fore

from typing import TYPE_CHECKING, List

from . import decision_maker_registry
from .base import BaseDecisionMaker
from agentverse.logging import typewriter_log

if TYPE_CHECKING:
    from agentverse.agents.base import BaseAgent
    from agentverse.message import Message


@decision_maker_registry.register("dynamic")
class DynamicDecisionMaker(BaseDecisionMaker):
    """
    Discuss in a horizontal manner.
    """

    ## To Do: implement dynamic
    #def step(
    async def astep(
        self,
        agents: List[BaseAgent],
        task_description: str,
        previous_plan: str = "No solution yet.",
        advice: str = "No advice yet.",
        *args,
        **kwargs,
    ) -> List[str]:
        pass


    def reset(self):
        pass
