import os
import yaml

from .math_problem_2players_tools.output_parser import MathProblem2PlayersToolsParser
from .nlp_classroom_3players.output_parser import NlpClassroom3PlayersParser
from .nlp_classroom_9players.output_parser import NlpClassroom9PlayersParser
from .nlp_classroom_3players_withtool.output_parser import (
    NlpClassroom3PlayersWithtoolParser,
)
from .nlp_classroom_9players_group.output_parser import NlpClassroom9PlayersGroupParser
from .db_diag.output_parser import DBDiag

from .prisoner_dilema.output_parser import PrisonerDilemaParser

from .pokemon.output_parser import PokemonParser
from .sde_team.sde_team_3players_nolc.output_parser import SdeTeamParser
from .sde_team.sde_team_2players_nolc.output_parser import SdeTeamGivenTestsParser
