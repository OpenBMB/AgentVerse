from __future__ import annotations

import os
import subprocess
from typing import TYPE_CHECKING, Any, List, Tuple

from agentverse.logging import get_logger
from agentverse.agents import ExecutorAgent

from . import BaseExecutor, executor_registry

logger = get_logger()

def execute_command(command: str) -> str:
    # TODO: make it more secure
    result = subprocess.run(command, capture_output=True, shell=True, encoding="utf-8")
    return f"STDOUT:\n{result.stdout}\nSTDERR:\n{result.stderr}"


@executor_registry.register("code-test")
class CodeTestExecutor(BaseExecutor):
    has_test: dict = {}

    def step(
        self,
        agent: ExecutorAgent,
        task_description: str,
        solution: List[str],
        *args,
        **kwargs,
    ) -> Any:

        #import pdb;pdb.set_trace()

        os.makedirs("tmp", exist_ok=True)
        self.write_to_file("tmp/main.py", solution)
        try:
            if task_description not in self.has_test:
                response = agent.step(task_description, solution).content
                self.write_to_file(response["file_path"], response["code"])
                self.has_test[task_description] = f"python {response['file_path']}"
                result = execute_command(f"python {response['file_path']}")
            else:
                result = execute_command(self.has_test[task_description])
        except Exception as e:
            logger.error(e)

        return result


    def write_to_file(self, file_name, file_content):
        # TODO: generalize this method to a common tool
        with open(file_name, "w") as f:
            f.write(file_content)
