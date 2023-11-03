import abc
from colorama import Fore, Style
import requests
import json
from mallm.tool_call_handler.autogpt_commands.command import CommandRegistry
from mallm.utils.common import ToolCallStatusCode


def handle_tool_call(command_name, arguments, registry_list, workspace, workspace_root):
    """节点里含有一个工具调用和workspace，需要实际执行工具调用"""
    # workspace_root = os.path.join(WORK_SPACE_ROOT_DIR,"tmp")
    # self.workspace_root = Workspace.make_workspace(workspace_root)
    # self.workspace: Workspace = Workspace(workspace_root=self.workspace_root,restrict_to_workspace=True)

    command_registry = registry_list[0]
    command_registry.config.workspace_path = workspace_root
    command_registry.config.file_logger_path = (
        command_registry.config.workspace_path / "file_logger.txt"
    )

    # command_name = "read_file"
    # arguments = {'filename': '/mnt/d/git_repos/AIAgentPlus/workspace_cache/tmp/countries.txt'}

    # 虚实地址转换
    arguments = json.loads(arguments)
    arguments = _resolve_pathlike_command_args(workspace, arguments)

    print(
        "NEXT ACTION: ",
        Fore.CYAN,
        f"COMMAND = {Fore.CYAN}{command_name}{Style.RESET_ALL}  "
        f"ARGUMENTS = {Fore.CYAN}{arguments}{Style.RESET_ALL}",
    )
    if command_name is not None and command_name.lower().startswith("error"):
        result = f"Could not execute command: {arguments}"
    else:
        command_result, tool_output_status_code = execute_command(
            registry_list,
            command_name,
            arguments,
        )
        result = f"Command {command_name} returned: " f"{command_result}"

    if result is not None:
        print("SYSTEM: ", Fore.YELLOW, result)
    else:
        print("SYSTEM: ", Fore.YELLOW, "Unable to execute command")
    print("TOOL STATUS CODE: ", Fore.RED, f"{tool_output_status_code.name}")
    return result, tool_output_status_code


def _resolve_pathlike_command_args(workspace, command_args):
    if "directory" in command_args and command_args["directory"] in {"", "/"}:
        command_args["directory"] = str(workspace.root)
    else:
        for pathlike in ["filename", "directory", "clone_path"]:
            if pathlike in command_args:
                command_args[pathlike] = str(workspace.get_path(command_args[pathlike]))
    return command_args


def execute_command(
    registry_list,
    command_name: str,
    arguments,
):
    """Execute the command and return the result

    Args:
        command_name (str): The name of the command to execute
        arguments (dict): The arguments for the command

    Returns:
        str: The result of the command
    """
    for registry in registry_list:
        config = registry.config
        try:
            cmd = registry.commands.get(command_name)
            # If the command is found, call it with the provided arguments
            if cmd:
                if callable(cmd):
                    return (
                        cmd(**arguments, config=config),
                        ToolCallStatusCode.TOOL_CALL_SUCCESS,
                    )
                else:
                    return registry.handle(
                        action_name=command_name, action_input=arguments
                    )

            # # TODO: Remove commands below after they are moved to the command registry.
            # command_name = map_command_synonyms(command_name.lower())

            # # TODO: Change these to take in a file rather than pasted code, if
            # # non-file is given, return instructions "Input should be a python
            # # filepath, write your code to file and try again
            # for command in prompt.commands:
            #     if (
            #         command_name == command["label"].lower()
            #         or command_name == command["name"].lower()
            #     ):
            #         return command["function"](**arguments)
        except Exception as e:
            return f"Error: {str(e)}", ToolCallStatusCode.OTHER_ERROR
    return (
        f"Unknown command '{command_name}'. Please refer to the 'COMMANDS'"
        " list for available commands and only respond in the specified JSON"
        " format."
    ), ToolCallStatusCode.HALLUCINATE_NAME
