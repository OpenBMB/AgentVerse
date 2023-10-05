from .dataloader import DataLoader
from . import dataloader_registry
import json


@dataloader_registry.register("tasksolving/responsegen/gpt-3.5")
@dataloader_registry.register("tasksolving/responsegen/gpt-4")
class ResponseGenLoader(DataLoader):
    def __init__(self, path: str):
        super().__init__(path)

    def load(self):
        with open(self.path) as f:
            for line in f:
                line = json.loads(line)
                self.examples.append(
                    {
                        "input": line["input"],
                        "answer": line["answer"],
                    }
                )
