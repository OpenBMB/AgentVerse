# Modified from AutoGPT https://github.com/Significant-Gravitas/AutoGPT/blob/release-v0.4.7/autogpt/llm/utils/token_counter.py

import tiktoken
from typing import List, Union, Dict
from agentverse.logging import logger
from agentverse.message import Message
from agentverse.llms import LOCAL_LLMS, LOCAL_LLMS_MAPPING


def count_string_tokens(prompt: str = "", model: str = "gpt-3.5-turbo") -> int:
    if model.startswith("gpt-3.5-turbo") or model.startswith("gpt-4"):
        return len(tiktoken.encoding_for_model(model).encode(prompt))
    elif model.lower() in LOCAL_LLMS or model in LOCAL_LLMS:
        from transformers import AutoTokenizer
        encoding = AutoTokenizer.from_pretrained(LOCAL_LLMS_MAPPING[model.lower()]['hf_model_name'])
        return len(encoding.encode(prompt))


def count_message_tokens(
    messages: Union[Dict, List[Dict]], model: str = "gpt-3.5-turbo"
) -> int:
    if isinstance(messages, dict):
        messages = [messages]

    if model.startswith("gpt-3.5-turbo"):
        tokens_per_message = (
            4  # every message follows <|start|>{role/name}\n{content}<|end|>\n
        )
        tokens_per_name = -1  # if there's a name, the role is omitted
        encoding_model = "gpt-3.5-turbo"
    elif model.startswith("gpt-4"):
        tokens_per_message = 3
        tokens_per_name = 1
        encoding_model = "gpt-4"
    elif model.lower() in LOCAL_LLMS or model in LOCAL_LLMS:
        from transformers import AutoTokenizer

        encoding = AutoTokenizer.from_pretrained(LOCAL_LLMS_MAPPING[model.lower()]['hf_model_name'])
    else:
        raise NotImplementedError(
            f"count_message_tokens() is not implemented for model {model}.\n"
            " See https://github.com/openai/openai-python/blob/main/chatml.md for"
            " information on how messages are converted to tokens."
        )
    if model.startswith("gpt-3.5-turbo") or model.startswith("gpt-4"):
        try:
            encoding = tiktoken.encoding_for_model(encoding_model)
        except KeyError:
            logger.warn("Warning: model not found. Using cl100k_base encoding.")
            encoding = tiktoken.get_encoding("cl100k_base")

    num_tokens = 0
    for message in messages:
        num_tokens += tokens_per_message
        for key, value in message.items():
            # TODO: count number of function_call's token more accurately
            if key == "function_call":
                num_tokens += len(encoding.encode(value["name"]))
                num_tokens += len(encoding.encode(value["arguments"]))
            else:
                num_tokens += len(encoding.encode(value))
                if key == "name":
                    num_tokens += tokens_per_name
    num_tokens += 3  # every reply is primed with <|start|>assistant<|message|>
    return num_tokens
