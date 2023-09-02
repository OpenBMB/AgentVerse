
from __future__ import annotations
import asyncio
from colorama import Fore

from typing import TYPE_CHECKING, List

from . import decision_maker_registry
from .base import BaseDecisionMaker
from agentverse.logging import typewriter_log

if TYPE_CHECKING:
    from agentverse.agents.base import BaseAgent
    from agentverse.message import Message


@decision_maker_registry.register("dynamic")
class DynamicDecisionMaker(BaseDecisionMaker):
    """
    Discuss in a horizontal manner.
    """

    ## To Do: implement dynamic
    #def step(
    async def astep(
        self,
        agents: List[BaseAgent],
        manager: List[BaseAgent],
        task_description: str,
        previous_plan: str = "No solution yet.",
        advice: str = "No advice yet.",
        previous_sentence: str = "No any sentence yet.",
        *args,
        **kwargs,
    ) -> List[str]:


        # Speak simultaneously
        # Manger select the optimial one as the current spoken sentence
        reviews = list()
        for i in range(len(agents)):

            review = await asyncio.gather(
                *[
                    agent.astep(previous_plan, advice, task_description)
                    for agent in agents[1:]
                ]
            )

            #typewriter_log("Reviews:", Fore.YELLOW)
            #typewriter_log(
            #    "\n".join(
            #        [
            #            f"[{review.sender_agent.role_description}]: {review.criticism}"
            #            for review in reviews
            #        ]
            #    ),
            #    Fore.YELLOW,
            #)

            previous_sentence = manager.step(previous_plan, review, advice, task_description, previous_sentence)
            reviews.append(previous_sentence)

        result = agents[0].step(previous_plan, reviews, advice, task_description)
        return [result]


    def reset(self):
        pass
