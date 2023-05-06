from agentverse.registry import Registry
selector_registry = Registry(name="SelectorRegistry")

from .base import BaseSelector
from .classroom import ClassroomSelector