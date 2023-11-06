#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@Time    : 2023/4/29 16:07
@Author  : alexanderwu
@File    : common.py
"""
import ast
import contextlib
import inspect
import os
import re
from typing import List, Tuple

from enum import Enum, unique
import abc
import tiktoken
from itertools import islice

current_file_directory = os.path.dirname(os.path.abspath(__file__))

# Find the position of "MALLM" in the path
position = current_file_directory.rfind("AGENTVERSE")

# If "MALLM" is found in the path, extract the path up to and including "MALLM"
desired_path = current_file_directory[: position + len("AGENTVERSE")]


WORK_SPACE_ROOT_DIR = os.path.join(desired_path, "workspace_cache")


def get_first_n_tokens(text, n):
    encoding = tiktoken.get_encoding("cl100k_base")
    token_gen = encoding.encode(text)
    first_n_tokens = token_gen[:n]
    return encoding.decode(first_n_tokens)


@unique
class LLMStatusCode(Enum):
    SUCCESS = 0
    ERROR = 1


@unique
class ToolCallStatusCode(Enum):
    TOOL_CALL_SUCCESS = 0
    FORMAT_ERROR = 1
    HALLUCINATE_NAME = 2
    OTHER_ERROR = 3  # 想要的话可以拓展更多出来？
    GIVE_UP = 4
    GIVE_ANSWER = 5
    SERVER_ERROR = 6
    NULL = 7


@unique
class TaskStatusCode(Enum):
    TODO = 0
    DOING = 1
    DONE = 2
    SPLIT = 3


class Singleton(abc.ABCMeta, type):
    """
    Singleton metaclass for ensuring only one instance of a class.
    """

    _instances = {}

    def __call__(cls, *args, **kwargs):
        """Call method for the singleton metaclass."""
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


def readable_file_size(size, decimal_places=2):
    """Converts the given size in bytes to a readable format.
    Args:
        size: Size in bytes
        decimal_places (int): Number of decimal places to display
    """
    for unit in ["B", "KB", "MB", "GB", "TB"]:
        if size < 1024.0:
            break
        size /= 1024.0
    return f"{size:.{decimal_places}f} {unit}"


def parse_solution(text):
    thought_regex = r"Thought: (.*)\n"
    action_regex = r"Action: (.*)\n"
    input_regex = r"Action Input: (.*)\n"
    text += "\n"
    thought = re.findall(thought_regex, text)[0]
    action = re.findall(action_regex, text)[0]
    action_input = re.findall(input_regex, text)[0]
    return (thought, action, action_input)


def retry(attempts):
    def decorator(func):
        def wrapper(*args, **kwargs):
            e = None  # Initialize e to None
            for _ in range(attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as ex:
                    e = ex  # Assign the exception to e
            if e:  # Check if e is not None before raising it
                raise e

        return wrapper

    return decorator


@retry(attempts=3)
def retryable_function(func, *args, **kwargs):
    return func(*args, **kwargs)


def shorten_token(text, max_token=2048):
    """
    Shorten the text to max_token length.
    """
    text_tokens = text.split(" ")
    if len(text_tokens) < max_token:
        return text
    else:
        return " ".join(text_tokens[:max_token])

    """
