import asyncio
from typing import List
from agentverse.agents.company_agent import Role, Recruiter
from agentverse.structure import Department, Company
from agentverse.tool_call_handler.workspace.workspace import Workspace
from agentverse.structure import AgentPool
from agentverse.message import Message
from agentverse.config import Config
from agentverse.utils import WORK_SPACE_ROOT_DIR
from agentverse.config import NOW_TIME
import os
import json

# import threading
from agentverse.environments.simulation_env.rules.base import SimulationRule as Rule
from agentverse.message import Message
from ..base import BaseEnvironment
from .. import env_registry as EnvironmentRegistry
from agentverse.logging import Logger
import typing


@EnvironmentRegistry.register("company")
class HierarchicalEnvironment(BaseEnvironment):
    rule: Rule = None
    agents: List = []
    max_turns: int = 10
    cnt_turn: int = 0
    last_messages: List[Message] = []
    agent_pool: typing.Any
    logger = typing.Any
    recruiter: typing.Any
    company: typing.Any
    planner: typing.Any

    class Config:
        validate_assignment = True
        arbitrary_types_allowed = True

    def __init__(
        self,
        roles_data=None,
        complex_task: str = "",
        max_turn: int = 10,
        structure_path=None,
    ):
        super().__init__(agents=None, rule=None)
        if roles_data is not None:
            roles = [
                Role(role["name"], role["persona"], role["tools"])
                for role in roles_data
            ]
        else:
            roles = []
        self.agent_pool = AgentPool(roles)
        # self.builder = CompanyBuilder(complex_task, self.agent_pool)
        self.recruiter = Recruiter(
            "recruiter", "recruiter", [], complex_task, self.agent_pool
        )
        self.logger = Logger()
        # self.customer = Customer("customer", "customer", [])
        if Config.USE_STRUCTURE_FILE:
            structure_file_path = os.path.join(structure_path, "structure.json")
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
        self.max_turns = max_turn

    def simulate_with_company(self, use_tool):
        simulate_results = self.company.startup(self.max_turns, use_tool)
        return simulate_results

    async def step(self) -> List[Message]:
        """Run one step of the environment"""

        # Get the next agent index
        # agent_ids = self.rule.get_next_agent_idx(self)  # order
        # roles = self.planner.plan_tasks(self.complex_task, self.agent_pool)
        departments = self.company.CEO.plan_tasks_by_department(
            self.get_sub_departments(), self.mission
        )
        messages = await asyncio.gather(
            *[department.astep("") for department in departments]
        )

        # Track the messages to get the role of the sender
        self.last_messages = messages

        # Some rules will select certain messages from all the messages
        selected_messages = self.rule.select_message(self, messages)  # selector
        self.last_messages = selected_messages
        self.print_messages(selected_messages)

        # Update the memory of the agents
        self.rule.update_memory(self)  # updater: update memory

        # Update the set of visible agents for each agent
        self.rule.update_visible_agents(self)  # change receiver

        self.cnt_turn += 1

        return selected_messages

    def reset(self) -> None:
        """Reset the environment"""
        self.cnt_turn = 0
        for agent in self.agents:
            agent.reset()

    def is_done(self) -> bool:
        """Check if the environment is done"""
        if self.cnt_turn >= self.max_turns or self.rule_params["end_flag"]:
            return True
        return False

    # def simulate_with_no_company(self, use_tool):
    #     turn = 0
    #     for _ in range(self.max_turn):
    #         roles = self.execute_tasks(use_tool)
    #         self.log_memory()
    #         # Ensure every role sends feedback to the planner at the end of the round
    #         for role in roles:
    #             if len(role.memory) > 0:
    #                 self.planner.receive_feedback(
    #                     role.name, role.memory[-1]
    #                 )  # not included the situation that the role don't receive the response from openai
    #         summary = self.summarize_round()
    #         if summary["finished"]:
    #             break
    #         turn += 1
    #     if turn == self.max_turn:
    #         self.logger.log("Max turn reached. Ending the simulation.")
    #     else:
    #         self.logger.log("The simulation is finished.")
    #     return summary

    # def execute_tasks(self, use_tool, max_threads: int = Config.MAX_THREADS):
    #     roles = self.planner.plan_tasks(self.complex_task, self.agent_pool)
    #     threads = []

    #     # Create threads
    #     for role in self.agent_pool.roles:
    #         workspace_root = os.path.join(WORK_SPACE_ROOT_DIR, NOW_TIME, role.name)
    #         workspace, workspace_root = self.make_workspace(workspace_root)
    #         if use_tool:
    #             threads.append(
    #                 threading.Thread(
    #                     target=role.perform_task, args=(workspace, workspace_root)
    #                 )
    #             )
    #         else:
    #             threads.append(threading.Thread(target=role.perform_task_wo_tool))

    #     # Start threads in batches
    #     i = 0
    #     while i < len(threads):
    #         # Start a batch of threads
    #         for j in range(min(max_threads, len(threads) - i)):
    #             threads[i + j].start()
    #         # Wait for the batch of threads to finish
    #         for j in range(min(max_threads, len(threads) - i)):
    #             threads[i + j].join()
    #         # Move to the next batch
    #         i += max_threads

    #     return roles

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
