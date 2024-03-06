import os.path
import time
import warnings
from typing import SupportsFloat, Any, Tuple, Dict
import requests
import aiohttp
import asyncio
import json
from globals import PAUSE_BARRIER, UNPAUSE_BARRIER, SERVER_PAUSED, CREATEBOT_LOCK

import voyager.utils as U
import gymnasium as gym
from gymnasium.core import ObsType
from .minecraft_launcher import MinecraftInstance
from .process_monitor import SubprocessMonitor
from ..connector import *


class VoyagerEnv(gym.Env):
    def __init__(
        self,
        azure_login=None,
        mineflayer_port=[10001, 10002],
        request_timeout=600,
        log_path="./logs",
        username="bot",
        mc_server_host="127.0.0.1",
        mc_server_port="25565",
    ):
        # if not mc_port and not azure_login:
        #     raise ValueError("Either mc_port or azure_login must be specified")
        if mc_server_port and azure_login:
            warnings.warn(
                "Both mc_port and mc_login are specified, mc_port will be ignored"
            )
        self.mineflayer_port = mineflayer_port
        self.mc_server_host = mc_server_host
        self.mc_server_port = mc_server_port

        self.azure_login = azure_login
        self.server = f"http://127.0.0.1:{self.mineflayer_port[0]}"

        self.request_timeout = request_timeout
        self.log_path = log_path
        self.username = username

        self.mineflayer = self.get_mineflayer_process(self.mineflayer_port[0])
        if azure_login:
            self.mc_instance = self.get_mc_instance()
        else:
            self.mc_instance = None
        self.has_reset = False
        self.reset_options = None
        self.connected = False
        self.scenerender = None
        self.instance_id = None

    def __del__(self):
        if self.instance_id:
            connector_request("disconnect", self.instance_id)

    def get_mineflayer_process(self, server_port):
        U.f_mkdir(self.log_path, "mineflayer")
        file_path = os.path.abspath(os.path.dirname(__file__))
        return SubprocessMonitor(
            commands=[
                "node",
                U.f_join(file_path, "mineflayer/index.js"),
                str(server_port),
            ],
            name="mineflayer",
            ready_match=r"Server started on port (\d+)",
            log_path=U.f_join(self.log_path, "mineflayer"),
        )

    def get_mc_instance(self):
        print("Creating Minecraft server")
        U.f_mkdir(self.log_path, "minecraft")
        return MinecraftInstance(
            **self.azure_login,
            mineflayer=self.mineflayer,
            log_path=U.f_join(self.log_path, "minecraft"),
            username=self.username,
        )

    def check_process(self):
        if self.mc_instance and not self.mc_instance.is_running:
            # if self.mc_instance:
            #     self.mc_instance.check_process()
            #     if not self.mc_instance.is_running:
            print("Starting Minecraft server")
            self.mc_instance.run()
            self.mc_server_port = self.mc_instance.port
            print(f"Server started on port {self.reset_options['port']}")

        self.reset_options["port"] = self.mc_server_port
        self.reset_options["host"] = self.mc_server_host
        self.reset_options["username"] = self.username
        self.reset_options["viewerport"] = self.mineflayer_port[1]

        retry = 0
        while not self.mineflayer.is_running:
            print("Mineflayer process has exited, restarting")
            self.mineflayer.run()
            if not self.mineflayer.is_running:
                if retry > 3:
                    raise RuntimeError("Mineflayer process failed to start")
                else:
                    continue
            print(self.mineflayer.ready_line)
            res = requests.post(
                f"{self.server}/start",
                json=self.reset_options,
                timeout=self.request_timeout,
            )
            if res.status_code != 200:
                self.mineflayer.stop()
                raise RuntimeError(
                    f"Mineflayer reply with code {res.status_code}.{res.reason}"
                )
            return res.json()

    def step(
        self,
        code: str,
        programs: str = "",
    ) -> Tuple[ObsType, SupportsFloat, bool, bool, Dict[str, Any]]:
        if not self.has_reset:
            raise RuntimeError("Environment has not been reset yet")
        self.check_process()
        self.unpause()
        data = {
            "code": code,
            "programs": programs,
        }
        res = requests.post(
            f"{self.server}/step", json=data, timeout=self.request_timeout
        )
        if res.status_code != 200:
            raise RuntimeError("Failed to step Minecraft server")
        returned_data = res.json()
        self.pause()
        data = json.loads(returned_data)
        # print(data)
        # data[0][1]['scene'] = self.render()

        return data

    def render(self) -> str:
        return connector_request("capture", self.instance_id)["id"]

    def reset(
        self,
        *,
        seed=None,
        options=None,
    ) -> Tuple[ObsType, Dict[str, Any]]:
        if options is None:
            options = {}

        if options.get("inventory", {}) and options.get("mode", "hard") != "hard":
            raise RuntimeError("inventory can only be set when options is hard")

        self.reset_options = {
            "reset": options.get("mode", "hard"),
            "inventory": options.get("inventory", {}),
            "equipment": options.get("equipment", []),
            "spread": options.get("spread", False),
            "waitTicks": options.get("wait_ticks", 5),
            "position": options.get("position", None),
        }

        self.unpause()
        self.mineflayer.stop()
        time.sleep(1)  # wait for mineflayer to exit

        returned_data = self.check_process()
        if not self.instance_id:
            self.instance_id = connector_request(
                "connect",
                SimulatedInstance(
                    viewer_url=f"http://{os.uname().nodename}:{self.mineflayer_port[1]}"
                ).dict(),
            )["instance_id"]

        self.has_reset = True
        self.connected = True
        # All the reset in step will be soft
        self.reset_options["reset"] = "soft"
        self.pause()
        return json.loads(returned_data)

    def close(self):
        self.unpause()
        connector_request("release_lock")
        if self.connected:
            res = requests.post(f"{self.server}/stop", json={"username": self.username})
            if res.status_code == 200:
                self.connected = False
        if self.mc_instance:
            self.mc_instance.stop()
        self.mineflayer.stop()

        if self.instance_id:
            connector_request("disconnect", self.instance_id)

        return not self.connected

    def pause(self):
        if self.mineflayer.is_running and not self.server_paused:
            res = requests.post(
                f"{self.server}/pause", json={"username": self.username}
            )
            if res.status_code == 200:
                self.server_paused = True
        return self.server_paused

    def unpause(self):
        if self.mineflayer.is_running and self.server_paused:
            res = requests.post(f"{self.server}/pause")
            if res.status_code == 200:
                self.server_paused = False
            else:
                print(res.json())
        return self.server_paused


