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


@decision_maker_registry.register("concurrent")
class ConcurrentDecisionMaker(BaseDecisionMaker):
    """
    Discuss in a concurrent manner.
    """

    name: str = "concurrent"
    max_inner_turns: int = 3

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
        last_reviews = []
        for i in range(self.max_inner_turns):
            reviews: List[CriticMessage] = await asyncio.gather(
                *[
                    agent.astep(previous_plan, advice, task_description)
                    for agent in agents[1:]
                ]
            )
            logger.info("", "Reviews:", Fore.YELLOW)
            logger.info(
                "",
                "\n".join(
                    [f"[{review.sender}]: {review.content}" for review in reviews]
                ),
                Fore.YELLOW,
            )
            nonempty_reviews = []
            for review in reviews:
                if not review.is_agree and review.content != "":
                    nonempty_reviews.append(review)
            self.broadcast_messages(agents[1:], nonempty_reviews)
            if len(nonempty_reviews) == 0:
                break
            last_reviews = nonempty_reviews

        agents[0].add_message_to_memory(last_reviews)
        result = agents[0].step(previous_plan, advice, task_description)
        # agents[0].add_message_to_memory([result])
        self.broadcast_messages(agents, [result])
        return [result]

    def broadcast_messages(self, agents, messages) -> None:
        for agent in agents:
            agent.add_message_to_memory(messages)

    def p2p_messages(self, agents, messages) -> None:
        agents[0].add_message_to_memory(messages)
        for message in messages:
            for agent in agents[1:]:
                if agent.name == message.sender:
                    agent.add_message_to_memory(messages)
                    break

    def reset(self):
        pass
