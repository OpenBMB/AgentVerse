
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
            server_url = "http://127.0.0.1:8080"#xagent local sever required
            # server_url = "https://tool.feecha.site"
            response = requests.post(f'{server_url}/get_cookie')
            response.raise_for_status()
            cookies = response.cookies
            
            payload = tool
            response = requests.post(server_url, json=payload, headers={"toolbench_key":"p5ZASSLBO0EknAQLE5ecNZ7kq5i1YfY9eoWUXNxL3TM6lXwdXs"}, timeout=30,cookies=cookies)
            result += response.text
        return result
           