ref0: https://github.com/geekan/MetaGPT
ref1: https://github.com/openai/openai-cookbook/blob/main/examples/How_to_count_tokens_with_tiktoken.ipynb
ref2: https://github.com/Significant-Gravitas/Auto-GPT/blob/master/autogpt/llm/token_counter.py
ref3: https://github.com/hwchase17/langchain/blob/master/langchain/chat_models/openai.py
"""


import tiktoken

TOKEN_COSTS = {
    "gpt-3.5-turbo": {"prompt": 0.0015, "completion": 0.002},
    "gpt-3.5-turbo-0301": {"prompt": 0.0015, "completion": 0.002},
    "gpt-3.5-turbo-0613": {"prompt": 0.0015, "completion": 0.002},
    "gpt-3.5-turbo-16k": {"prompt": 0.003, "completion": 0.004},
    "gpt-3.5-turbo-16k-0613": {"prompt": 0.003, "completion": 0.004},
    "gpt-4-0314": {"prompt": 0.03, "completion": 0.06},
    "gpt-4": {"prompt": 0.03, "completion": 0.06},
    "gpt-4-32k": {"prompt": 0.06, "completion": 0.12},
    "gpt-4-32k-0314": {"prompt": 0.06, "completion": 0.12},
    "gpt-4-0613": {"prompt": 0.06, "completion": 0.12},
    "text-embedding-ada-002": {"prompt": 0.0004, "completion": 0.0},
}


def retry(attempts):
    def decorator(func):
        def wrapper(*args, **kwargs):
            e = None  # Initialize e to None
            for _ in range(attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as ex:
                    e = ex  # Assign the exception to e
            if e:  # Check if e is not None before raising it
                raise e

        return wrapper

    return decorator


def count_message_tokens(messages, model="gpt-3.5-turbo-0613"):
    """Return the number of tokens used by a list of messages."""
    try:
        encoding = tiktoken.encoding_for_model(model)
    except KeyError:
        print("Warning: model not found. Using cl100k_base encoding.")
        encoding = tiktoken.get_encoding("cl100k_base")
    if model in {
        "gpt-3.5-turbo-0613",
        "gpt-3.5-turbo-16k-0613",
        "gpt-4-0314",
        "gpt-4-32k-0314",
        "gpt-4-0613",
        "gpt-4-32k-0613",
    }:
        tokens_per_message = 3
        tokens_per_name = 1
    elif model == "gpt-3.5-turbo-0301":
        tokens_per_message = (
            4  # every message follows <|start|>{role/name}\n{content}<|end|>\n
        )
        tokens_per_name = -1  # if there's a name, the role is omitted
    elif "gpt-3.5-turbo" in model:
        print(
            "Warning: gpt-3.5-turbo may update over time. Returning num tokens assuming gpt-3.5-turbo-0613."
        )
        return count_message_tokens(messages, model="gpt-3.5-turbo-0613")
    elif "gpt-4" in model:
        print(
            "Warning: gpt-4 may update over time. Returning num tokens assuming gpt-4-0613."
        )
        return count_message_tokens(messages, model="gpt-4-0613")
    else:
        raise NotImplementedError(
            f"""num_tokens_from_messages() is not implemented for model {model}. See https://github.com/openai/openai-python/blob/main/chatml.md for information on how messages are converted to tokens."""
        )
    num_tokens = 0
    for message in messages:
        num_tokens += tokens_per_message
        for key, value in message.items():
            num_tokens += len(encoding.encode(value))
            if key == "name":
                num_tokens += tokens_per_name
    num_tokens += 3  # every reply is primed with <|start|>assistant<|message|>
    return num_tokens


def count_string_tokens(string: str, model_name: str) -> int:
    """
    Returns the number of tokens in a text string.

    Args:
        string (str): The text string.
        model_name (str): The name of the encoding to use. (e.g., "gpt-3.5-turbo")

    Returns:
        int: The number of tokens in the text string.
    """
    encoding = tiktoken.encoding_for_model(model_name)
    return len(encoding.encode(string))


def check_cmd_exists(command) -> int:
    """检查命令是否存在
    :param command: 待检查的命令
    :return: 如果命令存在，返回0，如果不存在，返回非0
    """
    check_command = (
        "command -v "
        + command
        + ' >/dev/null 2>&1 || { echo >&2 "no mermaid"; exit 1; }'
    )
    result = os.system(check_command)
    return result


class OutputParser:
    @classmethod
    def parse_blocks(cls, text: str):
        # 首先根据"##"将文本分割成不同的block
        blocks = text.split("##")

        # 创建一个字典，用于存储每个block的标题和内容
        block_dict = {}

        # 遍历所有的block
        for block in blocks:
            # 如果block不为空，则继续处理
            if block.strip() != "":
                # 将block的标题和内容分开，并分别去掉前后的空白字符
                block_title, block_content = block.split("\n", 1)
                # LLM可能出错，在这里做一下修正
                if block_title[-1] == ":":
                    block_title = block_title[:-1]
                block_dict[block_title.strip()] = block_content.strip()

        return block_dict

    @classmethod
    def parse_code(cls, text: str, lang: str = "") -> str:
        pattern = rf"```{lang}.*?\s+(.*?)```"
        match = re.search(pattern, text, re.DOTALL)
        if match:
            code = match.group(1)
        else:
            raise Exception
        return code

    @classmethod
    def parse_str(cls, text: str):
        text = text.split("=")[-1]
        text = text.strip().strip("'").strip('"')
        return text

    @classmethod
    def parse_file_list(cls, text: str) -> list[str]:
        # Regular expression pattern to find the tasks list.
        pattern = r"\s*(.*=.*)?(\[.*\])"

        # Extract tasks list string using regex.
        match = re.search(pattern, text, re.DOTALL)
        if match:
            tasks_list_str = match.group(2)

            # Convert string representation of list to a Python list using ast.literal_eval.
            tasks = ast.literal_eval(tasks_list_str)
        else:
            tasks = text.split("\n")
        return tasks

    @staticmethod
    def parse_python_code(text: str) -> str:
        for pattern in (
            r"(.*?```python.*?\s+)?(?P<code>.*)(```.*?)",
            r"(.*?```python.*?\s+)?(?P<code>.*)",
        ):
            match = re.search(pattern, text, re.DOTALL)
            if not match:
                continue
            code = match.group("code")
            if not code:
                continue
            with contextlib.suppress(Exception):
                ast.parse(code)
                return code
        raise ValueError("Invalid python code")

    @classmethod
    def parse_data(cls, data):
        block_dict = cls.parse_blocks(data)
        parsed_data = {}
        for block, content in block_dict.items():
            # 尝试去除code标记
            try:
                content = cls.parse_code(text=content)
            except Exception:
                pass

            # 尝试解析list
            try:
                content = cls.parse_file_list(text=content)
            except Exception:
                pass
            parsed_data[block] = content
        return parsed_data

    @classmethod
    def parse_data_with_mapping(cls, data, mapping):
        block_dict = cls.parse_blocks(data)
        parsed_data = {}
        for block, content in block_dict.items():
            # 尝试去除code标记
            try:
                content = cls.parse_code(text=content)
            except Exception:
                pass
            typing_define = mapping.get(block, None)
            if isinstance(typing_define, tuple):
                typing = typing_define[0]
            else:
                typing = typing_define
            if typing == List[str] or typing == List[Tuple[str, str]]:
                # 尝试解析list
                try:
                    content = cls.parse_file_list(text=content)
                except Exception:
                    pass
            # TODO: 多余的引号去除有风险，后期再解决
            # elif typing == str:
            #     # 尝试去除多余的引号
            #     try:
            #         content = cls.parse_str(text=content)
            #     except Exception:
            #         pass
            parsed_data[block] = content
        return parsed_data


