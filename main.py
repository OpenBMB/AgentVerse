import os

os.environ["http_proxy"] = "http://127.0.0.1:7890"
os.environ["https_proxy"] = "http://127.0.0.1:7890"
os.environ["all_proxy"] = "socks5://127.0.0.1:7890"

from agentverse.agentverse import AgentVerse
from argparse import ArgumentParser

parser = ArgumentParser()
# parser.add_argument("--task", type=str, default="nlp_classroom_9players")
# parser.add_argument("--task", type=str, default="nlp_classroom_3players_nolc")

parser.add_argument("--task", type=str, default="prisoner_dilema")

args = parser.parse_args()
agentverse = AgentVerse.from_task(args.task)
agentverse.run()
