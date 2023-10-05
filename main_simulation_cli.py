import logging
from argparse import ArgumentParser

from agentverse.logging import logger
from agentverse.simulation import Simulation

parser = ArgumentParser()
parser.add_argument("--task", type=str, default="prisoner_dilemma")
parser.add_argument("--debug", action="store_true")
args = parser.parse_args()

logger.set_level(logging.DEBUG if args.debug else logging.INFO)

agentverse = Simulation.from_task(args.task)
agentverse.run()
