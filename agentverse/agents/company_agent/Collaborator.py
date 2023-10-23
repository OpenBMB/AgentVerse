from mallm.agent.Department import Department
from mallm.agent.Planner import Planner
from mallm.agent.AgentPool import AgentPool

from mallm.tool_call_handler.workspace.workspace import Workspace
from mallm.utils.common import WORK_SPACE_ROOT_DIR
from mallm.config import NOW_TIME, Config
import threading
import os


class Collaborator(Department):
    def __init__(self, task: str, deparment_list):
        super().__init__("Collaborate Department")
        self.task = task
        self.department_list = deparment_list
        self.manager = Planner(task, "Collaborate Planner")

    def get_department_roles(self):
        return [
            role
            for department in self.department_list
            for role in department.get_roles()
        ]

    def perform_mission(self, use_tool: bool):
        # the collaborator planner plans the tasks for each role in the department
        # then the planner summarizes the round and send the summary to the department
        tmp_agent_pool = AgentPool(self.get_department_roles())
        for inner_turn in range(int(Config.INNER_LOOP)):
            roles = self.manager.plan_tasks(self.task, tmp_agent_pool)
            mission_log = {"department": self.name, "mission": self.task}
            # perform the tasks using the threads
            threads = []
            mission_log["mission_turn_" + str(inner_turn)] = {}
            for role in roles:
                workspace_root = os.path.join(WORK_SPACE_ROOT_DIR, NOW_TIME, role.name)
                workspace, workspace_root = self.make_workspace(workspace_root)
                if use_tool:
                    threads.append(
                        threading.Thread(
                            target=role.perform_task(
                                workspace=workspace, workspace_root=workspace_root
                            )
                        )
                    )
                else:
                    threads.append(
                        threading.Thread(target=role.perform_task_without_tool())
                    )
            i = 0
            max_threads = Config.MAX_THREADS
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

            for role in roles:
                if len(role.task_results) > 0:
                    self.manager.receive_feedback(role.name, role.task_results[-1])
                    mission_log["mission_turn_" + str(inner_turn)][role.name] = {
                        "task": role.tasks_history[-1],
                        "result": role.task_results[-1],
                    }
            summary = self.manager.summarize_round()

            self.logger.log(
                {"department": self.name, "mission": self.task, "summary": summary}
            )
            mission_log["mission_turn_" + str(inner_turn)]["summary"] = summary
            if "finished" in summary:
                if summary["finished"]:
                    break
            else:
                print("Summary: " + str(summary))
        # Use the approach to perform the task (implementation can be further refined)
        for department in self.department_list:
            department.receive_memory_from_collaboration(mission_log)
        self.memory.append(mission_log)
        return summary
