from .dataloader import DataLoader
from . import dataloader_registry
import json


@dataloader_registry.register("tasksolving/responsegen/gpt-3.5")
@dataloader_registry.register("tasksolving/responsegen/gpt-3.5-new")
@dataloader_registry.register("tasksolving/responsegen/gpt-3.5-new-3")
@dataloader_registry.register("tasksolving/responsegen/gpt-3.5-new-3-2agents")
@dataloader_registry.register("tasksolving/responsegen/gpt-3.5-new-3-2agents-2")
@dataloader_registry.register("tasksolving/responsegen/gpt-3.5-new-3-2agents-2-nosolverrole")
@dataloader_registry.register("tasksolving/responsegen/gpt-3.5-new-3-2agents-3")
@dataloader_registry.register("tasksolving/responsegen/gpt-3.5-new-3-2agents-4")
@dataloader_registry.register("tasksolving/responsegen/gpt-3.5-new-3-2agents-5")
@dataloader_registry.register("tasksolving/responsegen/gpt-3.5-new-3-2agents-6")
@dataloader_registry.register("tasksolving/responsegen/gpt-3.5-new-3-2agents-7")
@dataloader_registry.register("tasksolving/responsegen/gpt-3.5-new-4")
@dataloader_registry.register("tasksolving/responsegen/gpt-3.5-new-norole")
@dataloader_registry.register("tasksolving/responsegen/gpt-3.5-new-single")
@dataloader_registry.register("tasksolving/responsegen/gpt-3.5-new-single-2")
@dataloader_registry.register("tasksolving/responsegen/gpt-3.5-new-single-3")
@dataloader_registry.register("tasksolving/responsegen/gpt-4")
@dataloader_registry.register("tasksolving/responsegen/gpt-4-new-3-2agents-6")
@dataloader_registry.register("tasksolving/responsegen/gpt-4-new-3-2agents-6-single")
@dataloader_registry.register("tasksolving/responsegen/gpt-4-new-3-2agents-6-norole")
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
