from agentverse.registry import Registry

executor_registry = Registry(name="ExecutorRegistry")

from .base import BaseExecutor, NoneExecutor
