import os
import json
import threading

from agentverse.tool_call_handler.workspace.workspace import Workspace
from agentverse.utils.common import WORK_SPACE_ROOT_DIR
from agentverse.message import Message
from agentverse.structure.AgentPool import AgentPool
import asyncio
from typing import List
from agentverse.config import NOW_TIME, Config


class Department:
    def __init__(self, name, description=""):
        self.name = name
        self.roles = []
        self.sub_departments = []
        self.super_department = None
        from agentverse.agents.company_agent import Planner, Role

        self.manager = Planner(
            name=f"manager of department:{self.name}"
        )  # Adding a manager role
        self.description = description
        self.missions = []
        self.memory = []
        # self.Memory = Memory()
        self.mission_memory = []
        self.logger = Config.LOGGER

    def get_roles(self):
        return self.roles + [
            role
            for sub_department in self.sub_departments
            for role in sub_department.get_roles()
        ]

    async def step(self) -> List[Message]:
        """Run one step of the environment"""

        # Get the next agent index
        # agent_ids = self.rule.get_next_agent_idx(self)  # order
        roles = self.planner.plan_tasks(self.complex_task, self.agent_pool)

        messages = await asyncio.gather(*[role.astep("") for role in roles])

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

    def perform_mission(self, use_tool):
        if len(self.missions) > 0:
            mission = self.missions.pop(0)
            mission_log = {"department": self.name, "mission": mission}
            self.logger.log({self.name: mission, "type": "mission assignment"})
            self.memory.append(mission)
            print("length of Department", self.name, len(self.roles))
            tmp_agent_pool = AgentPool(self.get_roles())
            print("tmp_agent_pool:", tmp_agent_pool.get_roles_name_list())
            for inner_turn in range(int(Config.INNER_LOOP)):
                roles = self.manager.plan_tasks(mission, tmp_agent_pool)
                threads = []
                mission_log["mission_turn_" + str(inner_turn)] = {}
                for role in roles:
                    workspace_root = os.path.join(
                        WORK_SPACE_ROOT_DIR, NOW_TIME, role.name
                    )
                    workspace, workspace_root = self.make_workspace(workspace_root)
                    if use_tool:
                        threads.append(
                            threading.Thread(
                                target=role.perform_task,
                                args=(workspace, workspace_root),
                            )
                        )

                    else:
                        threads.append(
                            threading.Thread(target=role.perform_task_without_tool)
                        )

                # threads = [threading.Thread(target=role.perform_task) for role in self.get_roles()]
                # for thread in threads:
                #     thread.start()
                # for thread in threads:
                #     thread.join()
                max_threads = Config.MAX_THREADS
                i = 0
                while i < len(threads):
                    # Start a batch of threads
                    for j in range(min(max_threads, len(threads) - i)):
                        try:
                            threads[i + j].start()
                        except:
                            continue
                    # Wait for the batch of threads to finish
                    for j in range(min(max_threads, len(threads) - i)):
                        try:
                            threads[i + j].join()
                        except:
                            continue
                    # Move to the next batch
                    i += max_threads

                # Ensure every role sends feedback to the planner at the end of the round
                for role in roles:
                    if len(role.task_results) > 0:
                        # if role.task_results[-1]["communicate"]:
                        #     # pass message to certain role in the departments
                        #     raise NotImplementedError

                        # self.manager.receive_feedback(role.name, role.task_results[-1])
                        self.manager.receive_feedback(
                            role.name, role.Memory.get_last_round()
                        )
                        mission_log["mission_turn_" + str(inner_turn)][role.name] = {
                            "task": role.tasks_history[-1],
                            "result": role.Memory.get_last_round(),
                        }
                summary = self.manager.summarize_round()
                self.logger.log(
                    {"department": self.name, "mission": mission, "summary": summary}
                )
                mission_log["mission_turn_" + str(inner_turn)]["summary"] = summary
                if "finished" in summary:
                    if summary["finished"]:
                        break
                else:
                    print("Summary: " + str(summary))
                # Use the approach to perform the task (implementation can be further refined)
            self.memory.append(mission_log)
            self.Memory.add_memory(summary)
            return summary

    def add_mission(self, new_mission):
        self.missions.append(new_mission)

    def add_role(self, role):
        role.department = self
        self.roles.append(role)
        return self

    def add_sub_department(self, department):
        department.super_department = self
        self.sub_departments.append(department)

    def add_manager(self, manager):
        self.manager = manager
        manager.department = self
        return self

    def add_super_department(self, department):
        self.super_department = department

    def get_sub_departments(self) -> dict:
        # return a dict of sub departments, with the key being the department name and the value being the department object
        sub_departments = {}
        for sub_department in self.sub_departments:
            sub_departments[sub_department.name] = sub_department
        return sub_departments

    def get_sub_departments_str(self):
        # return a list of sub_department names and its description
        if len(self.sub_departments) == 0:
            return []
        sub_department_str = []
        for sub_department in self.sub_departments:
            sub_department_str.append(
                sub_department.name + ": " + sub_department.description
            )
            sub_department_str += sub_department.get_sub_departments_str()
        return ";".join(sub_department_str)

    def receive_memory_from_collaboration(self, memory):
        self.memory.append(memory)

    def get_name(self):
        return self.name

    def get_description(self):
        return self.description

    def get_sub_department_descriptions(self):
        # format：a json dict of sub_department name and description
        return {
            sub_department.name: sub_department.description
            for sub_department in self.sub_departments
        }

    def get_structure_str(self):
        # return the tree structure of the company with a text
        structure_str = (
            self.name + ": " + ", ".join([role.name for role in self.roles]) + "\n"
        )
        structure_str += (
            self.name
            + " sub_department names:"
            + ", ".join(
                [sub_department.name for sub_department in self.sub_departments]
            )
            + "\n"
        )
        for sub_department in self.sub_departments:
            structure_str += sub_department.get_structure_str()
        return structure_str

    def get_structure(self):
        # return the tree structure of the company as a dictionary
        structure = {
            self.name: [
                {
                    "name": role.name,
                    "persona": role.persona,
                    "tools": role.get_tool_names(),
                }
                for role in self.roles
            ]
        }
        structure["sub_departments"] = []
        structure["sub_departments_structure"] = []
        for sub_department in self.sub_departments:
            sub_dep_name = sub_department.get_name()
            # Ensure the key exists
            if sub_dep_name not in structure["sub_departments"]:
                structure["sub_departments"].append(sub_dep_name)
                structure["sub_departments_structure"].append(
                    sub_department.get_structure()
                )

        return structure

    def make_workspace(self, path):
        if not os.path.exists(path):
            os.makedirs(path)
        workspace_root = Workspace.make_workspace(path)
        workspace = Workspace(workspace_root=workspace_root, restrict_to_workspace=True)
        return workspace, workspace_root
