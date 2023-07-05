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
        
    
@SelectorRegistry.register("sde_team_given_tests")
class SdeTeamGivenTestsSelector(BaseSelector):
    def select_message(self, environment: BaseEnvironment, messages: List[Message]) -> List[Message]:
        last_sender = environment.last_messages[0].sender
        selected = messages

        if last_sender == "code_writer":
            cur_code = extract(selected[0].content, "<code>:")
            environment.rule_params["code"] = cur_code
            selected[0].content = f"<current code>:\n{cur_code}"
        
        elif last_sender == "code_tester":
            
            from .code_api import execute_unit_tests
            feedback = execute_unit_tests(environment.rule_params["code"], eval(environment.unit_tests))
            environment.rule_params["feedback"] = feedback
            selected[0].content = f"<unit test feedback>:\n{feedback}"
            
            f_dict = json.loads(feedback)
            if f_dict["is_passing"]:
                environment.rule_params["end_flag"] = True
            
        elif last_sender == "code_reviewer":
            code_review = selected[0].content
            cur_code = environment.rule_params["code"]
            selected[0].content = f"{code_review}"

        return selected