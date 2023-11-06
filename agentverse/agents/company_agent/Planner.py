import json
from typing import List
import json
from agentverse.agents.company_agent.Role import Role
from agentverse.utils import (
    Prompt,
    Prompt_Functions,
    retry,
    get_tools_by_names,
    get_first_n_tokens,
)
from agentverse.config import Config
from agentverse.structure import Department, Company, AgentPool
from agentverse.agents.company_agent.Collaborator import Collaborator
from agentverse.tool_call_handler import BASIC_TOOLS


class Planner(Role):
    def __init__(
        self,
        complex_task="You need to plan the roles to finish complex tasks",
        name="Planner",
    ):
        super().__init__(name, Prompt.get_planner_prompt(), tools=BASIC_TOOLS)
        self.round = 0
        # Config.MAX_TURN number of empty lists
        self.round_messages = [[] for _ in range(1000)]
        self.complex_task = complex_task
        self.turn_summaries = []
        self.logger = Config.LOGGER
        self.plans = []
        self.company = None

    @retry(attempts=3)
    def plan_tasks(self, complex_task, agent_pool: AgentPool):
        # openai_chat = OpenAIUtils()
        print(agent_pool.get_roles_list())
        roles_list = agent_pool.get_roles_name_list()
        print("roles_list:", roles_list)
        if self.round == 0:
            task_plan_prompt = Prompt.get_task_planning_prompt_start(
                complex_task, roles_list
            )
        else:
            task_plan_prompt = Prompt.get_task_planning_prompt_continue(
                complex_task,
                roles_list,
                self.turn_summaries[-1]["summary"],
                self.plans[-1],
            )
        # task_plan = openai_chat.function_call(
        #     task_plan_prompt, Prompt_Functions().get_functions("plan_tasks")
        # )
        task_plan = self.llm.generate_response(
            prompt=task_plan_prompt,
            function=Prompt_Functions().get_functions("plan_tasks"),
        ).function_arguments
        print(f"Task plan: {task_plan}")
        task_role_list = []
        self.plans.append(task_plan)
        """
        structure of task plan:
        {'role_list':[{'role_name': 'CEO', 'task': 'CEO: You need to plan the roles to finish complex tasks'},}]}
        """
        for role_info in task_plan["role_list"]:
            task = role_info["task"]
            necessary_information = role_info["necessary_information"]
            role_name = role_info["role_name"]
            role = agent_pool.get_role_uncased(role_name)
            if role:
                role.add_task(
                    {"task": task, "necessary_information": necessary_information}
                )
                task_role_list.append(role)
                self.logger.log(
                    {
                        "role_name": role_name,
                        "task": task,
                        "necessary_information": necessary_information,
                        "type": "task assignment",
                    }
                )
        self.round += 1
        return task_role_list

    @retry(attempts=3)
    def plan_tasks_by_department(self, departments_dict: dict, complex_task):
        # openai_chat = OpenAIUtils()
        assigned_departments = []
        # include the department name and description infomation
        department_list_str = ""
        for department in departments_dict.values():
            department_list_str += (
                department.name + ": " + department.description + "\t"
            )
        if self.round == 0:
            task_plan_prompt = Prompt.get_task_planning_prompt_start_department(
                complex_task, department_list_str
            )
        else:
            task_plan_prompt = Prompt.get_task_planning_prompt_continue_department(
                complex_task,
                department_list_str,
                self.turn_summaries[-1]["summary"],
                self.plans[-1],
            )

        # task_plan = openai_chat.function_call(
        #     task_plan_prompt,
        #     Prompt_Functions().get_functions("plan_tasks_by_department"),
        # )
        task_plan = self.llm.generate_response(
            prompt=task_plan_prompt,
            function=Prompt_Functions().get_functions("plan_tasks_by_department"),
        ).function_arguments
        """
        structure of task plan:
        {'task_list':[{'task': 'CEO: You need to plan the roles to finish complex tasks', 'department_list': ['Department']},]}]}
        """
        self.plans.append(json.dumps(task_plan))
        for task_info in task_plan["task_list"]:
            task = task_info["task"]
            department_names = task_info["department_list"]
            # if the length of the department_names is above 1, then use the collaborator
            if len(department_names) > 1:
                department_list = [
                    department
                    for department in departments_dict.values()
                    if department.name in department_names
                ]
                self.logger.log(
                    {
                        "department_names": department_names,
                        "task": task,
                        "type": "task assignment",
                    }
                )

                collaborator = Collaborator(task, department_list)
                assigned_departments.append(collaborator)
            else:
                department_name = department_names[0]
                department = departments_dict.get(department_name)
                if department:
                    department.add_mission(task)
                    assigned_departments.append(department)
                    self.logger.log(
                        {
                            "department_name": department_name,
                            "task": task,
                            "type": "mission assignment",
                        }
                    )
        self.round += 1
        return assigned_departments

    def receive_feedback(self, role_name, role_result):
        if isinstance(role_result, str):
            role_result = role_result
        elif isinstance(role_result, list):
            role_result = str(role_result[-1])
        elif isinstance(role_result, dict):
            role_result_str = ""
            for task in role_result:
                result = str(role_result[task])
                role_result_str += f"Task: {task}\nResult: {result}"
            role_result = role_result_str
        self.round_messages[self.round].append(f"{role_name}: {role_result}")

    def summarize_round(self):
        roles_results = "".join(self.round_messages[self.round])
        prompt = Prompt.get_summarize_round_prompt(self.complex_task, roles_results)
        # openai_chat = OpenAIUtils()
        prompt = get_first_n_tokens(
            prompt, Config.MAX_TOKEN_LENGTH
        )  # truncate the prompt to avoid openai api error
        # summary = openai_chat.function_call(
        #     prompt, Prompt_Functions().get_functions("summarize_round")
        # )
        summary = self.llm.generate_response(
            prompt=prompt,
            function=Prompt_Functions().get_functions("summarize_round"),
        ).function_arguments
        self.turn_summaries.append({"turn": self.round, "summary": summary})
        self.logger.log({"turn": self.round, "summary": json.dumps(summary)})
        return summary

    def set_company(self, company: Company):
        return super().set_company(company)
