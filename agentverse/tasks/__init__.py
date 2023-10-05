import os
import yaml

from .simulation.math_problem_2players_tools.output_parser import (
    MathProblem2PlayersToolsParser,
)
from .simulation.nlp_classroom_3players.output_parser import NlpClassroom3PlayersParser
from .simulation.nlp_classroom_9players.output_parser import NlpClassroom9PlayersParser
from .simulation.nlp_classroom_3players_withtool.output_parser import (
    NlpClassroom3PlayersWithtoolParser,
)
from .simulation.nlp_classroom_9players_group.output_parser import (
    NlpClassroom9PlayersGroupParser,
)
from .simulation.db_diag.output_parser import DBDiag

from .simulation.prisoner_dilemma.output_parser import PrisonerDilemmaParser

from .simulation.pokemon.output_parser import PokemonParser
from .simulation.sde_team.sde_team_3players.output_parser import SdeTeamParser
from .simulation.sde_team.sde_team_2players.output_parser import SdeTeamGivenTestsParser

from .tasksolving.pythoncalculator.output_parser import PipelinePythoncalculatorParser
from .tasksolving.brainstorming.output_parser import *
from .tasksolving.humaneval.output_parser import *
from .tasksolving.tool_using.output_parser import *
from .tasksolving.mgsm.output_parser import *
from .tasksolving.responsegen.output_parser import *
from .tasksolving.logic_grid.output_parser import *
from .tasksolving.commongen.output_parser import *
