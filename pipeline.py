# from agentverse.agentverse import AgentVerse
from agentverse.agentversepipeline import AgentVersePipeline
from agentverse.demo import UI
from argparse import ArgumentParser

parser = ArgumentParser()

# case: pipeline
# parser.add_argument("--task", type=str, default="pipeline")
parser.add_argument("--single_agent", "-s", action="store_true")
parser.add_argument("--discussion_mode", "-d", action="store_true")

# case: code writing: create a caculator
# parser.add_argument("--task", type=str, default="pipeline_pythoncalculator")

# case: brainstorming
parser.add_argument("--task", type=str, default="pipeline_brainstorming")

# case: project
# parser.add_argument("--task", type=str, default="pipeline_project")


args = parser.parse_args()

# terminal
# agentversepipeline = AgentVersePipeline.from_task(args.task)
# agentversepipeline.run(
#     single_agent=args.single_agent,
#     discussion_mode=args.discussion_mode,
# )

# ui
ui = UI(args.task)
ui.launch(args.single_agent, args.discussion_mode)
