import os
import threading

import json
import asyncio
import logging
from typing import List

# from agentverse.agents import Agent
from agentverse.agents.simulation_agent.conversation import BaseAgent
from agentverse.environments import BaseEnvironment
from agentverse.initialization import load_agent, load_environment, prepare_task_config

openai_logger = logging.getLogger("openai")
openai_logger.setLevel(logging.WARNING)


class StartupCompany:
    def __init__(self, agents: List[BaseAgent], environment: BaseEnvironment):
        self.agents = agents
        self.environment = environment

    @classmethod
    def from_task(cls, task: str, tasks_dir: str):
        """Build an AgentVerse from a task name.
        The task name should correspond to a directory in `tasks` directory.
        Then this method will load the configuration from the yaml file in that directory.
        """
        # Prepare the config of the task
        task_config = prepare_task_config(task, tasks_dir)

        # Build the agents
        agents = []
        for agent_configs in task_config["agents"]:
            agent = load_agent(agent_configs)
            agents.append(agent)

        # Build the environment
        env_config = task_config["environment"]
        env_config["agents"] = agents
        environment = load_environment(env_config)

        return cls(agents, environment)

    def run(self):
        """Run the environment from scratch until it is done."""
        self.environment.reset()
        while not self.environment.is_done():
            asyncio.run(self.environment.step())
        self.environment.report_metrics()

    def reset(self):
        self.environment.reset()
        for agent in self.agents:
            agent.reset()

    def next(self, *args, **kwargs):
        """Run the environment for one step and return the return message."""
        return_message = asyncio.run(self.environment.step(*args, **kwargs))
        return return_message

    def update_state(self, *args, **kwargs):
        """Run the environment for one step and return the return message."""
        self.environment.update_state(*args, **kwargs)


class Environment:
    def __init__(self, roles_data, complex_task: str, max_turn: int = 10):
        roles = [
            Role(role["name"], role["persona"], role["tools"]) for role in roles_data
        ]
        self.agent_pool = AgentPool(roles)
        self.logger = Config.LOGGER
        # self.builder = CompanyBuilder(complex_task, self.agent_pool)
        self.recruiter = Recruiter(
            "recruiter", "recruiter", [], complex_task, self.agent_pool
        )
        self.customer = Customer("customer", "customer", [])
        if Config.USE_STRUCTURE_FILE:
            structure_file_path = os.path.join(
                "./company_structure", Config.STRUCTURE_FILE
            )
            self.company = self.recruiter.recruit_from_json(
                complex_task, structure_file_path
            )
        else:
            self.company = self.recruiter.recruit(complex_task)
        print("current directory:", os.getcwd())
        with open("./company_structure/company.jsonl", "a") as f:
            f.write(json.dumps(self.company.get_structure(), indent=4) + "\n")
        if Config.COMPANY_STRUCTURE_ONLY:
            print(
                "company build success, simulaion end since only build company structure"
            )
            return
        print("company build success")
        self.planner = self.company.CEO
        self.max_turn = max_turn
        self.complex_task = complex_task

    def simulate_with_company(self, use_tool):
        simulate_results = self.company.startup(self.max_turn, use_tool)
        return simulate_results

    def simulate_with_no_company(self, use_tool):
        turn = 0
        for _ in range(self.max_turn):
            roles = self.execute_tasks(use_tool)
            self.log_memory()
            # Ensure every role sends feedback to the planner at the end of the round
            for role in roles:
                if len(role.memory) > 0:
                    self.planner.receive_feedback(
                        role.name, role.memory[-1]
                    )  # not included the situation that the role don't receive the response from openai
            summary = self.summarize_round()
            if summary["finished"]:
                break
            turn += 1
        if turn == self.max_turn:
            self.logger.log("Max turn reached. Ending the simulation.")
        else:
            self.logger.log("The simulation is finished.")
        return summary

    def execute_tasks(self, use_tool, max_threads: int = Config.MAX_THREADS):
        roles = self.planner.plan_tasks(self.complex_task, self.agent_pool)
        threads = []

        # Create threads
        for role in self.agent_pool.roles:
            workspace_root = os.path.join(WORK_SPACE_ROOT_DIR, NOW_TIME, role.name)
            workspace, workspace_root = self.make_workspace(workspace_root)
            if use_tool:
                threads.append(
                    threading.Thread(
                        target=role.perform_task, args=(workspace, workspace_root)
                    )
                )
            else:
                threads.append(threading.Thread(target=role.perform_task_wo_tool))

        # Start threads in batches
        i = 0
        while i < len(threads):
            # Start a batch of threads
            for j in range(min(max_threads, len(threads) - i)):
                threads[i + j].start()
            # Wait for the batch of threads to finish
            for j in range(min(max_threads, len(threads) - i)):
                threads[i + j].join()
            # Move to the next batch
            i += max_threads

        return roles

    def log_memory(self):
        for role in self.agent_pool.roles:
            self.logger.log({role.name: role.memory})

    def summarize_round(self):
        return self.planner.summarize_round()

    def make_workspace(self, path):
        if not os.path.exists(path):
            os.makedirs(path)
        workspace_root = Workspace.make_workspace(path)
        workspace = Workspace(workspace_root=workspace_root, restrict_to_workspace=True)
        return workspace, workspace_root
