from __future__ import annotations
import asyncio
from colorama import Fore

from typing import TYPE_CHECKING, List

from . import decision_maker_registry
from .base import BaseDecisionMaker
from agentverse.logging import typewriter_log, logger
from agentverse.message import Message

if TYPE_CHECKING:
    from agentverse.agents import BaseAgent, SolverAgent, CriticAgent
    from agentverse.message import SolverMessage


@decision_maker_registry.register("central")
class CentralDecisionMaker(BaseDecisionMaker):
    """
    Discuss in a central manner.
    """

    name: str = "central"

    async def astep(
        self,
        agents: List[BaseAgent],
        task_description: str,
        previous_plan: str = "No solution yet.",
        advice: str = "No advice yet.",
        *args,
        **kwargs,
    ) -> List[SolverMessage]:
        if advice != "No advice yet.":
            agents[1].add_message_to_memory(
                [Message(content=advice, sender="Evaluator")]
            )
        result = await agents[1].astep(
            previous_plan,
            advice,
            task_description,
            roles=", ".join(
                [
                    agent.role_description[0].lower() + agent.role_description[1:]
                    for agent in agents
                ]
            ),
        )
        agents[1].add_message_to_memory([result])
        result = agents[0].step(
            previous_plan, advice, task_description, chat_record=result.content
        )
        return [result]

    def reset(self):
        pass
