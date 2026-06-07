import ast
import json
import logging
import os
import re
from typing import Dict, List, Optional, Union

from pydantic import Field

from agentverse.llms.base import LLMResult
from agentverse.logging import logger
from agentverse.message import Message

from . import llm_registry
from .base import BaseChatModel, BaseModelArgs
from .utils.jsonrepair import JsonRepair

try:
    from openai import OpenAI, AsyncOpenAI
    from openai import OpenAIError
except ImportError:
    is_openai_available = False
    logger.warn(
        "openai package is not installed. Please install it via `pip install openai`"
    )

MINIMAX_API_KEY = os.environ.get("MINIMAX_API_KEY")
MINIMAX_BASE_URL = os.environ.get(
    "MINIMAX_BASE_URL", "https://api.minimax.io/v1"
)

# MiniMax model token limits
MINIMAX_TOKEN_LIMITS = {
    "MiniMax-M3": 512000,
    "MiniMax-M2.7": 192000,
    "MiniMax-M2.7-highspeed": 192000,
}

# MiniMax model pricing (per 1K tokens, USD)
MINIMAX_INPUT_COST = {
    "MiniMax-M3": 0.0006,
    "MiniMax-M2.7": 0.0008,
    "MiniMax-M2.7-highspeed": 0.0008,
}

MINIMAX_OUTPUT_COST = {
    "MiniMax-M3": 0.0024,
    "MiniMax-M2.7": 0.0032,
    "MiniMax-M2.7-highspeed": 0.0032,
}


def _strip_think_tags(content: str) -> str:
    """Strip <think>...</think> tags from MiniMax model responses."""
    if content and "<think>" in content:
        return re.sub(r"<think>.*?</think>\s*", "", content, flags=re.DOTALL).strip()
    return content


class MiniMaxChatArgs(BaseModelArgs):
    model: str = Field(default="MiniMax-M3")
    max_tokens: int = Field(default=2048)
    temperature: float = Field(default=0.7)
    top_p: float = Field(default=1.0)
    n: int = Field(default=1)
    stop: Optional[Union[str, List]] = Field(default=None)


