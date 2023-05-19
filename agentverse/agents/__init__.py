# from .agent import Agent
from agentverse.registry import Registry

agent_registry = Registry(name="AgentRegistry")

from .base import BaseAgent
from .conversation_agent import ConversationAgent
from .prisoner_agent import PrisonerAgent
from .police_agent import PoliceAgent
from .tool_agent import ToolAgent
