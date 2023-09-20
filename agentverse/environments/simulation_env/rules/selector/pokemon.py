from __future__ import annotations

from typing import TYPE_CHECKING, List
import numpy as np
import json

from agentverse.message import Message

from . import selector_registry as SelectorRegistry
from .base import BaseSelector

if TYPE_CHECKING:
    from agentverse.environments import PokemonEnvironment


@SelectorRegistry.register("pokemon")
class PokemonSelector(BaseSelector):
    """
    Selector for Pokemon environment
    """

    def select_message(
        self, environment: PokemonEnvironment, messages: List[Message]
    ) -> List[Message]:
        valid = []
        talk_matrix = np.zeros((len(environment.agents), len(environment.agents)))
        agent_to_idx = {agent.name: i for i, agent in enumerate(environment.agents)}
        for i, message in enumerate(messages):
            try:
                content = json.loads(message.content)
            except json.decoder.JSONDecodeError:
                valid.append(0)
                continue
            if content["action"] == "Speak":
                try:
                    if "to" not in content:
                        # If the model does not generate receiver, then we discard the message
                        valid.append(0)
                    elif content["to"] in agent_to_idx:
                        # TODO: allow talk to a list of agents
                        valid.append(1)
                        # talk_matrix[i][j] = 1 ==> i talk to j
                        talk_matrix[agent_to_idx[message.sender]][
                            agent_to_idx[content["to"]]
                        ] = 1
                    else:
                        # If the receiver is not in the environment, then we discard the message
                        valid.append(0)
                except:
                    valid.append(0)
                    continue
            elif content["action"] == "MoveTo":
                # If the agent move to a location that does not exist, then we discard the message
                valid.append(
                    "to" in content and content["to"] in environment.locations_to_agents
                )
            else:
                valid.append(1)
        selected_messages = []
        for i, message in enumerate(messages):
            content = json.loads(message.content)
            sender_idx = agent_to_idx[message.sender]
            if valid[i] == 0:
                selected_messages.append(Message())
                continue
            if content["action"] == "MoveTo":
                if np.sum(talk_matrix[:, sender_idx]) > 0:
                    # If someone talk to this agent, then we discard the move action
                    selected_messages.append(Message())
                else:
                    selected_messages.append(message)
            elif content["action"] == "Speak":
                receiver_idx = agent_to_idx[content["to"]]
                if talk_matrix[sender_idx][receiver_idx] == 0:
                    # If this agent talk to someone who also talk to this agent, and we
                    # select the message from this agent, then we discard the message
                    selected_messages.append(Message())
                    continue
                if np.sum(talk_matrix[receiver_idx, :]) > 0:
                    if talk_matrix[receiver_idx][sender_idx] == 1:
                        # If the receiver talk to this agent, then we randomly select one message
                        if sender_idx < receiver_idx:
                            if np.random.random() < 0.5:
                                selected_messages.append(message)
                                talk_matrix[receiver_idx][sender_idx] = 0
                            else:
                                selected_messages.append(Message())
                                talk_matrix[sender_idx][receiver_idx] = 0
                        else:
                            print("Shouldn't happen")
                    else:
                        # If the receiver talk to other agent, we still talk to the receiver (?)
                        selected_messages.append(message)
                else:
                    selected_messages.append(message)
            else:
                selected_messages.append(message)
        return selected_messages
