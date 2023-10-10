import os
import logging

# from agentverse.agentverse import AgentVerse
from agentverse.tasksolving import TaskSolving
from agentverse.gui import GUI
from agentverse.logging import logger
from argparse import ArgumentParser

parser = ArgumentParser()

parser.add_argument(
    "--task",
    type=str,
    default="tasksolving/brainstorming",
)
parser.add_argument("--debug", action="store_true")
parser.add_argument(
    "--tasks_dir",
    type=str,
    default=os.path.join(os.path.dirname(__file__), "..", "agentverse", "tasks"),
)
args = parser.parse_args()

logger.set_level(logging.DEBUG if args.debug else logging.INFO)


def cli_main():
    agentversepipeline = TaskSolving.from_task(args.task, args.tasks_dir)
    agentversepipeline.run()


if __name__ == "__main__":
    cli_main()
