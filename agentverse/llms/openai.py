import logging
import json
import ast
import os
import numpy as np
from aiohttp import ClientSession
from typing import Dict, List, Optional, Union
from tenacity import retry, stop_after_attempt, wait_exponential

from pydantic import BaseModel, Field

from agentverse.llms.base import LLMResult
from agentverse.logging import logger
from agentverse.message import Message

from . import llm_registry
from .base import BaseChatModel, BaseCompletionModel, BaseModelArgs
from .utils.jsonrepair import JsonRepair

try:
    import openai
    from openai.error import OpenAIError
except ImportError:
    is_openai_available = False
    logging.warning("openai package is not installed")
else:
    # openai.proxy = os.environ.get("http_proxy")
    # if openai.proxy is None:
    #     openai.proxy = os.environ.get("HTTP_PROXY")
    if os.environ.get("OPENAI_API_KEY") != None:
        openai.api_key = os.environ.get("OPENAI_API_KEY")
        is_openai_available = True
    elif os.environ.get("AZURE_OPENAI_API_KEY") != None:
        openai.api_type = "azure"
        openai.api_key = os.environ.get("AZURE_OPENAI_API_KEY")
        openai.api_base = os.environ.get("AZURE_OPENAI_API_BASE")
        openai.api_version = "2023-05-15"
        is_openai_available = True
    else:
        logging.warning(
            "OpenAI API key is not set. Please set the environment variable OPENAI_API_KEY"
        )
        is_openai_available = False


class OpenAIChatArgs(BaseModelArgs):
    model: str = Field(default="gpt-3.5-turbo")
    deployment_id: str = Field(default=None)
    max_tokens: int = Field(default=2048)
    temperature: float = Field(default=1.0)
    top_p: int = Field(default=1)
    n: int = Field(default=1)
    stop: Optional[Union[str, List]] = Field(default=None)
    presence_penalty: int = Field(default=0)
    frequency_penalty: int = Field(default=0)


# class OpenAICompletionArgs(OpenAIChatArgs):
#     model: str = Field(default="text-davinci-003")
#     suffix: str = Field(default="")
#     best_of: int = Field(default=1)


# @llm_registry.register("text-davinci-003")
# class OpenAICompletion(BaseCompletionModel):
#     args: OpenAICompletionArgs = Field(default_factory=OpenAICompletionArgs)

#     def __init__(self, max_retry: int = 3, **kwargs):
#         args = OpenAICompletionArgs()
#         args = args.dict()
#         for k, v in args.items():
#             args[k] = kwargs.pop(k, v)
#         if len(kwargs) > 0:
#             logging.warning(f"Unused arguments: {kwargs}")
#         super().__init__(args=args, max_retry=max_retry)

#     def generate_response(self, prompt: str) -> LLMResult:
#         response = openai.Completion.create(prompt=prompt, **self.args.dict())
#         return LLMResult(
#             content=response["choices"][0]["text"],
#             send_tokens=response["usage"]["prompt_tokens"],
#             recv_tokens=response["usage"]["completion_tokens"],
#             total_tokens=response["usage"]["total_tokens"],
#         )

#     async def agenerate_response(self, prompt: str) -> LLMResult:
#         response = await openai.Completion.acreate(prompt=prompt, **self.args.dict())
#         return LLMResult(
#             content=response["choices"][0]["text"],
#             send_tokens=response["usage"]["prompt_tokens"],
#             recv_tokens=response["usage"]["completion_tokens"],
#             total_tokens=response["usage"]["total_tokens"],
#         )


