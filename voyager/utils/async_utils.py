import asyncio


class AsyncBarrier:
    def __init__(self, n):
        self.n = n
        self.count = 0
        self.waiting = asyncio.Event()

    async def wait(self):
        self.count += 1
        if self.count == self.n:
            self.waiting.set()
        else:
            await self.waiting.wait()

    def reset(self):
        self.waiting.clear()
        self.count = 0
