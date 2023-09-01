from agentverse.registry import Registry

decision_maker_registry = Registry(name="DecisionMakerRegistry")

from .base import BaseDecisionMaker
from .horizontal import HorizontalDecisionMaker
from .vertical import VerticalDecisionMaker
from .dynamic import DynamicDecisionMaker
