from .dataloader import DataLoader
from . import dataloader_registry
import json


@dataloader_registry.register("tasksolving/commongen")
@dataloader_registry.register("tasksolving/commongen/gpt-4")
@dataloader_registry.register("tasksolving/commongen/gpt-3.5")
@dataloader_registry.register("tasksolving/commongen/gpt-3.5-new")
@dataloader_registry.register("tasksolving/commongen/gpt-3.5-new-2")
@dataloader_registry.register("tasksolving/commongen/gpt-3.5-new-norole")
@dataloader_registry.register("tasksolving/commongen/gpt-3.5-new-single")
@dataloader_registry.register("tasksolving/commongen/gpt-4-new")
@dataloader_registry.register("tasksolving/commongen/gpt-4-new-norole")
@dataloader_registry.register("tasksolving/commongen/gpt-4-new-single")
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
