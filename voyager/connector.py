import os
import aiohttp
import requests
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Union, Dict, List, Optional, Any
from .config import CONFIG

record_server = CONFIG["RECORD_SERVER"]
connector_api = {
    "connect": record_server + "/connect",
    "disconnect": record_server + "/disconnect",
    "capture": record_server + "/capture",
    "add_log": record_server + "/task/log",
    "get_task": record_server + "/task/get",
    "get_task_detail": record_server + "/task/get_detail",
    "add_task": record_server + "/task/add",
    "get_env": record_server + "/env/get",
    "release_env": record_server + "/env/release",
    "update_task_status": record_server + "/task/update_status",
    "update_task_describe": record_server + "/task/update_describe",
    "get_lock": record_server + "/lock/get",
    "release_lock": record_server + "/lock/release",
}


class TaskGetError(Exception):
    pass


def connector_request(api_call: str, payload: dict = None) -> dict:
    if payload:
        response = requests.post(connector_api[api_call], json=payload)
    else:
        response = requests.post(connector_api[api_call])
    if response.status_code == 200:
        return response.json()
    else:
        raise requests.exceptions.RequestException(
            f"Connector Request on Commond {api_call} Error: {response.status_code} "
        )


async def aconnector_request(api_call: str, payload: dict = None) -> dict:
    async with aiohttp.ClientSession() as session:
        if payload:
            async with session.post(connector_api[api_call], json=payload) as res:
                if res.status != 200:
                    raise requests.exceptions.RequestException(
                        f"Connector Request on Commond {api_call} Error: {res.status} "
                    )
                return await res.json()
        else:
            async with session.post(connector_api[api_call]) as res:
                if res.status != 200:
                    raise requests.exceptions.RequestException(
                        f"Connector Request on Commond {api_call} Error: {res.status} "
                    )
                return await res.json()


LOG_TIMES = 0


def add_log_to_task(task_id: str, source, types, message, scene_id=None):
    global LOG_TIMES
    # raise error when this function is called over COFIG['MAX_LOG_TIMES'] times
    LOG_TIMES = LOG_TIMES + 1
    if LOG_TIMES > CONFIG["MAX_LOG_TIMES"]:
        raise Exception("Log times exceeded!")

    if scene_id:
        log = LogModel(
            timestamp=datetime.now().isoformat(),
            source=source,
            types=types,
            message=message,
            scene_id=scene_id,
        )
    else:
        log = LogModel(
            timestamp=datetime.now().isoformat(),
            source=source,
            types=types,
            message=message,
        )

    try:
        connector_request("add_log", {"task_id": task_id, "log": log.dict()})
    except Exception as e:
        print(f"Adding Log {log} to Task {task_id} failed!\nError: {e}")


class ImageModel(BaseModel):
    file_name: str
    file_data: bytes


class SimulatedInstance(BaseModel):
    viewer_url: str
    status: str = "created"
    # 其他模拟实例的属性...


class LogModel(BaseModel):
    timestamp: str
    source: str
    types: str
    message: Union[str, List[Any], Dict[str, Any]]
    scene_id: Optional[str]


class TaskModel(BaseModel):
    name: str
    describe: str
    counter: int = Field(default=0, ge=0)
    # 其他任务属性...
    logs: List[LogModel] = []
    username: str = ""
