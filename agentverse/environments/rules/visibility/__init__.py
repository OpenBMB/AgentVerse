from typing import Dict

from agentverse.registry import Registry

visibility_registry = Registry(name="VisibilityRegistry")

from .base import BaseVisibility
from .all import AllVisibility
from .classroom import ClassroomVisibility
from .oneself import OneselfVisibility
from .prisoner import PrisonerVisibility
from .sde_team import SdeTeamVisibility
from .pokemon import PokemonVisibility
