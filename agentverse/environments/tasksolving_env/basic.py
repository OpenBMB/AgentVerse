import asyncio
import uuid
from enum import Enum
from typing import Any, Dict, List, Tuple, Union
from colorama import Fore

from agentverse.environments import BaseEnvironment
from agentverse.agents.base import BaseAgent
from agentverse.logging import logger
from agentverse.message import Message, SolverMessage, ExecutorMessage
from AgentVerseServer.interaction import AgentVerseInteraction
from AgentVerseServer.models.ws import AgentVerseOutputData
from .. import env_registry as EnvironmentRegistry
from agentverse.utils import AGENT_TYPES

from agentverse.environments.tasksolving_env.rules import TasksolvingRule


@EnvironmentRegistry.register("task-basic")
class BasicEnvironment(BaseEnvironment):
    rule: TasksolvingRule
    agents: Dict[Enum, Union[BaseAgent, List[BaseAgent]]] = None

    task_description: str

    cnt_turn: int = 0
    max_turn: int = 10
    success: bool = False

    def __init__(self, **kwargs):
        rule_config = kwargs.pop("rule", {})
        role_assigner_config = rule_config.pop(
            "role_assigner", {"type": "role_description"}
        )
        decision_maker_config = rule_config.pop("decision_maker", {"type": "vertical"})
        executor_config = rule_config.pop("executor", {"type": "none"})
        evaluator_config = rule_config.pop("evaluator", {"type": "basic"})
        rule = TasksolvingRule(
            role_assigner_config=role_assigner_config,
            decision_maker_config=decision_maker_config,
            executor_config=executor_config,
            evaluator_config=evaluator_config,
        )
        super().__init__(rule=rule, **kwargs)

    async def step(
        self,
        advice: str = "No advice yet.",
        previous_plan: str = "No solution yet.",
        interaction: AgentVerseInteraction = None,
    ) -> List[Message]:
        result = ""
        logs = []

        logger.info(f"Loop Round {self.cnt_turn}")
        if interaction:
            await interaction.update_cache(
                update_data={
                    "node_id": uuid.uuid4().hex,
                    "task_id": str(self.cnt_turn),
                    "name": self.task_description,
                    "subround": {
                        "node_id": uuid.uuid4().hex,
                        "task_id": str(self.cnt_turn),
                        "recruitment": [],
                        "decision_make": [],
                        "aciton_exectuion": [],
                        "evaluation": [],
                        "isFinished": False,
                        "isRunning": False,
                        "refinement": {},
                        "isShowRefinement": False,
                    },
                },
                status="subround",
                current=str(self.cnt_turn),
            )
        # ================== EXPERT RECRUITMENT ==================
        agents = await self.rule.role_assign(
            self.task_description,
            self.agents,
            self.cnt_turn,
            advice,
        )
        description = "\n".join(
            [agent.name + ": " + agent.role_description for agent in agents]
        )
        logs.append({"module": "Role Assigner", "content": description})
        logger.info("", f"Role Assignment:\n{description}", Fore.CYAN)
        if interaction:
            await interaction.update_cache(
                update_data={
                    "node_id": uuid.uuid4().hex,
                    "task_id": str(self.cnt_turn),
                    "stage_id": "role_assign",
                    "data": {
                        "name": self.agents[AGENT_TYPES.ROLE_ASSIGNMENT].name,
                        "thought": f"{description}",
                        "stage_id": "role_assign",
                    },
                },
                status="stage",
                current=str(self.cnt_turn),
            )
        # ================== EXPERT RECRUITMENT ==================

        # ================== DECISION MAKING ==================
        plan: List[SolverMessage] = await self.rule.decision_making(
            self.task_description,
            self.agents,
            previous_plan,
            advice,
            interaction=interaction,
            cnt_turn=self.cnt_turn,
        )
        flatten_plan = "\n".join([p.content for p in plan])
        logs.append({"module": "Decision Maker", "content": flatten_plan})
        logger.info("", f"Decision Plan:\n{flatten_plan}", Fore.YELLOW)
        if interaction:
            await interaction.update_cache(
                update_data={
                    "node_id": uuid.uuid4().hex,
                    "task_id": str(self.cnt_turn),
                    "stage_id": "decision_make",
                    "data": {
                        "name": plan[0].sender if len(plan) > 0 else "",
                        "thought": f"{flatten_plan}",
                        "stage_id": "decision_make",
                    },
                },
                status="stage",
                current=str(self.cnt_turn),
            )
        # ================== DECISION MAKING ==================

        # ================== EXECUTION ==================
        result: List[ExecutorMessage] = await self.rule.execute(
            self.task_description,
            self.agents,
            plan,
            interaction=interaction,
            cnt_turn=self.cnt_turn,
        )
        flatten_result = "\n".join([r.content for r in result])
        logs.append({"module": "Executor", "content": flatten_result})
        logger.info("", f"Execution Result:", Fore.GREEN)
        logger.info("", flatten_result, Fore.GREEN)
        if interaction:
            for item in result:
                await interaction.update_cache(
                    update_data={
                        "node_id": uuid.uuid4().hex,
                        "task_id": str(self.cnt_turn),
                        "stage_id": "aciton_exectuion",
                        "data": {
                            "name": item.sender,
                            "thought": ":".join(item.content.split(":")[1:]),
                            "stage_id": "aciton_exectuion",
                        },
                    },
                    status="stage",
                    current=str(self.cnt_turn),
                )
        # ================== EXECUTION ==================

        # ================== EVALUATION ==================
        score, advice = await self.rule.evaluate(
            self.task_description, self.agents, plan, result
        )
        logs.append(
            {
                "agent": "evaluator",
                "content": f"Evaluation result: Score: {score}\nAdvice: {advice}",
            }
        )
        logger.info(
            "", f"Evaluation result:\nScore: {score}\nAdvice: {advice}", Fore.YELLOW
        )
        if score is not None and (
            (isinstance(score, bool) and score is True)
            or (isinstance(score, (list, tuple)) and all([s >= 8 for s in score]))
        ):
            # TODO: 8 is an arbitrary threshold
            logs.append({"agent": "system", "content": "Good score! Accept!"})
            # TODO: pop-up windows
            logger.info(
                "", f"Good score! Accept! Final Result:\n{flatten_plan}", Fore.GREEN
            )
            if interaction:
                await interaction.update_cache(
                    update_data={
                        "node_id": uuid.uuid4().hex,
                        "task_id": str(self.cnt_turn),
                        "data": {
                            "score": score,
                            "advice": advice,
                        },
                    },
                    status="finished",
                    current=str(self.cnt_turn),
                )
            self.success = True
        else:
            logs.append({"agent": "system", "content": "Bad score! Reject!"})
            # TODO: pop-up windows
            logger.info("", "Bad score! Reject!", Fore.RED)
            if interaction:
                await interaction.update_cache(
                    update_data={
                        "node_id": uuid.uuid4().hex,
                        "task_id": str(self.cnt_turn),
                        "data": {
                            "score": score,
                            "advice": advice,
                        },
                    },
                    status="refinement",
                    current=str(self.cnt_turn),
                )
        self.cnt_turn += 1
        return flatten_result, advice, flatten_plan, logs, self.success

    def iter_agents(self):
        for role, agent_or_agents in self.agents.items():
            if isinstance(agent_or_agents, list):
                for agent in agent_or_agents:
                    yield role, agent
            else:
                yield role, agent_or_agents

    def get_spend(self):
        total_spent = sum([agent.get_spend() for (_, agent) in self.iter_agents()])
        return total_spent

    def report_metrics(self) -> None:
        logger.info("", "Agent spend:", Fore.GREEN)
        for role, agent in self.iter_agents():
            name = agent.name.split(":")[0]
            logger.info(
                "",
                f"Agent (Role: {role}) {name}: {agent.get_spend_formatted()}",
                Fore.GREEN,
            )
        logger.info("", f"Total spent: ${self.get_spend():.6f}", Fore.GREEN)

    def is_done(self):
        """Check if the environment is done"""
        return self.cnt_turn >= self.max_turn or self.success

    def set_task_description(self, task_description: str = ""):
        self.task_description = task_description

    def reset(self) -> None:
        """Reset the environment"""
        self.cnt_turn = 0
        self.rule.reset()
