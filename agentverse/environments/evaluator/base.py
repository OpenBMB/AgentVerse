from __future__ import annotations

from abc import abstractmethod
from typing import TYPE_CHECKING, List, Tuple

from pydantic import BaseModel

from agentverse.message import EvaluatorMessage

if TYPE_CHECKING:
    from agentverse.agents import EvaluatorAgent
    from agentverse.message import EvaluatorMessage, SolverMessage, ExecutorMessage

from . import evaluator_registry


class BaseEvaluator(BaseModel):
    """
    The base class of execution.
    """

    @abstractmethod
    def step(
        self,
        agent: EvaluatorAgent,
        solution: List[SolverMessage],
        result: List[ExecutorMessage],
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
        solution: List[SolverMessage],
        result: List[ExecutorMessage],
        task_description: str,
        all_role_description: List[str],
        *args,
        **kwargs,
    ) -> EvaluatorMessage:
        result = EvaluatorMessage(
            score=0, advice="\n".join([r.content for r in result])
        )
        return result


@evaluator_registry.register("dummy")
class DummyEvaluator(BaseEvaluator):
    def step(
        self,
        agent: EvaluatorAgent,
        solution: List[SolverMessage],
        result: List[ExecutorMessage],
        task_description: str,
        all_role_description: List[str],
        *args,
        **kwargs,
    ) -> EvaluatorMessage:
        result = EvaluatorMessage(score=1, advice="")
        return result


@evaluator_registry.register("dummy")
class DummyEvaluator(BaseEvaluator):
    def step(
        self,
        agent: EvaluatorAgent,
        solution: List[str] | str,
        result: List[str] | str,
        task_description: str,
        all_role_description: List[str],
        *args,
        **kwargs,
    ) -> EvaluatorMessage:
        result = EvaluatorMessage(
            score=0, advice="\n".join([r.content for r in result])
        )
        return result
