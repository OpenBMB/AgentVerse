from .dataloader import DataLoader
from . import dataloader_registry
import json
import re


@dataloader_registry.register("toolbench/gpt-3.5")
@dataloader_registry.register("toolbench/gpt-4")
class ToolBenchLoader(DataLoader):
    def __init__(self, path: str):
        self.example_num = 150
        super().__init__(path)

    def load(self):
        with open(self.path) as f:
            for i, line in enumerate(f):
                if i == self.example_num:
                    break
                line = json.loads(line)
                self.examples.append(
                    {
                        "input": line["answer_generation"]["query"],
                        "answer": line["answer_generation"]["final_answer"],
                        "tools": {"tools_json": line["answer_generation"]["function"]},
                    }
                )
