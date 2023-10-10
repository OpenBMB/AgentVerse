from agentverse import AgentVerse
import asyncio
from argparse import ArgumentParser
import openai

# openai.api_base="https://api.ai-yyds.com/v1"
# openai.organization = "org-slFfhLEqjzXMrlbynMDMaYcW"

parser = ArgumentParser()
parser.add_argument("--task", type=str, default="minecraft_2players")
args = parser.parse_args()

agent_verse = AgentVerse.from_task(args.task)
# agent_verse.run()
asyncio.run(agent_verse.arun())
