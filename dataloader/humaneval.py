from .dataloader import DataLoader
from . import dataloader_registry
import json


@dataloader_registry.register("humaneval")
@dataloader_registry.register("humaneval/gpt-4")
@dataloader_registry.register("humaneval/gpt-3.5")
@dataloader_registry.register("humaneval/gpt-3.5-new")
@dataloader_registry.register("humaneval/gpt-4-new")
@dataloader_registry.register("humaneval/gpt-3.5-vertical-solver-first")
@dataloader_registry.register("humaneval/gpt-3.5-vertical-solver-first-autogpt")
@dataloader_registry.register("humaneval/gpt-3.5-vertical-solver-first-autogpt-2")
@dataloader_registry.register("humaneval/gpt-3.5-concurrent")
@dataloader_registry.register("humaneval/gpt-4-new-vertical-sovler-first")
@dataloader_registry.register("humaneval/gpt-4-new-vertical-sovler-first-fc")
@dataloader_registry.register("humaneval/gpt-4-new-vertical-sovler-first-rust")
@dataloader_registry.register("humaneval/gpt-4-new-fc")
class HumanevalLoader(DataLoader):
    def __init__(self, path: str):
        super().__init__(path)

    def load(self):
        with open(self.path) as f:
            for line in f:
                line = json.loads(line)
                self.examples.append(
                    {
                        "input": line["prompt"],
                        "answer": line["test"],
                    }
                )
