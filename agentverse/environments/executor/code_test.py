from __future__ import annotations

import os
import subprocess
from typing import TYPE_CHECKING, Any, List, Tuple

from agentverse.agents import ExecutorAgent

from . import BaseExecutor, executor_registry


def execute_command(command: str) -> str:
    # TODO: make it more secure
    result = subprocess.run(command, capture_output=True, shell=True, encoding="utf-8")
    return f"STDOUT:\n{result.stdout}\nSTDERR:\n{result.stderr}"


@executor_registry.register("code-test")
class CodeTestExecutor(BaseExecutor):
    def step(
        self,
        agent: ExecutorAgent,
        task_description: str,
        solution: List[str],
        *args,
        **kwargs,
    ) -> Any:
        os.makedirs("tmp", exist_ok=True)
        self.write_to_file("tmp/main.py", solution)
        response = agent.step(task_description, solution).content
        self.write_to_file(response["file_path"], response["code"])
        result = execute_command(f"python {response['file_path']}")
        return result

    def write_to_file(self, file_name, file_content):
        # TODO: generalize this method to a common tool
        with open(file_name, "w") as f:
            f.write(file_content)
