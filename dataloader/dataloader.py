import json
from abc import abstractmethod


class DataLoader:
    def __init__(self, path: str):
        self.path = path
        self.examples = []
        self.load()

    @abstractmethod
    def load(self):
        """Make sure that each example is formatted as {"input": ..., "answer": ...}"""
        with open(self.path) as f:
            for line in f:
                self.examples.append(json.loads(line))

    def __iter__(self):
        return iter(self.examples)
