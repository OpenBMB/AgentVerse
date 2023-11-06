import json
from typing import List


def get_tool_by_name(name: str):
    # return the tool object by name from data/tools.json
    """
    data format from tools.json
    {
            "tool_name": "execute_shell",
            "description": "Execute Shell Command, non-interactive commands only",
            "required_parameters": [
                {
                    "name": "command_line",
                    "type": "string",
                    "description": "command line"
                }
            ]
        },
    """
    with open("./data/tools.json", "r") as f:
        tools = json.load(f)
    for tool in tools:
        if tool["tool_name"] == name:
            return tool
    return None


def get_tools_by_names(names: List[str]):
    # return a list of tool objects by names from data/tools.json
    tools = []
    for name in names:
        tool = get_tool_by_name(name)
        if tool is not None:
            tools.append(tool)
    return tools
