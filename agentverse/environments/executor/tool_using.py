import json
import time
import requests
from colorama import Fore
from aiohttp import ClientSession
from copy import deepcopy
from typing import TYPE_CHECKING, Any, List, Tuple

from agentverse.agents import ExecutorAgent
from agentverse.message import Message, ExecutorMessage
from agentverse.logging import logger

from . import BaseExecutor, executor_registry
import asyncio


@executor_registry.register("tool-using")
class ToolUsingExecutor(BaseExecutor):
    num_agents: int = 3
    max_tool_call_times: int = 10
    tools: List[dict] = []
    tool_names: List[str] = []
    # tool_description: str

    def __init__(self, *args, **kwargs):
        with open("tools_new.json", "r") as f:
            tools_dict = json.load(f)
        tools = tools_dict["tools_json"]
        tool_names = [t["name"] for t in tools]
        # tool_description = "\n".join(
        #     [f"`{k}`: " + tools_dict[k]["description"] for k in tools_dict.keys()]
        # )

        for t in tools:
            properties = t["parameters"]["properties"]
            thought = {
                "thought": {
                    "type": "string",
                    "description": "Your thought on how to proceed the task.",
                }
            }
            thought.update(properties)
            t["parameters"]["properties"] = thought
            t["parameters"]["required"].insert(0, "thought")
        super().__init__(
            tools=tools,
            tool_names=tool_names,
            # tool_description=tool_description,
            *args,
            **kwargs,
        )

    async def astep(
        self,
        agent: ExecutorAgent,
        task_description: str,
        plan: List[str],
        *args,
        **kwargs,
    ):
        agents = [deepcopy(agent) for _ in range(len(plan))]
        for i in range(len(agents)):
            agents[i].name = plan[i].split("-")[0].strip()

        finished_agent_indices = set()
        result = ["" for _ in range(len(agents))]
        for i in range(self.max_tool_call_times):
            if len(finished_agent_indices) == len(agents):
                # All agents have finished their tasks. Break the loop.
                break

            # Filter out agents that have finished and gather tool calls for the rest
            tool_calls = []
            active_agents_indices = [
                idx
                for idx, agent in enumerate(agents)
                if idx not in finished_agent_indices
            ]
            for idx in active_agents_indices:
                tool_calls.append(
                    agents[idx].astep(task_description, plan[idx], self.tools)
                )
            # Use asyncio.gather to run astep concurrently
            tool_call_decisions = await asyncio.gather(*tool_calls)
            for idx, tool_call_result in zip(
                active_agents_indices, tool_call_decisions
            ):
                agents[idx].add_message_to_memory([tool_call_result])

            tool_responses = await asyncio.gather(
                *[
                    ToolUsingExecutor.call_tool(tool.tool_name, tool.tool_input)
                    for tool in tool_call_decisions
                ]
            )
            # Update each agent's memory and check if they have finished
            for idx, (observation, is_finish) in zip(
                active_agents_indices, tool_responses
            ):
                agents[idx].add_message_to_memory([observation])
                logger.info(
                    f"\nTool: {observation.tool_name}\nTool Input: {observation.tool_input}\nObservation: {observation.content}",
                    agents[idx].name,
                    Fore.YELLOW,
                )
                if is_finish:
                    finished_agent_indices.add(idx)
                    result[idx] = observation.content

            # for i, (observation, is_finish) in enumerate(tool_response):
            #     agents[i].add_message_to_memory([observation])
        for i in range(len(result)):
            result[i] = f"[{agents[i].name}]: {result[i]}"
        return result

    @classmethod
    async def call_tool(cls, command: str, arguments: dict):
        if command == "submit_task":
            return (
                ExecutorMessage(
                    content=f"Task Status: {arguments['status']}\nConclusion: {arguments['conclusion']}",
                    sender="function",
                    tool_name=command,
                    tool_input=arguments,
                ),
                True,
            )
        # url = "http://8.217.97.110:8080/agentx_tools"
        url = "http://127.0.0.1:8080"
        # url = "http://8.217.97.110:8080"

        # cookies = requests.post(f"{url}/get_cookie").cookies
        # time.sleep(3)
        for i in range(3):
            try:
                async with ClientSession() as session:
                    async with session.post(
                        f"{url}/get_cookie", timeout=30
                    ) as response:
                        cookies = response.cookies
                    session.cookie_jar.update_cookies(cookies)
                    # Sometimes the toolserver's docker container is not ready yet
                    # So we need to wait for a while
                    await asyncio.sleep(1)

                    payload_arguments = deepcopy(arguments)
                    if "thought" in payload_arguments:
                        del payload_arguments["thought"]
                    payload = {
                        "tool_name": command,
                        "arguments": payload_arguments,
                        # "hash_id": "",
                        # "is_finish": False,
                    }
                    # async with ClientSession() as session:
                    async with session.post(
                        f"{url}/execute_tool",
                        json=payload,
                        headers={
                            "toolbench_key": "p5ZASSLBO0EknAQLE5ecNZ7kq5i1YfY9eoWUXNxL3TM6lXwdXs"
                        },
                        timeout=30,
                    ) as response:
                        if response.status == 200:
                            content = await response.text()
                        else:
                            content = "Error: " + str(response.status)

                        message = ExecutorMessage(
                            content=content,
                            sender="function",
                            tool_name=command,
                            tool_input=arguments,
                        )
                    async with session.post(
                        f"{url}/release_session", timeout=30
                    ) as response:
                        await response.text()
                break
            except Exception as e:
                message = ExecutorMessage(
                    content="Failed to call the tool. Exception: " + str(e),
                    sender="function",
                    tool_name=command,
                    tool_input=arguments,
                )
                continue
        return message, False

    def broadcast_messages(self, agents, messages) -> None:
        for agent in agents:
            agent.add_message_to_memory(messages)


if __name__ == "__main__":
    response = asyncio.run(
        ToolUsingExecutor.call_tool(
            "bing_search", {"query": "where is tsinghua university", "num_results": 3}
        )
    )
    print(response)
