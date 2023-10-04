import logging

# from agentverse.agentverse import AgentVerse
import logging
from agentverse.agentversepipeline import AgentVersePipeline
from agentverse.logging import logger
from agentverse.demo import UI
from agentverse.logging import logger
from argparse import ArgumentParser

parser = ArgumentParser()

# case: pipeline
# parser.add_argument("--task", type=str, default="pipeline")
parser.add_argument("--single_agent", "-s", action="store_true")  # Deprecated
parser.add_argument("--discussion_mode", "-d", action="store_true")  # Deprecated
parser.add_argument("--debug", action="store_true")

# case: code writing: create a caculator
# parser.add_argument("--task", type=str, default="pipeline_pythoncalculator")

# case: brainstorming
parser.add_argument("--task", type=str, default="pipeline_brainstorming")

# case: project
# parser.add_argument("--task", type=str, default="pipeline_project")


args = parser.parse_args()

logger.set_level(logging.DEBUG if args.debug else logging.INFO)

# terminal
agentversepipeline = AgentVersePipeline.from_task(args.task)
agentversepipeline.run(
    single_agent=args.single_agent,
    discussion_mode=args.discussion_mode,
)

# ui
# ui = UI(args.task)
# ui.launch(args.single_agent, args.discussion_mode)
