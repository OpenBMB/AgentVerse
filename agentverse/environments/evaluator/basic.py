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
        result: List[str] | str,
        task_description: str,
        *args,
        **kwargs,
    ) -> EvaluatorMessage:
        evaluation = agent.step(result, task_description)
        return evaluation
