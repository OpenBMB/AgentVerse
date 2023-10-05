from agentverse.registry import Registry

dataloader_registry = Registry(name="dataloader")

from .gsm8k import GSM8KLoader
from .responsegen import ResponseGenLoader
from .humaneval import HumanevalLoader
from .commongen import CommongenLoader
from .mgsm import MGSMLoader
from .logic_grid import LogicGridLoader
