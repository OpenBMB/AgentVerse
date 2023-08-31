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

from .prisoner_dilemma.output_parser import PrisonerDilemmaParser

from .pokemon.output_parser import PokemonParser
from .sde_team.sde_team_3players.output_parser import SdeTeamParser
from .sde_team.sde_team_2players.output_parser import SdeTeamGivenTestsParser

from .pipeline_pythoncalculator.output_parser import PipelinePythoncalculatorParser
from .pipeline_brainstorming.output_parser import PipelineBrainstormingParser
from .pipeline_projectv.output_parser import PipelineProjectvParser
from .pipeline_projecth.output_parser import PipelineProjecthParser
from .humaneval.output_parser import *
from .mgsm.output_parser import *
from .responsegen.output_parser import *
from .logic_grid.output_parser import *
from .commongen.output_parser import *
