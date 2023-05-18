import os

# 3.5 api
# os.environ["OPENAI_API_KEY"] = "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"
# my api
# os.environ["OPENAI_API_KEY"] = "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"
# 4.0 api
os.environ["OPENAI_API_KEY"] = "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"
os.environ["http_proxy"] = "http://127.0.0.1:7890"
os.environ["https_proxy"] = "http://127.0.0.1:7890"
os.environ["all_proxy"] = "socks5://127.0.0.1:7890"

from agentverse.agentverse import AgentVerse
from argparse import ArgumentParser

parser = ArgumentParser()
parser.add_argument("--task", type=str, default="prisoner_dilema")
args = parser.parse_args()

agentverse = AgentVerse.from_task(args.task)
agentverse.run()
