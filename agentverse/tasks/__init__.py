import os
import yaml

from .math_problem_2players_tools.output_parser import MathProblem2PlayersToolsParser
from .nlp_classroom_3players.output_parser import NlpClassroom3PlayersParser
from .nlp_classroom_9players.output_parser import NlpClassroom9PlayersParser
from .nlp_classroom_3players_withtool.output_parser import (
    NlpClassroom3PlayersWithtoolParser,
)
from .nlp_classroom_9players_group.output_parser import NlpClassroom9PlayersGroupParser
from .nlp_classroom_3players_nolc.output_parser import NlpClassroom3PlayersNolcParser
from .math_problem_2players_tools_nolc.output_parser import (
    MathProblem2PlayersToolsNolcParser,
)

from .prisoner_dilema.output_parser import PrisonerDilemaParser
from .prisoner_dilema.base.output_parser import PrisonerDilemaParser
from .prisoner_dilema.s1_p_r.output_parser import PrisonerDilemaParser
from .prisoner_dilema.police.output_parser import PrisonerDilemaParser

from .nlp_classroom_3players_withtool_nolc.output_parser import (
    NlpClassroom3PlayersWithtoolNolcParser,
)
from .pokemon.output_parser import PokemonParser
