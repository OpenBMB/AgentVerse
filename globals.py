import asyncio

EXEC_TERMINATE = False
SERVER_PAUSED = False


class AsyncBarrier:
    def __init__(self, n):
        self.n = n
        self.count = 0
        self.condition = asyncio.Condition()

    async def wait(self):
        async with self.condition:
            self.count += 1
            if self.count == self.n:
                self.count = 0
                self.condition.notify_all()
            else:
                await self.condition.wait()

    async def reset(self):
        async with self.condition:
            self.count = 0
            try:
                self.condition.notify_all()
            except:
                pass


PAUSE_BARRIER = AsyncBarrier(1)
UNPAUSE_BARRIER = AsyncBarrier(1)
CREATEBOT_LOCK = asyncio.Lock()
# PAUSE_BARRIER = asyncio.Barrier(1)
# UNPAUSE_BARRIER = asyncio.Barrier(1)
