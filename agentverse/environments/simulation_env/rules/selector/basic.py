from __future__ import annotations

from typing import TYPE_CHECKING, List

from agentverse.message import Message

from . import selector_registry as SelectorRegistry
from .base import BaseSelector

if TYPE_CHECKING:
    from agentverse.environments import BaseEnvironment


@SelectorRegistry.register("basic")
class BasicSelector(BaseSelector):
    """
    Base class for all selecters
    """

    def select_message(
        self, environment: BaseEnvironment, messages: List[Message]
    ) -> List[Message]:
        """Selects a set of valid messages from all messages"""
        return messages

    def reset(self) -> None:
        pass
