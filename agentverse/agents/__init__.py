# from .agent import Agent
from agentverse.registry import Registry

agent_registry = Registry(name="AgentRegistry")

from .base import BaseAgent
from .conversation_agent import ConversationAgent
from .tool_agent import ToolAgent
from .prisoner_dilemma_agent import PoliceAgent, PrisonerAgent
