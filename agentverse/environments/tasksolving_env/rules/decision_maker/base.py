from __future__ import annotations

from typing import TYPE_CHECKING, List, Tuple

from agentverse.agents import BaseAgent

from pydantic import BaseModel

from abc import abstractmethod

if TYPE_CHECKING:
    from agentverse.message import SolverMessage


class BaseDecisionMaker(BaseModel):
    """
    The base class of decision making class.
    """

    name: str = "base"

    @abstractmethod
    async def astep(
        self,
        agents: List[BaseAgent],
        task_description: str,
        previous_plan: str = "No solution yet.",
        advice: str = "No advice yet.",
        *args,
        **kwargs,
    ) -> SolverMessage:
        pass

    def reset(self):
        pass

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
