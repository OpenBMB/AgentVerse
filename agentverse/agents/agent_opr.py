"""
An agent based upon Observation-Planning-Reflection architecture.
"""

from logging import getLogger

from abc import abstractmethod
from typing import List, Set, Union, NamedTuple

from pydantic import BaseModel, Field, validator

from agentverse.llms import BaseLLM
from agentverse.memory import BaseMemory, ChatHistoryMemory
from agentverse.message import Message
from agentverse.parser import OutputParser

from agentverse.message import Message
from agentverse.agents.base import BaseAgent

# from agentverse.utils.prompts

from datetime import datetime as dt
import datetime


from . import agent_registry

logger = getLogger(__file__)

REACTION_PROMPT = """Now you are act for as an agent named {name} in a virtual world. You might need to performing reaction to the observation. Your mission to take the agent as yourself and directly provide what the agent will do to the observations based on the following information:
(1) The agent's description: {summary}
(2) Current time is {time}
(3) Your current status is {status}
(4) Your memory is {context}

Now the observation has two types, incomming observation is the ones that other does to you, you are more likely to react to them.  Background observation are the background, which does not need to be responded. For example, view an alarm clock does not imply turning it off. However, some background observation might trigger your attention, like an alarming clock or a firing book.

So now:
The incoming observation is {observation}
The Some background observation is {background_observation}.

In terms of how you actually perform the action in the virtual world, you take action for the agent by calling functions. Currently, there are the following functions that can be called.

- act(description, target=None): do some action. `description` describes the action, set `description` to None for not act. `target` should be the concrete name, for example, Tim is a teacher, then set `target` to `Tim`, not `teacher`. 
- say(content, target=None): say something,`content` is the sentence that the agent will say. **Do not say to yourself, neither to inanimate objects.**
- move(description): move to somewhere. `description` describes the movement, set description to None for not move.
- do_nothing(): Do nothing. There is nothing that you like to respond to, this will make you stick to your original status and plan.

Some actions may not be needed in this situation. Call one function at a time, please give a thought before calling these actions, i.e., use the following format strictly:
            
Thought: None of the observation attract my attention, I need to:
Action: do_nothing()
Observation: [Observations omited]
[or]
Thought: due to observation `xxx`, I need to:
Action: say("hello", target="Alice")
Observation: [Observations omited]
[or]
Thought: due to observation `xxx`, I need to:
Action: act(None)
Observation: [Observations omited]
[or]
Thought: due to observation `xxx`, I need to:
Action: move(None)
Observation: [Observations omited]
[or]
Thought: I think I've finished my action as the agent. 
Action: end()
Observation:

Now begin your actions as the agent. Remember only write one function call after `Action:` """,


@agent_registry.register("OPR")
class AgentOPR(BaseAgent):
    async_mode: bool = True,
    current_time: str = None,
    traits: str = None,
    whole_day_plan: dict = Field(default_factory=dict)

    @validator('current_time')
    def convert_str_to_dt(cls, current_time):
        if not isinstance(current_time, str):
            raise ValueError('current_time should be str')
        return dt.strptime(current_time, "%Y-%m-%d %H:%M:%S")

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



    #TODO chimin

    async def astep(self, env_description: str = "") -> Message:
        """Asynchronous version of step"""
        prompt = self._fill_prompt_template(env_description)

        parsed_response = None
        for i in range(self.max_retry):
            try:
                response = await self.llm.agenerate_response(prompt)
                parsed_response = self.output_parser.parse(response)
                break
            except (KeyboardInterrupt, bdb.BdbQuit):
                raise
            except Exception as e:
                logger.error(e)
                logger.warning("Retrying...")
                continue

        if parsed_response is None:
            logger.error(f"{self.name} failed to generate valid response.")

        message = Message(
            content=""
            if parsed_response is None
            else parsed_response.return_values["output"],
            sender=self.name,
            receiver=self.get_receiver(),
        )
        return message

    # TODO call longtermmemory element
    def add_message_to_memory(self, messages: List[Message]) -> None:
        self.memory.add_message(messages)

    # Should call this when status changed, plan==status
    def add_plan_to_memory(self,) -> None:
        self.memory.add_plan(content=self.status, time=self.current_time)

    def reset(self) -> None:
        """Reset the agent"""
        self.memory.reset()
        # TODO: reset receiver

