from __future__ import annotations

import re
import json
import ast
from typing import Union, List, Tuple

from agentverse.utils import AgentAction, AgentFinish, AgentCriticism

from agentverse.parser import OutputParserError, output_parser_registry, OutputParser
from agentverse.llms import LLMResult
from agentverse.logging import get_logger

logger = get_logger()


@output_parser_registry.register("humaneval")
class HumanevalParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        return AgentFinish({"output": output.content}, output.content)


@output_parser_registry.register("humaneval-solver")
class HumanevalSolverParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        text = output.content
        # start_pos = text.find("```")
        # end_pos = text.rfind("```")
        # if end_pos == -1:
        #     raise OutputParserError(text)
        # text = text[start_pos:end_pos]
        # cleaned_output = text.strip().strip("```").strip()
        # if cleaned_output.startswith("python"):
        #     cleaned_output = cleaned_output[6:].strip()
        # elif cleaned_output.startswith("python3"):
        #     cleaned_output = cleaned_output[7:].strip()
        code = re.findall(r"```.*?\n(.+?)```", text, re.DOTALL)[-1]

        return AgentFinish({"output": code}, text)


@output_parser_registry.register("humaneval-critic-central")
class HumanevalCriticParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        return AgentCriticism(False, output.content)


@output_parser_registry.register("humaneval-solver-autogpt")
class HumanevalSolverParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        text = output.content
        json_dict = re.findall(r"```.*?\n(.+?)```", text, re.DOTALL)[-1]
        try:
            cleaned_output = ast.literal_eval(json_dict)
        except BaseException as e:
            raise OutputParserError(text)
        if "code" not in json_dict:
            raise OutputParserError(text)
        return AgentFinish({"output": cleaned_output["code"]}, text)


@output_parser_registry.register("humaneval-solver-autogpt-2")
class HumanevalSolverParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        text = output.content
        try:
            parsed_result = re.findall(
                r"Text:(.+?)Reasoning:(.+?)Criticism:(.+?)Code:(.+)", text, re.DOTALL
            )[0]
        except BaseException as e:
            raise OutputParserError(text)
        code = parsed_result[-1].strip()
        if code.startswith("```"):
            try:
                code = re.findall(r"```.*?\n(.+?)```", code, re.DOTALL)[0].strip()
            except BaseException as e:
                raise OutputParserError(text)
        return AgentFinish({"output": code}, text)


@output_parser_registry.register("humaneval-manager")
class HumanevalManagerParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        return AgentFinish({"output": output.content}, output.content)


# @output_parser_registry.register("humaneval-solver")
# class HumanevalSolverParser(OutputParser):
#     def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
#         text = output.content
#         end_pos = text.rfind("```")
#         if end_pos == -1:
#             raise OutputParserError(text)
#         text = text[:end_pos]
#         cleaned_output = text.strip().strip("```").strip()
#         if cleaned_output.startswith("python"):
#             cleaned_output = cleaned_output[6:].strip()
#         elif cleaned_output.startswith("python3"):
#             cleaned_output = cleaned_output[7:].strip()
#         return AgentFinish({"output": cleaned_output}, text)


@output_parser_registry.register("humaneval-executor-autogpt")
class HumanevalSolverParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        text = output.content
        json_dict = re.findall(r"```.*?\n(.+?)```", text, re.DOTALL)[-1]
        try:
            cleaned_output = ast.literal_eval(json_dict)
        except BaseException as e:
            raise OutputParserError(text)
        if not (
            "code" in json_dict and "file_path" in json_dict and "command" in json_dict
        ):
            raise OutputParserError(text)
        return AgentFinish({"output": cleaned_output}, text)


@output_parser_registry.register("humaneval-executor")
class HumanevalSolverParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        text = output.content
        try:
            parsed_result = re.findall(
                r"Thought:(.+?)Reasoning:(.+?)Criticism:(.+?)File Path:(.+?)Code:(.+?)Command:(.+)",
                text,
                re.DOTALL,
            )[0]
            cleaned_output = {
                "thought": parsed_result[0].strip(),
                "reasoning": parsed_result[1].strip(),
                "criticism": parsed_result[2].strip(),
                "file_path": parsed_result[3].strip().strip("`"),
                "code": parsed_result[4]
                .strip()
                .strip("```")
                .strip("python")
                .strip("python3"),
                "command": parsed_result[5].strip().strip("`"),
            }
        except BaseException as e:
            raise OutputParserError(text)

        return AgentFinish({"output": cleaned_output}, text)



