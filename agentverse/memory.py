# Modified from langchain.memory.summary.py

from typing import Any, Dict, List, Tuple, Type, Union

from langchain.base_language import BaseLanguageModel
from langchain.chains.llm import LLMChain
from langchain.memory.chat_memory import BaseChatMemory
from langchain.memory.prompt import SUMMARY_PROMPT
from langchain.prompts.base import BasePromptTemplate
from langchain.schema import (AgentAction, AIMessage, BaseMessage, ChatMessage,
                              SystemMessage, get_buffer_string)
from pydantic import BaseModel, root_validator

from agentverse.message import Message


class SummarizerMixin(BaseModel):
    llm: BaseLanguageModel
    prompt: BasePromptTemplate = SUMMARY_PROMPT
    summary_message_cls: Type[BaseMessage] = AIMessage

    def predict_new_summary(
        self, messages: List[ChatMessage], existing_summary: str
    ) -> str:
        lines = []
        for message in messages:
            if message.role == "":
                # no role. it's tool responses
                lines.append(message.content)
            else:
                lines.append(f"{message.role}: {message.content}")
        new_lines = "\n".join(lines)

        chain = LLMChain(llm=self.llm, prompt=self.prompt)
        return chain.predict(summary=existing_summary, new_lines=new_lines)


class SummaryMemory(BaseChatMemory, SummarizerMixin):
    """Conversation summarizer to memory."""

    buffer: str = ""
    memory_key: str = "history"  #: :meta private:

    @property
    def memory_variables(self) -> List[str]:
        """Will always return list of memory variables.

        :meta private:
        """
        return [self.memory_key]

    def load_memory_variables(self, inputs: Dict[str, Any]) -> Dict[str, Any]:
        """Return history buffer."""
        if self.return_messages:
            buffer: Any = [self.summary_message_cls(content=self.buffer)]
        else:
            buffer = self.buffer
        return {self.memory_key: buffer}

    @root_validator()
    def validate_prompt_input_variables(cls, values: Dict) -> Dict:
        """Validate that prompt input variables are consistent."""
        prompt_variables = values["prompt"].input_variables
        expected_keys = {"summary", "new_lines"}
        if expected_keys != set(prompt_variables):
            raise ValueError(
                "Got unexpected prompt input variables. The prompt expects "
                f"{prompt_variables}, but it should have {expected_keys}."
            )
        return values

    def save_context(self, contexts: Union[List[Tuple[AgentAction, str]], List[Message]]) -> None:
        """Save context from this conversation to buffer."""
        for context in contexts:
            if isinstance(context, Message):
                self.chat_memory.messages.append(ChatMessage(content=context.content, role=context.sender))
            elif isinstance(context, tuple) and len(context) == 2 and \
                isinstance(context[0], AgentAction) and isinstance(context[1], str):
                self.chat_memory.messages.append(ChatMessage(content=context[0].log.strip() + '\nObservation:' + context[1], role=""))
        self.buffer = self.predict_new_summary(
            self.chat_memory.messages[-len(contexts):], self.buffer
        )

    def clear(self) -> None:
        """Clear memory contents."""
        super().clear()
        self.buffer = ""
