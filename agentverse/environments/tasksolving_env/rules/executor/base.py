from __future__ import annotations

from abc import abstractmethod
from typing import TYPE_CHECKING, List, Tuple, Any

from pydantic import BaseModel

from agentverse.agents import ExecutorAgent
from agentverse.message import SolverMessage, ExecutorMessage

from . import executor_registry


class BaseExecutor(BaseModel):
    """
    The base class of execution.
    """

    def step(
        self,
        agent: ExecutorAgent,
        task_description: str,
        solution: List[SolverMessage],
        *args,
        **kwargs,
    ) -> List[ExecutorMessage]:
        pass

    async def astep(
        self,
        agent: ExecutorAgent,
        task_description: str,
        solution: List[str],
        *args,
        **kwargs,
    ) -> List[ExecutorMessage]:
        pass

    def reset(self):
        pass


@executor_registry.register("none")
class NoneExecutor(BaseExecutor):
    """
    The base class of execution.
    """

    def step(
        self,
        agent: ExecutorAgent,
        task_description: str,
        solution: List[SolverMessage],
        *args,
        **kwargs,
    ) -> Any:
        return [ExecutorMessage(content="")]
    
    async def astep(
        self,
        agent: ExecutorAgent,
        task_description: str,
        solution: List[SolverMessage],
        *args,
        **kwargs,
    ) -> Any:
        return [ExecutorMessage(content="")]

    def reset(self):
        pass


@executor_registry.register("dummy")
class DummyExecutor(BaseExecutor):
    """
    The base class of execution.
    """

    def step(
        self,
        agent: ExecutorAgent,
        task_description: str,
        solution: List[SolverMessage],
        *args,
        **kwargs,
    ) -> Any:
        return [ExecutorMessage(content=s.content) for s in solution]
    
    async def astep(
        self,
        agent: ExecutorAgent,
        task_description: str,
        solution: List[SolverMessage],
        *args,
        **kwargs,
    ) -> Any:
        return [ExecutorMessage(content=s.content) for s in solution]

    def reset(self):
        pass
