from __future__ import annotations

import os
import subprocess
import multiprocessing
from typing import TYPE_CHECKING, Any, List, Tuple

from agentverse.logging import get_logger
from agentverse.agents import ExecutorAgent
from agentverse.message import ExecutorMessage, SolverMessage
from agentverse.logging import logger

from . import BaseExecutor, executor_registry


def execute_command(command: str, result_list) -> str:
    # TODO: make it more secure
    result = subprocess.run(command, capture_output=True, shell=True, encoding="utf-8")
    result_list.append(f"STDOUT:\n{result.stdout}\nSTDERR:\n{result.stderr}")
    # return f"STDOUT:\n{result.stdout}\nSTDERR:\n{result.stderr}"


@executor_registry.register("code-test")
class CodeTestExecutor(BaseExecutor):
    has_test: dict = {}
    timeout: int = 10

    async def astep(
        self,
        agent: ExecutorAgent,
        task_description: str,
        solution: List[SolverMessage],
        *args,
        **kwargs,
    ) -> Any:
        solution = solution[0].content
        os.makedirs("tmp", exist_ok=True)
        self.write_to_file("tmp/main.py", solution)
        manager = multiprocessing.Manager()
        result = manager.list()
        if task_description not in self.has_test:
            response = (await agent.astep(task_description, solution)).content
            self.write_to_file(response["file_path"], response["code"])
            self.has_test[task_description] = f"python {response['file_path']}"
            p = multiprocessing.Process(
                target=execute_command, args=(f"python {response['file_path']}", result)
            )
            p.start()
            p.join(timeout=self.timeout + 1)
            if p.is_alive():
                p.kill()
            # result = execute_command(f"python {response['file_path']}")
        else:
            # result = execute_command(self.has_test[task_description])
            p = multiprocessing.Process(
                target=execute_command, args=(self.has_test[task_description], result)
            )
            p.start()
            p.join(timeout=self.timeout + 1)
            if p.is_alive():
                p.kill()
        if not result:
            result.append("Execution timed out.")
        return [ExecutorMessage(content=result[0], sender="Code Tester")]

    def step(
        self,
        agent: ExecutorAgent,
        task_description: str,
        solution: List[SolverMessage],
        *args,
        **kwargs,
    ) -> Any:
        solution = solution[0].content
        os.makedirs("tmp", exist_ok=True)
        self.write_to_file("tmp/main.py", solution)
        manager = multiprocessing.Manager()
        result = manager.list()
        if task_description not in self.has_test:
            response = agent.step(task_description, solution).content
            self.write_to_file(response["file_path"], response["code"])
            self.has_test[task_description] = f"python {response['file_path']}"
            p = multiprocessing.Process(
                target=execute_command, args=(f"python {response['file_path']}", result)
            )
            p.start()
            p.join(timeout=self.timeout + 1)
            if p.is_alive():
                p.kill()
            # result = execute_command(f"python {response['file_path']}")
        else:
            # result = execute_command(self.has_test[task_description])
            p = multiprocessing.Process(
                target=execute_command, args=(self.has_test[task_description], result)
            )
            p.start()
            p.join(timeout=self.timeout + 1)
            if p.is_alive():
                p.kill()
        if not result:
            result.append("Execution timed out.")
        return [ExecutorMessage(content=result[0], sender="Code Tester")]

    def write_to_file(self, file_name, file_content):
        # TODO: generalize this method to a common tool
        try:
            with open(file_name, "w") as f:
                f.write(file_content)
                f.flush()
        except:
            logger.error(f"Failed to write to {file_name}")
