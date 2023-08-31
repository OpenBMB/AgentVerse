from .dataloader import DataLoader
from . import dataloader_registry
import json


@dataloader_registry.register("readability")
class ReadabilityLoader(DataLoader):
    def __init__(self, path: str):
        super().__init__(path)

    def load(self):
        with open(self.path) as f:
            for line in f:
                line = json.loads(line)
                self.examples.append(
                    {
                        "input": line["input"],
                        "answer": line["target"],
                    }
                )