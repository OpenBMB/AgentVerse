from abc import abstractmethod
from typing import Dict, Any

from pydantic import BaseModel, Field


class LLMResult(BaseModel):
    content: str = ""
    function_name: str = ""
    function_arguments: Any = None
    send_tokens: int = 0
    recv_tokens: int = 0
    total_tokens: int = 0


class BaseModelArgs(BaseModel):
    pass


class BaseLLM(BaseModel):
    args: BaseModelArgs = Field(default_factory=BaseModelArgs)
    max_retry: int = Field(default=3)

    @abstractmethod
    def get_spend(self) -> float:
        """
        Number of USD spent
        """
        return -1.0

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