class RemoteVoyagerEnv(gym.Env):
    def __init__(self, request_timeout=600, log_path="./logs", username="bot"):
        env = connector_request("get_env")
        print(
            "Successfully obtain env. id:",
            env["id"],
            "host:",
            env["host"],
            "port:",
            env["port"],
            "username:",
            username,
        )
        self.instance_id = env["id"]

        self.server = f"http://127.0.0.1:{env['port']}"

        self.request_timeout = request_timeout
        self.log_path = log_path
        self.username = username

        self.has_reset = False
        self.reset_options = None
        self.connected = False
        self.server_paused = False
        self.scenerender = None

        # will be initialized later
        global PAUSE_BARRIER
        global UNPAUSE_BARRIER
        self.pause_barrier = PAUSE_BARRIER
        self.unpause_barrier = UNPAUSE_BARRIER

    def check_mineflayer(self):
        res = requests.post(
            f"{self.server}/alive",
            timeout=self.request_timeout,
        )
        if res.status_code != 200:
            return False
        return True

    def set_barrier_num(self, n):
        self.unpause_barrier.n = n
        self.pause_barrier.n = n

    async def reset_barriers(self):
        await self.unpause_barrier.reset()
        await self.pause_barrier.reset()

    def decrease_barrier_num(self):
        self.unpause_barrier.n -= 1
        self.pause_barrier.n -= 1
        for barrier in [self.unpause_barrier, self.pause_barrier]:
            if barrier.n == barrier.count and barrier.n != 0:
                barrier.condition.notify_all()

    def step(
        self,
        code: str,
        programs: str = "",
    ) -> Tuple[ObsType, SupportsFloat, bool, bool, Dict[str, Any]]:
        print(f"{self.username} step")
        if not self.has_reset:
            raise RuntimeError("Environment has not been reset yet")

        self.unpause()
        data = {"code": code, "programs": programs, "username": self.username}
        res = requests.post(
            f"{self.server}/step", json=data, timeout=self.request_timeout
        )
        if res.status_code != 200:
            raise RuntimeError("Failed to step Minecraft server")
        returned_data = res.json()
        self.pause()
        data = json.loads(returned_data)

        return data

    async def astep(
        self,
        code: str,
        programs: str = "",
    ) -> Tuple[ObsType, SupportsFloat, bool, bool, Dict[str, Any]]:
        print(f"{self.username} env astep")
        if not self.has_reset:
            raise RuntimeError("Environment has not been reset yet")
        await self.unpause_barrier.wait()
        await self.unpause_barrier.reset()
        # await asyncio.sleep(0)
        print(f"{self.username} propose to unpause")
        self.unpause()
        data = {"code": code, "programs": programs, "username": self.username}

        timeout = aiohttp.ClientTimeout(self.request_timeout)
        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{self.server}/step", json=data, timeout=timeout
            ) as res:
                if res.status != 200:
                    raise RuntimeError("Failed to step Minecraft server")
                data = await res.json()

        await self.pause_barrier.wait()
        await self.pause_barrier.reset()
        # await asyncio.sleep(0)

        print(f"{self.username} propose to pause")
        self.pause()
        return json.loads(data)

    def render(self) -> str:
        pass
        # print(f"{self.username} render")
        # return connector_request("capture", self.instance_id)["id"]

    def reset(
        self,
        *,
        seed=None,
        options=None,
    ) -> Tuple[ObsType, Dict[str, Any]]:
        print(f"{self.username} reset")
        if options is None:
            options = {}

        if options.get("inventory", {}) and options.get("mode", "hard") != "hard":
            raise RuntimeError("inventory can only be set when options is hard")

        self.reset_options = {
            "username": self.username,
            "reset": options.get("mode", "hard"),
            "inventory": options.get("inventory", {}),
            "equipment": options.get("equipment", []),
            "spread": options.get("spread", False),
            "waitTicks": options.get("wait_ticks", 5),
            "position": options.get("position", None),
        }
        print(self.reset_options)

        res = requests.post(
            f"{self.server}/start",
            json=self.reset_options,
            timeout=self.request_timeout,
        )

        if res.status_code != 200:
            raise RuntimeError(
                f"Mineflayer reply with code {res.status_code}.{res.reason}"
            )
        self.unpause()
        connector_request("connect", self.instance_id)

        self.has_reset = True
        self.connected = True
        # All the reset in step will be soft
        self.reset_options["reset"] = "soft"
        self.pause()
        return json.loads(res.json())

    async def areset(
        self,
        *,
        seed=None,
        options=None,
    ) -> Tuple[ObsType, Dict[str, Any]]:
        print(f"{self.username} env areset")
        if options is None:
            options = {}

        if options.get("inventory", {}) and options.get("mode", "hard") != "hard":
            raise RuntimeError("inventory can only be set when options is hard")

        self.reset_options = {
            "username": self.username,
            "reset": options.get("mode", "hard"),
            "inventory": options.get("inventory", {}),
            "equipment": options.get("equipment", []),
            "spread": options.get("spread", False),
            "waitTicks": options.get("wait_ticks", 5),
            "position": options.get("position", None),
        }
        print(self.reset_options)

        async with CREATEBOT_LOCK:
            timeout = aiohttp.ClientTimeout(self.request_timeout)
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    f"{self.server}/start", json=self.reset_options, timeout=timeout
                ) as res:
                    if res.status != 200:
                        raise RuntimeError(
                            f"Mineflayer reply with code {res.status}.{res.reason}"
                        )
                    content = await res.json()

        await self.unpause_barrier.wait()
        await self.unpause_barrier.reset()
        # await asyncio.sleep(0)
        print(f"{self.username} propose to unpause")
        self.unpause()
        connector_request("connect", self.instance_id)

        self.has_reset = True
        self.connected = True
        # All the reset in step will be soft
        self.reset_options["reset"] = "soft"
        await self.pause_barrier.wait()
        await self.pause_barrier.reset()

        # await asyncio.sleep(0)
        print(f"{self.username} propose to pause")
        self.pause()
        # await self.reset_barriers()
        return json.loads(content)

    def close(self):
        print(f"{self.username} close")
        if self.connected:
            self.unpause()
            res = requests.post(f"{self.server}/stop", json={"username": self.username})
            if res.status_code == 200:
                self.connected = False
        if self.instance_id:
            connector_request("disconnect", self.instance_id)
            connector_request("release_env", self.instance_id)
            self.instance_id = None

        return not self.connected

    def pause(self):
        global SERVER_PAUSED
        if SERVER_PAUSED:
            print("Already paused")
            return True
        res = requests.post(f"{self.server}/pause")
        if res.status_code == 200:
            SERVER_PAUSED = True
        print("Server paused")
        return SERVER_PAUSED

    def unpause(self):
        global SERVER_PAUSED
        if not SERVER_PAUSED:
            print("Already unpaused")
            return False
        res = requests.post(f"{self.server}/unpause")
        if res.status_code == 200:
            SERVER_PAUSED = False
        else:
            print(res.json())
        print("Server unpaused")
        return SERVER_PAUSED

    def tp_to_spawn(self):
        res = requests.post(f"{self.server}/tp_spawn", json={"username": self.username})
        if res.status_code != 200:
            print(res.json())
