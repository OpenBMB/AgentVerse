from agentverse.registry import Registry

memory_manipulator_registry = Registry(name="Memory_Manipulator_Registry")

from .base import BaseMemoryManipulator
from .basic import BasicMemoryManipulator
from .reflection import Reflection

