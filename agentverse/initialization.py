from __future__ import annotations

import os
from typing import Dict, List, TYPE_CHECKING

import yaml
try:
    from bmtools.agent.singletool import import_all_apis, load_single_tools
except:
    print("BMTools is not installed, tools cannot be used. To install BMTools, \
         please follow the instruction in the README.md file.")

from agentverse.llms import llm_registry

from agentverse.agents import agent_registry
from agentverse.environments import BaseEnvironment, env_registry
from agentverse.memory import memory_registry

from agentverse.parser import output_parser_registry

if TYPE_CHECKING:
    from agentverse.agents import BaseAgent


def load_llm(llm_config: Dict):
    llm_type = llm_config.pop("llm_type", "text-davinci-003")

    return llm_registry.build(llm_type, **llm_config)


def load_memory(memory_config: Dict):
    memory_type = memory_config.pop("memory_type", "chat_history")
    return memory_registry.build(memory_type, **memory_config)


def load_tools(tool_config: List[Dict]):
    if len(tool_config) == 0:
        return []
    all_tools_list = []
    for tool in tool_config:
        _, config = load_single_tools(tool["tool_name"], tool["tool_url"])
        all_tools_list += import_all_apis(config)
    return all_tools_list


def load_environment(env_config: Dict) -> BaseEnvironment:
    env_type = env_config.pop("env_type", "basic")
    return env_registry.build(env_type, **env_config)


def load_agent(agent_config: Dict) -> BaseAgent:
    agent_type = agent_config.pop("agent_type", "conversation")
    agent = agent_registry.build(agent_type, **agent_config)
    return agent


def prepare_task_config(task):
    """Read the yaml config of the given task in `tasks` directory."""
    all_task_dir = os.path.join(os.path.dirname(__file__), "tasks")
    task_path = os.path.join(all_task_dir, task)
    config_path = os.path.join(task_path, "config.yaml")
    if not os.path.exists(task_path):
        all_tasks = []
        for task in os.listdir(all_task_dir):
            if (
                os.path.isdir(os.path.join(all_task_dir, task))
                and task != "__pycache__"
            ):
                all_tasks.append(task)
                for subtask in os.listdir(os.path.join(all_task_dir, task)):
                    if (
                        os.path.isdir(os.path.join(all_task_dir, task, subtask))
                        and subtask != "__pycache__"
                    ):
                        all_tasks.append(f"{task}/{subtask}")
        raise ValueError(f"Task {task} not found. Available tasks: {all_tasks}")
    if not os.path.exists(config_path):
        raise ValueError(
            "You should include the config.yaml file in the task directory"
        )
    task_config = yaml.safe_load(open(config_path))

    # Build the output parser
    parser = output_parser_registry.build(task)
    task_config["output_parser"] = parser

    for i, agent_configs in enumerate(task_config["agents"]):
        agent_configs["memory"] = load_memory(agent_configs.get("memory", {}))
        if agent_configs.get("tool_memory", None) is not None:
            agent_configs["tool_memory"] = load_memory(agent_configs["tool_memory"])
        llm = load_llm(agent_configs.get("llm", "text-davinci-003"))
        agent_configs["llm"] = llm
        agent_configs["tools"] = load_tools(agent_configs.get("tools", []))

        agent_configs["output_parser"] = task_config["output_parser"]

    return task_config
