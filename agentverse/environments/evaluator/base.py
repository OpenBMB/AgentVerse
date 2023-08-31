from __future__ import annotations

from abc import abstractmethod
from typing import TYPE_CHECKING, List, Tuple

from pydantic import BaseModel

from agentverse.agents import BaseAgent

from . import evaluator_registry


class BaseEvaluator(BaseModel):
    """
    The base class of execution.
    """

    @abstractmethod
    def step(
        self,
        agent: BaseAgent,
        result: List[str] | str,
        task_description: str,
        *args,
        **kwargs,
    ) -> Tuple[List[int], str]:
        pass

    def reset(self):
        pass


@evaluator_registry.register("none")
class NoneEvaluator(BaseEvaluator):
    def step(
        self,
        agent: BaseAgent,
        result: List[str] | str,
        task_description: str,
        *args,
        **kwargs,
    ) -> Tuple[List[int], str]:
        return result
