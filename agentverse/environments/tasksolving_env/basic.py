import asyncio
from enum import Enum
from typing import Any, Dict, List, Tuple, Union

from colorama import Fore

from agentverse.agents.base import BaseAgent
from agentverse.utils import AGENT_TYPES
from agentverse.environments.tasksolving_env.rules.decision_maker import (
    BaseDecisionMaker,
    DynamicDecisionMaker,
    decision_maker_registry,
)
from agentverse.environments.tasksolving_env.rules.evaluator import BaseEvaluator, evaluator_registry
from agentverse.environments.tasksolving_env.rules.executor import BaseExecutor, executor_registry
from agentverse.environments.tasksolving_env.rules.role_assigner import (
    BaseRoleAssigner,
    role_assigner_registry,
)
from agentverse.logging import logger, typewriter_log
from agentverse.message import Message, SolverMessage

from .. import env_registry as EnvironmentRegistry

# from .base import BaseEnvironment
from pydantic import BaseModel

# from agentverse.environments.simulation_env.rules.base import Rule

#@EnvironmentRegistry.register("basic")
#class BasicEnvironment(Rule):
#    pass



#class PipelineEnvironment(BaseModel):
@EnvironmentRegistry.register("basic")
class BasicEnvironment(BaseModel):
    """
    A basic environment implementing the logic of conversation.

    Args:
        agents: List of agents
        rule: Rule for the environment
        max_loop_rounds: Maximum number of loop rounds number
        cnt_turn: Current round number
        last_messages: Messages from last turn
        rule_params: Variables set by the rule
    """

    agents: Dict[Enum, Union[BaseAgent, List[BaseAgent]]] = None

    role_assigner: BaseRoleAssigner
    decision_maker: BaseDecisionMaker
    executor: BaseExecutor
    evaluator: BaseEvaluator

    task_description: str

    cnt_turn: int = 0
    max_turn: int = 10
    success: bool = False

    def __init__(self, **kwargs):
        def build_components(config: Dict, registry):
            component_type = config.pop("type")
            component = registry.build(component_type, **config)
            return component

        role_assigner = build_components(
            kwargs.pop("role_assigner", {"type": "role_description"}),
            role_assigner_registry,
        )
        decision_maker = build_components(
            kwargs.pop("decision_maker", {"type": "vertical"}),
            decision_maker_registry,
        )
        executor = build_components(
            kwargs.pop("executor", {"type": "none"}), executor_registry
        )
        evaluator = build_components(
            kwargs.pop("evaluator", {"type": "basic"}), evaluator_registry
        )

        super().__init__(
            role_assigner=role_assigner,
            decision_maker=decision_maker,
            executor=executor,
            evaluator=evaluator,
            **kwargs,
        )

    async def step(
        self, advice: str = "No advice yet.", previous_plan: str = "No solution yet."
    ) -> List[Message]:
        # advice = "No advice yet."
        result = ""
        # previous_plan = "No solution yet."
        logs = []

        logger.info(f"Loop Round {self.cnt_turn}")

        # ================== EXPERT RECRUITMENT ==================
        agents = self.role_assign(advice)
        description = "\n".join([agent.role_description for agent in agents])
        logs.append({"module": "Role Assigner", "content": description})
        logger.info("", f"Role Assignment:\n{description}", Fore.CYAN)
        # ================== EXPERT RECRUITMENT ==================

        # ================== DECISION MAKING ==================
        if "dynamic" in self.decision_maker.name:
            plan = await self.decision_making(
                agents, self.agents[AGENT_TYPES.MANAGER], previous_plan, advice
            )
        else:
            plan = await self.decision_making(agents, None, previous_plan, advice)
        # Although plan may be a list in some cases, all the cases we currently consider
        # only have one plan, so we just take the first element.
        # TODO: make it more general
        plan = plan[0].content
        logs.append({"module": "Decision Maker", "content": plan})
        logger.info("", f"Decision Plan:\n{plan}", Fore.YELLOW)
        # ================== DECISION MAKING ==================

        # ================== EXECUTION ==================
        result = self.execute(plan)
        logs.append({"module": "Executor", "content": result})
        logger.info("", f"Execution Result:", Fore.GREEN)
        logger.info("", result, Fore.GREEN)
        # ================== EXECUTION ==================

        # ================== EVALUATION ==================
        score, advice = self.evaluate(plan, result)
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
            logger.info("", f"Good score! Accept! Final Result:\n{plan}", Fore.GREEN)
            self.success = True
        else:
            logs.append({"agent": "system", "content": "Bad score! Reject!"})
            logger.info("", "Bad score! Reject!", Fore.RED)
        self.cnt_turn += 1
        return result, advice, plan, logs, self.success

    def role_assign(self, advice: str = "") -> List[BaseAgent]:
        """Assign roles to agents"""

        agents = self.role_assigner.step(
            role_assigner=self.agents[AGENT_TYPES.ROLE_ASSIGNMENT],
            group_members=[self.agents[AGENT_TYPES.SOLVER]]
            + self.agents[AGENT_TYPES.CRITIC],
            advice=advice,
            task_description=self.task_description,
        )
        return agents

    async def decision_making(
        self,
        agents: List[BaseAgent],
        manager: List[BaseAgent],
        previous_plan: str,
        advice: str = "No advice yet.",
    ) -> List[SolverMessage]:
        # TODO: plan should be string or a special type of object?

        # dynamic
        if "dynamic" in self.decision_maker.name:
            plan = await self.decision_maker.astep(
                agents=agents,
                manager=manager,
                task_description=self.task_description,
                previous_plan=previous_plan,
                advice=advice,
            )
        else:
            plan = await self.decision_maker.astep(
                agents=agents,
                task_description=self.task_description,
                previous_plan=previous_plan,
                advice=advice,
            )
        return plan

    # def solve(
    #     self, former_solution: str, critic_opinions: List[Tuple[object, str]]
    # ) -> str:
    #     """Solve: Generate solution"""
    #     message = self.solver.step(
    #         former_solution, critic_opinions, False, self.task_description
    #     )
    #     preliminary_solution = message.content
    #     return preliminary_solution

    # def summarize(
    #     self, former_solution: str, critic_opinions: List[Tuple[object, str]]
    # ) -> str:
    #     """Summarize: Generate summary"""
    #     message = self.solver.step(
    #         former_solution, critic_opinions, True, self.task_description
    #     )
    #     summary = message.content
    #     return summary

    # async def criticize(
    #     self, preliminary_solution: str = "", advice: str = ""
    # ) -> List[AgentCriticism]:
    #     """Criticize: iterate over all critics and gather opinions"""
    #     if self.is_parallel:
    #         criticisms = await asyncio.gather(
    #             *[
    #                 self.critics[i].astep(
    #                     preliminary_solution, advice, self.task_description
    #                 )
    #                 for i in range(self.cnt_critic_agents)
    #             ]
    #         )
    #     else:
    #         criticisms = []
    #         for i in range(self.cnt_critic_agents):
    #             criticism = await self.critics[i].astep(
    #                 preliminary_solution, advice, self.task_description
    #             )
    #             if preliminary_solution == "No solution yet.":
    #                 preliminary_solution = ""
    #             preliminary_solution += f'[{criticism.sender_agent.role_description}]:\n"""\n{criticism.criticism}\n"""'
    #             criticisms.append(criticism)

    #     # critic_messages = [x.content for x in critic_messages]
    #     return criticisms

    def execute(self, final_solution: str = "") -> Any:
        """execution stage.
        Use the executor to finish the task.
        """

        return self.executor.step(
            self.agents[AGENT_TYPES.EXECUTION], self.task_description, final_solution
        )

    def evaluate(
        self, solution: Union[List[str], str], result: Any
    ) -> Tuple[List[int], str]:
        """evaluation stage."""
        # if self.human_eval:
        #     print("This round, LLM gave the following result:")
        #     print(result)
        #     comprehensiveness = input("Please evaluate the comprehensiveness>> ")
        #     detailedness = input("Please evaluate the detailedness>> ")
        #     feasibility = input("Please evaluate the feasibility>> ")
        #     novelty = input("Please evaluate the novelty>> ")
        #     advice = input("Please give some advice>>")
        #     try:
        #         comprehensiveness = int(comprehensiveness)
        #         detailedness = int(detailedness)
        #         feasibility = int(feasibility)
        #         novelty = int(novelty)
        #     except ValueError:
        #         logger.error("Bad response from human evaluator!")
        #     return ([comprehensiveness, detailedness, feasibility, novelty], advice)
        # else:
        evaluation = self.evaluator.step(
            agent=self.agents[AGENT_TYPES.EVALUATION],
            solution=solution,
            result=result,
            task_description=self.task_description,
            all_role_description=[
                self.agents[AGENT_TYPES.SOLVER].role_description,
                *[agent.role_description for agent in self.agents[AGENT_TYPES.CRITIC]],
            ],
        )
        return evaluation.score, evaluation.advice

    def is_done(self):
        """Check if the environment is done"""
        return self.cnt_turn >= self.max_turn or self.success

    def set_task_description(self, task_description: str = ""):
        self.task_description = task_description

    def reset(self) -> None:
        """Reset the environment"""
        self.cnt_turn = 0
        # self.rule.reset()
        # self.role_assigner.reset()
        # self.solver.reset()
        # for critic in self.critics:
        #     critic.reset()
        # self.evaluator.reset()

