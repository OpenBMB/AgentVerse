import json
import os
import traceback

from colorama import Fore

from AgentVerseServer.envs import AgentVerseServerEnv
from AgentVerseServer.interaction import AgentVerseInteraction
from agentverse.logging import Logger

# from AgentVerseServer.manager import manager
from AgentVerseServer.response_body import WebsocketResponseBody


class AgentVerseServer:
    def __init__(self) -> None:
        self.logger: Logger = None

    def set_logger(self, logger):
        self.logger = logger

    async def interact(self, interaction: AgentVerseInteraction):
        from agentverse.tasksolving import TaskSolving

        web_tasks_dir = os.path.join(
            os.path.dirname(__file__), "..", "agentverse", "tasks"
        )
        web_task = "tasksolving/tool_using/24point"
        agentversepipeline = TaskSolving.from_task(
            web_task,
            web_tasks_dir,
            cnt_agents=int(
                interaction.parameter.args["goal"]["_object"]["currentInput"][
                    "cnt_agents"
                ]
            ),
            task_description=interaction.parameter.args["goal"]["_object"][
                "currentInput"
            ]["task_des"],
        )

        try:
            self.logger.info(f"Start TaskSolving")
            await agentversepipeline.run(interaction=interaction)
        except Exception:
            self.logger.info(traceback.format_exc())
