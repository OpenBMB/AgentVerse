
import requests
from typing import TYPE_CHECKING, Any, List, Tuple

from agentverse.agents import ExecutorAgent

from . import BaseExecutor, executor_registry
import asyncio
@executor_registry.register("tool-using")

class ToolUsingExecutor(BaseExecutor):
    num_agents :int =3
    
    
    async def astep(self, agent: ExecutorAgent, task_description: str, solution: List[str], *args, **kwargs) -> Any:
        return await super().astep(agent, task_description, solution, *args, **kwargs)
    def step(
        self,
        agent: ExecutorAgent,
        task_description: str,
        solution:str,
        *args,
        **kwargs,
    ):
        tools : str = ''
        with open('agentverse/tasks/tool_using/tools.jsonl','r')as f:
            for line in f:
                tools = tools + line
        self.tools = tools
        tool_call:dict = agent.step(task_description,solution,self.tools).content
        result = ''
        for i in tool_call.keys():
            tool = tool_call[i]
            url  = "http://8.217.97.110:8080/agentx_tools"
            arguments = tool['args']
            command_name = tool['tool']
            payload = {
                     "command_name": command_name,
                     "arguments": arguments,
                     "hash_id": "",
                     "is_finish": False
            }
            response = requests.post(url, json=payload, headers={"toolbench_key":"p5ZASSLBO0EknAQLE5ecNZ7kq5i1YfY9eoWUXNxL3TM6lXwdXs"}, timeout=30)
            result += response.text
        return result
           