@llm_registry.register("minimax")
@llm_registry.register("MiniMax-M3")
@llm_registry.register("MiniMax-M2.7")
@llm_registry.register("MiniMax-M2.7-highspeed")
class MiniMaxChat(BaseChatModel):
    args: MiniMaxChatArgs = Field(default_factory=MiniMaxChatArgs)
    client_args: Optional[Dict] = Field(
        default={"api_key": MINIMAX_API_KEY, "base_url": MINIMAX_BASE_URL}
    )

    total_prompt_tokens: int = 0
    total_completion_tokens: int = 0

    def __init__(self, max_retry: int = 3, **kwargs):
        args = MiniMaxChatArgs()
        args = args.dict()
        client_args = {
            "api_key": MINIMAX_API_KEY,
            "base_url": MINIMAX_BASE_URL,
        }
        for k, v in args.items():
            args[k] = kwargs.pop(k, v)
        if len(kwargs) > 0:
            logger.warn(f"Unused arguments: {kwargs}")
        # Clamp temperature to MiniMax range [0.0, 1.0]
        args["temperature"] = max(0.0, min(1.0, args["temperature"]))
        super().__init__(args=args, max_retry=max_retry, client_args=client_args)

    @classmethod
    def send_token_limit(cls, model: str) -> int:
        return MINIMAX_TOKEN_LIMITS.get(model, 192000)

    def generate_response(
        self,
        prepend_prompt: str = "",
        history: List[dict] = [],
        append_prompt: str = "",
        functions: List[dict] = [],
    ) -> LLMResult:
        messages = self.construct_messages(prepend_prompt, history, append_prompt)
        logger.log_prompt(messages)

        minimax_client = OpenAI(
            api_key=self.client_args["api_key"],
            base_url=self.client_args["base_url"],
        )
        try:
            if functions:
                response = minimax_client.chat.completions.create(
                    messages=messages,
                    functions=functions,
                    **self.args.dict(),
                )
                logger.log_prompt(
                    [
                        {
                            "role": "assistant",
                            "content": response.choices[0].message.content,
                        }
                    ]
                )
                if response.choices[0].message.function_call is not None:
                    self.collect_metrics(response)
                    return LLMResult(
                        content=_strip_think_tags(
                            response.choices[0].message.content or ""
                        ),
                        function_name=response.choices[0].message.function_call.name,
                        function_arguments=ast.literal_eval(
                            response.choices[0].message.function_call.arguments
                        ),
                        send_tokens=response.usage.prompt_tokens,
                        recv_tokens=response.usage.completion_tokens,
                        total_tokens=response.usage.total_tokens,
                    )
                else:
                    self.collect_metrics(response)
                    return LLMResult(
                        content=_strip_think_tags(
                            response.choices[0].message.content or ""
                        ),
                        send_tokens=response.usage.prompt_tokens,
                        recv_tokens=response.usage.completion_tokens,
                        total_tokens=response.usage.total_tokens,
                    )
            else:
                response = minimax_client.chat.completions.create(
                    messages=messages,
                    **self.args.dict(),
                )
                logger.log_prompt(
                    [
                        {
                            "role": "assistant",
                            "content": response.choices[0].message.content,
                        }
                    ]
                )
                self.collect_metrics(response)
                return LLMResult(
                    content=_strip_think_tags(
                        response.choices[0].message.content or ""
                    ),
                    send_tokens=response.usage.prompt_tokens,
                    recv_tokens=response.usage.completion_tokens,
                    total_tokens=response.usage.total_tokens,
                )
        except (OpenAIError, KeyboardInterrupt, json.decoder.JSONDecodeError) as error:
            raise

    async def agenerate_response(
        self,
        prepend_prompt: str = "",
        history: List[dict] = [],
        append_prompt: str = "",
        functions: List[dict] = [],
    ) -> LLMResult:
        messages = self.construct_messages(prepend_prompt, history, append_prompt)
        logger.log_prompt(messages)

        async_minimax_client = AsyncOpenAI(
            api_key=self.client_args["api_key"],
            base_url=self.client_args["base_url"],
        )
        try:
            if functions:
                response = await async_minimax_client.chat.completions.create(
                    messages=messages,
                    functions=functions,
                    **self.args.dict(),
                )
                logger.log_prompt(
                    [
                        {
                            "role": "assistant",
                            "content": response.choices[0].message.content,
                        }
                    ]
                )
                if response.choices[0].message.function_call is not None:
                    function_name = response.choices[0].message.function_call.name
                    valid_function = False
                    if function_name.startswith("function."):
                        function_name = function_name.replace("function.", "")
                    elif function_name.startswith("functions."):
                        function_name = function_name.replace("functions.", "")
                    for function in functions:
                        if function["name"] == function_name:
                            valid_function = True
                            break
                    if not valid_function:
                        logger.warn(
                            f"The returned function name {function_name} is not in the list of valid functions. Retrying..."
                        )
                        raise ValueError(
                            f"The returned function name {function_name} is not in the list of valid functions."
                        )
                    try:
                        arguments = ast.literal_eval(
                            response.choices[0].message.function_call.arguments
                        )
                    except Exception:
                        try:
                            arguments = ast.literal_eval(
                                JsonRepair(
                                    response.choices[0].message.function_call.arguments
                                ).repair()
                            )
                        except Exception:
                            logger.warn(
                                "The returned argument in function call is not valid json. Retrying..."
                            )
                            raise ValueError(
                                "The returned argument in function call is not valid json."
                            )
                    self.collect_metrics(response)
                    return LLMResult(
                        function_name=function_name,
                        function_arguments=arguments,
                        send_tokens=response.usage.prompt_tokens,
                        recv_tokens=response.usage.completion_tokens,
                        total_tokens=response.usage.total_tokens,
                    )
                else:
                    self.collect_metrics(response)
                    return LLMResult(
                        content=_strip_think_tags(
                            response.choices[0].message.content or ""
                        ),
                        send_tokens=response.usage.prompt_tokens,
                        recv_tokens=response.usage.completion_tokens,
                        total_tokens=response.usage.total_tokens,
                    )
            else:
                response = await async_minimax_client.chat.completions.create(
                    messages=messages,
                    **self.args.dict(),
                )
                self.collect_metrics(response)
                logger.log_prompt(
                    [
                        {
                            "role": "assistant",
                            "content": response.choices[0].message.content,
                        }
                    ]
                )
                return LLMResult(
                    content=_strip_think_tags(
                        response.choices[0].message.content or ""
                    ),
                    send_tokens=response.usage.prompt_tokens,
                    recv_tokens=response.usage.completion_tokens,
                    total_tokens=response.usage.total_tokens,
                )
        except (OpenAIError, KeyboardInterrupt, json.decoder.JSONDecodeError) as error:
            raise

    def construct_messages(
        self, prepend_prompt: str, history: List[dict], append_prompt: str
    ):
        messages = []
        if prepend_prompt != "":
            messages.append({"role": "system", "content": prepend_prompt})
        if len(history) > 0:
            messages += history
        if append_prompt != "":
            messages.append({"role": "user", "content": append_prompt})
        return messages

    def collect_metrics(self, response):
        self.total_prompt_tokens += response.usage.prompt_tokens
        self.total_completion_tokens += response.usage.completion_tokens

    def get_spend(self) -> float:
        model = self.args.model
        input_cost = MINIMAX_INPUT_COST.get(model, 0.0)
        output_cost = MINIMAX_OUTPUT_COST.get(model, 0.0)
        return (
            self.total_prompt_tokens * input_cost / 1000.0
            + self.total_completion_tokens * output_cost / 1000.0
        )
