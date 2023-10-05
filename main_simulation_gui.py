from agentverse.gui import GUI
from argparse import ArgumentParser

parser = ArgumentParser()
parser.add_argument("--task", type=str, default="simulation/nlp_classroom_9players")
args = parser.parse_args()

ui = GUI(args.task)
ui.launch()
