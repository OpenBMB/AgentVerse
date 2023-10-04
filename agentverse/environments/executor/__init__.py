from agentverse.registry import Registry

executor_registry = Registry(name="ExecutorRegistry")

from .base import BaseExecutor, NoneExecutor
from .code_test import CodeTestExecutor
from .tool_using import ToolUsingExecutor
from .coverage_test import CoverageTestExecutor
