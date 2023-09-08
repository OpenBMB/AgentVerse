from __future__ import annotations

from agentverse.logging import get_logger
from colorama import Fore
import bdb
from string import Template
from typing import TYPE_CHECKING, List, Any

from agentverse.message import ExecutorMessage, Message

from agentverse.agents import agent_registry
from agentverse.agents.base import BaseAgent

import json

logger = get_logger()


function_schema = None

# Function schema for gpt-4
'''
function_schema = {
  "name": "run_code",
  "description": "Executes code on the user's machine and returns the output",
  "parameters": {
    "type": "object",
    "properties": {
      "language": {
        "type": "string",
        "description": "The programming language",
        "enum": ["python", "shell", "applescript", "javascript", "html"]
      },
      "code": {
        "type": "string",
        "description": "The code to execute"
      }
    },
    "required": ["language", "code"]
  },
}
'''

# what should fill into description
# should I add "system", "role" in openai messages???


function_schema = {
  "name": "run_code",
  "description": "The solution has been written to `tmp/main.py`. Your are going to write the unit testing code for the solution.",
  "parameters": {
    "type": "object",
    "properties": {
      "thought": {
        "type": "string",
        "description": "your thought"
      },
      "file_path": {
        "type": "string",
        "description": "the path to write your testing code"
      },
      "code": {
        "type": "string",
        "description": "the testing code"
      },
      "command": {
        "type": "string",
        "description": "the command to change directory and execute your testing code"
      }
    },
    "required": ["thought", "file_path", "code", "command"]
  },
}



@agent_registry.register("executor_fc")
class ExecutorAgent_fc(BaseAgent):
    def step(self, task_description: str, solution: str) -> ExecutorMessage:

        logger.debug("", self.name, Fore.MAGENTA)
        prepend_prompt, append_prompt = self.get_all_prompts(
            task_description=task_description, solution=solution
        )

        # Function Call format
        # The function call input can be optimized
        code_description, dict_format = append_prompt.split(":\n")
        append_prompt = code_description.strip()

        parsed_response = None
        for i in range(self.max_retry):
            try:
                response = self.llm.generate_response_funcation_call(prepend_prompt, [], append_prompt, [function_schema])
                parsed_response = self.output_parser.parse(response)
                break
            except (KeyboardInterrupt, bdb.BdbQuit):
                raise
            except Exception as e:
                logger.error(e)
                logger.warn("Retrying...")
                continue

        if parsed_response is None:
            logger.error(f"{self.name} failed to generate valid response.")


        message = ExecutorMessage(
            sender=self.name,
            sender_agent=self,
            content=parsed_response.return_values["output"],
        )

        return message


    async def astep(self, solution: str) -> ExecutorMessage:
        """Asynchronous version of step"""
        pass

    def add_message_to_memory(self, messages: List[Message]) -> None:
        self.memory.add_message(messages)

    def reset(self) -> None:
        """Reset the agent"""
        self.memory.reset()
        # TODO: reset receiver
