from __future__ import annotations

from typing import TYPE_CHECKING, Any, List, Optional

from . import describer_registry as DescriberRegistry
from .base import BaseDescriber

if TYPE_CHECKING:
    from agentverse.environments.pokemon import PokemonEnvironment


@DescriberRegistry.register("pokemon")
class PokemonDescriber(BaseDescriber):
    def get_env_description(
        self,
        environment: PokemonEnvironment,
        player_content: str,
        time: Optional[str] = None,
    ) -> List[str]:
        description = ""
        if time is not None:
            description += f"It is now {time}. Brendan is talking to you.\n"
        description += f"[Brendan]: {player_content}\n"
        return [description for _ in range(len(environment.agents))]