@output_parser_registry.register("humaneval-executor-fc")
class HumanevalSolverParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        text = output.content

        #print("======")
        #print(output)
        #print("======")

        try:
            #output_dict = eval(text)
            output_dict = json.loads(text, strict=False) #The control characters (character codes in the 0-31 range, including '\t' (tab), '\n', '\r' and '\0'.") will be allowed inside strings
            '''
            cleaned_output = {
                "thought": output_dict["thought"].strip(),
                "file_path": output_dict["file_path"].strip().strip("`"),
                "code": output_dict["code"]
                .strip()
                .strip("```")
                .strip("python")
                .strip("python3"),
                "command": output_dict["command"].strip().strip("`"),
            }
            '''
            cleaned_output = output_dict
        except BaseException as e:
            raise OutputParserError(text)

        return AgentFinish({"output": cleaned_output}, text)



@output_parser_registry.register("humaneval-evaluator")
class HumanevalEvaluatorParser(OutputParser):
    dimensions: List[str] = None

    def parse(self, output: LLMResult) -> Tuple[List[int], str]:
        text = output.content
        cleaned_output = re.sub(r"\n+", "\n", text.strip())
        checks = cleaned_output.split("\n")

        patterns = [
            re.compile(r"(?:\d.\s*)?" + dimension + r":\s*(\d)")
            for dimension in self.dimensions
        ]

        advice = ""
        for check in reversed(checks):
            advice = check + advice
            if check.startswith("Advice:"):
                break
        checks[-1] = advice
        try:
            # find score and advice
            score = []
            for pattern in patterns:
                for check in checks[:-1]:
                    if pattern.findall(check):
                        score.append(bool(int(pattern.findall(check)[0])))
                        break
            advice = re.findall(r"(?:\d.\s*)?Advice:\s*(.+)", checks[-1])[0]
            # logger.info("Evaluator give the following advice:\n" + advice)
        except (IndexError, ValueError):
            # logger.error("Bad response from evaluator!")
            raise OutputParserError(text)
        return score[0], advice


@output_parser_registry.register("humaneval-evaluator-2")
class HumanevalEvaluatorParser(OutputParser):
    dimensions: List[str] = None

    def parse(self, output: LLMResult) -> Tuple[List[int], str]:
        text = output.content
        pattern = re.compile(
            r"Response:(.+?)"
            + "".join(
                [
                    f"{dimension}:(.+?)"
                    if i != len(self.dimensions) - 1
                    else f"{dimension}:(.+)"
                    for i, dimension in enumerate(self.dimensions)
                ]
            ),
            re.DOTALL,
        )
        try:
            parsed_result = pattern.findall(text)[0]
            score = [bool(int(x.strip())) for x in parsed_result[1:]]
            advice = parsed_result[0].strip()
        except BaseException as e:
            raise OutputParserError(text)
        return score[0], advice


@output_parser_registry.register("humaneval-critic")
class HumanevalyCriticParser(OutputParser):
    def parse(self, output: LLMResult) -> AgentCriticism:
        text = output.content
        text = re.sub(r"\n+", "\n", text.strip())
        checks = text.split("\n")
        if not (checks[0].startswith("Action:")):
            raise OutputParserError(text)
        if checks[0].strip(". ") == "Action: Agree":
            return AgentCriticism(True, "")
        elif checks[0].strip(". ") == "Action: Disagree":
            pattern = re.compile(r"Action Input: ([\S\n ]+)")
            try:
                criticism = pattern.findall(text)[0].strip()
            except IndexError:
                # logger.error("Bad response from critic!")
                # raise OutputParserError(text)
                criticism = "I think the solution is not correct. Please think carefully and correct it."
            return AgentCriticism(False, criticism)
        else:
            raise OutputParserError(text)


@output_parser_registry.register("humaneval-critic-agree")
class HumanevalyCriticParser(OutputParser):
    def parse(self, output: LLMResult) -> AgentCriticism:
        text = output.content
        if "[Agree]" in text:
            return AgentCriticism(True, "")
        else:
            return AgentCriticism(False, text)


@output_parser_registry.register("humaneval-critic-autogpt")
class HumanevalCriticParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        text = output.content
        try:
            parsed_result = re.findall(
                r"Text:(.+?)Reasoning:(.+?)Criticism:(.+?)Speak:(.+?)Final Decision:(.+)",
                text,
                re.DOTALL,
            )[0]
        except BaseException as e:
            raise OutputParserError(text)
        decision = parsed_result[-1].strip()
        if "[Agree]" in decision:
            return AgentCriticism(True, "")
        else:
            return AgentCriticism(False, parsed_result[-2].strip())


@output_parser_registry.register("humaneval-critic-autogpt-2")
class HumanevalCriticParser(OutputParser):
    def parse(self, output: LLMResult) -> Union[AgentAction, AgentFinish]:
        text = output.content
        try:
            parsed_result = re.findall(
                r"Problem Analysis:(.+?)Solution Analysis:(.+?)Decision:(.+?)Suggestion:(.+)",
                text,
                re.DOTALL,
            )[0]
        except BaseException as e:
            raise OutputParserError(text)
        decision = parsed_result[-2].strip()
        if "[Agree]" in decision:
            return AgentCriticism(True, "")
        else:
            return AgentCriticism(False, parsed_result[-1].strip())
