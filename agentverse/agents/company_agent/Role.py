from mallm.openai_utils import OpenAIUtils
from mallm.config import Config
from queue import Queue
from mallm.utils.common import parse_solution
from mallm.prompt import prompt
from mallm.tool_call_handler.autogpt_commands.command import CommandRegistry
from mallm.tool_call_handler.autogpt_commands import COMMAND_CATEGORIES
from mallm.tool_call_handler.rapid_API_registry import RapidAPIRegistry
from mallm.tool_call_handler.tool_call_handler import handle_tool_call
from mallm.config import Inter_Config as Configs
from mallm.tool_call_handler.workspace.workspace import Workspace
from mallm.utils.common import WORK_SPACE_ROOT_DIR
from queue import Queue
from mallm.memory import Memory
import json
import os


class Role:
    def __init__(
        self,
        name: str = "Role",
        persona: str = "you are a helpful assistant",
        tools: list = [],
    ):
        self.name = name
        self.tasks = Queue()
        self.tasks_history = []
        self.memory = {}
        self.Memory = Memory()
        self.inbox = Queue()
        self.department = None
        self.persona = persona
        self.company = None
        self.manager = None
        self.openai_chat = OpenAIUtils()
        self.openai_chat.set_system_prompt(self.persona)
        self.current_task = None
        self.logger = Config.LOGGER
        self.task_results = []
        self.tools = tools
        self.openai_conversation_history = []
        CFG = Configs()
        rapidapi_registry = RapidAPIRegistry()
        command_registry = CommandRegistry(CFG)
        for command_category in COMMAND_CATEGORIES:
            # print(command_category)
            command_registry.import_commands(command_category)
        # print(command_registry.commands)
        registry_list = [command_registry, rapidapi_registry]
        self.registry_list = registry_list
        self.message_received = []

    def send_message(self, recipient, message):
        if (
            recipient.department == self.department
            or recipient.department == self.department.super_department
            or self.department in recipient.department.get_sub_departments()
        ):
            recipient.inbox.put((self, message))

    def get_tool_names(self):
        return [tool["tool_name"] for tool in self.tools]

    def add_tool(self, tool):
        self.tools.append(tool)
        return self

    def add_tools(self, tools):
        self.tools.extend(tools)
        return self

    def receive_message(self):
        if not self.inbox.empty():
            sender, message = self.inbox.get()
            print(f"Message from {sender.name} to {self.name}: {message}")
        return self

    def add_task(self, task):
        self.tasks.put(task)
        self.tasks_history.append(task)
        return self

    def set_company(self, company_name: str):
        self.company = company_name
        return self

    def set_department(self, department_name: str):
        self.department = department_name
        return self

    def set_manager(self, manager):
        self.manager = manager
        return self

    def get_department(self):
        return self.department

    def get_company(self):
        return self.company

    def perform_task_langchain(self, workspace, workspace_root):
        if not self.tasks.empty():
            task = self.tasks.get()
            print(f"{self.name} is performing task: {task}")
            self.logger.log({self.name: task, "type": "task assignment"})
        else:
            return None

        # ReACT
        last_action = ""
        while last_action != "Finish":
            history_information = self.prepare_history_info()

            react_prompt = prompt.get_react_prompt(
                task=task, tools=self.tools, history_information=history_information
            )
            solution = self.openai_chat.chat(react_prompt)
            # self.logger.log({self.name: solution, "task": task, "type": "solution"})
            # Use the approach to perform the task (implementation can be further refined)
            thought, action_name, action_input = parse_solution(solution)

            # AutoGPT actions
            result = handle_tool_call(
                action_name, action_input, self.registry_list, workspace, workspace_root
            )
            # self.logger.log(response)
            react_result = {
                "thought": thought,
                "action_name": action_name,
                "action_input": action_input,
                "observation": result,
            }
            last_action = action_name
            self.add_memory(task=task, solution=solution, react_result=react_result)
            self.task_results.append(solution)
            self.logger.log(f"{react_result}")
        return result

    def perform_task(self, workspace, workspace_root):
        if not self.tasks.empty():
            task = self.tasks.get()
            print(f"{self.name} is performing task: {task['task']}")
            self.logger.log({self.name: task, "type": "task assignment"})
        else:
            return None

        # ReACT with function call
        last_action = ""
        current_turn = 0
        while last_action != "Finish":
            if current_turn > 5:
                break
            functions, system_prompt = prompt.get_function_call_prompt(
                tools=self.tools, persona=self.persona
            )

            task_prompt = prompt.get_solution_prompt(
                task=task["task"], necessary_information=task["necessary_information"]
            )
            if self.openai_conversation_history == []:
                solution = self.openai_chat.function_call_inter_loop(
                    self.openai_conversation_history,
                    system_prompt=system_prompt,
                    user_prompt=task_prompt,
                    functions=functions,
                )
                self.add_history_message({"role": "system", "content": system_prompt})
                self.add_history_message({"role": "user", "content": task})
            else:
                solution = self.openai_chat.function_call_inter_loop(
                    self.openai_conversation_history, functions=functions
                )

            if "content" in solution:
                thought = solution["content"]
            else:
                thought = ""
            if "function_call" in solution:
                action_name = solution["function_call"]["name"]
                action_input = solution["function_call"]["arguments"]
                if action_name == "Finish" and "give_up_and_restart" in action_input:
                    self.clean_memory()
                    self.clean_history_message()
                    continue
                self.add_history_message(
                    {
                        "role": "assistant",
                        "content": f"Thought: {thought}\nAction: {action_name}\nAction Input: {action_input}\n",
                    }
                )

                # AutoGPT actions
                result = handle_tool_call(
                    action_name,
                    action_input,
                    self.registry_list,
                    workspace,
                    workspace_root,
                )
                result = list(result)[0]
                # self.logger.log(response)
                self.add_history_message(
                    {"role": "function", "name": action_name, "content": result}
                )
                react_result = {
                    "thought": thought,
                    "action_name": action_name,
                    "action_input": action_input,
                    "observation": result,
                }
                self.add_memory(task=task, solution=solution, react_result=react_result)
                self.task_results.append(result)
                last_action = action_name
                self.logger.log(f"{react_result}")
            else:
                self.add_history_message(
                    {"role": "assistant", "content": f"Thought: {thought}\n"}
                )

            current_turn += 1

    def perform_task_without_tool(self):
        if not self.tasks.empty():
            task = self.tasks.get()
            print(f"{self.name} is performing task: {task}")
            self.logger.log({self.name: task, "type": "task assignment"})
        else:
            return
        task_prompt = prompt.get_solution_prompt(
            task=task["task"], necessary_information=task["necessary_information"]
        )
        solution = self.openai_chat.chat(task_prompt)
        self.memory[task["task"]] = solution
        self.Memory.add_memory({"task": task["task"], "solution": solution})
        self.task_results.append(solution)
        self.logger.log({self.name: solution, "task": task, "type": "solution"})
        # Use the approach to perform the task (implementation can be further refined)
        return solution

    def prepare_history_info(self):
        history_information = ""
        for task in self.memory:
            for history_info_dict in self.memory[task]:
                if "react_result" in history_info_dict:
                    thought = history_info_dict["react_result"]["thought"]
                    action_name = history_info_dict["react_result"]["action_name"]
                    action_input = history_info_dict["react_result"]["action_input"]
                    observation = history_info_dict["react_result"]["observation"]
                    history_information += f"Thought: {thought}\n"
                    history_information += f"Action: {action_name}\n"
                    history_information += f"Action Input: {action_input}\n"
                    history_information += f"Observation: {observation}\n"
                else:
                    solution = history_info_dict["solution"]
                    history_information += f"Solution: {solution}"
        return history_information

    def add_memory(self, task, solution, react_result):
        if task not in self.memory:
            self.memory[task] = []
        self.memory[task].append({"solution": solution, "react_result": react_result})

    def save_memory(self, path):
        with open(path, "w") as f:
            json.dump(self.memory, f)

    def add_history_message(self, message):
        self.openai_conversation_history.append(message)

    def clean_memory(self):
        self.memory = {}
        self.Memory.clear()

    def clean_history_message(self):
        self.openai_conversation_history = []


if __name__ == "__main__":
    tools = json.load(
        open("/Users/user/Downloads/git_clone/MALLM/mallm/agent/functions.json", "r")
    )

    role = Role(
        name="CHATDEV_programmer",
        persona="I am a professional programmer of CHATDEV. I can write/create computer software or applications by providing a specific programming language to the computer. I have extensive computing and coding experience in many varieties of programming languages and platforms, such as Python, Java, C, C++, HTML, CSS, JavaScript, XML, SQL, PHP, etc,.",
        tools=tools,
    )
    role.add_task(
        "write a python code into a file, named 'hello_world.py' that print 'Hello World'."
    )
    workspace_root = os.path.join(WORK_SPACE_ROOT_DIR, "tmp")
    workspace_root = Workspace.make_workspace(workspace_root)
    workspace = Workspace(workspace_root=workspace_root, restrict_to_workspace=True)
    result = role.perform_task(workspace=workspace, workspace_root=workspace_root)
    print(result)
