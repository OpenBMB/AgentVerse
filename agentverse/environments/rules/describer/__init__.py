from agentverse.registry import Registry
describer_registry = Registry(name="DescriberRegistry")

from .base import BaseDescriber
from .classroom import ClassroomDescriber
