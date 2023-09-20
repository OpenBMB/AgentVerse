from __future__ import annotations

from typing import TYPE_CHECKING, List, Tuple
import json
from copy import deepcopy

from . import updater_registry as UpdaterRegistry
from .basic import BasicUpdater
from agentverse.message import Message

if TYPE_CHECKING:
    from agentverse.environments import PokemonEnvironment


@UpdaterRegistry.register("pokemon")
class PokemonUpdater(BasicUpdater):
    def update_memory(self, environment: PokemonEnvironment):
        for message in environment.last_messages:
            if message.content == "":
                continue
            message = deepcopy(message)
            try:
                message.content = json.loads(message.content)
            except json.decoder.JSONDecodeError:
                continue
            if message.content["action"] == "Speak":
                message.content = message.content["text"]
            elif message.content["action"] == "MoveTo":
                if message.content["to"] in environment.locations_to_agents:
                    try:
                        orig_location = environment.get_agent_to_location()[
                            message.sender
                        ]
                        environment.locations_to_agents[orig_location].remove(
                            message.sender
                        )
                    except:
                        continue
                message.content = f"[MoveTo] {message.content['to']}"
            else:
                message.content = f"[{message.content['action']}]"
            self.add_message_to_all_agents(environment.agents, message)