@llm_registry.register("gpt-35-turbo")
@llm_registry.register("gpt-3.5-turbo")
@llm_registry.register("gpt-4")
class OpenAIChat(BaseChatModel):
    args: OpenAIChatArgs = Field(default_factory=OpenAIChatArgs)

    total_prompt_tokens: int = 0
    total_completion_tokens: int = 0

    def __init__(self, max_retry: int = 3, **kwargs):
        args = OpenAIChatArgs()
        args = args.dict()
        for k, v in args.items():
            args[k] = kwargs.pop(k, v)
        if len(kwargs) > 0:
            logging.warning(f"Unused arguments: {kwargs}")
        super().__init__(args=args, max_retry=max_retry)

    # def _construct_messages(self, history: List[Message]):
    #     return history + [{"role": "user", "content": query}]
    @retry(
        stop=stop_after_attempt(20),
        wait=wait_exponential(multiplier=1, min=4, max=10),
        reraise=True,
    )
    def generate_response(
        self,
        prepend_prompt: str = "",
        history: List[dict] = [],
        append_prompt: str = "",
        functions: List[dict] = [],
    ) -> LLMResult:
        messages = self.construct_messages(prepend_prompt, history, append_prompt)
        logger.log_prompt(messages)
        try:
            # Execute function call
            if functions != []:
                response = openai.ChatCompletion.create(
                    messages=messages,
                    functions=functions,
                    **self.args.dict(),
                )
                if response["choices"][0]["message"].get("function_call") is not None:
                    self.collect_metrics(response)
                    return LLMResult(
                        content=response["choices"][0]["message"].get("content", ""),
                        function_name=response["choices"][0]["message"][
                            "function_call"
                        ]["name"],
                        function_arguments=ast.literal_eval(
                            response["choices"][0]["message"]["function_call"][
                                "arguments"
                            ]
                        ),
                        send_tokens=response["usage"]["prompt_tokens"],
                        recv_tokens=response["usage"]["completion_tokens"],
                        total_tokens=response["usage"]["total_tokens"],
                    )
                else:
                    self.collect_metrics(response)
                    return LLMResult(
                        content=response["choices"][0]["message"]["content"],
                        send_tokens=response["usage"]["prompt_tokens"],
                        recv_tokens=response["usage"]["completion_tokens"],
                        total_tokens=response["usage"]["total_tokens"],
                    )

            else:
                response = openai.ChatCompletion.create(
                    messages=messages,
                    **self.args.dict(),
                )
                self.collect_metrics(response)
                return LLMResult(
                    content=response["choices"][0]["message"]["content"],
                    send_tokens=response["usage"]["prompt_tokens"],
                    recv_tokens=response["usage"]["completion_tokens"],
                    total_tokens=response["usage"]["total_tokens"],
                )
        except (OpenAIError, KeyboardInterrupt, json.decoder.JSONDecodeError) as error:
            raise

    @retry(
        stop=stop_after_attempt(20),
        wait=wait_exponential(multiplier=1, min=4, max=10),
        reraise=True,
    )
    async def agenerate_response(
        self,
        prepend_prompt: str = "",
        history: List[dict] = [],
        append_prompt: str = "",
        functions: List[dict] = [],
    ) -> LLMResult:
        messages = self.construct_messages(prepend_prompt, history, append_prompt)
        logger.log_prompt(messages)

        try:
            if functions != []:
                async with ClientSession(trust_env=True) as session:
                    openai.aiosession.set(session)
                    response = await openai.ChatCompletion.acreate(
                        messages=messages,
                        functions=functions,
                        **self.args.dict(),
                    )
                if response["choices"][0]["message"].get("function_call") is not None:
                    function_name = response["choices"][0]["message"]["function_call"][
                        "name"
                    ]
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
                            response["choices"][0]["message"]["function_call"][
                                "arguments"
                            ]
                        )
                    except:
                        try:
                            arguments = ast.literal_eval(
                                JsonRepair(
                                    response["choices"][0]["message"]["function_call"][
                                        "arguments"
                                    ]
                                ).repair()
                            )
                        except:
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
                        send_tokens=response["usage"]["prompt_tokens"],
                        recv_tokens=response["usage"]["completion_tokens"],
                        total_tokens=response["usage"]["total_tokens"],
                    )

                else:
                    self.collect_metrics(response)
                    return LLMResult(
                        content=response["choices"][0]["message"]["content"],
                        send_tokens=response["usage"]["prompt_tokens"],
                        recv_tokens=response["usage"]["completion_tokens"],
                        total_tokens=response["usage"]["total_tokens"],
                    )

            else:
                async with ClientSession(trust_env=True) as session:
                    openai.aiosession.set(session)
                    response = await openai.ChatCompletion.acreate(
                        messages=messages,
                        **self.args.dict(),
                    )
                self.collect_metrics(response)
                return LLMResult(
                    content=response["choices"][0]["message"]["content"],
                    send_tokens=response["usage"]["prompt_tokens"],
                    recv_tokens=response["usage"]["completion_tokens"],
                    total_tokens=response["usage"]["total_tokens"],
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
        self.total_prompt_tokens += response["usage"]["prompt_tokens"]
        self.total_completion_tokens += response["usage"]["completion_tokens"]

    def get_spend(self) -> int:
        input_cost_map = {
            "gpt-3.5-turbo": 0.0015,
            "gpt-3.5-turbo-16k": 0.003,
            "gpt-3.5-turbo-0613": 0.0015,
            "gpt-3.5-turbo-16k-0613": 0.003,
            "gpt-4": 0.03,
            "gpt-4-0613": 0.03,
            "gpt-4-32k": 0.06,
        }

        output_cost_map = {
            "gpt-3.5-turbo": 0.002,
            "gpt-3.5-turbo-16k": 0.004,
            "gpt-3.5-turbo-0613": 0.002,
            "gpt-3.5-turbo-16k-0613": 0.004,
            "gpt-4": 0.06,
            "gpt-4-0613": 0.06,
            "gpt-4-32k": 0.12,
        }

        model = self.args.model
        if model not in input_cost_map or model not in output_cost_map:
            raise ValueError(f"Model type {model} not supported")

        return (
            self.total_prompt_tokens * input_cost_map[model] / 1000.0
            + self.total_completion_tokens * output_cost_map[model] / 1000.0
        )


@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=4, max=10),
    reraise=True,
)
def get_embedding(text: str, attempts=3) -> np.array:
    try:
        text = text.replace("\n", " ")
        if openai.api_type == "azure":
            embedding = openai.Embedding.create(
                input=[text], deployment_id="text-embedding-ada-002"
            )["data"][0]["embedding"]
        else:
            embedding = openai.Embedding.create(
                input=[text], model="text-embedding-ada-002"
            )["data"][0]["embedding"]
        return tuple(embedding)
    except Exception as e:
        attempt += 1
        logger.error(f"Error {e} when requesting openai models. Retrying")
        raise
