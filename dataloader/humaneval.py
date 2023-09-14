from .dataloader import DataLoader
from . import dataloader_registry
import json


@dataloader_registry.register("humaneval")
@dataloader_registry.register("humaneval/gpt-4")
@dataloader_registry.register("humaneval/gpt-3.5")
@dataloader_registry.register("humaneval/gpt-3.5-new")
@dataloader_registry.register("humaneval/gpt-4-new")
@dataloader_registry.register("humaneval/gpt-3.5-new-central")
@dataloader_registry.register("humaneval/gpt-4-new-central")
@dataloader_registry.register("humaneval/gpt-3.5-vertical-solver-first")
@dataloader_registry.register("humaneval/gpt-3.5-new-vertical-sovler-first")
@dataloader_registry.register("humaneval/gpt-3.5-new-vertical-sovler-first-single")
@dataloader_registry.register("humaneval/gpt-3.5-new-vertical-sovler-first-norole")
@dataloader_registry.register("humaneval/gpt-3.5-new-vertical-sovler-first-2-single")
@dataloader_registry.register("humaneval/gpt-3.5-vertical-solver-first-2")
@dataloader_registry.register("humaneval/gpt-3.5-vertical-solver-first-2-no16k")
@dataloader_registry.register("humaneval/gpt-3.5-vertical-solver-first-2-no16k-modeval")
@dataloader_registry.register(
    "humaneval/gpt-3.5-vertical-solver-first-2-no16k-modeval-criticformat"
)
@dataloader_registry.register(
    "humaneval/gpt-3.5-vertical-solver-first-2-no16k-modeval-2"
)
@dataloader_registry.register(
    "humaneval/gpt-3.5-vertical-solver-first-2-no16k-modeval-2-2"
)
@dataloader_registry.register(
    "humaneval/gpt-3.5-vertical-solver-first-2-no16k-modeval-2-t0"
)
@dataloader_registry.register(
    "humaneval/gpt-3.5-vertical-solver-first-2-no16k-modeval-2-t0-2"
)
@dataloader_registry.register(
    "humaneval/gpt-3.5-vertical-solver-first-2-no16k-modeval-2-t0-i"
)
@dataloader_registry.register(
    "humaneval/gpt-3.5-vertical-solver-first-2-no16k-modeval-2-t0-3reviewer"
)
@dataloader_registry.register(
    "humaneval/gpt-3.5-vertical-solver-first-2-no16k-modeval-3reviewer"
)
@dataloader_registry.register("humaneval/gpt-3.5-vertical-solver-first-3")
@dataloader_registry.register("humaneval/gpt-3.5-vertical-solver-first-4")
@dataloader_registry.register("humaneval/gpt-3.5-vertical-solver-first-4-no16k")
@dataloader_registry.register("humaneval/gpt-3.5-vertical-solver-first-autogpt")
@dataloader_registry.register("humaneval/gpt-3.5-vertical-solver-first-autogpt-2")
@dataloader_registry.register("humaneval/gpt-3.5-concurrent")
@dataloader_registry.register("humaneval/gpt-3.5-horizontal")
@dataloader_registry.register("humaneval/gpt-3.5-horizontal-2")
@dataloader_registry.register("humaneval/gpt-4-new-vertical-sovler-first")
@dataloader_registry.register("humaneval/gpt-4-new-vertical-sovler-first-fc")
@dataloader_registry.register("humaneval/gpt-4-new-vertical-sovler-first-single")
@dataloader_registry.register("humaneval/gpt-4-new-vertical-sovler-first-norole")
@dataloader_registry.register("humaneval/gpt-4-new-vertical-sovler-first-rust")
@dataloader_registry.register("humaneval/gpt-4-new-vertical-sovler-first-2")
@dataloader_registry.register("humaneval/gpt-4-new-vertical-sovler-first-2-notest")
@dataloader_registry.register("humaneval/gpt-4-new-vertical-sovler-first-2-2agents")
@dataloader_registry.register("humaneval/gpt-4-new-vertical-sovler-first-3")
@dataloader_registry.register(
    "humaneval/gpt-4-vertical-solver-first-2-no16k-modeval-2-t0"
)
@dataloader_registry.register(
    "humaneval/gpt-4-vertical-solver-first-2-no16k-modeval-2-t0-2"
)
@dataloader_registry.register(
    "humaneval/gpt-4-vertical-solver-first-2-no16k-modeval-2-t0-3"
)
@dataloader_registry.register("humaneval/gpt-4-new-fc")
@dataloader_registry.register(
    "humaneval/gpt-4-vertical-solver-first-2-no16k-modeval-2-t0-worsesolver"
)
@dataloader_registry.register(
    "humaneval/gpt-4-vertical-solver-first-2-no16k-modeval-2-t0-worsesolver-2"
)
@dataloader_registry.register(
    "humaneval/gpt-4-vertical-solver-first-2-no16k-modeval-2-t0-worsesolver-3"
)
@dataloader_registry.register(
    "humaneval/gpt-4-vertical-solver-first-2-no16k-modeval-2-t0-worsesolver-4"
)
@dataloader_registry.register(
    "humaneval/gpt-4-vertical-solver-first-2-no16k-modeval-2-t0-worsesolver-4-2"
)
@dataloader_registry.register(
    "humaneval/gpt-4-vertical-solver-first-2-no16k-modeval-2-t0-worsesolver-4-cot"
)
@dataloader_registry.register(
    "humaneval/gpt-4-vertical-solver-first-2-no16k-modeval-2-t0-worsesolver-4-test"
)
@dataloader_registry.register(
    "humaneval/gpt-4-vertical-solver-first-2-no16k-modeval-2-t0-worsesolver-5"
)
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
