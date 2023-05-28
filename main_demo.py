from agentverse.demo import UI
from argparse import ArgumentParser

parser = ArgumentParser()
# parser.add_argument("--task", type=str, default="nlp_classroom_9players")
# parser.add_argument("--task", type=str, default="nlp_classroom_3players_nolc")
# parser.add_argument("--task", type=str, default="prisoner_dilema")
# parser.add_argument("--task", type=str, default="sde_team/sde_team_2players_nolc")
parser.add_argument("--task", type=str, default="db_diag")
args = parser.parse_args()

# available
# args.task = "nlp_classroom_9players"
# args.task = "nlp_classroom_9players_group"


"""
#[to-do] tool unavailable
#args.task = "math_problem_2players_tools"
#args.task = "nlp_classroom_3players_withtool"
#args.task = "nlp_classroom_3players"
"""

ui = UI(args.task)
ui.launch()
