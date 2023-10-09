import asyncio
import os
import copy

import logging

from agentverse.environments.tasksolving_env.basic import BasicEnvironment
from agentverse.initialization import load_agent, load_environment, prepare_task_config
from agentverse.utils import AGENT_TYPES


openai_logger = logging.getLogger("openai")
openai_logger.setLevel(logging.WARNING)


class TaskSolving:
    environment: BasicEnvironment
    task: str = ""
    logs: list = []

    def __init__(self, environment: BasicEnvironment, task: str = ""):
        self.environment = environment
        self.task = task

    @classmethod
    def from_task(cls, task: str, tasks_dir: str):
        """Build an AgentVerse from a task name.
        The task name should correspond to a directory in `tasks` directory.
        Then this method will load the configuration from the yaml file in that directory.
        """
        # Prepare the config of the task
        task_config = prepare_task_config(task, tasks_dir)

        # Build the environment
        env_config = task_config["environment"]

        # Build agents for all pipeline (task)
        agents = {}
        for i, agent_config in enumerate(task_config["agents"]):
            agent_type = AGENT_TYPES(i)
            if i == 2 and agent_config.get("agent_type", "") == "critic":
                agent = load_agent(agent_config)
                agents[agent_type] = [
                    copy.deepcopy(agent)
                    for _ in range(task_config.get("cnt_agents", 1) - 1)
                ]
            else:
                agents[agent_type] = load_agent(agent_config)

        env_config["agents"] = agents

        env_config["task_description"] = task_config.get("task_description", "")
        env_config["max_rounds"] = task_config.get("max_rounds", 3)

        environment: BasicEnvironment = load_environment(env_config)

        return cls(environment=environment, task=task)

    def run(self):
        """Run the environment from scratch until it is done."""
        self.environment.reset()
        self.logs = []
        advice = "No advice yet."
        previous_plan = "No solution yet."
        while not self.environment.is_done():
            result, advice, previous_plan, logs, success = asyncio.run(
                self.environment.step(advice, previous_plan)
            )
            self.logs += logs
        self.environment.report_metrics()
        self.save_result(previous_plan, result, self.environment.get_spend())
        return previous_plan, result, self.logs

    def singleagent_thinking(self, preliminary_solution, advice) -> str:
        preliminary_solution = self.environment.solve(
            former_solution=preliminary_solution,
            critic_opinions=[(self.environment.evaluator, advice)],
        )
        return preliminary_solution

    def reset(self):
        self.environment.reset()

    def save_result(self, plan: str, result: str, spend: float):
        """Save the result to the result file"""
        result_file_path = "./results/" + self.task + ".txt"
        os.makedirs(os.path.dirname(result_file_path), exist_ok=True)
        with open(result_file_path, "w") as f:
            f.write("[Final Plan]\n" + plan + "\n\n")
            f.write("[Result]\n" + result)
            f.write(f"[Spent]\n${spend}")
