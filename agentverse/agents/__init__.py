# from .agent import Agent
from agentverse.registry import Registry

agent_registry = Registry(name="AgentRegistry")


from .base import BaseAgent
from agentverse.agents.simulation_agent.conversation import ConversationAgent
from agentverse.agents.simulation_agent.tool import ToolAgent
from agentverse.agents.simulation_agent.prisoner_dilemma import (
    PoliceAgent,
    PrisonerAgent,
)

from agentverse.agents.tasksolving_agent.role_assigner import RoleAssignerAgent
from agentverse.agents.tasksolving_agent.critic import CriticAgent
from agentverse.agents.tasksolving_agent.evaluator import EvaluatorAgent
from agentverse.agents.tasksolving_agent.solver import SolverAgent
from agentverse.agents.tasksolving_agent.manager import ManagerAgent
from agentverse.agents.tasksolving_agent.executor import ExecutorAgent
