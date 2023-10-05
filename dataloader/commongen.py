from .dataloader import DataLoader
from . import dataloader_registry
import json


@dataloader_registry.register("tasksolving/commongen/gpt-4")
@dataloader_registry.register("tasksolving/commongen/gpt-3.5")
class CommongenLoader(DataLoader):
    def __init__(self, path: str):
        super().__init__(path)

    def load(self):
        with open(self.path) as f:
            for line in f:
                line = json.loads(line)
                self.examples.append(
                    {
                        "input": line["concepts"],
                        "answer": None,
                    }
                )
