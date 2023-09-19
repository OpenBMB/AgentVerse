from __future__ import annotations

from abc import abstractmethod
from typing import TYPE_CHECKING, List, Tuple

from pydantic import BaseModel

if TYPE_CHECKING:
    from agentverse.agents import EvaluatorAgent
    from agentverse.message import EvaluatorMessage

from . import evaluator_registry


class BaseEvaluator(BaseModel):
    """
    The base class of execution.
    """

    @abstractmethod
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
        pass

    def reset(self):
        pass


@evaluator_registry.register("none")
class NoneEvaluator(BaseEvaluator):
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
        result = EvaluatorMessage(score=0, advice=result)
        return result
