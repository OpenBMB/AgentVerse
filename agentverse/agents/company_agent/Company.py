from mallm.agent.Department import Department
from mallm.agent.Planner import Planner
from mallm.config import Config
import threading


class Company:
    def __init__(self, name: str, task: str, logger):
        self.name = name
        self.mission = task
        self.CEO = Planner(self.mission, "CEO")  # Adding a CEO role
        self.departments = {
            "Board": Department("Board").add_role(self.CEO).add_manager(self.CEO)
        }
        self.logger = logger
        self.memory = []
        # design a tree structure for the company

    def add_department(self, department: Department, super_department="Board"):
        self.departments[department.name] = department
        self.departments[super_department].add_sub_department(
            self.departments[department.name]
        )
        self.departments[department.name].add_super_department(
            self.departments[super_department]
        )

    def get_department(self, name: str):
        return self.departments.get(name)

    def get_department_list(self):
        return list(self.departments.values())

    def get_sub_departments_str(self):
        # return the tree structure of the company with a text starting from the Board departments
        return self.departments["Board"].get_sub_departments_str()

    def get_sub_departments(self):
        # return a dict of sub departments, with the key being the department name and the value being the department object
        return self.departments["Board"].get_sub_departments()

    def get_structure_str(self):
        # return the tree structure of the company with a text starting from the Board departments
        return self.departments["Board"].get_structure_str()

    def get_structure(self):
        # return structure in json format
        structure = {"name": self.name}
        board_structure = self.departments["Board"].get_structure()
        structure.update(board_structure)
        return structure

    def get_roles(self):
        return self.departments["Board"].get_roles()

    def log_memory(self):
        for role in self.get_roles():
            self.logger.log({role.name: role.memory})

    def startup(self, max_round: int, use_tool: bool):
        save_results = {}
        save_results["company_name"] = self.name
        save_results["company_mission"] = self.mission
        save_results["company_structure"] = self.get_structure()
        print("max_round:", max_round)
        for round in range(max_round):
            save_results[f"round_{round}"] = {}
            departments = self.CEO.plan_tasks_by_department(
                self.get_sub_departments(), self.mission
            )
            threads = [
                threading.Thread(target=department.perform_mission, args=(use_tool,))
                for department in departments
            ]
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
            for department in departments:
                if len(department.Memory.count()) > 0:
                    # self.CEO.receive_feedback(department.name, department.memory[-1])
                    self.CEO.receive_feedback(
                        department.name, department.Memory.get_last_round()
                    )
                    save_results[f"round_{round}"][department.name] = {
                        "department_results": department.Memory.get_last_round()
                    }
            summary = self.CEO.summarize_round()
            save_results[f"round_{round}"]["summary"] = summary
            self.log_memory()
            self.memory.append(summary)
            if summary["finished"]:
                break
        self.logger.log("Max turn reached. Ending the simulation.")
        return save_results
