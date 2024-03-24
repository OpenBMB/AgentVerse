import json
import logging
import os
from openai import OpenAI
import copy
from typing import List, Optional, Tuple, Dict

from pydantic import Field

from agentverse.message import Message, ExecutorMessage
from . import memory_registry
from .base import BaseMemory
from agentverse.llms.utils import count_message_tokens, count_string_tokens
from agentverse.llms import OpenAIChat
from agentverse.llms.openai import DEFAULT_CLIENT as openai_client

@memory_registry.register("chat_history")
class ChatHistoryMemory(BaseMemory):
    messages: List[Message] = Field(default=[])
    has_summary: bool = False
    max_summary_tlength: int = 500
    last_trimmed_index: int = 0
    summary: str = ""
    SUMMARIZATION_PROMPT: str = '''Your task is to create a concise running summary of actions and information results in the provided text, focusing on key and potentially important information to remember.

You will receive the current summary and your latest actions. Combine them, adding relevant key information from the latest development in 1st person past tense and keeping the summary concise.

Summary So Far:
"""
{summary}
"""

Latest Development:
"""
{new_events}
"""
'''

    def add_message(self, messages: List[Message]) -> None:
        for message in messages:
            self.messages.append(message)

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

    async def to_messages(
        self,
        my_name: str = "",
        start_index: int = 0,
        max_summary_length: int = 0,
        max_send_token: int = 0,
        model: str = "gpt-3.5-turbo",
    ) -> List[dict]:
        messages = []

        if self.has_summary:
            start_index = self.last_trimmed_index

        for message in self.messages[start_index:]:
            if message.sender == my_name:
                if isinstance(message, ExecutorMessage):
                    if message.tool_name != "":
                        messages.append(
                            {
                                "role": "assistant",
                                "content": f"[{message.sender}]: {message.content}"
                                if message.content != ""
                                else "",
                                "function_call": {
                                    "name": message.tool_name,
                                    "arguments": json.dumps(message.tool_input),
                                },
                            }
                        )
                        continue
                messages.append(
                    {
                        "role": "assistant",
                        "content": f"[{message.sender}]: {message.content}",
                    }
                )
                continue
            if message.sender == "function":
                messages.append(
                    {
                        "role": "function",
                        "content": message.content,
                        "name": message.tool_name,
                    }
                )
                continue
            messages.append(
                {
                    "role": "assistant",
                    "content": f"[{message.sender}]: {message.content}",
                }
            )

        # summary message
        if self.has_summary:
            """https://github.com/Significant-Gravitas/AutoGPT/blob/release-v0.4.7/autogpt/memory/message_history.py"""
            if max_summary_length == 0:
                max_summary_length = self.max_summary_tlength
            max_send_token -= max_summary_length
            prompt = []
            trimmed_history = add_history_upto_token_limit(
                prompt, messages, max_send_token, model
            )
            if trimmed_history:
                new_summary_msg, _ = await self.trim_messages(
                    list(prompt), model, messages
                )
                prompt.append(new_summary_msg)
            messages = prompt
        return messages

    def reset(self) -> None:
        self.messages = []

    async def trim_messages(
        self, current_message_chain: List[Dict], model: str, history: List[Dict]
    ) -> Tuple[Dict, List[Dict]]:
        new_messages_not_in_chain = [
            msg for msg in history if msg not in current_message_chain
        ]

        if not new_messages_not_in_chain:
            return self.summary_message(), []

        new_summary_message = await self.update_running_summary(
            new_events=new_messages_not_in_chain, model=model
        )

        last_message = new_messages_not_in_chain[-1]
        self.last_trimmed_index += history.index(last_message)

        return new_summary_message, new_messages_not_in_chain

    async def update_running_summary(
        self,
        new_events: List[Dict],
        model: str = "gpt-3.5-turbo",
        max_summary_length: Optional[int] = None,
    ) -> dict:
        if not new_events:
            return self.summary_message()
        if max_summary_length is None:
            max_summary_length = self.max_summary_tlength

        new_events = copy.deepcopy(new_events)

        # Replace "assistant" with "you". This produces much better first person past tense results.
        for event in new_events:
            if event["role"].lower() == "assistant":
                event["role"] = "you"

            elif event["role"].lower() == "system":
                event["role"] = "your computer"

            # Delete all user messages
            elif event["role"] == "user":
                new_events.remove(event)

        prompt_template_length = len(
            self.SUMMARIZATION_PROMPT.format(summary="", new_events="")
        )
        max_input_tokens = OpenAIChat.send_token_limit(model) - max_summary_length
        summary_tlength = count_string_tokens(self.summary, model)
        batch: List[Dict] = []
        batch_tlength = 0

        for event in new_events:
            event_tlength = count_message_tokens(event, model)

            if (
                batch_tlength + event_tlength
                > max_input_tokens - prompt_template_length - summary_tlength
            ):
                await self._update_summary_with_batch(batch, model, max_summary_length)
                summary_tlength = count_string_tokens(self.summary, model)
                batch = [event]
                batch_tlength = event_tlength
            else:
                batch.append(event)
                batch_tlength += event_tlength

        if batch:
            await self._update_summary_with_batch(batch, model, max_summary_length)

        return self.summary_message()

    async def _update_summary_with_batch(
        self, new_events_batch: List[dict], model: str, max_summary_length: int
    ) -> None:
        prompt = self.SUMMARIZATION_PROMPT.format(
            summary=self.summary, new_events=new_events_batch
        )

        self.summary = await openai_client.chat.completions.acreate(
            messages=[{"role": "user", "content": prompt}],
            model=model,
            max_tokens=max_summary_length,
            temperature=0.5,
        ).choices[0].message.content

    def summary_message(self) -> dict:
        return {
            "role": "system",
            "content": f"This reminds you of these events from your past: \n{self.summary}",
        }


def add_history_upto_token_limit(
    prompt: List[dict], history: List[dict], t_limit: int, model: str
) -> List[Message]:
    limit_reached = False
    current_prompt_length = 0
    trimmed_messages: List[Dict] = []
    for message in history[::-1]:
        token_to_add = count_message_tokens(message, model)
        if current_prompt_length + token_to_add > t_limit:
            limit_reached = True

        if not limit_reached:
            prompt.insert(0, message)
            current_prompt_length += token_to_add
        else:
            trimmed_messages.insert(0, message)
    return trimmed_messages
