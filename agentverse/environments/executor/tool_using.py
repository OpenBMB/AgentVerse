import json
import ast
import openai
from string import Template
from colorama import Fore
from aiohttp import ClientSession
from copy import deepcopy
from typing import TYPE_CHECKING, Any, List, Tuple

from agentverse.agents import ExecutorAgent
from agentverse.message import Message, ExecutorMessage, SolverMessage
from agentverse.logging import logger

from . import BaseExecutor, executor_registry
import asyncio


url = "http://127.0.0.1:8080"
# url = "http://8.217.97.110:8080"

SUMMARIZE_PROMPT = """Here is the text gathered from a webpage, and a question you need to answer from the webpage. 
-- Webpage -- 
${webpage}
-- Question --
${question}

Now summarize the webpage to answer the question."""


@executor_registry.register("tool-using")
class ToolUsingExecutor(BaseExecutor):
    num_agents: int = 3
    max_tool_call_times: int = 10
    tools: List[dict] = []
    tool_names: List[str] = []
    tool_config: str = None
    cookies: List = []
    tool_retrieval: bool = False
    # tool_description: str

    def __init__(self, *args, **kwargs):
        assert kwargs.get("tool_config", None) is not None
        with open(kwargs.get("tool_config"), "r") as f:
            tools_dict = json.load(f)
        tools = tools_dict["tools_json"]
        tool_names = [t["name"] for t in tools]

        # For each tool, we manually add a "thought" argument to achieve
        # chain-of-thought in OpenAI's function call.
        for t in tools:
            properties = t["parameters"]["properties"]
            thought = {
                "thought": {
                    "type": "string",
                    "description": "Your internal reasoning and thoughts on the task, and how you plan to solve it based on the current attempts.",
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
        plans: List[SolverMessage],
        *args,
        **kwargs,
    ):
        agents = [deepcopy(agent) for _ in range(len(plans))]
        for i in range(len(agents)):
            agents[i].name = plans[i].content.split("-")[0].strip()

        if self.tool_retrieval:
            # We retrieve 5 related tools for each agent
            tools_and_cookies = await asyncio.gather(
                *[self.retrieve_tools(plans, self.tools) for _ in range(len(agents))]
            )
            tools = [t[0] for t in tools_and_cookies]
            cookies = [t[1] for t in tools_and_cookies]
            self.update_cookies(cookies)
        else:
            # We just use the tools that are provided in the config file
            tools = [self.tools for _ in range(len(agents))]

        # Record the indices of agents that have finished their tasks
        # so that they will not be called again
        finished_agent_indices = set()
        result = ["" for _ in range(len(agents))]
        for i in range(self.max_tool_call_times):
            # TODO: force the model to use `task_submit` at the last step

            if len(finished_agent_indices) == len(agents):
                # All agents have finished their tasks. Break the loop.
                break

            # Filter out agents that have finished and gather tool actions for the rest
            tool_calls = []
            active_agents_indices = [
                idx
                for idx, agent in enumerate(agents)
                if idx not in finished_agent_indices
            ]
            for idx in active_agents_indices:
                tool_calls.append(
                    agents[idx].astep(task_description, plans[idx].content, tools[idx], current_turn=i+1)
                )
            # Use asyncio.gather to run astep concurrently
            tool_call_decisions = await asyncio.gather(*tool_calls)
            for idx, tool_call_result in zip(
                active_agents_indices, tool_call_decisions
            ):
                agents[idx].add_message_to_memory([tool_call_result])

            # Actually call the tool and get the observation
            tool_responses = await asyncio.gather(
                *[
                    ToolUsingExecutor.call_tool(
                        tool.tool_name,
                        tool.tool_input,
                        self.cookies[j] if j < len(self.cookies) else None,
                    )
                    for j, tool in enumerate(tool_call_decisions)
                ]
            )
            # Update each agent's memory and check if they have finished
            cookies = []
            for idx, response in zip(active_agents_indices, tool_responses):
                observation = response["observation"]
                is_finish = response["is_finish"]
                cookies.append(response["cookies"])
                agents[idx].add_message_to_memory([observation])
                logger.info(
                    f"\nTool: {observation.tool_name}\nTool Input: {observation.tool_input}\nObservation: {observation.content}",
                    agents[idx].name,
                    Fore.YELLOW,
                )
                if is_finish:
                    finished_agent_indices.add(idx)
                    result[idx] = observation.content
            self.update_cookies(cookies)

        message_result = []
        for i in range(len(result)):
            if result[i] != "":
                message_result.append(
                    ExecutorMessage(
                        content=f"[{agents[i].name}]: My execution result:\n{result[i]}",
                        sender=agents[i].name,
                    )
                )
        return message_result

    def update_cookies(self, cookies: List):
        if len(cookies) > len(self.cookies):
            self.cookies = cookies

    @classmethod
    async def retrieve_tools(
        cls, plan: SolverMessage, curr_tools: List = [], cookies=None
    ):
        async with ClientSession(cookies=cookies) as session:
            if cookies is None:
                async with session.post(f"{url}/get_cookie", timeout=30) as response:
                    cookies = response.cookies
                    session.cookie_jar.update_cookies(cookies)
                    await response.text()
                    # Sometimes the toolserver's docker container is not ready yet
                    # So we need to wait for a while
                    await asyncio.sleep(10)
            async with session.post(
                f"{url}/retrieving_tools", json={"question": plan.content, "top_k": 5}
            ) as response:
                retrieved_tools = await response.json()
                retrieved_tools = ast.literal_eval(retrieved_tools)
        tools = deepcopy(curr_tools)
        existed_tool_names = set([t["name"] for t in tools])
        # Add the retrieved tools into the final tools
        for tool in retrieved_tools["tools_json"]:
            if tool["name"] not in existed_tool_names:
                existed_tool_names.add(tool["name"])
                tools.append(tool)
        return tools, cookies

    @classmethod
    async def call_tool(cls, command: str, arguments: dict, cookies=None):
        async def _summarize_webpage(webpage, question):
            summarize_prompt = Template(SUMMARIZE_PROMPT).safe_substitute(
                webpage=webpage, question=question
            )
            response = await openai.ChatCompletion.acreate(
                messages=[{"role": "user", "content": summarize_prompt}],
                model="gpt-3.5-turbo-16k",
            )
            return response["choices"][0]["message"]["content"]

        if command == "submit_task":
            return {
                "observation": ExecutorMessage(
                    content=f"Task Status: {arguments['status']}\nConclusion: {arguments['conclusion']}",
                    sender="function",
                    tool_name=command,
                    tool_input=arguments,
                ),
                "is_finish": True,
                "cookies": cookies,
            }
        if command == 'None':
            return {
                'observation': ExecutorMessage(
                    content=f"The format is incorrect.",
                    sender="function",
                    tool_name=command,
                    tool_input=arguments,
                ),
                "is_finish": False,
                "cookies": cookies,
            }

        for i in range(3):
            try:
                async with ClientSession(cookies=cookies) as session:
                    if cookies is None:
                        async with session.post(
                            f"{url}/get_cookie", timeout=30
                        ) as response:
                            cookies = response.cookies
                            session.cookie_jar.update_cookies(cookies)
                            await response.text()
                            # Sometimes the toolserver's docker container is not ready yet
                            # So we need to wait for a while
                            await asyncio.sleep(10)

                    payload_arguments = deepcopy(arguments)
                    if "thought" in payload_arguments:
                        del payload_arguments["thought"]
                    payload = {
                        "tool_name": command,
                        "arguments": payload_arguments,
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
                        content = await response.text()
                        if command == "WebEnv_browse_website":
                            content = await _summarize_webpage(
                                content, arguments["question"]
                            )

                        message = ExecutorMessage(
                            content=content,
                            sender="function",
                            tool_name=command,
                            tool_input=arguments,
                        )
                    # async with session.post(
                    #     f"{url}/release_session", timeout=30
                    # ) as response:
                    #     await response.text()
                break
            except Exception as e:
                message = ExecutorMessage(
                    content="Failed to call the tool. Exception: " + str(e),
                    sender="function",
                    tool_name=command,
                    tool_input=arguments,
                )
                continue
        return {"observation": message, "is_finish": False, "cookies": cookies}

    def broadcast_messages(self, agents, messages) -> None:
        for agent in agents:
            agent.add_message_to_memory(messages)
