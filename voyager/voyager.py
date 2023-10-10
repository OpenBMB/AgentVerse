import copy
import json
import os
import time
import asyncio
from typing import Dict
import datetime
import voyager.utils as U
from globals import EXEC_TERMINATE
from .env import VoyagerEnv, RemoteVoyagerEnv

from .agents import ActionAgent
from .agents import CriticAgent
from .agents import CurriculumAgent
from .agents import SkillManager

# from .utils import JSONLogger, AsyncBarrier
from .connector import *

# from agentverse.utils import AsyncBarrier


# TODO: remove event memory
class Voyager:
    def __init__(
        self,
        azure_login=None,
        mineflayer_port=[10001, 10002],
        request_timeout=3610,
        log_path="./logs",
        username="bot",
        mc_server_host="127.0.0.1",
        mc_server_port="25565",
        openai_api_key: str = None,
        env_wait_ticks: int = 20,
        max_iterations: int = 160,
        reset_placed_if_failed: bool = False,
        action_agent_model_name: str = "gpt-4-0314",
        action_agent_temperature: int = 0.0,
        action_agent_task_max_retries: int = 4,
        action_agent_show_chat_log: bool = True,
        action_agent_show_execution_error: bool = True,
        curriculum_agent_model_name: str = "gpt-4-0314",
        curriculum_agent_temperature: int = 1.0,
        curriculum_agent_qa_model_name: str = "gpt-3.5-turbo",
        curriculum_agent_qa_temperature: int = 0,
        curriculum_agent_warm_up: Dict[str, int] = None,
        curriculum_agent_core_inventory_items: str = r".*_log|.*_planks|stick|crafting_table|furnace"
        r"|cobblestone|dirt|coal|.*_pickaxe|.*_sword|.*_axe",
        curriculum_agent_mode: str = "auto",
        critic_agent_model_name: str = "gpt-4-0314",
        critic_agent_temperature: int = 0.5,
        critic_agent_mode: str = "auto",
        skill_manager_model_name: str = "gpt-3.5-turbo",
        skill_manager_temperature: int = 0,
        skill_manager_retrieval_top_k: int = 5,
        openai_api_request_timeout: int = 240,
        ckpt_dir: str = "ckpt",
        skill_library_dir: str = None,
        resume: bool = False,
        remote: bool = True,
        **kwargs,
    ):
        """
        The main class for Voyager.
        Action agent is the iterative prompting mechanism in paper.
        Curriculum agent is the automatic curriculum in paper.
        Critic agent is the self-verification in paper.
        Skill manager is the skill library in paper.
        :param mc_port: minecraft in-game port
        :param azure_login: minecraft login config
        :param server_port: mineflayer port
        :param openai_api_key: openai api key
        :param env_wait_ticks: how many ticks at the end each step will wait, if you found some chat log missing,
        you should increase this value
        :param env_request_timeout: how many seconds to wait for each step, if the code execution exceeds this time,
        python side will terminate the connection and need to be resumed
        :param reset_placed_if_failed: whether to reset placed blocks if failed, useful for building task
        :param action_agent_model_name: action agent model name
        :param action_agent_temperature: action agent temperature
        :param action_agent_task_max_retries: how many times to retry if failed
        :param curriculum_agent_model_name: curriculum agent model name
        :param curriculum_agent_temperature: curriculum agent temperature
        :param curriculum_agent_qa_model_name: curriculum agent qa model name
        :param curriculum_agent_qa_temperature: curriculum agent qa temperature
        :param curriculum_agent_warm_up: info will show in curriculum human message
        if completed task larger than the value in dict, available keys are:
        {
            "context": int,
            "biome": int,
            "time": int,
            "other_blocks": int,
            "nearby_entities": int,
            "health": int,
            "hunger": int,
            "position": int,
            "equipment": int,
            "chests": int,
            "optional_inventory_items": int,
        }
        :param curriculum_agent_core_inventory_items: only show these items in inventory before optional_inventory_items
        reached in warm up
        :param curriculum_agent_mode: "auto" for automatic curriculum, "manual" for human curriculum
        :param critic_agent_model_name: critic agent model name
        :param critic_agent_temperature: critic agent temperature
        :param critic_agent_mode: "auto" for automatic critic ,"manual" for human critic
        :param skill_manager_model_name: skill manager model name
        :param skill_manager_temperature: skill manager temperature
        :param skill_manager_retrieval_top_k: how many skills to retrieve for each task
        :param openai_api_request_timeout: how many seconds to wait for openai api
        :param ckpt_dir: checkpoint dir
        :param resume: whether to resume from checkpoint
        """
        # init env
        if remote:
            self.env = RemoteVoyagerEnv(
                request_timeout=request_timeout,
                log_path=log_path,
                username=username,
                # barrier=barrier,
            )
            self.task_id = None
        else:
            self.env = VoyagerEnv(
                azure_login=azure_login,
                mineflayer_port=mineflayer_port,
                request_timeout=request_timeout,
                log_path=log_path,
                username=username,
                mc_server_host=mc_server_host,
                mc_server_port=mc_server_port,
            )
        self.username = username
        self.env_wait_ticks = env_wait_ticks
        self.reset_placed_if_failed = reset_placed_if_failed
        self.max_iterations = max_iterations

        # set openai api key
        # os.environ["OPENAI_API_KEY"] = openai_api_key

        # init agents
        self.action_agent = ActionAgent(
            model_name=action_agent_model_name,
            temperature=action_agent_temperature,
            request_timout=openai_api_request_timeout,
            ckpt_dir=ckpt_dir,
            resume=resume,
            chat_log=action_agent_show_chat_log,
            execution_error=action_agent_show_execution_error,
            username=self.username,
        )
        self.action_agent_task_max_retries = action_agent_task_max_retries
        self.curriculum_agent = CurriculumAgent(
            model_name=curriculum_agent_model_name,
            temperature=curriculum_agent_temperature,
            qa_model_name=curriculum_agent_qa_model_name,
            qa_temperature=curriculum_agent_qa_temperature,
            request_timout=openai_api_request_timeout,
            ckpt_dir=ckpt_dir,
            resume=resume,
            mode=curriculum_agent_mode,
            warm_up=curriculum_agent_warm_up,
            core_inventory_items=curriculum_agent_core_inventory_items,
            username=self.username,
        )
        self.critic_agent = CriticAgent(
            model_name=critic_agent_model_name,
            temperature=critic_agent_temperature,
            request_timout=openai_api_request_timeout,
            mode=critic_agent_mode,
            username=self.username,
        )
        self.skill_manager = SkillManager(
            model_name=skill_manager_model_name,
            temperature=skill_manager_temperature,
            retrieval_top_k=skill_manager_retrieval_top_k,
            request_timout=openai_api_request_timeout,
            ckpt_dir=skill_library_dir if skill_library_dir else ckpt_dir,
            resume=True if resume or skill_library_dir else False,
            username=self.username,
        )
        self.recorder = U.EventRecorder(ckpt_dir=ckpt_dir, resume=resume)
        self.resume = resume

        # init variables for rollout
        self.action_agent_rollout_num_iter = -1
        self.task = None
        self.context = ""
        self.messages = None
        self.conversations = []
        self.last_events = None
        # self.logger = JSONLogger(os.path.join(log_path,'voyager_log_'+datetime.datetime.now().strftime("%Y%m%d%H%M%S")+'.json'))

    # def set_barrier(self, barrier):
    #     self.env.barrier = barrier

    def set_barrier_num(self, n):
        self.env.set_barrier_num(n)

    def decrease_barrier_num(self):
        self.env.decrease_barrier_num()

    def decompose_task(self, task):
        if not self.last_events:
            self.last_events = self.env.reset(
                options={
                    "mode": "hard",
                    "wait_ticks": self.env_wait_ticks,
                }
            )
            add_log_to_task(
                self.task_id, source="environment", types="reset", message="Reset env."
            )
        return self.curriculum_agent.decompose_task(task, self.last_events)

    def reset(self, task, context="", reset_env=True):
        self.action_agent_rollout_num_iter = 0
        self.task = task
        self.context = context
        if reset_env:
            self.env.reset(
                options={
                    "mode": "soft",
                    "wait_ticks": self.env_wait_ticks,
                }
            )
            add_log_to_task(
                self.task_id, source="environment", types="reset", message="Reset env."
            )
        difficulty = (
            "easy" if len(self.curriculum_agent.completed_tasks) > 15 else "peaceful"
        )
        # step to peek an observation
        events = self.env.step(
            "bot.chat(`/time set ${getNextTime()}`);\n"
            + f"bot.chat('/difficulty {difficulty}');"
        )
        skills = self.skill_manager.retrieve_skills(query=self.context)
        print(
            f"\033[33m{self.username}: Render Action Agent system message with {len(skills)} control_primitives\033[0m"
        )
        system_message = self.action_agent.render_system_message(skills=skills)
        human_message = self.action_agent.render_human_message(
            events=events, code="", task=self.task, context=context, critique=""
        )
        self.messages = [system_message, human_message]
        print(
            f"\033[32m{self.username}: ****Action Agent human message****\n{human_message.content}\033[0m"
        )
        assert len(self.messages) == 2
        self.conversations = []
        return self.messages

    async def areset(self, task, context="", reset_env=True):
        self.action_agent_rollout_num_iter = 0
        self.task = task
        self.context = context
        if reset_env:
            await self.env.areset(
                options={
                    "mode": "soft",
                    "wait_ticks": self.env_wait_ticks,
                }
            )
            add_log_to_task(
                self.task_id, source="environment", types="reset", message="Reset env."
            )
        difficulty = (
            "easy" if len(self.curriculum_agent.completed_tasks) > 15 else "peaceful"
        )
        # step to peek an observation
        events = await self.env.astep(
            "bot.chat(`/time set ${getNextTime()}`);\n"
            + f"bot.chat('/difficulty {difficulty}');"
        )
        skills = self.skill_manager.retrieve_skills(query=self.context)
        print(
            f"\033[33m{self.username}: Render Action Agent system message with {len(skills)} control_primitives\033[0m"
        )
        system_message = self.action_agent.render_system_message(skills=skills)
        human_message = self.action_agent.render_human_message(
            events=events, code="", task=self.task, context=context, critique=""
        )
        self.messages = [system_message, human_message]
        print(
            f"\033[32m{self.username}: ****Action Agent human message****\n{human_message.content}\033[0m"
        )
        assert len(self.messages) == 2
        self.conversations = []
        return self.messages

    def close(self):
        self.env.close()

    def step(self):
        if self.action_agent_rollout_num_iter < 0:
            raise ValueError("Agent must be reset before stepping")

        ai_message = self.action_agent.llm(self.messages)
        print(
            f"\033[34m{self.username}: ****Action Agent ai message****\n{ai_message.content}\033[0m"
        )
        self.conversations.append(
            (self.messages[0].content, self.messages[1].content, ai_message.content)
        )
        add_log_to_task(
            self.task_id,
            source="action",
            types="response",
            message={
                "in": [
                    {"content": msg.content, "type": msg.type} for msg in self.messages
                ],
                "out": {"content": ai_message.content, "type": ai_message.type},
            },
        )

        parsed_result = self.action_agent.process_ai_message(message=ai_message)
        add_log_to_task(
            self.task_id, source="action", types="code", message=parsed_result
        )
        success = False
        if isinstance(parsed_result, dict):
            code = parsed_result["program_code"] + "\n" + parsed_result["exec_code"]
            add_log_to_task(
                self.task_id,
                source="system",
                types="info",
                message="Ready to act.",
                scene_id=self.env.render(),
            )

            events = self.env.step(
                code,
                programs=self.skill_manager.programs,
            )

            self.recorder.record(events, self.task)
            self.action_agent.update_chest_memory(events[-1][1]["nearbyChests"])
            (
                success,
                critique,
                response,
                messages,
            ) = self.critic_agent.check_task_success(
                events=events,
                task=self.task,
                context=self.context,
                chest_observation=self.action_agent.render_chest_observation(),
                max_retries=5,
            )
            add_log_to_task(
                self.task_id,
                source="critic",
                types="response",
                message={"in": messages, "out": response},
            )

            # 修改event
            add_log_to_task(
                self.task_id,
                source="environment",
                types="response",
                message={
                    "events": [{event[0]: event[1]} for event in events],
                    "success": success,
                    "critique": critique,
                },
                scene_id=self.env.render(),
            )

            if self.reset_placed_if_failed and not success:
                # revert all the placing event in the last step
                blocks = []
                positions = []
                for event_types, event in events:
                    if event_types == "onSave" and event["onSave"].endswith("_placed"):
                        block = event["onSave"].split("_placed")[0]
                        position = event["status"]["position"]
                        blocks.append(block)
                        positions.append(position)
                new_events = self.env.step(
                    f"await givePlacedItemBack(bot, {U.json_dumps(blocks)}, {U.json_dumps(positions)})",
                    programs=self.skill_manager.programs,
                )
                events[-1][1]["inventory"] = new_events[-1][1]["inventory"]
                events[-1][1]["voxels"] = new_events[-1][1]["voxels"]
            new_skills = self.skill_manager.retrieve_skills(
                query=self.context
                + "\n\n"
                + self.action_agent.summarize_chatlog(events)
            )
            add_log_to_task(
                self.task_id, source="skill", types="retrieve", message=new_skills
            )
            system_message = self.action_agent.render_system_message(skills=new_skills)
            human_message = self.action_agent.render_human_message(
                events=events,
                code=parsed_result["program_code"],
                task=self.task,
                context=self.context,
                critique=critique,
            )
            self.last_events = copy.deepcopy(events)
            self.messages = [system_message, human_message]
            add_log_to_task(
                self.task_id,
                source="action",
                types="info",
                message=[
                    {"content": msg.content, "type": msg.type} for msg in self.messages
                ],
            )

        else:
            assert isinstance(parsed_result, str)
            self.recorder.init_position = [
                self.last_events[-1][1]["status"]["position"]["x"],
                self.last_events[-1][1]["status"]["position"]["y"],
            ]
            self.recorder.record([], self.task)
            print(f"\033[34m{parsed_result} Trying again!\033[0m")
        assert len(self.messages) == 2
        self.action_agent_rollout_num_iter += 1
        done = (
            self.action_agent_rollout_num_iter >= self.action_agent_task_max_retries
            or success
        )
        info = {
            "success": success,
            "conversations": self.conversations,
        }
        if success:
            assert (
                "program_code" in parsed_result and "program_name" in parsed_result
            ), "program and program_name must be returned when success"
            info["program_code"] = parsed_result["program_code"]
            info["program_name"] = parsed_result["program_name"]
        else:
            print(
                f"\033[32m{self.username}: ****Action Agent human message****\n{self.messages[-1].content}\033[0m"
            )
        add_log_to_task(self.task_id, source="action", types="result", message=info)

        return self.messages, 0, done, info

    async def astep(self):
        if self.action_agent_rollout_num_iter < 0:
            raise ValueError("Agent must be reset before stepping")

        ai_message = await self.action_agent.llm._call_async(self.messages)
        print(
            f"\033[34m{self.username}: ****Action Agent ai message****\n{ai_message.content}\033[0m"
        )
        self.conversations.append(
            (self.messages[0].content, self.messages[1].content, ai_message.content)
        )
        add_log_to_task(
            self.task_id,
            source="action",
            types="response",
            message={
                "in": [
                    {"content": msg.content, "type": msg.type} for msg in self.messages
                ],
                "out": {"content": ai_message.content, "type": ai_message.type},
            },
        )

        parsed_result = self.action_agent.process_ai_message(message=ai_message)
        add_log_to_task(
            self.task_id, source="action", types="code", message=parsed_result
        )
        success = False
        if isinstance(parsed_result, dict):
            code = parsed_result["program_code"] + "\n" + parsed_result["exec_code"]
            add_log_to_task(
                self.task_id,
                source="system",
                types="info",
                message="Ready to act.",
                scene_id=self.env.render(),
            )

            events = await self.env.astep(
                code,
                programs=self.skill_manager.programs,
            )

            self.recorder.record(events, self.task)
            self.action_agent.update_chest_memory(events[-1][1]["nearbyChests"])
            (
                success,
                critique,
                response,
                messages,
            ) = self.critic_agent.check_task_success(
                events=events,
                task=self.task,
                context=self.context,
                chest_observation=self.action_agent.render_chest_observation(),
                max_retries=5,
            )
            add_log_to_task(
                self.task_id,
                source="critic",
                types="response",
                message={"in": messages, "out": response},
            )

            # 修改event
            add_log_to_task(
                self.task_id,
                source="environment",
                types="response",
                message={
                    "events": [{event[0]: event[1]} for event in events],
                    "success": success,
                    "critique": critique,
                },
                scene_id=self.env.render(),
            )

            if self.reset_placed_if_failed and not success:
                # revert all the placing event in the last step
                blocks = []
                positions = []
                for event_types, event in events:
                    if event_types == "onSave" and event["onSave"].endswith("_placed"):
                        block = event["onSave"].split("_placed")[0]
                        position = event["status"]["position"]
                        blocks.append(block)
                        positions.append(position)
                new_events = self.env.step(
                    f"await givePlacedItemBack(bot, {U.json_dumps(blocks)}, {U.json_dumps(positions)})",
                    programs=self.skill_manager.programs,
                )
                events[-1][1]["inventory"] = new_events[-1][1]["inventory"]
                events[-1][1]["voxels"] = new_events[-1][1]["voxels"]
            new_skills = self.skill_manager.retrieve_skills(
                query=self.context
                + "\n\n"
                + self.action_agent.summarize_chatlog(events)
            )
            add_log_to_task(
                self.task_id, source="skill", types="retrieve", message=new_skills
            )
            system_message = self.action_agent.render_system_message(skills=new_skills)
            human_message = self.action_agent.render_human_message(
                events=events,
                code=parsed_result["program_code"],
                task=self.task,
                context=self.context,
                critique=critique,
            )
            self.last_events = copy.deepcopy(events)
            self.messages = [system_message, human_message]
            add_log_to_task(
                self.task_id,
                source="action",
                types="info",
                message=[
                    {"content": msg.content, "type": msg.type} for msg in self.messages
                ],
            )

        else:
            assert isinstance(parsed_result, str)
            self.recorder.init_position = [
                self.last_events[-1][1]["status"]["position"]["x"],
                self.last_events[-1][1]["status"]["position"]["y"],
            ]
            self.recorder.record([], self.task)
            print(f"\033[34m{self.username}: {parsed_result} Trying again!\033[0m")
        assert len(self.messages) == 2
        self.action_agent_rollout_num_iter += 1
        done = (
            self.action_agent_rollout_num_iter >= self.action_agent_task_max_retries
            or success
        )
        info = {
            "success": success,
            "conversations": self.conversations,
        }
        if success:
            assert (
                "program_code" in parsed_result and "program_name" in parsed_result
            ), "program and program_name must be returned when success"
            info["program_code"] = parsed_result["program_code"]
            info["program_name"] = parsed_result["program_name"]
        else:
            print(
                f"\033[32m{self.username}: ****Action Agent human message****\n{self.messages[-1].content}\033[0m"
            )
        add_log_to_task(self.task_id, source="action", types="result", message=info)

        return self.messages, 0, done, info

    def rollout(self, *, task, context, reset_env=True):
        self.reset(task=task, context=context, reset_env=reset_env)
        while True:
            messages, reward, done, info = self.step()
            if done:
                break
        return messages, reward, done, info

    async def arollout(self, *, task, context, reset_env=True):
        # await self.areset(task=task, context=context, reset_env=reset_env)
        self.reset(task=task, context=context, reset_env=reset_env)
        while True:
            messages, reward, done, info = await self.astep()
            if done:
                break
        return messages, reward, done, info

    def learn(self, reset_env=True):
        if self.resume:
            # keep the inventory
            self.env.reset(
                options={
                    "mode": "soft",
                    "wait_ticks": self.env_wait_ticks,
                }
            )
        else:
            # clear the inventory
            self.env.reset(
                options={
                    "mode": "hard",
                    "wait_ticks": self.env_wait_ticks,
                }
            )
            self.resume = True
        self.last_events = self.env.step("")

        while True:
            if self.recorder.iteration > self.max_iterations:
                print("Iteration limit reached")
                break
            task, context = self.curriculum_agent.propose_next_task(
                events=self.last_events,
                chest_observation=self.action_agent.render_chest_observation(),
                max_retries=5,
            )
            self.task_id = connector_request(
                "add_task",
                {"name": task, "describe": context, "username": self.username},
            )["task_id"]

            print(
                f"\033[35m{self.username}: Starting task {task} for at most {self.action_agent_task_max_retries} times\033[0m"
            )
            try:
                messages, reward, done, info = self.rollout(
                    task=task,
                    context=context,
                    reset_env=reset_env,
                )
            except Exception as e:
                time.sleep(3)  # wait for mineflayer to exit
                info = {
                    "success": False,
                }
                # reset inventory here
                self.last_events = self.env.reset(
                    options={
                        "mode": "hard",
                        "wait_ticks": self.env_wait_ticks,
                        "inventory": self.last_events[-1][1]["inventory"],
                        "equipment": self.last_events[-1][1]["status"]["equipment"],
                        "position": self.last_events[-1][1]["status"]["position"],
                    }
                )
                # use red color background to print the error
                print(
                    f"{self.username}: Your last round rollout terminated due to error:"
                )
                print(f"\033[41m{e}\033[0m")
            if (
                task == "Place and deposit useless items into a chest"
                or task.startswith("Deposit useless items into the chest at")
            ):
                continue
            if info["success"]:
                print(f"\033[35m{self.username}: Completed task {task}.\033[0m")
                skill_info = self.skill_manager.add_skill(
                    program_name=info["program_name"],
                    program_code=info["program_code"],
                )
                self.curriculum_agent.completed_tasks.append(task)
            else:
                self.curriculum_agent.failed_tasks.append(task)
                print(
                    f"\033[35m{self.username}: Failed to complete task {task}. Skipping to next task.\033[0m"
                )
            # clean up tasks and dump to disk
            self.curriculum_agent.clean_up_tasks()
            print(
                f"\033[35m{self.username}: Completed tasks: {', '.join(self.curriculum_agent.completed_tasks)}\033[0m"
            )
            print(
                f"\033[35m{self.username}: Failed tasks: {', '.join(self.curriculum_agent.failed_tasks)}\033[0m"
            )

        return {
            "completed_tasks": self.curriculum_agent.completed_tasks,
            "failed_tasks": self.curriculum_agent.failed_tasks,
            "control_primitives": self.skill_manager.skills,
        }

    async def alearn(self, reset_env=True):
        # ret_data = {"success": False, "reason": "", "task": []}

        if self.resume:
            # keep the inventory
            await self.env.areset(
                options={
                    "mode": "soft",
                    "wait_ticks": self.env_wait_ticks,
                }
            )
        else:
            # clear the inventory
            await self.env.areset(
                options={
                    "mode": "hard",
                    "wait_ticks": self.env_wait_ticks,
                }
            )
            self.resume = True
        if self.last_events is None or self.last_events[-1][0] != "observe":
            self.last_events = await self.env.astep("")

        total_iteration = 0
        newly_completed_tasks = []
        while len(newly_completed_tasks) < 2 and total_iteration < 15:
            total_iteration += 1
            if self.recorder.iteration > self.max_iterations:
                print(f"{self.username}: Iteration limit reached")
                break
            task, context = await self.curriculum_agent.apropose_next_task(
                events=self.last_events,
                chest_observation=self.action_agent.render_chest_observation(),
                max_retries=5,
            )
            self.task_id = await aconnector_request(
                "add_task",
                {"name": task, "describe": context, "username": self.username},
            )["task_id"]

            print(
                f"\033[35m{self.username}: Starting task {task} for at most {self.action_agent_task_max_retries} times\033[0m"
            )
            try:
                messages, reward, done, info = await self.arollout(
                    task=task,
                    context=context,
                    reset_env=reset_env,
                )
            except Exception as e:
                time.sleep(3)  # wait for mineflayer to exit
                info = {
                    "success": False,
                }
                # reset inventory here
                self.last_events = await self.env.areset(
                    options={
                        "mode": "hard",
                        "wait_ticks": self.env_wait_ticks,
                        "inventory": self.last_events[-1][1]["inventory"],
                        "equipment": self.last_events[-1][1]["status"]["equipment"],
                        "position": self.last_events[-1][1]["status"]["position"],
                    }
                )
                # use red color background to print the error
                print(
                    f"{self.username}: Your last round rollout terminated due to error:"
                )
                print(f"\033[41m{e}\033[0m")
                # ret_data["reason"] = f"Rollout terminated due to error: {e}"

            if (
                task == "Place and deposit useless items into a chest"
                or task.startswith("Deposit useless items into the chest at")
            ):
                continue
            if info["success"]:
                print(f"\033[35m{self.username}: Completed task {task}.\033[0m")
                skill_info = self.skill_manager.add_skill(
                    program_name=info["program_name"],
                    program_code=info["program_code"],
                )
                self.curriculum_agent.completed_tasks.append(task)
                newly_completed_tasks.append(task)
                # ret_data["success"] = True
            else:
                self.curriculum_agent.failed_tasks.append(task)
                print(
                    f"\033[35m{self.username}: Failed to complete task {task}. Skipping to next task.\033[0m"
                )
                # ret_data["reason"] = f"Failed to complete task {task}"
        # clean up tasks and dump to disk
        self.curriculum_agent.clean_up_tasks()
        print(
            f"\033[35m{self.username}: Completed tasks: {', '.join(self.curriculum_agent.completed_tasks)}\033[0m"
        )
        print(
            f"\033[35m{self.username}: Failed tasks: {', '.join(self.curriculum_agent.failed_tasks)}\033[0m"
        )

        self.decrease_barrier_num()
        return {
            "completed_tasks": self.curriculum_agent.completed_tasks,
            "newly_completed_tasks": newly_completed_tasks,
            "failed_tasks": self.curriculum_agent.failed_tasks,
            "control_primitives": self.skill_manager.skills,
        }

    def inference(
        self, task, reset_mode="hard", reset_env=True, early_stop=False, sub_tasks=None
    ):
        self.curriculum_agent.completed_tasks = []
        self.curriculum_agent.failed_tasks = []
        self.last_events = self.env.step("")
        if not sub_tasks:
            sub_tasks = self.curriculum_agent.decompose_task(task, self.last_events)
            add_log_to_task(
                self.task_id, source="curriculum", types="subtasks", message=sub_tasks
            )
            connector_request(
                "update_task_describe",
                {
                    "task_id": self.task_id,
                    "describe": "Sub tasks:\n" + "\n".join(sub_tasks),
                },
            )
        iter_without_new_item = 0
        last_item_history = set()
        while self.curriculum_agent.progress < len(sub_tasks):
            next_task = sub_tasks[self.curriculum_agent.progress]
            context = self.curriculum_agent.get_task_context(next_task)
            add_log_to_task(
                self.task_id, source="curriculum", types="response", message=context
            )
            print(
                f"\033[35m{self.username}: Starting task {next_task} for at most {self.action_agent_task_max_retries} times\033[0m"
            )
            messages, reward, done, info = self.rollout(
                task=next_task,
                context=context,
                reset_env=reset_env,
            )
            if not self.recorder.item_history - last_item_history:
                iter_without_new_item += 1
            else:
                iter_without_new_item = 0
            last_item_history = self.recorder.item_history.copy()
            if iter_without_new_item >= 3 and early_stop:
                print("Early stop")
                add_log_to_task(
                    self.task_id,
                    source="system",
                    types="error",
                    message="Early stop! Task Failed!",
                )
                connector_request(
                    "update_task_status",
                    {"task_id": self.task_id, "status": "Early stop!"},
                )
                break
            if info["success"]:
                print(f"\033[35m{self.username}: Completed task {next_task}.\033[0m")
                self.curriculum_agent.completed_tasks.append(next_task)
                if next_task == sub_tasks[-1]:
                    connector_request(
                        "update_task_status",
                        {"task_id": self.task_id, "status": "completed"},
                    )
            else:
                print(
                    f"\033[35m{self.username}: Failed to complete task {next_task}. Skipping to next task.\033[0m"
                )
                self.curriculum_agent.failed_tasks.append(next_task)
                if next_task == sub_tasks[-1]:
                    connector_request(
                        "update_task_status",
                        {"task_id": self.task_id, "status": "failed"},
                    )

            # clean up tasks and dump to disk
            self.curriculum_agent.clean_up_tasks()
            print(
                f"\033[35m{self.username}: Completed tasks: {', '.join(self.curriculum_agent.completed_tasks)}\033[0m"
            )
            print(
                f"\033[35m{self.username}: Failed tasks: {', '.join(self.curriculum_agent.failed_tasks)}\033[0m"
            )

    async def ainference(
        self,
        reset_mode="hard",
        reset_env=True,
        early_stop=False,
        subsub_tasks=None,
        reset_curriculum=True,
    ):
        global EXEC_TERMINATE
        EXEC_TERMINATE = False
        if reset_curriculum:
            self.curriculum_agent.completed_tasks = []
            self.curriculum_agent.failed_tasks = []

        context = await self.curriculum_agent.aget_task_context(
            self.curriculum_agent.sub_task
        )
        self.task_id = (
            await aconnector_request(
                "add_task",
                {
                    "name": self.curriculum_agent.sub_task,
                    "describe": context,
                    "username": self.username,
                },
            )
        )["task_id"]
        # await self.env.areset(
        #     options={
        #         "mode": "hard",
        #         "inventory": self.last_events[-1][1]["inventory"]
        #         if self.last_events is not None
        #         else {},
        #         "equipment": self.last_events[-1][1]["status"]["equipment"]
        #         if self.last_events is not None
        #         else [],
        #         "wait_ticks": self.env_wait_ticks,
        #     }
        # )
        await self.env.unpause_barrier.wait()
        await self.env.unpause_barrier.reset()
        self.env.unpause()
        self.env.tp_to_spawn()
        await asyncio.sleep(1)
        await self.env.pause_barrier.wait()
        await self.env.pause_barrier.reset()
        self.env.pause()

        self.last_events = await self.env.astep("")
        if not subsub_tasks:
            # if self.curriculum_agent.subsub_tasks == []:
            subsub_tasks = await self.curriculum_agent.adecompose_task(
                self.curriculum_agent.sub_task, self.last_events
            )
            # self.curriculum_agent.subsub_tasks = subsub_tasks
            subsub_tasks = self.curriculum_agent.completed_tasks + subsub_tasks
            self.curriculum_agent.subsub_tasks = subsub_tasks
            add_log_to_task(
                self.task_id,
                source="curriculum",
                types="subtasks",
                message=subsub_tasks,
            )
            await aconnector_request(
                "update_task_describe",
                {
                    "task_id": self.task_id,
                    "describe": "Sub tasks:\n" + "\n".join(subsub_tasks),
                },
            )
            # else:
            #     subsub_tasks = self.curriculum_agent.subsub_tasks

        iter_without_new_item = 0
        last_item_history = set()
        iter_this_round = 0
        newly_completed_tasks = []
        while (
            self.curriculum_agent.progress < len(subsub_tasks)
            and iter_this_round < 5
            and EXEC_TERMINATE == False
        ):
            print(
                f"💡{self.username}: Iteration {iter_this_round}\nProgress {self.curriculum_agent.progress}\nSubtask: {self.curriculum_agent.sub_task}\nSubsubtask: {subsub_tasks}\nCompleted tasks: {self.curriculum_agent.completed_tasks}\nFailed tasks: {self.curriculum_agent.failed_tasks}\nNewly completed tasks: {newly_completed_tasks}"
            )
            iter_this_round += 1
            next_task = subsub_tasks[self.curriculum_agent.progress]
            context = await self.curriculum_agent.aget_task_context(next_task)
            add_log_to_task(
                self.task_id, source="curriculum", types="response", message=context
            )
            print(
                f"\033[35m{self.username}: Starting task {next_task} for at most {self.action_agent_task_max_retries} times\033[0m"
            )
            messages, reward, done, info = await self.arollout(
                task=next_task,
                context=context,
                reset_env=False,
            )
            if not self.recorder.item_history - last_item_history:
                iter_without_new_item += 1
            else:
                iter_without_new_item = 0
            last_item_history = self.recorder.item_history.copy()
            if iter_without_new_item >= 3 and early_stop:
                print("Early stop")
                add_log_to_task(
                    self.task_id,
                    source="system",
                    types="error",
                    message="Early stop! Task Failed!",
                )
                await aconnector_request(
                    "update_task_status",
                    {"task_id": self.task_id, "status": "Early stop!"},
                )
                break
            if info["success"]:
                print(f"\033[35m{self.username}: Completed task {next_task}.\033[0m")
                self.curriculum_agent.completed_tasks.append(next_task)
                newly_completed_tasks.append(next_task)
                if next_task == subsub_tasks[-1]:
                    await aconnector_request(
                        "update_task_status",
                        {"task_id": self.task_id, "status": "completed"},
                    )
            else:
                print(
                    f"\033[35m{self.username}: Failed to complete task {next_task}. Skipping to next task.\033[0m"
                )
                self.curriculum_agent.failed_tasks.append(next_task)
                if next_task == subsub_tasks[-1]:
                    await aconnector_request(
                        "update_task_status",
                        {"task_id": self.task_id, "status": "failed"},
                    )

            # clean up tasks and dump to disk
            self.curriculum_agent.clean_up_tasks()
            print(
                f"\033[35m{self.username}: Completed tasks: {', '.join(self.curriculum_agent.completed_tasks)}\033[0m"
            )
            print(
                f"\033[35m{self.username}: Failed tasks: {', '.join(self.curriculum_agent.failed_tasks)}\033[0m"
            )

        self.decrease_barrier_num()
        EXEC_TERMINATE = True
        return {
            "completed_tasks": self.curriculum_agent.completed_tasks,
            "newly_completed_tasks": newly_completed_tasks,
            "failed_tasks": self.curriculum_agent.failed_tasks,
            "control_primitives": self.skill_manager.skills,
            "inventory": self.last_events[-1][1]["inventory"],
            "equipment": self.last_events[-1][1]["status"]["equipment"],
            "x": self.last_events[-1][1]["status"]["position"]["x"],
            "y": self.last_events[-1][1]["status"]["position"]["y"],
            "z": self.last_events[-1][1]["status"]["position"]["z"],
        }

    def do_task(self):
        try:
            task_info = connector_request("get_task")
        except:
            raise TaskGetError()
        self.task_id = task_info["task_id"]
        task_name = task_info["task_name"]
        task_describe = task_info["task_describe"]

        self.env.reset(
            options={
                "mode": "hard",
                "wait_ticks": self.env_wait_ticks,
            }
        )
        add_log_to_task(
            self.task_id,
            source="environment",
            types="reset",
            message=f"Reset env {self.username}.",
        )

        connector_request(
            "update_task_status", {"task_id": self.task_id, "status": "running"}
        )

        self.inference(task_name, reset_env=False, early_stop=True)
