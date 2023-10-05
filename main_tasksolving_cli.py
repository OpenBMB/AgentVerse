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
    default="tasksolving/pipeline_brainstorming",
)
parser.add_argument("--debug", action="store_true")
args = parser.parse_args()

logger.set_level(logging.DEBUG if args.debug else logging.INFO)

agentversepipeline = TaskSolving.from_task(args.task)
agentversepipeline.run()
