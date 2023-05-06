import os
from typing import Dict, List

import yaml
from bmtools.agent.singletool import import_all_apis, load_single_tools
from langchain.agents import Agent as langchainAgent
from langchain.chat_models import ChatOpenAI
from langchain.chat_models.base import BaseChatModel
from langchain.llms import OpenAI
from langchain.llms.base import BaseLLM
from langchain.memory import ChatMessageHistory
from langchain.memory.prompt import _DEFAULT_SUMMARIZER_TEMPLATE
from langchain.prompts import PromptTemplate

from agentverse.agents import Agent
from agentverse.environments import BaseEnvironment, env_registry
from agentverse.memory import SummaryMemory
from agentverse.parser import output_parser_registry


def load_llm(llm_config: Dict):
    llm_type = llm_config.pop('llm_type', 'text-davinci-003')
    if llm_type == 'gpt-3.5-turbo':
        return ChatOpenAI(**llm_config)
    elif llm_type == 'text-davinci-003':
        return OpenAI(**llm_config)
    else:
        raise NotImplementedError("LLM type {} not implemented".format(llm_type))

def load_memory(memory_config: Dict):
    memory_type = memory_config.pop("memory_type", "chat_message_history")
    if memory_type == "chat_message_history":
        return ChatMessageHistory()
    elif memory_type == 'summary':
        llm = load_llm(memory_config.pop('llm', 'text-davinci-003'))
        prompt = memory_config.pop('prompt', _DEFAULT_SUMMARIZER_TEMPLATE)
        memory_config['prompt'] = PromptTemplate(
            input_variables=["summary", "new_lines"], template=prompt
        )
        return SummaryMemory(llm=llm, **memory_config)
    else:
        raise NotImplementedError("Memory type {} not implemented".format(memory_type))
    
def load_tools(tool_config: List[Dict]):
    if len(tool_config) == 0:
        return []
    all_tools_list = []
    for tool in tool_config:
        _, config = load_single_tools(tool['tool_name'], tool['tool_url'])
        all_tools_list += import_all_apis(config)
    return all_tools_list

def load_environment(env_config: Dict) -> BaseEnvironment:
    env_type = env_config.pop('env_type', 'base')
    return env_registry.build(env_type, **env_config)

def load_agent(agent_config: Dict) -> langchainAgent:
    agent_type = agent_config.pop('agent_type', 'chat')
    if agent_type == "chat":
        agent = Agent.from_llm_and_tools(**agent_config)
    else:
        raise NotImplementedError("Agent type {} not found".format(agent_type))
    return agent

def prepare_task_config(task):
    """Read the yaml config of the given task in `tasks` directory."""
    all_task_dir = os.path.join(os.path.dirname(__file__), 'tasks')
    task_path = os.path.join(all_task_dir, task)
    config_path = os.path.join(task_path, 'config.yaml')
    if not os.path.exists(task_path):
        all_tasks = []
        for task in os.listdir(all_task_dir):
            if os.path.isdir(os.path.join(all_task_dir, task)) \
                and task != "__pycache__":
                all_tasks.append(task)
        raise ValueError(f"Task {task} not found. Available tasks: {all_tasks}")
    if not os.path.exists(config_path):
        raise ValueError("You should include the config.yaml file in the task directory")
    task_config = yaml.safe_load(open(config_path))

    parser = output_parser_registry.build(task)
    task_config['output_parser'] = parser
    
    for i, agent_configs in enumerate(task_config['agents']):
        agent_configs['memory'] = load_memory(agent_configs['memory'])
        if agent_configs.get('tool_memory', None) is not None:
            agent_configs['tool_memory'] = load_memory(agent_configs['tool_memory'])
        llm = load_llm(agent_configs['llm'])
        agent_configs['llm'] = llm
        agent_configs['tools'] = load_tools(agent_configs.get("tools", []))

        # BaseLLM and its subclass will use .format to format the {chat_history} and {agent_scratchpad} during prompting
        # so we have to keep the bracket {{ and }} in the description of the tools (will become { and } after formatting})
        # BaseChatModel and its subclass will not use .format, so we have to replace {{ and }} with { and } in the description of the tools
        if isinstance(llm, BaseLLM):
            tool_strings = "\n".join(
                [f"> {tool.name}: {tool.description}" for tool in agent_configs['tools']]
            )
        elif isinstance(llm, BaseChatModel):
            tool_strings = "\n".join(
                [f"> {tool.name}: {tool.description.replace('{{', '{').replace('}}', '}')}" for tool in agent_configs['tools']]
            )
        else:
            raise NotImplementedError("LLM type {} not supported".format(llm.__class__.__name__))

        tool_names = ", ".join([tool.name for tool in agent_configs['tools']])
        # Here we assume that the description for tools only appears in prefix prompt with placeholder {tool}
        # and we assume that format prompt contains the placeholder {tool_names} that tells the model
        # which tools is available
        # TODO: Improve the flexibility
        agent_configs['output_parser'] = task_config['output_parser']
        agent_configs['prefix_prompt'] = agent_configs['prefix_prompt'] + '\n' + agent_configs['role_description']
        agent_configs['format_prompt'] = agent_configs['format_prompt'].format(tool_names=tool_names, tools=tool_strings)

    return task_config