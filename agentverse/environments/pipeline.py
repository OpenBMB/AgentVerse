import asyncio
from typing import Any, Dict, List, Tuple

from agentverse.logging import get_logger
# from agentverse.agents.agent import Agent
from agentverse.agents.conversation_agent import BaseAgent
from agentverse.agents.pipeline.role_assigner import RoleAssignerAgent
from agentverse.agents.pipeline.solver import SolverAgent
from agentverse.agents.pipeline.critic import CriticAgent
from agentverse.agents.pipeline.evaluator import EvaluatorAgent
from agentverse.agents.pipeline.executor import ExecutorAgent
from agentverse.environments.rules.base import Rule
from agentverse.message import Message
from ..utils import AgentCriticism

logger = get_logger(__name__)

from . import env_registry as EnvironmentRegistry
from .base import BaseEnvironment


@EnvironmentRegistry.register("pipeline")
class PipelineEnvironment(BaseEnvironment):
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
    agents: List[BaseAgent] = None
    role_assigner: RoleAssignerAgent
    solver: SolverAgent
    critics: List[CriticAgent]
    executor: ExecutorAgent
    evaluator: EvaluatorAgent
    rule: Rule

    max_loop_rounds: int = 3
    cnt_round: int = 0
    last_messages: List[Message] = []
    rule_params: Dict = {}
    # newly added params
    cnt_critic_agents: int
    max_criticizing_rounds: int
    task_description: str
    human_eval: bool
    task: str

    def __init__(self, rule, **kwargs):
        rule_config = rule
        order_config = rule_config.get("order", {"type": "pipeline"})
        visibility_config = rule_config.get("visibility", {"type": "all"})
        selector_config = rule_config.get("selector", {"type": "pipeline"})
        updater_config = rule_config.get("updater", {"type": "basic"})
        describer_config = rule_config.get("describer", {"type": "pipeline"})
        rule = Rule(
            order_config,
            visibility_config,
            selector_config,
            updater_config,
            describer_config,
        )
        super().__init__(rule=rule, **kwargs)

    def role_assign(self, advice: str = "")-> List[str]:
        """Assign roles to agents"""
        roles = self.role_assigner.step(advice)  # role assign always before criticism
        for i in range(self.cnt_critic_agents):
            self.critics[i].role_description = roles[i].strip('. ')
        return roles

    def solve(self, former_solution: str,
              critic_opinions: List[Tuple[object, str]]) -> str:
        """Solve: Generate solution"""
        message = self.solver.step(former_solution, critic_opinions, False)
        preliminary_solution = message.content
        return preliminary_solution

    def summarize(self, content: str) -> str:
        """Summarize: Generate summary"""
        message = self.solver.step(content, [], True)
        summary = message.content
        return summary

    async def criticize(self, preliminary_solution: str = "",
                        advice: str = "") -> List[AgentCriticism]:
        """Criticize: iterate over all critics and gather opinions"""
        group = asyncio.gather(
            *[self.critics[i].astep(preliminary_solution, advice)
              for i in range(self.cnt_critic_agents)]
        )
        criticisms = await group
        # critic_messages = [x.content for x in critic_messages]
        return criticisms

    def execute(self, final_solution: str = "") -> Any:
        """execution stage.
        Use the executor to finish the task.
        """
        return self.executor.step(final_solution)

    def evaluate(self, result: Any):
        """evaluation stage.
        """
        if self.human_eval:
            print("This round, LLM gave the following result:")
            print(result)
            comprehensiveness = input("Please evaluate the comprehensiveness>> ")
            detailedness = input("Please evaluate the detailedness>> ")
            feasibility = input("Please evaluate the feasibility>> ")
            novelty = input("Please evaluate the novelty>> ")
            advice = input("Please give some advice>>")
            try:
                comprehensiveness = int(comprehensiveness)
                detailedness = int(detailedness)
                feasibility = int(feasibility)
                novelty = int(novelty)
            except ValueError:
                logger.error("Bad response from human evaluator!")
            return ([comprehensiveness, detailedness, feasibility, novelty],
                    advice)
        else:
            score, advice = self.evaluator.step(result)
            return score, advice

    async def step(self) -> List[Message]:
        pass

    def print_messages(self, messages: List[Message]) -> None:
        pass

    def reset(self) -> None:
        """Reset the environment"""
        self.cnt_round = 0
        self.rule.reset()
        self.role_assigner.reset()
        self.solver.reset()
        for critic in self.critics:
            critic.reset()
        self.evaluator.reset()
