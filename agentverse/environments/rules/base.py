from __future__ import annotations

from abc import abstractmethod
from typing import TYPE_CHECKING, Any, List, Optional

from pydantic import BaseModel

from agentverse.environments.rules.describer import BaseDescriber, describer_registry
from agentverse.environments.rules.order import BaseOrder, order_registry
from agentverse.environments.rules.selector import BaseSelector, selector_registry
from agentverse.environments.rules.updater import BaseUpdater, updater_registry
from agentverse.environments.rules.visibility import BaseVisibility, visibility_registry

if TYPE_CHECKING:
    from agentverse.environments.base import BaseEnvironment

from agentverse.message import Message


class Rule(BaseModel):
    """
    Rule for the environment. It controls the speaking order of the agents
    and maintain the set of visible agents for each agent.
    """

    order: BaseOrder
    visibility: BaseVisibility
    selector: BaseSelector
    updater: BaseUpdater
    describer: BaseDescriber

    def __init__(
        self,
        order_config,
        visibility_config,
        selector_config,
        updater_config,
        describer_config,
    ):
        order = order_registry.build(**order_config)
        visibility = visibility_registry.build(**visibility_config)
        selector = selector_registry.build(**selector_config)
        updater = updater_registry.build(**updater_config)
        describer = describer_registry.build(**describer_config)
        super().__init__(
            order=order,
            visibility=visibility,
            selector=selector,
            updater=updater,
            describer=describer,
        )

    def get_next_agent_idx(
        self, environment: BaseEnvironment, *args, **kwargs
    ) -> List[int]:
        """Return the index of the next agent to speak"""
        return self.order.get_next_agent_idx(environment, *args, **kwargs)

    def update_visible_agents(
        self, environment: BaseEnvironment, *args, **kwargs
    ) -> None:
        """Update the set of visible agents for the agent"""
        self.visibility.update_visible_agents(environment, *args, **kwargs)

    def select_message(
        self, environment: BaseEnvironment, messages: List[Message], *args, **kwargs
    ) -> List[Message]:
        """Select a set of valid messages from all the generated messages"""
        return self.selector.select_message(environment, messages, *args, **kwargs)

    def update_memory(self, environment: BaseEnvironment, *args, **kwargs) -> None:
        """For each message, add it to the memory of the agent who is able to see that message"""
        self.updater.update_memory(environment, *args, **kwargs)

    def get_env_description(
        self, environment: BaseEnvironment, *args, **kwargs
    ) -> List[str]:
        """Return the description of the environment for each agent"""
        return self.describer.get_env_description(environment, *args, **kwargs)

    def reset(self) -> None:
        self.order.reset()
        self.visibility.reset()
        self.selector.reset()
        self.updater.reset()
        self.describer.reset()
