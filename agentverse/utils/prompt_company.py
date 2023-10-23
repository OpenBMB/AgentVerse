class Prompt_Functions:
    def __init__(self):
        self.functions = [
            {
                "name": "build_company",
                "description": "You are the Recruiter of a company. You are given a task and a list of roles. You need to build a company structure with the roles so that the company can better solve the task. The company structure is a list of departments, and each department has a list of roles.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "department_list": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "department_name": {
                                        "type": "string",
                                        "description": "The name of the department.",
                                    },
                                    "description": {
                                        "type": "string",
                                        "description": "The description of the department. Such as what the department is responsible for within the company, and why the department is needed.",
                                    },
                                    "role_list": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "role_name": {
                                                    "type": "string",
                                                    "description": "The name of the role. Should exist in the role list provided.",
                                                },
                                                "reasoning": {
                                                    "type": "string",
                                                    "description": "Why the role is needed in the department.",
                                                },
                                                "tasks": {
                                                    "type": "string",
                                                    "description": "Give a background about what the role needs to do, and assign at least three most important tasks assigned to the role.",
                                                },
                                            },
                                            "required": [
                                                "role_name",
                                                "reasoning",
                                                "tasks",
                                            ],
                                        },
                                    },
                                },
                            },
                        }
                    },
                    "required": ["node", "reason"],
                },
            },
            {
                "name": "plan_tasks_by_department",
                "descriptions": "You are the planner. Given the complex task, the department list, and the last round summary, plan and assign the tasks accordingly to finish the complex tasks for each department",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "task_list": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "task": {
                                        "type": "string",
                                        "description": "The task of the department. Such as what the department is responsible for within the company, and why the department is needed.",
                                    },
                                    "department_list": {
                                        "type": "array",
                                        "items": {
                                            "type": "string",
                                            "description": "The name of the department.",
                                        },
                                    },
                                },
                            },
                        }
                    },
                },
            },
            {
                "name": "plan_tasks",
                "descriptions": "You are the planner. Given the complex task, the roles, and the last round summary, plan and assign the tasks accordingly to finish the complex tasks for each role",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "role_list": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "role_name": {
                                        "type": "string",
                                        "description": "The name of the role.",
                                    },
                                    "task": {
                                        "type": "string",
                                        "description": "The task of the role. Such as what the role is responsible for within the company, and why the role is needed.",
                                    },
                                    "necessary_information": {
                                        "type": "string",
                                        "description": "The specific necessary information that the role needs to complete the task. Such as the information that the role needs to get from other roles, and the information that the role needs to specify to other roles. The information should be specific and atom, and should be able to be used by the role to complete the task.",
                                    },
                                },
                            },
                        }
                    },
                },
            },
            {
                "name": "summarize_round",
                "descriptions": "You are the planner. Given the last round summary, summarize the round and decide if the task is finished or if further action is needed. You should include the important progress and important information to complete the task in the summary part.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "finished": {
                            "type": "boolean",
                            "description": "If the task is finished. True or False",
                        },
                        "summary": {
                            "type": "string",
                            "description": "The summary of the round",
                        },
                    },
                },
            },
            {
                "name": "adding_new_roles",
                "descriptions": " Given the task, and the company structure, if there are still more roles should be added to better solve the task, then add it in the list, with the name and the department and the description of the role. ",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "necessary": {
                            "type": "boolean",
                            "description": "If there is still a new role have to be added to better solve the task. True or False",
                        },
                        "role_list": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "role_name": {
                                        "type": "string",
                                        "description": "The name of the role.",
                                    },
                                    "role_description": {
                                        "type": "string",
                                        "description": "The description of the role. Represent the personality of the role. Should include the knowledge it has, the skills it has, the experience it has, the personality it has, and the tasks it can handle.",
                                    },
                                    "department_name": {
                                        "type": "string",
                                        "description": "The name of the department.",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            {
                "name": "solution_function_with_comminication",
            },
        ]

    def get_functions(self, function_name):
        for function in self.functions:
            if function["name"] == function_name:
                return [function]
        raise ValueError(f"Function {function_name} not found.")


class Constraints:
    @staticmethod
    def get_planner_constraints():
        return [
            "The planner should assign the tasks to the roles according to the summary",
            "The planner should assign the tasks to the roles according to the summary, and specify the tasks that need to be assigned to the other roles",
            "The planner should assign the tasks to the roles according to the summary, and specify the tasks that need to be assigned to the other roles, and specify the information that need to be given to the other roles",
            "The planner should assign the tasks to the roles according to the summary, and specify the tasks that need to be assigned to the other roles, and specify the information that need to be given to the other roles, and specify the information that need to be given to the other roles",
            "The planner should assign the tasks to the roles according to the summary, and specify the tasks that need to be assigned to the other roles, and specify the information that need to be given to the other roles, and specify the information that need to be given to the other roles, and specify the information that need to be given to the other roles",
        ]


class Prompt:
    @staticmethod
    def get_agent_prompt():
        return "You are a helpful assistant."

    @staticmethod
    def get_planner_prompt():
        return "You are a skilled planner. You can plan the roles or departments to finish complex tasks."

    @staticmethod
    def get_recruiter_prompt():
        return "You are a skilled recruiter. You can recruit roles to finish complex tasks. You are also able to generate new roles to better solve the task."

    @staticmethod
    def get_department_structure_prompt(task, roles):
        role_str = ", ".join(roles)
        return (
            f"You are a skilled planner. Organize a department structure given the task:{task} for the following task,"
            f"considering these roles: {role_str}.You should design several departments name for the roles, one department could have plenty roles,"
        )

    @staticmethod
    def get_role_task_prompt(description, task):
        return f"You are an {description}. Here's a task for you : {task}. Provide the best possible approach to complete it."

    @staticmethod
    def get_apporiate_company_name(task):
        return f"You are a useful assistant, given the task: {task}, provide an appropriate company name in one line."

    @staticmethod
    def get_planner_decision_prompt():
        return "You are the planner. Based on the feedback from the roles, decide if the task is completed or if further action is needed."

    @staticmethod
    def get_task_planning_prompt_start(complex_task, roles):
        roles_str = ", ".join(roles)
        # return (f"You are the planner. Given the complex task: '{complex_task}', the roles: {roles_str} "
        #         "plan and assign the tasks accordingly. You will be able to assign each roles with multiple rounds, and reorganize the roles to solve the complex tasks. You now will assign the first round of the task for each roles in order to complete the complex task. "
        #         "You need to give very atom and specific instructions about your assignment, it mush be appliable by the roles, you should also contain the information about how this will play a part of the complex tasks in the task description.")
        return (
            "You are the planner. You will be given a complex task and a set of roles. Plan and assign the tasks accordingly.\n\n"
            "1. You will be able to assign each roles with multiple rounds, and reorganize the roles to solve the complex tasks.\n"
            "2. You now will assign the first round of the task for each roles in order to complete the complex task.\n"
            "3. You need to give very atom and specific instructions about your assignment. It mush be applicable by the roles.\n"
            "4. You should also give the information about how each assignment will play a part of the complex tasks in the task description.\n"
            '5. If there is any tools needed, specify the tool name. Do Not give something vague such as "run the game in various environments to check if it launches properly".\n'
            "6. Just give me the plan and Do Not provide any additional commentary at any point.\n\n"
            f"Complex Task: {complex_task}\n"
            f"Roles: {roles}"
            f"Constraints: {Constraints.get_planner_constraints()}"
        )

    @staticmethod
    def get_task_planning_prompt_continue(complex_task, roles, summary, plan):
        roles_str = ", ".join(roles)
        return (
            f"You are the planner. Given the complex task: '{complex_task}', the roles: {roles_str}, "
            f"And the last round plans: {plan}, And the last round summary: {summary}, plan and assign the tasks accordingly to finish the complex tasks."
            f"According to the summary, if some roles require information from other roles, you should assign the tasks to the roles that have the information."
            f"According to the summary, if the roles need to specify some information to better complete the task, you should also specify the exact possible information to the roles so that they could finish the task."
            f"Constraints: {Constraints.get_planner_constraints()}"
        )

    @staticmethod
    def get_task_planning_prompt_start_department(complex_task, department_list_str):
        return (
            f"You are the planner. Given the complex task: '{complex_task}', the department list: {department_list_str}, "
            "plan and assign the tasks accordingly. You will be able to assign each department with multiple rounds, and reorganize the departments to solve the complex tasks. You now will assign the first round of the task for each department in order to complete the complex task. "
        )

    @staticmethod
    def get_task_planning_prompt_continue_department(
        complex_task, department_list_str, summary, plan
    ):
        return (
            f"You are the planner. Given the complex task: '{complex_task}', the department list: {department_list_str}, "
            f"And the last round plans: {plan}, And the last round summary: {summary}, plan and assign the tasks accordingly to finish the complex tasks."
            f"According to the summary, if some departments require information from other departments, you should assign the tasks to the departments that have the information."
            f"According to the summary, if the departments need to specify some information to better complete the task, you should also specify the exact possible information to the departments so that they could finish the task."
        )

    @staticmethod
    def get_summarize_round_prompt(task, roles_results):
        return (
            f"Given the {task}. Based on the results from the roles: {roles_results}, provide a summary for the round. "
            f"and explain if you think the task is finished "
        )

    @staticmethod
    def get_eval_prompt(summarization, task):
        return (
            f"You are the evaluator. For a task {task}, Provide a score from 1 to 10 for the round according to the summarization : {summarization}, and specify your reason in this form: "
            f"Rating: ### Reason: (make sure to use ### as the delimiter)"
        )

    @staticmethod
    def get_adding_new_role_prompt(task: str, company_structure: str):
        return (
            f"Given the task: {task}, and the company structure: {company_structure}, if there is still a new role should be added to better solve the task, if there still need to add a new role, "
            "please specify the role name, the role description, the role's department name in your response, you can add the role to the existing department or create a new department."
        )

    @staticmethod
    def get_related_roles_prompt(task_description, roles):
        roles_str = ", ".join(roles)
        return (
            f"You are a skilled retriever. Given the task description: {task_description}, retrieve the related roles from the following roles: {roles_str}. "
            "You should return the roles in a list, separated by '\\n'."
        )

    @staticmethod
    def get_customer_feedback_prompt(task: str, requirements: str):
        return (
            f"You are the customer. Given the task: {task}, and the requirements: {requirements}, provide feedback for the company. "
            "You should provide the necessary information required by the requirements."
        )

    @staticmethod
    def get_data_generator_prompt(task: str, requirements: str):
        return (
            f"You are the data generator. Given the task: {task}, and the requirements: {requirements}, provide data for the company. "
            "You should provide the necessary data required by the requirements."
        )

    @staticmethod
    def get_react_prompt(task: str, tools: list, history_information: str):
        REACT_PROMPT = """Complete the given task as best you can. Specifically, you have access to the following APIs:

{func_str}

Use the following format:
Thought: you should always think about what to do
Action: the action to take, should be one of {func_list}
Action Input: the input to the action
End Action

Begin! Remember: (1) Follow the format, i.e,
Thought:
Action:
Action Input:
End Action
(2) The Action: MUST be one of the following:{func_list}
(3) The action input should be a json string, for example, if there is filename in the parameters, then the action input should be: {"filename": the_input_filename}
(4) If you believe that you have finished the task (which can be judge from the history observations), please call:
Action: Finish
Action Input: {{"return_type": "give_answer", "final_answer": your answer string}}.

Given task: {task}

Here are the history actions and observations:
{history_information}
"""
        func_str = ""
        tools_names = ""
        for tool_dict in tools:
            tool_name = tool_dict["tool_name"]
            description = tool_dict["description"]
            parameters = tool_dict["parameters"]
            tools_names += f"{tool_name}, "
            func_str += f"tool_name: {tool_name}\ndescription: {description}\nparameters: {parameters}\n\n"
        react_prompt = (
            REACT_PROMPT.replace("{func_str}", func_str)
            .replace("{func_list}", tools_names)
            .replace("{func_list}", tools_names)
            .replace("{task}", task)
            .replace("{history_information}", history_information)
        )
        return react_prompt

    @staticmethod
    def get_solution_prompt(task: str, necessary_information: str):
        SOLUTION_PROMPT = f"""Complete the given task as best you can, the task is {task}. You are also given the necessary information to help you complete the task as following: {necessary_information}  .Specifically, you have access to the following APIs:
Question: The input question you need to answer
Thoughts: You should always think about how to do it
Action: The action to be taken, give the solution in text
Action Input: Input for the action
Observation: Result of the action
... (This Thoughts/Action/Action Input/Observation can be repeated N times)
Thoughts: I now know the final answer
Final Answer: The final answer to the original input question
"""
        return SOLUTION_PROMPT

    @staticmethod
    def get_function_call_prompt(tools: list, persona: str):
        functions = []
        task_description = f"""You should use functions to help handle the real time user querys. Remember:
1.ALWAYS call \"Finish\" function at the end of the task. And the final answer should contain enough information to show to the user,If you can't handle the task, or you find that function calls always fail(the function is not valid now), use function Finish->give_up_and_restart.
You have access of the following tools:\n"""
        for idx, tool_dict in enumerate(tools):
            tool_name = tool_dict["tool_name"]
            description = tool_dict["description"]
            task_description += f"{idx+1}.{tool_name}: {description}\n"
            function_dict = {
                "name": tool_name,
                "description": description,
                "parameters": {
                    "type": "object",
                    "properties": {},
                    "required": [],
                    "optional": [],
                },
            }
            required_parameters = tool_dict["required_parameters"]
            for required_parameter in required_parameters:
                param_name = required_parameter["name"]
                param_type = required_parameter["type"]
                param_desc = required_parameter["description"]
                function_dict["parameters"]["properties"][param_name] = {
                    "type": param_type,
                    "description": param_desc,
                }
                function_dict["parameters"]["required"].append(param_name)
            if "optional_parameters" in tool_dict:
                optional_parameters = tool_dict["optional_parameters"]
                for required_parameter in optional_parameters:
                    param_name = required_parameter["name"]
                    param_type = required_parameter["type"]
                    param_desc = required_parameter["description"]
                    param_default = required_parameter["default"]
                    function_dict["parameters"]["properties"][param_name] = {
                        "type": param_type,
                        "description": param_desc,
                        "default": param_default,
                    }
                    function_dict["parameters"]["optional"].append(param_name)
            functions.append(function_dict)
        task_description += f"{len(tools)+1}.Finish: If you believe that you have solved the task, please call this function to provide the final answer.\n"
        finish_func = {
            "name": "Finish",
            "description": "If you believe that you have solved the task, please call this function to provide the final answer. Alternatively, if you recognize that you are unable to proceed with the task in the current state, call this function to restart. Remember: you must ALWAYS call this function at the end of your attempt, and the only part that will be shown to the user is the final answer, so it should contain sufficient information.",
            "parameters": {
                "type": "object",
                "properties": {
                    "return_type": {
                        "type": "string",
                        "enum": ["give_answer", "give_up_and_restart"],
                    },
                    "final_answer": {
                        "type": "string",
                        "description": 'The final answer you want to give the user. You should have this field if "return_type"=="give_answer"',
                    },
                },
                "required": ["return_type"],
            },
        }
        functions.append(finish_func)
        system_prompt = """
Here is your persona: {persona}
You will be given a task description and a user query, then you need to call the available functions to solve the query.
Remember: 
1.All the thoughts is SHORT, at most 3 sentence!
2.If you have get enough information, call the function Finish: give_answer to give your answer of the task.
3.If you can't handle the task, call the function Finish: give_up_and_restart.
Let's Begin!
Task description: {task_description}""".replace(
            "{task_description}", task_description
        ).replace(
            "{persona}", persona
        )
        return functions, system_prompt


prompt = Prompt()
function_prompt = Prompt_Functions()
