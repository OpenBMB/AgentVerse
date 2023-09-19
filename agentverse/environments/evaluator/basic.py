from __future__ import annotations

from typing import TYPE_CHECKING, List, Tuple

from . import evaluator_registry
from .base import BaseEvaluator

if TYPE_CHECKING:
    from agentverse.agents import EvaluatorAgent
    from agentverse.message import EvaluatorMessage


@evaluator_registry.register("basic")
class BasicEvaluator(BaseEvaluator):
    cnt_agents: int = 0

    def step(
        self,
        agent: EvaluatorAgent,
        solution: List[str],
        result: List[str],
        task_description: str,
        all_role_description: List[str],
        *args,
        **kwargs,
    ) -> EvaluatorMessage:
        evaluation = agent.step(
            solution, result, task_description, all_role_description
        )
        return evaluation
