from agentverse.registry import Registry
updater_registry = Registry(name="UpdaterRegistry")

from .base import BaseUpdater
from .classroom import ClassroomUpdater