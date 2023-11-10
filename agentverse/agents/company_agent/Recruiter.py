import json
from agentverse.agents.company_agent.Role import Role
from agentverse.utils import Prompt, Prompt_Functions, retry, get_tools_by_names
from agentverse.config import Config
from agentverse.structure import Department, Company
from typing import TYPE_CHECKING, List

from agentverse.message import Message


class Recruiter(Role):
    def __init__(
        self,
        name,
        persona: str = Prompt.get_recruiter_prompt,
        tools: list = [],
        task: str = "",
        agent_pool=None,
    ):
        super().__init__(name, persona, tools)
        self.company = None
        self.task = task
        self.agent_pool = agent_pool
        # self.openai_chat = OpenAIUtils()
        self.logger = Config.LOGGER
        self.test_department = Department(
            "Test Department", "This is a test department."
        )

    def recruit_from_pool():
        raise NotImplementedError

    @retry(attempts=1)
    def recruit(self, task: str):
        if Config.ROLES_RETRIEVE:
            roles = self.agent_pool.roles_retrieve(task)
        else:
            roles = self.agent_pool.get_roles_name_list()
        print("company roles:", roles)
        # structure_plan = self.openai_chat.function_call(
        #     Prompt.get_department_structure_prompt(self.task, roles),
        #     Prompt_Functions().get_functions("build_company"),
        # )
        structure_plan = self.llm.generate_response(
            prompt=Prompt.get_department_structure_prompt(self.task, roles),
            function=Prompt_Functions().get_functions("build_company"),
        ).function_arguments
        departments = {}
        self.logger.log({"structure_plan": json.dumps(structure_plan)})

        for department in structure_plan["department_list"]:
            department_name = department["department_name"]
            if department_name not in departments:
                departments[department_name] = Department(
                    department_name, department["description"]
                )
            for role in department["role_list"]:
                role_name = role["role_name"]
                print("role name in build", role_name)
                role = self.agent_pool.get_role_uncased(role_name)
                print("role:", role)
                if role:
                    departments[department_name].add_role(role)
                    self.logger.log(
                        {
                            "department_name": department_name,
                            "role_name": role_name,
                            "status": "added",
                        }
                    )

        company = Company("Company", self.task, self.logger)
        for department in departments.values():
            company.add_department(department)
            company.departments["Board"].add_sub_department(department)
        self.logger.log({"company": company.get_structure_str()})

        if Config.ALLOW_AUTO_GEN:
            # adding_more_roles = self.openai_chat.function_call(
            #     Prompt.get_adding_new_role_prompt(
            #         self.task, company.get_structure_str()
            #     ),
            #     Prompt_Functions().get_functions("adding_new_roles"),
            # )
            adding_more_roles = self.llm.generate_response(
                prompt=Prompt.get_adding_new_role_prompt(
                    self.task, company.get_structure_str()
                ),
                function=Prompt_Functions().get_functions("adding_new_roles"),
            ).function_arguments

            if adding_more_roles["necessary"]:
                for role in adding_more_roles["role_list"]:
                    role_name = role["role_name"]
                    role_description = role["role_description"]
                    department_name = role["department_name"]
                    # if the department is not in the company, add it
                    if department_name not in company.departments:
                        company.add_department(Department(department_name))
                        self.logger.log(
                            {
                                "department_name": department_name,
                                "status": "added by recruiter generator",
                            }
                        )
                    department = company.departments[department_name]
                    new_role = Role(role_name, role_description, tools=[])
                    department.add_role(new_role)
                    self.logger.log(
                        {
                            "department_name": department_name,
                            "role_name": role_name,
                            "status": "added",
                        }
                    )
            self.logger.log(
                {
                    "company": company.get_structure_str(),
                    "status": "added new roles generate by recruiter",
                }
            )
        else:
            self.logger.log({"status": "no new roles need to be added by recruiter"})

        self.company = company
        return company

    def recruit_from_json(self, task: str, json_file: str):
        with open(json_file, "r") as f:
            company_structure = json.load(f)
        company = Company(company_structure["name"], task, self.logger)
        for depatment_id, department_name in enumerate(
            company_structure["sub_departments"]
        ):
            department_description = "This is a loaded department."
            department = Department(department_name, department_description)
            for role in company_structure["sub_departments_structure"][depatment_id][
                department_name
            ]:
                role_name = role["name"]
                role_description = role["persona"]
                role_tools = get_tools_by_names(role["tools"])
                role = Role(role_name, role_description, role_tools)
                department.add_role(role)
            company.add_department(department)
            company.departments["Board"].add_sub_department(department)

    def step(self, env_description: str = "") -> Message:
        return super().step(env_description)

    def add_message_to_memory(self, messages: List[Message]) -> None:
        self.memory.add_message(messages)

    def reset(self) -> None:
        """Reset the agent"""
        self.memory.reset()
        # TODO: reset receiver
