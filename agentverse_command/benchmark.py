import logging
import os
import json
import shutil

# from agentverse.agentverse import AgentVerse
from agentverse.tasksolving import TaskSolving
from agentverse.logging import get_logger
from argparse import ArgumentParser
import asyncio
from dataloader import dataloader_registry

parser = ArgumentParser()

parser.add_argument("--task", type=str, default="tasksolving/responsegen")
parser.add_argument(
    "--tasks_dir",
    type=str,
    default=os.path.join(os.path.dirname(__file__), "..", "agentverse", "tasks"),
)
parser.add_argument("--dataset_path", type=str, required=True)
parser.add_argument("--output_path", type=str, default=None)
parser.add_argument("--has_tools", action="store_true")
parser.add_argument("--tool_tmp_path", type=str)
parser.add_argument("--overwrite", action="store_true")
parser.add_argument("--debug", action="store_true")
args = parser.parse_args()


logger = get_logger()
logger.set_level(logging.DEBUG if args.debug else logging.INFO)


def get_dataloader(task, dataset_path):
    return dataloader_registry.build(task, path=dataset_path)


def cli_main():
    dataloader = get_dataloader(args.task, args.dataset_path)
    if args.output_path is None:
        os.makedirs(f"./results/{args.task}", exist_ok=True)
        args.output_path = f"./results/{args.task}"
    else:
        os.makedirs(args.output_path, exist_ok=True)
    shutil.copyfile(
        f"{args.tasks_dir}/{args.task}/config.yaml",
        f"{args.output_path}/config.yaml",
    )

    skip_cnt = 0
    if not args.overwrite and os.path.exists(f"{args.output_path}/results.jsonl"):
        with open(f"{args.output_path}/results.jsonl", "r") as f:
            for line in f:
                if line.strip():
                    skip_cnt += 1
    f = open(f"{args.output_path}/results.jsonl", "w" if args.overwrite else "a")
    for i, example in enumerate(dataloader):
        if i < skip_cnt:
            continue
        logger.info(f"Input: {example['input']}\nAnswer: {example['answer']}")
        if args.has_tools:
            assert args.tool_tmp_path is not None
            with open(args.tool_tmp_path, "w") as f:
                f.write(json.dumps(example["tools"]))
        agentverse = TaskSolving.from_task(args.task, args.tasks_dir)
        agentverse.environment.set_task_description(example["input"])
        # print(args.single_agent)
        # print(args.discussion_mode)
        # exit()
        plan, result, logs = agentverse.run()
        f.write(
            json.dumps(
                {
                    "input": example["input"],
                    "response": plan,
                    "label": example["answer"],
                    "logs": logs,
                }
            )
            + "\n"
        )
        f.flush()
    f.close()


if __name__ == "__main__":
    cli_main()
