from .dataloader import DataLoader
from . import dataloader_registry
import json
import re


@dataloader_registry.register("tasksolving/mgsm/gpt-4")
@dataloader_registry.register("tasksolving/mgsm/gpt-3.5")
class MGSMLoader(DataLoader):
    def __init__(self, path: str):
        self.answer_pat = re.compile(r"#### (-?\d+)")
        super().__init__(path)

    def load(self):
        with open(self.path) as f:
            for line in f:
                line = json.loads(line)
                self.examples.append(
                    {
                        "input": line["question"],
                        "answer": line["answer_number"],
                    }
                )
