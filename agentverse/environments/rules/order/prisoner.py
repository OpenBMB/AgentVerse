from __future__ import annotations

import logging
import re
from typing import TYPE_CHECKING, Any, List, Optional

from . import order_registry as OrderRegistry
from .base import BaseOrder

if TYPE_CHECKING:
    from agentverse.environments import BaseEnvironment


@OrderRegistry.register("prisoner")
class PrisonerOrder(BaseOrder):
    """The order for a classroom discussion
    The agents speak in the following order:
    1. The professor speaks first
    2. Then the professor can continue to speak, and the students can raise hands
    3. The professor can call on a student, then the student can speak or ask a question
    4. In the group discussion, the students in the group can speak in turn
    """

    # try police, prisoner1 prisoner2 first

    last_prisoner_index: int = 1
    switch_func: dict = {1: 2, 2: 1}

    def get_next_agent_idx(self, environment: BaseEnvironment) -> List[int]:
        if len(environment.last_messages) == 0:
            # If the game just begins or , we let only the police speak
            return [0]
        elif len(environment.last_messages) == 1:
            message = environment.last_messages[0]
            sender = message.sender
            content = message.content
            if sender.startswith("Police"):
                next_prisoner = self.last_prisoner_index
                self.last_prisoner_index = self.switch_func[self.last_prisoner_index]
                return [next_prisoner]
            elif sender.startswith("Suspect"):
                # 3. when one prisoner made his action, let the police tell another prisoner
                return [0]
        else:
            # If len(last_messages) > 1, then
            # 1. there must be at least one student raises hand or speaks.
            # 2. the group discussion is just over.
            return [0]
