from __future__ import annotations
import asyncio
from colorama import Fore

from typing import TYPE_CHECKING, List

from . import decision_maker_registry
from .base import BaseDecisionMaker
from agentverse.logging import typewriter_log, logger

if TYPE_CHECKING:
    from agentverse.agents import BaseAgent, SolverAgent, CriticAgent
    from agentverse.message import Message, CriticMessage, SolverMessage


@decision_maker_registry.register("vertical")
class VerticalDecisionMaker(BaseDecisionMaker):
    """
    Discuss in a vertical manner.
    """

    name: str = "vertical"

    async def astep(
        self,
        agents: List[BaseAgent],
        task_description: str,
        previous_plan: str = "No solution yet.",
        advice: str = "No advice yet.",
        *args,
        **kwargs,
    ) -> List[SolverMessage]:
        # Here we assume that the first agent is the solver.
        # The rest of the agents are the reviewers.
        reviews: List[CriticMessage] = await asyncio.gather(
            *[
                agent.astep(previous_plan, advice, task_description)
                for agent in agents[1:]
            ]
        )
        logger.info("", "Reviews:", Fore.YELLOW)
        logger.info(
            "",
            "\n".join([f"[{review.sender}]: {review.content}" for review in reviews]),
            Fore.YELLOW,
        )

        nonempty_reviews = []
        for review in reviews:
            if not review.is_agree and review.content != "":
                nonempty_reviews.append(review)
        agents[0].add_message_to_memory(nonempty_reviews)
        result = agents[0].step(previous_plan, advice, task_description)
        agents[0].add_message_to_memory([result])
        return [result]

    def reset(self):
        pass
