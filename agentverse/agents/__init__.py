# from .agent import Agent
from agentverse.registry import Registry

agent_registry = Registry(name="AgentRegistry")

from .base import BaseAgent
from .conversation_agent import ConversationAgent
from .tool_agent import ToolAgent
from .prisoner_dilemma_agent import PoliceAgent, PrisonerAgent

from agentverse.agents.pipeline.role_assigner import RoleAssignerAgent
from agentverse.agents.pipeline.critic import CriticAgent
from agentverse.agents.pipeline.evaluator import EvaluatorAgent
from agentverse.agents.pipeline.solver import SolverAgent
from agentverse.agents.pipeline.manager import ManagerAgent
from agentverse.agents.pipeline.executor import ExecutorAgent
