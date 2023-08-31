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


@decision_maker_registry.register("vertical")
class VerticalDecisionMaker(BaseDecisionMaker):
    """
    Discuss in a vertical manner.
    """

    async def astep(
        self,
        agents: List[BaseAgent],
        task_description: str,
        previous_solution: str = "No solution yet.",
        advice: str = "No advice yet.",
        *args,
        **kwargs,
    ) -> List[Message]:
        # Here we assume that the first agent is the solver.
        # The rest of the agents are the reviewers.
        reviews = await asyncio.gather(
            *[
                agent.astep(previous_solution, advice, task_description)
                for agent in agents[1:]
            ]
        )
        typewriter_log("Reviews:", Fore.YELLOW)
        typewriter_log(
            "\n".join(
                [
                    f"[{review.sender_agent.role_description}]: {review.criticism}"
                    for review in reviews
                ]
            ),
            Fore.YELLOW,
        )

        # reviews = [(agent, review) for agent, review in zip(agents[1:], reviews)]
        result = agents[0].step(previous_solution, reviews, advice, task_description)
        return [result]

    def reset(self):
        pass
