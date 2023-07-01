from typing import List, Union

from pydantic import Field

from agentverse.message import Message
from agentverse.llms import BaseLLM
from agentverse.llms.openai import get_embedding, OpenAIChat


from . import memory_registry
from .base import BaseMemory



@memory_registry.register("vectorstore")
class VectorStoreMemory(BaseMemory):

    """

    The main difference of this class with chat_history is that this class treat memory as a dict

    treat message.content as memory

    Attributes:
        messages (List[Message]) : used to store messages, message.content is the key of embeddings.
        embedding2memory (dict) : `key` is the embedding and `value` is the message
        memory2embedding (dict) : `key` is the message and `value` is the embedding
        llm (BaseLLM) : llm used to get embeddings


    Methods:
        add_message : Additionally, add the embedding to embeddings

    """

    messages: List[Message] = Field(default=[])
    embedding2memory: dict = {}
    memory2embedding: dict = {}
    llm: BaseLLM = OpenAIChat(model="gpt-4")

    def add_message(self, messages: List[Message]) -> None:
        for message in messages:
            self.messages.append(message)
            memory_embedding = get_embedding(message.content)
            self.embedding2memory[memory_embedding] = message.content
            self.memory2embedding[message.content] = memory_embedding

    def to_string(self, add_sender_prefix: bool = False) -> str:
        if add_sender_prefix:
            return "\n".join(
                [
                    f"[{message.sender}]: {message.content}"
                    if message.sender != ""
                    else message.content
                    for message in self.messages
                ]
            )
        else:
            return "\n".join([message.content for message in self.messages])

    def reset(self) -> None:
        self.messages = []

