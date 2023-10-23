from mallm.agent import Company
from mallm.openai_utils import OpenAIUtils
from mallm.utils import retry, get_tools_by_names
from mallm.config import Config
from mallm.agent.Role import Role
from mallm.prompt import Prompt, Prompt_Functions
from mallm.agent.Company import Company
from mallm.agent.Department import Department
from mallm.agent.AgentPool import AgentPool
from mallm.tool_call_handler import BASIC_TOOLS
import json


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
        self.logger = Config.LOGGER
        self.company = None
        self.task = task
        self.agent_pool = agent_pool
        self.openai_chat = OpenAIUtils()
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
        structure_plan = self.openai_chat.function_call(
            Prompt.get_department_structure_prompt(self.task, roles),
            Prompt_Functions().get_functions("build_company"),
        )
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
            adding_more_roles = self.openai_chat.function_call(
                Prompt.get_adding_new_role_prompt(
                    self.task, company.get_structure_str()
                ),
                Prompt_Functions().get_functions("adding_new_roles"),
            )
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
        """
                json format example:
                {
            "Board": [
                {
                    "name": "CEO",
                    "persona": "You are a skilled planner. You can plan the roles or departments to finish complex tasks.",
                    "tools": [
                        "read_file",
                        "write_to_file",
                        "append_to_file",
                        "delete_file",
                        "list_files",
                        "download_file",
                        "clone_repository",
                        "write_tests",
                        "execute_python_file",
                        "execute_shell",
                        "execute_shell_popen",
                        "browse_website",
                        "scrape_text",
                        "analyze_code"
                    ]
                }
            ],
            "sub_departments": [
                "Data Collection",
                "Categorization and Evaluation",
                "Future Planning",
                "Budget Preparation"
            ],
            "sub_departments_structure": [
                {
                    "Data Collection": [
                        {
                            "name": "Billing Analyst",
                            "persona": "I have the following knowledge:\n1. Bachelor's degree in finance\n2. 2 years of experience in billing and financial analysis\n3. Strong analytical and problem-solving skills\n4. Proficiency in using billing software and tools\n5. Knowledge of accounting principles and practices\n6. Self-motivated and deadline-oriented\n7. Excel in Microsoft Excel and other spreadsheet software\n8. Excellent communication and interpersonal skills\n9. Familiarity with SAP and other ERP systems\n\nI am capable of the following tasks:\n1. Ensure accuracy in financial transactions\n2. Collaborate effectively with team members\n3. Streamline financial operations",
                            "tools": []
                        },
                        {
                            "name": "Full Charge Bookkeeper",
                            "persona": "I have the following knowledge:\n1. Bachelor's degree in accounting\n2. Over 5 years of experience in the field\n3. Proficient in accounting software such as QuickBooks\n4. Strong knowledge of GAAP\n5. Expertise in financial statement preparation and analysis\n6. Highly organized\n7. Able to work independently\n8. Meet deadlines effectively\n9. Excellent written and verbal communication skills\n10. Strong problem-solving and analytical skills\n11. Knowledge of payroll processing and tax regulations\n\nI am capable of the following tasks:\n1. Maintain accurate financial records\n2. Prepare and analyze financial statements\n3. Use accounting software effectively\n4. Follow GAAP guidelines\n5. Meet deadlines for financial reporting\n6. Communicate financial information clearly\n7. Solve financial problems\n8. Process payroll accurately\n9. Ensure compliance with tax regulations",
                            "tools": []
                        },
                        {
                            "name": "Billing Clerk",
                            "persona": "I have the following knowledge:\n1. Previous experience in billing\n2. Deep understanding of basic accounting principles and practices\n3. Proficiency in using billing software and tools\n4. Excellent communication skills\n5. Proactive problem solver\n6. Ability to work independently and meet deadlines\n7. Familiarity with Microsoft Excel for data analysis\n\nI am capable of the following tasks:\n1. Efficiently process and track invoices\n2. Ensure accuracy in data entry\n3. Communicate effectively with clients\n4. Resolve billing issues\n5. Handle confidential information with discretion\n6. Perform comprehensive data analysis using Microsoft Excel",
                            "tools": []
                        },
                        {
                            "name": "Data Analyst",
                            "persona": "Tasked with interpreting and managing financial data. This role will inform the decisions of other departments by presenting concise reports based on expenditures, income, and projections.",
                            "tools": []
                        }
                    ],
                    "sub_departments": [],
                    "sub_departments_structure": []
                },
                {
                    "Categorization and Evaluation": [
                        {
                            "name": "Finance Personnel",
                            "persona": "I have the following knowledge:\n1. Bachelor's degree in finance\n2. Strong understanding of financial principles\n3. Financial analysis and reporting\n4. Financial modeling and forecasting\n5. Accounting principles and practices\n6. Familiarity with financial software and systems\n7. Analytical and problem-solving skills\n8. Effective communication and interpersonal skills\n9. Professional certification as a CFA or CPA\n\nI am capable of the following tasks:\n1. Excel in financial analysis and reporting\n2. Make strategic decisions based on financial modeling and forecasting\n3. Work with accounting principles and practices\n4. Utilize financial software and systems\n5. Pay close attention to detail and accuracy\n6. Work independently or as part of a team\n7. Enhance capabilities with professional certification as a CFA or CPA",
                            "tools": []
                        },
                        {
                            "name": "Accounting Clerk",
                            "persona": "I have the following knowledge:\n1. Financial record management using software like QuickBooks or SAP\n2. Accuracy and adherence to accounting principles\n3. Organizational skills\n4. Analytical problem-solving skills\n5. Written and verbal communication skills\n6. Knowledge of tax regulations and compliance\n\nI am capable of the following tasks:\n1. Manage financial records\n2. Meet deadlines\n3. Solve analytical problems\n4. Financial reporting and analysis\n5. Contribute to financial stability and success through record-keeping and analysis",
                            "tools": []
                        },
                        {
                            "name": "Accounts Payable Clerk",
                            "persona": "I have the following knowledge:\n1. Strong attention to detail and accuracy\n2. Proficiency in using accounting software and tools\n3. Knowledge of basic accounting principles\n4. Excellent communication skills (written and verbal)\n5. Ability to work independently and meet deadlines\n\nI am capable of the following tasks:\n1. Seamless processing of invoices and payments\n2. Manage data entry and resolve discrepancies\n3. Maintain confidentiality and handle sensitive information\n4. Collaborate with internal teams and external vendors\n5. Ensure timely payments\n6. Contribute to the financial operations of the company",
                            "tools": []
                        }
                    ],
                    "sub_departments": [],
                    "sub_departments_structure": []
                },
                {
                    "Future Planning": [
                        {
                            "name": "Director of Finance",
                            "persona": "I have the following knowledge:\n1. Bachelor's degree in finance\n2. MBA\n3. 7+ years in finance and accounting roles\n4. 3 years in a leadership position\n5. Deep understanding of financial principles, practices, and regulations\n6. Expertise in financial planning, budgeting, and forecasting\n7. Skilled in financial analysis and reporting using various software and systems\n8. Exceptional communication and interpersonal skills\n9. Ability to lead and motivate teams\n10. Thrive in high-pressure environments\n11. Meticulous attention to detail\n12. Ability to make informed and timely decisions\n\nI am capable of the following tasks:\n1. Financial planning\n2. Budgeting\n3. Forecasting\n4. Financial analysis and reporting\n5. Leading and motivating teams\n6. Working in high-pressure environments\n7. Paying meticulous attention to detail\n8. Making informed and timely decisions",
                            "tools": []
                        },
                        {
                            "name": "Financial Analyst",
                            "persona": "Responsible for analysing financial data and making projections for future growth. This role is crucial for planning budgets and deciding on areas where expenses can be cut and where investments can bring significant returns",
                            "tools": []
                        }
                    ],
                    "sub_departments": [],
                    "sub_departments_structure": []
                },
                {
                    "Budget Preparation": [
                        {
                            "name": "Accounts Payable",
                            "persona": "I have the following knowledge:\n1. Bachelor's degree in accounting\n2. Strong knowledge of accounts payable processes and procedures\n3. Proficient in using accounting software and tools\n4. Attention to detail and accuracy\n5. Prioritizing and managing multiple tasks and deadlines\n6. Analytical and problem-solving skills\n7. Excellent communication and interpersonal skills\n8. Knowledge of tax regulations and compliance\n\nI am capable of the following tasks:\n1. Process accounts payable transactions\n2. Use accounting software and tools effectively\n3. Ensure accuracy in accounts payable records\n4. Prioritize and manage multiple tasks and deadlines\n5. Analyze and resolve issues related to accounts payable\n6. Communicate effectively with team members and stakeholders\n7. Work independently and collaboratively\n8. Ensure compliance with tax regulations",
                            "tools": []
                        }
                    ],
                    "sub_departments": [],
                    "sub_departments_structure": []
                }
            ]
        }
        """

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
