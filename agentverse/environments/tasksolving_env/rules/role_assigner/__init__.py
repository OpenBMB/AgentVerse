from agentverse.registry import Registry

role_assigner_registry = Registry(name="RoleAssignerRegistry")

from .base import BaseRoleAssigner
from .role_description import DescriptionAssigner
