from agentverse.registry import Registry

llm_registry = Registry(name="LLMRegistry")
LOCAL_LLMS = [
    "llama-2-7b-chat-hf",
    "llama-2-13b-chat-hf",
    "llama-2-70b-chat-hf",
    "vicuna-7b-v1.5",
    "vicuna-13b-v1.5",
]
LOCAL_LLMS_MAPPING = {
    "llama-2-7b-chat-hf": "meta-llama/Llama-2-7b-chat-hf",
    "llama-2-13b-chat-hf": "meta-llama/Llama-2-13b-chat-hf",
    "llama-2-70b-chat-hf": "meta-llama/Llama-2-70b-chat-hf",
    "vicuna-7b-v1.5": "lmsys/vicuna-7b-v1.5",
    "vicuna-13b-v1.5": "lmsys/vicuna-13b-v1.5",
}

from .base import BaseLLM, BaseChatModel, BaseCompletionModel, LLMResult
from .openai import OpenAIChat
