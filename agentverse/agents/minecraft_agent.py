from __future__ import annotations

import os
import time
import logging
import bdb
from string import Template

from agentverse.message import Message

# from agentverse.utils import AsyncBarrier
from voyager import Voyager

from . import agent_registry
from .conversation_agent import ConversationAgent


@agent_registry.register("minecraft")
class MinecraftAgent(ConversationAgent):
    summarization_prompt_template: str
    voyager: Voyager = None
    goal: str = ""
    sub_task: str = ""
    reset_curriculum: bool = True
    inventory: list = []
    equipment: list = []

    class Config:
        arbitrary_types_allowed = True

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.voyager = Voyager(
            openai_api_key=os.environ.get("OPENAI_API_KEY", None),
            username=self.name,
            ckpt_dir=kwargs.pop("ckpt_dir", f"ckpt/{self.name}"),
            resume=kwargs.pop("resume", False),
            **kwargs,
        )
        # self.voyager.env.reset(
        #     options={
        #         "mode": "soft",
        #         "wait_ticks": self.voyager.env_wait_ticks,
        #     }
        # )

    async def astep(
        self,
        env_description: str = "",
        status: str = "discussion",
    ) -> Message:
        """Asynchronous version of step"""
        if status == "discussion":
            prompt = self._fill_prompt_template(env_description)
        elif status == "summarization":
            prompt = self._fill_summarization_prompt_template()
        if status in ["discussion", "summarization"]:
            parsed_response = None
            for i in range(self.max_retry):
                try:
                    response = await self.llm.agenerate_response(prompt)
                    parsed_response = self.output_parser.parse(response, status)
                    break
                except (KeyboardInterrupt, bdb.BdbQuit):
                    raise
                except Exception as e:
                    logging.error(e)
                    logging.warning("Retrying...")
                    continue

            if parsed_response is None:
                logging.error(f"{self.name} failed to generate valid response.")

            message = Message(
                content=""
                if parsed_response is None
                else parsed_response.return_values["output"],
                sender=self.name,
                receiver=self.get_receiver(),
            )

            if status == "summarization":
                self.voyager.curriculum_agent.sub_task = message.content
                # self.voyager.curriculum_agent.subsub_tasks = []
                self.voyager.curriculum_agent.goal = self.goal
                message.content = f"{self.name}'s sub-task is {message.content}"
                message.receiver = {self.name}
                message.sender = "System"

            return message
        elif status == "execution":
            self.voyager.env.reset(options={"inventory": self.inventory})
            self.voyager.curriculum_agent.failed_tasks = []
            response = await self.voyager.ainference(
                reset_env=self.reset_curriculum, reset_curriculum=self.reset_curriculum
            )
            # response = {
            #     "completed_tasks": [
            #         "collect 6 wooden planks",
            #         "collect 3 pieces of leather",
            #     ],
            #     "newly_completed_tasks": [
            #         "collect 6 wooden planks",
            #         "collect 3 pieces of leather",
            #     ],
            #     "inventory": {},
            #     "equipment": {},
            #     "x": 0,
            #     "y": 0,
            #     "z": 0,
            # }
            self.reset_curriculum = False
            return Message(
                content=self.parse_voyager_output(response),
                sender="System",
                receiver={"all"},
            )
        else:
            raise ValueError(
                f'Invalid status: {status}, should be "discussion" or "execution"'
            )

    def parse_voyager_output(self, response):
        all_completed_tasks = response["completed_tasks"]
        newly_completed_tasks = response["newly_completed_tasks"]
        failed_tasks = response["failed_tasks"]
        inventory = response["inventory"]
        self.inventory = inventory
        self.equipment = response["equipment"]
        x = response["x"]
        y = response["y"]
        z = response["z"]
        response = ""
        if len(newly_completed_tasks) > 0:
            response += (
                f"{self.name} newly accomplished the tasks {newly_completed_tasks}. "
            )
        if len(failed_tasks) > 0:
            response += (
                f"{self.name} just failed to accomplish the tasks {failed_tasks}. "
            )
        if len(all_completed_tasks) > 0:
            response += f"Now all the tasks {self.name} have completed so far are {all_completed_tasks}. "
        response += f"Now {self.name}'s inventory contains {inventory}. "
        return response

    def _fill_prompt_template(self, env_description: str = "") -> str:
        """Fill the placeholders in the prompt template

        In the conversation agent, three placeholders are supported:
        - ${agent_name}: the name of the agent
        - ${env_description}: the description of the environment
        - ${role_description}: the description of the role of the agent
        - ${chat_history}: the chat history of the agent
        """
        input_arguments = {
            "agent_name": self.name,
            "env_description": env_description,
            "role_description": self.role_description,
            "goal": self.goal,
            "chat_history": self.memory.to_string(add_sender_prefix=True),
        }
        return Template(self.prompt_template).safe_substitute(input_arguments)

    def _fill_summarization_prompt_template(self) -> str:
        """Fill the placeholders in the prompt template

        In the conversation agent, three placeholders are supported:
        - ${agent_name}: the name of the agent
        - ${chat_history}: the chat history of the agent
        """
        start_index = 0
        # for i, message in enumerate(self.memory.messages[::-1]):
        #     if message.sender == "System":
        #         assert i > 0, "No discussion message this turn."
        #         start_index = -i
        #         break
        input_arguments = {
            "agent_name": self.name,
            "chat_history": self.memory.to_string(
                add_sender_prefix=True, start_index=start_index
            ),
        }
        return Template(self.summarization_prompt_template).safe_substitute(
            input_arguments
        )

    def set_barrier_num(self, n):
        self.voyager.set_barrier_num(n)

    def decrease_barrier_num(self):
        self.voyager.decrease_barrier_num()

    def set_barrier(self, barrier):
        self.voyager.set_barrier(barrier)
