from AgentVerseIO.output.base import BaseOutput


class HttpOutput(BaseOutput):
    def __init__(self):
        super().__init__()

    def run(self, output):
        print(output)
