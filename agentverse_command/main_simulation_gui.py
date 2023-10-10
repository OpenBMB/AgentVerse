import os
from agentverse.gui import GUI
from argparse import ArgumentParser

parser = ArgumentParser()
parser.add_argument("--task", type=str, default="simulation/nlp_classroom_9players")
parser.add_argument(
    "--tasks_dir",
    type=str,
    default=os.path.join(os.path.dirname(__file__), "..", "agentverse", "tasks"),
)
args = parser.parse_args()


def cli_main():
    ui = GUI(args.task, args.tasks_dir)
    ui.launch()


if __name__ == "__main__":
    cli_main()
