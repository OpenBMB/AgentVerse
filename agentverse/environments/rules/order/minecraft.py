from __future__ import annotations

from typing import TYPE_CHECKING, List

from . import order_registry as OrderRegistry
from .base import BaseOrder

if TYPE_CHECKING:
    from agentverse.environments import MinecraftEnvironment


@OrderRegistry.register("minecraft")
class MinecraftOrder(BaseOrder):
    """
    Order for minecraft environment
    """

    next_index: int = 0
    discussion_round: int = 0
    total_discussion_round: int = 8

    def get_next_agent_idx(self, environment: MinecraftEnvironment) -> List[int]:
        if environment.rule_params["status"] == "discussion":
            index = self.next_index
            self.next_index = (self.next_index + 1) % len(environment.agents)
            self.discussion_round += 1
            if self.discussion_round == self.total_discussion_round:
                environment.rule_params["status"] = "summarization"
                self.discussion_round = 0
                # self.next_index = 0
            return [index]
        elif environment.rule_params["status"] in ["execution", "summarization"]:
            if environment.rule_params["status"] == "summarization":
                self.discussion_round = 0
                environment.rule_params["status"] = "execution"
            else:
                environment.rule_params["status"] = "discussion"
            return [i for i in range(len(environment.agents))]
        else:
            raise NotImplementedError(
                f"Invalid status {environment.rule_params['status']}"
            )
