from AgentVerseIO.input.base import BaseInput


class RestApiInput(BaseInput):
    def __init__(self):
        super().__init__()

    def run(self):
        raise NotImplementedError
