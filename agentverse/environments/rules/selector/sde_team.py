from __future__ import annotations

from typing import TYPE_CHECKING, List

from agentverse.message import Message

from . import selector_registry as SelectorRegistry
from .base import BaseSelector

import json
import re

if TYPE_CHECKING:
    from agentverse.environments import BaseEnvironment
    
def extract(content: str, keyword: str):
    result = ""
    flag = False
    for line in content.split('\n'):
        if line.strip().startswith(keyword):
            flag = True
            continue
        if flag:
            result += line
            result += "\n"
    return result
        
    
@SelectorRegistry.register("sde_team")
class SdeTeamSelector(BaseSelector):
    def select_message(self, environment: BaseEnvironment, messages: List[Message]) -> List[Message]:
        last_sender = environment.last_messages[0].sender
        selected = messages

        if last_sender == "unit_test_generator":
            unit_tests = set()
            for message in selected:
                unit_test = extract(message.content, "<unit test>:")
                if unit_test not in unit_tests:
                    unit_tests.add(extract(message.content, "<unit test>:"))
            unit_tests = list(unit_tests)
            environment.rule_params["unit_tests"] = str(unit_tests)
            new_message = Message(
                            content="",
                            sender="unit_test_generator",
                            receiver=[],
                        )   # TODO: set the content of the message
            selected = [new_message]

        elif last_sender == "code_writer":
            cur_code = extract(selected[0].content, "<code>:")
            environment.rule_params["code"] = cur_code
            
            from .code_api import execute_unit_tests
            feedback = execute_unit_tests(environment.rule_params["code"], eval(environment.rule_params["unit_tests"]))
            
            environment.rule_params["feedback"] = feedback
            selected[0].content = f"<current code>:\n\n{cur_code}\n\n<unit test feedback>:\n{feedback}"
            f_dict = json.loads(feedback)
            if f_dict["is_passing"]:
                environment.rule_params["end_flag"] = True
        
        elif last_sender == "code_reviewer":
            code_review = selected[0].content
            cur_code = environment.rule_params["code"]
            selected[0].content = f"<current code>:\n\n{cur_code}\n\n{code_review}"
            feedback = environment.rule_params["feedback"]
            f_dict = json.loads(feedback)
            if f_dict["is_passing"]:
                environment.rule_params["end_flag"] = True

        return selected