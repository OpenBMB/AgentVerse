from __future__ import annotations
import json
import asyncio
from copy import deepcopy
from colorama import Fore
from itertools import cycle

from typing import TYPE_CHECKING, List

from . import decision_maker_registry
from .base import BaseDecisionMaker
from agentverse.logging import logger
from agentverse.message import SolverMessage, Message

if TYPE_CHECKING:
    from agentverse.agents.base import BaseAgent
    from agentverse.message import CriticMessage


@decision_maker_registry.register("horizontal-tool")
class HorizontalToolDecisionMaker(BaseDecisionMaker):
    """
    Discuss in a horizontal manner.
    """

    name: str = "horizontal_tool"
    tools: List[dict] = []
    tool_names: List[str] = []
    tool_config: str = None

    def __init__(self, *args, **kwargs):
        assert kwargs.get("tool_config", None) is not None
        with open(kwargs.get("tool_config"), "r") as f:
            tools_dict = json.load(f)
        tools = tools_dict["tools_json"]
        tool_names = [t["name"] for t in tools]
        super().__init__(tools=tools, tool_names=tool_names, *args, **kwargs)

    # def step(
    async def astep(
        self,
        agents: List[BaseAgent],
        task_description: str,
        previous_plan: str = "No solution yet.",
        advice: str = "No advice yet.",
        **kwargs,
    ) -> List[str]:
        agents[0].memory.reset()
        if advice != "No advice yet.":
            self.broadcast_messages(
                agents[1:], [Message(content=advice, sender="Evaluator")]
            )
        all_roles = "\n".join(
            [f"{agent.name}: {agent.role_description}" for agent in agents[1:]]
        )
        end_flag = False
        discussion_cnt = 0
        for agent in cycle(agents[1:]):
            discussion_cnt += 1
            review: CriticMessage = await agent.astep(
                previous_plan, advice, task_description, all_roles
            )
            if review.content.strip().endswith("[END]"):
                review.content = review.content.strip().replace("[END]", "")
                if discussion_cnt >= len(agents) - 1:
                    # Force all the agents to speak at least once.
                    end_flag = True
            if review.content != "":
                self.broadcast_messages(agents, [review])

            logger.info("", "Reviews:", Fore.YELLOW)
            logger.info(
                "",
                f"[{review.sender}]: {review.content}",
                Fore.YELLOW,
            )
            if end_flag:
                break

        result: SolverMessage = agents[0].step(previous_plan, advice, task_description)
        result_list = []
        for res in result.content:
            res_tmp = deepcopy(result)
            res_tmp.content = " - ".join(res)
            result_list.append(res_tmp)
        return result_list

    def reset(self):
        pass
