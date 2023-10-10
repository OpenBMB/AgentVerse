from typing import NamedTuple, Union
import asyncio


class AgentAction(NamedTuple):
    """Agent's action to take."""

    tool: str
    tool_input: Union[str, dict]
    log: str


class AgentFinish(NamedTuple):
    """Agent's return value."""

    return_values: dict
    log: str


class AsyncBarrier:
    def __init__(self, n):
        self.n = n
        self.count = 0
        self.waiting = asyncio.Event()

    async def wait(self):
        self.count += 1
        if self.count == self.n:
            self.waiting.set()
            # self.count = 0
            # self.waiting.clear()
        else:
            await self.waiting.wait()

    def reset(self):
        self.waiting.clear()
        self.count = 0
