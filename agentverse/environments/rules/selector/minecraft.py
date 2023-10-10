from __future__ import annotations

from typing import TYPE_CHECKING, List

from agentverse.message import Message

from . import selector_registry as SelectorRegistry
from .base import BaseSelector

if TYPE_CHECKING:
    from agentverse.environments import MinecraftEnvironment


@SelectorRegistry.register("minecraft")
class MinecraftSelector(BaseSelector):
    """
    Base class for all selecters
    """

    def select_message(
        self, environment: MinecraftEnvironment, messages: List[Message]
    ) -> List[Message]:
        """Selects a set of valid messages from all messages"""
        if messages[0].content.startswith("My sub-task is"):
            messages.append(
                Message(
                    content="Discussion ends. Start Playing.",
                    sender="System",
                )
            )
        elif messages[0].content.startswith("I newly accomplished the tasks"):
            messages.append(
                Message(content="Game paused. Discussion starts.", sender="System")
            )
        elif messages[0].content.endswith("[END]"):
            environment.rule_params["status"] = "summarization"
        return messages
