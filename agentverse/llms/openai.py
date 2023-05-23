import logging
import os
from typing import Dict, List, Optional, Union

from pydantic import BaseModel, Field

from agentverse.llms.base import LLMResult

from . import llm_registry
from .base import BaseChatModel, BaseCompletionModel, BaseModelArgs

try:
    import openai
    from openai.error import OpenAIError
except ImportError:
    is_openai_available = False
    logging.warning("openai package is not installed")
else:
    openai.api_key = os.environ.get("OPENAI_API_KEY")
    openai.proxy = os.environ.get("http_proxy")
    if openai.proxy is None:
        openai.proxy = os.environ.get("HTTP_PROXY")
    if openai.api_key is None:
        logging.warning(
            "OpenAI API key is not set. Please set the environment variable OPENAI_API_KEY"
        )
        is_openai_available = False
    else:
        is_openai_available = True


class OpenAIChatArgs(BaseModelArgs):
    model: str = Field(default="gpt-3.5-turbo")
    max_tokens: int = Field(default=2048)
    temperature: float = Field(default=1.0)
    top_p: int = Field(default=1)
    n: int = Field(default=1)
    stop: Optional[Union[str, List]] = Field(default=None)
    presence_penalty: int = Field(default=0)
    frequency_penalty: int = Field(default=0)


class OpenAICompletionArgs(OpenAIChatArgs):
    model: str = Field(default="text-davinci-003")
    suffix: str = Field(default="")
    best_of: int = Field(default=1)


@llm_registry.register("text-davinci-003")
class OpenAICompletion(BaseCompletionModel):
    args: OpenAICompletionArgs = Field(default_factory=OpenAICompletionArgs)

    def __init__(self, max_retry: int = 3, **kwargs):
        args = OpenAICompletionArgs()
        args = args.dict()
        for k, v in args.items():
            args[k] = kwargs.pop(k, v)
        if len(kwargs) > 0:
            logging.warning(f"Unused arguments: {kwargs}")
        super().__init__(args=args, max_retry=max_retry)

    def generate_response(self, prompt: str) -> LLMResult:
        response = openai.Completion.create(prompt=prompt, **self.args.dict())
        return LLMResult(
            content=response["choices"][0]["text"],
            send_tokens=response["usage"]["prompt_tokens"],
            recv_tokens=response["usage"]["completion_tokens"],
            total_tokens=response["usage"]["total_tokens"],
        )

    async def agenerate_response(self, prompt: str) -> LLMResult:
        response = await openai.Completion.acreate(prompt=prompt, **self.args.dict())
        return LLMResult(
            content=response["choices"][0]["text"],
            send_tokens=response["usage"]["prompt_tokens"],
            recv_tokens=response["usage"]["completion_tokens"],
            total_tokens=response["usage"]["total_tokens"],
        )


@llm_registry.register("gpt-3.5-turbo")
@llm_registry.register("gpt-4")
class OpenAIChat(BaseChatModel):
    args: OpenAIChatArgs = Field(default_factory=OpenAIChatArgs)

    def __init__(self, max_retry: int = 3, **kwargs):
        args = OpenAIChatArgs()
        args = args.dict()

        for k, v in args.items():
            args[k] = kwargs.pop(k, v)
        if len(kwargs) > 0:
            logging.warning(f"Unused arguments: {kwargs}")
        super().__init__(args=args, max_retry=max_retry)

    def _construct_messages(self, prompt: str):
        return [{"role": "user", "content": prompt}]

    def generate_response(self, prompt: str) -> LLMResult:
        messages = self._construct_messages(prompt)
        try:
            response = openai.ChatCompletion.create(
                messages=messages, **self.args.dict()
            )
        except (OpenAIError, KeyboardInterrupt) as error:
            raise
        return LLMResult(
            content=response["choices"][0]["message"]["content"],
            send_tokens=response["usage"]["prompt_tokens"],
            recv_tokens=response["usage"]["completion_tokens"],
            total_tokens=response["usage"]["total_tokens"],
        )

    async def agenerate_response(self, prompt: str) -> LLMResult:
        messages = self._construct_messages(prompt)
        try:
            response = await openai.ChatCompletion.acreate(
                messages=messages, **self.args.dict()
            )
        except (OpenAIError, KeyboardInterrupt) as error:
            raise
        return LLMResult(
            content=response["choices"][0]["message"]["content"],
            send_tokens=response["usage"]["prompt_tokens"],
            recv_tokens=response["usage"]["completion_tokens"],
            total_tokens=response["usage"]["total_tokens"],
        )
