"""
An agent based upon Observation-Planning-Reflection architecture.
"""

import logging as logger

from abc import abstractmethod
from typing import List, Set, Union, NamedTuple

from pydantic import BaseModel, Field

from agentverse.llms import BaseLLM
from agentverse.memory import BaseMemory
from agentverse.message import Message
from agentverse.parser import OutputParser

from agentverse.message import Message
from agentverse.agents.base import BaseAgent

# from agentverse.utils.prompts

from datetime import datetime as dt
import datetime

from agentverse.utils.prompts import load_prompt


class AgentOPR(BaseAgent):
    def __init__(
        self,
        name: str,
        llm: BaseLLM,
        output_parser: OutputParser,
        prompt_template: str,
        role_description: str = "",
        memory: BaseMemory = BaseMemory(),
        max_retry: int = 3,
        receiver: Set[str] = set({"all"}),
        async_mode: bool = True,
        # agent_file,
        # environment
    ):
        super.__init__(
            name=name,
            llm=llm,
            output_parser=output_parser,
            prompt_template=prompt_template,
            role_description=role_description,
            memory=memory,
            max_retry=max_retry,
            receiver=receiver,
            async_mode=async_mode,
        )

    def step(self, current_time: dt, env_description: str = "") -> Message:
        """
        Call this method at each time frame
        """
        self.current_time = current_time

        logger.debug(
            "Agent {}, Time: {}, Status {}, Status Start: {}, Will last: {}".format(
                self.state_dict["name"],
                str(self.current_time),
                self.status,
                self.status_start_time,
                datetime.timedelta(seconds=self.status_duration),
            )
        )

        # To ensure the proper functioning of the agent, the memory, plan, and summary cannot be empty. Therefore, it is necessary to perform an initialization similar to what should be done at the beginning of each day.
        self.minimal_init()

        # before we handle any observation, we first check the status.
        self.check_status_passive()

        self.observe()

        if self.might_react():
            self.react()

        if self.movement:
            self.analysis_movement_target(self.movement_description)

        # 3.5 add observation to memory
        for ob in self.incoming_observation:
            self.long_term_memory.add(ob, self.current_time, ["observation"])
        self.incoming_observation = []  # empty the incoming observation

        # 4. Periodic fixed work of reflection and summary (tentatively set to be done every 100 logical frames).

        self.step_cnt += 1
        if self.step_cnt % self.summary_interval == 0:
            self.generate_summary(self.current_time)

        if self.step_cnt % self.reflection_interval == 0:
            self.reflect(self.current_time)

        return
