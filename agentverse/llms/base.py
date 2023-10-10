from abc import abstractmethod
from typing import Dict

from pydantic import BaseModel, Field


class LLMResult(BaseModel):
    content: str
    send_tokens: int
    recv_tokens: int
    total_tokens: int


class BaseModelArgs(BaseModel):
    pass


class BaseLLM(BaseModel):
    args: BaseModelArgs = Field(default_factory=BaseModelArgs)
    max_retry: int = Field(default=3)

    @abstractmethod
    def generate_response(self, **kwargs) -> LLMResult:
        pass

    @abstractmethod
    def agenerate_response(self, **kwargs) -> LLMResult:
        pass


class BaseChatModel(BaseLLM):
    pass


class BaseCompletionModel(BaseLLM):
    pass