class CodeParser:
    @classmethod
    def parse_block(cls, block: str, text: str) -> str:
        blocks = cls.parse_blocks(text)
        for k, v in blocks.items():
            if block in k:
                return v
        return ""

    @classmethod
    def parse_blocks(cls, text: str):
        # 首先根据"##"将文本分割成不同的block
        blocks = text.split("##")

        # 创建一个字典，用于存储每个block的标题和内容
        block_dict = {}

        # 遍历所有的block
        for block in blocks:
            # 如果block不为空，则继续处理
            if block.strip() != "":
                # 将block的标题和内容分开，并分别去掉前后的空白字符
                block_title, block_content = block.split("\n", 1)
                block_dict[block_title.strip()] = block_content.strip()

        return block_dict

    @classmethod
    def parse_code(cls, block: str, text: str, lang: str = "") -> str:
        if block:
            text = cls.parse_block(block, text)
        pattern = rf"```{lang}.*?\s+(.*?)```"
        match = re.search(pattern, text, re.DOTALL)
        if match:
            code = match.group(1)
        else:
            raise Exception
        return code

    @classmethod
    def parse_str(cls, block: str, text: str, lang: str = ""):
        code = cls.parse_code(block, text, lang)
        code = code.split("=")[-1]
        code = code.strip().strip("'").strip('"')
        return code

    @classmethod
    def parse_file_list(cls, block: str, text: str, lang: str = "") -> list[str]:
        # Regular expression pattern to find the tasks list.
        code = cls.parse_code(block, text, lang)
        # print(code)
        pattern = r"\s*(.*=.*)?(\[.*\])"

        # Extract tasks list string using regex.
        match = re.search(pattern, code, re.DOTALL)
        if match:
            tasks_list_str = match.group(2)

            # Convert string representation of list to a Python list using ast.literal_eval.
            tasks = ast.literal_eval(tasks_list_str)
        else:
            raise Exception
        return tasks


class NoMoneyException(Exception):
    """Raised when the operation cannot be completed due to insufficient funds"""

    def __init__(self, amount, message="Insufficient funds"):
        self.amount = amount
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f"{self.message} -> Amount required: {self.amount}"


def print_members(module, indent=0):
    """
    https://stackoverflow.com/questions/1796180/how-can-i-get-a-list-of-all-classes-within-current-module-in-python
    :param module:
    :param indent:
    :return:
    """
    prefix = " " * indent
    for name, obj in inspect.getmembers(module):
        print(name, obj)
        if inspect.isclass(obj):
            print(f"{prefix}Class: {name}")
            # print the methods within the class
            if name in ["__class__", "__base__"]:
                continue
            print_members(obj, indent + 2)
        elif inspect.isfunction(obj):
            print(f"{prefix}Function: {name}")
        elif inspect.ismethod(obj):
            print(f"{prefix}Method: {name}")


def parse_recipient(text):
    pattern = r"## Send To:\s*([A-Za-z]+)\s*?"  # hard code for now
    recipient = re.search(pattern, text)
    return recipient.group(1) if recipient else ""
