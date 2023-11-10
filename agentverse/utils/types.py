from typing import NamedTuple, Union
from enum import Enum

import abc


class AgentAction(NamedTuple):
    """Agent's action to take."""

    tool: str
    tool_input: Union[str, dict]
    log: str


class AgentFinish(NamedTuple):
    """Agent's return value."""

    return_values: dict
    log: str


class AgentCriticism(NamedTuple):
    """Agent's criticism."""

    is_agree: bool
    criticism: str
    sender_agent: object = None


class AGENT_TYPES(Enum):
    ROLE_ASSIGNMENT = 0
    SOLVER = 1
    CRITIC = 2
    EXECUTION = 3
    EVALUATION = 4
    MANAGER = 5

    @staticmethod
    def from_string(agent_type: str):
        str_to_enum_dict = {
            "role_assigner": AGENT_TYPES.ROLE_ASSIGNMENT,
            "solver": AGENT_TYPES.SOLVER,
            "critic": AGENT_TYPES.CRITIC,
            "executor": AGENT_TYPES.EXECUTION,
            "evaluator": AGENT_TYPES.EVALUATION,
            "manager": AGENT_TYPES.MANAGER,
        }
        assert (
            agent_type in str_to_enum_dict
        ), f"Unknown agent type: {agent_type}. Check your config file."
        return str_to_enum_dict.get(agent_type.lower())


class Singleton(abc.ABCMeta, type):
    """
    Singleton metaclass for ensuring only one instance of a class.
    """

    _instances = {}

    def __call__(cls, *args, **kwargs):
        """Call method for the singleton metaclass."""
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]
