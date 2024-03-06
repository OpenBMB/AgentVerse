from AgentVerseIO.exception import AgentVerseIOCloseError
from AgentVerseIO.output.base import BaseOutput


class CommandLineOutput(BaseOutput):
    def __init__(self):
        super().__init__()

    async def run(self, output):
        pass

    def close(self):
        raise AgentVerseIOCloseError("close connection!")
