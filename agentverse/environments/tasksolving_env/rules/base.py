from __future__ import annotations
from typing import TYPE_CHECKING, Any, Dict, List, Tuple, Union, Optional

from agentverse.agents.base import BaseAgent
from agentverse.utils import AGENT_TYPES
from agentverse.environments.tasksolving_env.rules.decision_maker import (
    BaseDecisionMaker,
    decision_maker_registry,
)
from agentverse.environments.tasksolving_env.rules.evaluator import (
    BaseEvaluator,
    evaluator_registry,
)
from agentverse.environments.tasksolving_env.rules.executor import (
    BaseExecutor,
    executor_registry,
)
from agentverse.environments.tasksolving_env.rules.role_assigner import (
    BaseRoleAssigner,
    role_assigner_registry,
)
from agentverse.environments import BaseRule

if TYPE_CHECKING:
    from agentverse.message import SolverMessage, ExecutorMessage


class TasksolvingRule(BaseRule):
    role_assigner: BaseRoleAssigner
    decision_maker: BaseDecisionMaker
    executor: BaseExecutor
    evaluator: BaseEvaluator

    role_assign_only_once: bool = False
    add_execution_result_to_critic: bool = False
    add_execution_result_to_solver: bool = False

    def __init__(
        self,
        role_assigner_config,
        decision_maker_config,
        executor_config,
        evaluator_config,
        *args,
        **kwargs,
    ):
        def build_components(config: Dict, registry):
            component_type = config.pop("type")
            component = registry.build(component_type, **config)
            return component

        role_assigner = build_components(
            role_assigner_config,
            role_assigner_registry,
        )
        decision_maker = build_components(
            decision_maker_config,
            decision_maker_registry,
        )
        executor = build_components(executor_config, executor_registry)
        evaluator = build_components(evaluator_config, evaluator_registry)
        super().__init__(
            role_assigner=role_assigner,
            decision_maker=decision_maker,
            executor=executor,
            evaluator=evaluator,
            *args,
            **kwargs,
        )

    def role_assign(
        self,
        task_description: str,
        agents: List[BaseAgent],
        cnt_turn: int,
        advice: str = "",
    ) -> List[BaseAgent]:
        """Assign roles to agents"""
        if self.role_assign_only_once and cnt_turn > 0:
            agents = [agents[AGENT_TYPES.SOLVER]] + agents[AGENT_TYPES.CRITIC]
        else:
            agents = self.role_assigner.step(
                role_assigner=agents[AGENT_TYPES.ROLE_ASSIGNMENT],
                group_members=[agents[AGENT_TYPES.SOLVER]] + agents[AGENT_TYPES.CRITIC],
                advice=advice,
                task_description=task_description,
            )
            if self.role_assign_only_once and cnt_turn == 0:
                agents[AGENT_TYPES.SOLVER] = agents[0]
                agents[AGENT_TYPES.CRITIC] = agents[1:]
        return agents

    async def decision_making(
        self,
        task_description: str,
        agents: List[BaseAgent],
        previous_plan: str,
        advice: str = "No advice yet.",
    ) -> List[SolverMessage]:
        # TODO: plan should be string or a special type of object?

        # dynamic
        if "dynamic" in self.decision_maker.name:
            plan = await self.decision_maker.astep(
                agents=[agents[AGENT_TYPES.SOLVER], *agents[AGENT_TYPES.CRITIC]],
                manager=agents[AGENT_TYPES.MANAGER],
                task_description=task_description,
                previous_plan=previous_plan,
                advice=advice,
            )
        else:
            plan = await self.decision_maker.astep(
                agents=[agents[AGENT_TYPES.SOLVER], *agents[AGENT_TYPES.CRITIC]],
                task_description=task_description,
                previous_plan=previous_plan,
                advice=advice,
            )
        return plan

    async def execute(
        self,
        task_description: str,
        agents: List[BaseAgent],
        final_solution: List[SolverMessage],
    ) -> Any:
        """execution stage.
        Use the executor to finish the task.
        """

        results = await self.executor.astep(
            agents[AGENT_TYPES.EXECUTION], task_description, final_solution
        )
        if self.add_execution_result_to_critic:
            for agent in agents[AGENT_TYPES.CRITIC]:
                agent.add_message_to_memory(results)
        if self.add_execution_result_to_solver:
            agents[AGENT_TYPES.SOLVER].add_message_to_memory(results)
        return results

    def evaluate(
        self,
        task_description: str,
        agents: List[BaseAgent],
        solution: List[SolverMessage],
        result: List[ExecutorMessage],
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
            agent=agents[AGENT_TYPES.EVALUATION],
            solution=solution,
            result=result,
            task_description=task_description,
            all_role_description=[
                agents[AGENT_TYPES.SOLVER].role_description,
                *[agent.role_description for agent in agents[AGENT_TYPES.CRITIC]],
            ],
        )
        return evaluation.score, evaluation.advice

    def reset(self) -> None:
        self.role_assigner.reset()
        self.decision_maker.reset()
        self.executor.reset()
        self.evaluator.reset()
