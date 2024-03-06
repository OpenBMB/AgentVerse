import abc
import json
import os
import uuid
from datetime import datetime

from AgentVerseIO.BaseIO import AgentVerseIO
from AgentVerseServer.database import InteractionBaseInterface
from AgentVerseServer.envs import AgentVerseServerEnv
from AgentVerseServer.loggers.logs import Logger
from AgentVerseServer.models.interaction import InteractionBase
from AgentVerseServer.models.parameter import InteractionParameter
from AgentVerseServer.models.subround import Subround
from AgentVerseServer.models.ws import AgentVerseOutputData


class AgentVerseInteraction(metaclass=abc.ABCMeta):
    def __init__(
        self,
        base: InteractionBase,
        parameter: InteractionParameter,
        interrupt: bool = False,
    ) -> None:
        self.base = base
        self.parameter = parameter
        self._cache: AgentVerseOutputData = None

        self.current_step = uuid.uuid4().hex
        self.logger = None
        self.interrupt = interrupt
        self.log_dir = os.path.join(
            os.path.join(
                AgentVerseServerEnv.base_dir, "localstorage", "interact_records"
            ),
            datetime.now().strftime("%Y-%m-%d"),
            self.base.interaction_id,
        )
        if not os.path.exists(self.log_dir):
            os.makedirs(self.log_dir)

    def to_dict(self):
        return self.parameter.to_dict()

    def to_json(self):
        return json.dumps(self.to_dict(), indent=2, ensure_ascii=False)

    def resister_logger(self, logger: Logger):
        self.logger = logger
        self.logger.info(f"init interaction: {self.base.interaction_id}")

    def resister_io(self, io: AgentVerseIO):
        self.io = io

    def register_db(self, db: InteractionBaseInterface):
        self.db = db

    def register_recorder_root_dir(self, recorder_root_dir):
        self.recorder_root_dir = recorder_root_dir

    def init_cache(self, data: AgentVerseOutputData):
        self._cache = data
        self.logger.info(f"init cache")

    def get_cache(self) -> dict:
        return self._cache.to_dict() if self.data_cache is not None else {}

    def save_cache(self):
        # self.logger.info(f"save cache into mongodb")
        with open(os.path.join(self.log_dir, "cache.json"), "w", encoding="utf-8") as f:
            json.dump(self._cache.to_dict(), f, indent=2, ensure_ascii=False)

    async def update_cache(self, update_data: dict, status="", current: str = None):
        if status not in [
            "start",
            "subround",
            "refinement",
            "stage",
            "finished",
            "failed",
        ]:
            raise ValueError(
                "status must be in ['start', 'subround', 'refinement', 'stage', 'finished', 'failed']"
            )

        self.current_step = uuid.uuid4().hex
        # self.logger.typewriter_log(
        # f"CURRENT: {self.current_step}", f"update cache, status {status}, current {current}, update_data: {update_data}")
        # if status == "inner":
        #     tool_name = (
        #         update_data.get("using_tools", {}).get("tool_name", "")
        #         if isinstance(update_data, dict)
        #         else ""
        #     )

        #     if tool_name == "subtask_submit":
        #         status = "subtask_submit"

        push_data = {
            "status": status,
            "current": current,
            "random_seed": self.current_step,
            "data": update_data,
        }

        if status == "start":
            # for k, v in update_data.items():
            #     if k == "subtasks":
            #         update_data["subtasks"] = [Subround(**subtask) for subtask in v]

            # self._cache.update(update_data)

            push_data = {
                "status": status,
                "random_seed": self.current_step,
                "data": {
                    k: v if k != "subtasks" else [l.to_dict() for l in v]
                    for k, v in update_data.items()
                },
            }
            self.db.update_interaction_status(
                self.base.interaction_id,
                status="running",
                message="running",
                current_step=self.current_step,
            )

        if status == "refinement":
            if current is None:
                raise ValueError("current must be a task_id while status is refinement")
            if not isinstance(update_data, dict):
                raise ValueError(
                    "update_data must be a dict while status is refinement"
                )
            # sub_task = None
            # for subtask in self._cache.subtasks:
            #     if current == subtask.task_id:
            #         subtask.refinement = update_data
            #         sub_task = subtask.to_dict()
            #         break
            push_data = {
                "status": status,
                # "node_id": sub_task.get("node_id", ""),
                # "task_id": sub_task.get("task_id", ""),
                # "name": sub_task.get("name", ""),
                # "args": sub_task.get("args", ""),
                "current": current,
                "data": update_data,
                "random_seed": self.current_step,
            }
            self.db.update_interaction_status(
                self.base.interaction_id,
                status="running",
                message="running",
                current_step=self.current_step,
            )

        if status == "stage":
            if current is None:
                raise ValueError("current must be a task_id while status is inner")
            if not isinstance(update_data, dict):
                raise ValueError("update_data must be a dict while status is inner")

            push_data = {
                "status": status,
                "current": current,
                "data": update_data,
                "random_seed": self.current_step,
            }

        await self.auto_send(push_data=push_data)
        if status == "finished":
            await self.auto_close()

    async def auto_send(self, push_data):
        # self.logger.info(f"send data: {push_data}")
        await self.io.Output.run(push_data)

    async def auto_receive(self, can_modify=None):
        data = await self.io.Input.run(can_modify)
        self.db.add_parameter(
            InteractionParameter(
                parameter_id=uuid.uuid4().hex,
                interaction_id=self.base.interaction_id,
                args=data.get("args", {}),
            )
        )
        return data

    async def auto_close(self):
        # self.io.close()
        self.logger.info(f"close io connection")
        self.db.update_interaction_status(
            self.base.interaction_id,
            status="finished",
            message="io connection closed",
            current_step=self.current_step,
        )
