from typing import Dict
from agentverse.registry import Registry


env_registry = Registry(name="EnvironmentRegistry")


from .base import BaseEnvironment, BaseRule

# from .basic import PipelineEnvironment
from .simulation_env.basic import BasicEnvironment
from .simulation_env.pokemon import PokemonEnvironment
from .simulation_env.prisoner_dilemma import PrisonerDilemmaEnvironment
from .simulation_env.sde_team import SdeTeamEnvironment
from .simulation_env.sde_team_given_tests import SdeTeamGivenTestsEnvironment

from .tasksolving_env.basic import BasicEnvironment
