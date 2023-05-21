from typing import Dict
from agentverse.registry import Registry

env_registry = Registry(name="EnvironmentRegistry")

from .base import BaseEnvironment
from .basic import BasicEnvironment
from .pokemon import PokemonEnvironment
from .prisoner_dilema import PrisonerDilemaEnvironment
