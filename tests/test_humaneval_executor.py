import importlib.util
import sys
import types
import unittest
from pathlib import Path


def _load():
    root = Path(__file__).resolve().parents[1]
    pkg = types.ModuleType("agentverse")
    pkg.__path__ = [str(root / "agentverse")]
    pkg.__package__ = "agentverse"
    sys.modules["agentverse"] = pkg

    sub = types.ModuleType("agentverse.output_parser")
    sub.__path__ = [str(root / "agentverse" / "output_parser")]
    sub.__package__ = "agentverse.output_parser"

    class _Registry:
        def __init__(self, name=None):
            self.name = name

        def register(self, name):
            def deco(cls):
                return cls

            return deco

    sub.output_parser_registry = _Registry("OutputParserRegistry")
    sys.modules["agentverse.output_parser"] = sub

    utils = types.ModuleType("agentverse.utils")

    class AgentFinish:
        def __init__(self, ret, log):
            self.ret = ret
            self.log = log

    utils.AgentAction = type("AgentAction", (), {})
    utils.AgentFinish = AgentFinish
    utils.AgentCriticism = type("AgentCriticism", (), {})
    sys.modules["agentverse.utils"] = utils

    llms = types.ModuleType("agentverse.llms")

    class LLMResult:
        def __init__(self, content):
            self.content = content

    llms.LLMResult = LLMResult
    sys.modules["agentverse.llms"] = llms

    logging_mod = types.ModuleType("agentverse.logging")
    logging_mod.logger = types.SimpleNamespace(
        error=lambda *args, **kwargs: None,
        info=lambda *args, **kwargs: None,
    )
    sys.modules["agentverse.logging"] = logging_mod

    pydantic_mod = types.ModuleType("pydantic")

    class BaseModel:
        def __init__(self, **kwargs):
            self.__dict__.update(kwargs)

    pydantic_mod.BaseModel = BaseModel
    sys.modules["pydantic"] = pydantic_mod

    path = root / "agentverse" / "output_parser" / "output_parser.py"
    spec = importlib.util.spec_from_file_location(
        "agentverse.output_parser.output_parser", path
    )
    mod = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = mod
    spec.loader.exec_module(mod)
    return mod


mod = _load()


def _parse(code):
    text = (
        "Thought: t\n"
        "Reasoning: r\n"
        "Criticism: c\n"
        "File Path: a.py\n"
        f"Code: {code}\n"
        "Command: python a.py"
    )
    parsed = mod.HumanevalSolverParser().parse(mod.LLMResult(text))
    return parsed.ret["output"]["code"]


class HumanevalExecutorTest(unittest.TestCase):
    def test_a_code_line_keeps_its_last_letter(self):
        self.assertEqual(_parse("return n"), "return n")

    def test_a_print_call_keeps_its_first_letter(self):
        self.assertEqual(_parse("print(1)"), "print(1)")


if __name__ == "__main__":
    unittest.main()
