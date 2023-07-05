import os


from agentverse.demo import UI
from argparse import ArgumentParser

parser = ArgumentParser()
# parser.add_argument("--task", type=str, default="nlp_classroom_9players")
# parser.add_argument("--task", type=str, default="nlp_classroom_3players")
# parser.add_argument("--task", type=str, default="prisoner_dilemma")
# parser.add_argument("--task", type=str, default="sde_team/sde_team_2players")
parser.add_argument("--task", type=str, default="db_diag")
args = parser.parse_args()

ui = UI(args.task)
ui.launch()
