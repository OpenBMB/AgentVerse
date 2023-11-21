#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@Time    : 2023/5/20 12:15
@Author  : alexanderwu
@File    : memory.py
"""
from collections import defaultdict
from typing import Dict, Any
import json


class Memory:
    """The most basic memory: super-memory"""

    def __init__(self):
        """Initialize an empty storage list and an empty index dictionary"""
        self.storage: list[Dict] = []
        self.milestones: list[str] = []
        # self.index: dict[Type[Action], list[Message]] = defaultdict(list)

    def get_last_round(self) -> str:
        """Return the last round of the memory in string format"""
        if len(self.storage) == 0:
            return None
        return json.dumps(self.storage[-1])

    def tot_memory_length(self) -> int:
        """Return the total length of the memory"""
        raise NotImplementedError

    def add_memory(self, message):
        """Add a new message to storage, while updating the index"""
        if message in self.storage:
            return
        self.storage.append(message)
        # if message.cause_by:
        #     self.index[message.cause_by].append(message)

    def get_by_role(self, role: str) -> list[Any]:
        """Return all messages of a specified role"""
        return [message for message in self.storage if message.role == role]

    def get_by_content(self, content: str) -> list[Any]:
        """Return all messages containing a specified content"""
        return [message for message in self.storage if content in message.content]

    def delete(self, message: Any):
        """Delete the specified message from storage, while updating the index"""
        self.storage.remove(message)
        if message.cause_by and message in self.index[message.cause_by]:
            self.index[message.cause_by].remove(message)

    def clear(self):
        """Clear storage and index"""
        self.storage = []
        self.index = defaultdict(list)

    def count(self) -> int:
        """Return the number of messages in storage"""
        return len(self.storage)

    def try_remember(self, keyword: str) -> list[Dict]:
        """Try to recall all messages containing a specified keyword"""
        return [message for message in self.storage if keyword in message.content]

    def get(self, k=0) -> list[Any]:
        """Return the most recent k memories, return all when k=0"""
        return self.storage[-k:]

    def remember(self, observed: list[Dict], k=0) -> list[Dict]:
        """remember the most recent k memories from observed Messages, return all when k=0"""
        already_observed = self.get(k)
        news: list[Dict] = []
        for i in observed:
            if i in already_observed:
                continue
            news.append(i)
        return news

    def summary_message(self):
        return (
            "system",
            f"This reminds you of these events from your past: \n{self.summary}",
        )

    def retrieve(self, keyword: str) -> list[Any]:
        """Retrieve all messages containing a specified keyword"""
        return [message for message in self.storage if keyword in message.content]

    def update_running_summary(self, new_events: list):
        """
        This function takes a list of dictionaries representing new events and combines them with the current summary,
        focusing on key and potentially important information to remember. The updated summary is returned in a message
        formatted in the 1st person past tense.

        Args:
            new_events (List[Dict]): A list of dictionaries containing the latest events to be added to the summary.

        Returns:
            str: A message containing the updated summary of actions, formatted in the 1st person past tense.

        Example:
            new_events = [{"event": "entered the kitchen."}, {"event": "found a scrawled note with the number 7"}]
            update_running_summary(new_events)
            # Returns: "This reminds you of these events from your past: \nI entered the kitchen and found a scrawled note saying 7."
        """

        prompt = f'''Your task is to create a concise running summary of actions and information results in the provided text, focusing on key and potentially important information to remember.

You will receive the current summary and the your latest actions. Combine them, adding relevant key information from the latest development in 1st person past tense and keeping the summary concise.

Summary So Far:
"""
{self.summary}
"""

Latest Development:
"""
{new_events or "Nothing new happened."}
"""
'''

        prompt = "get prompt"
        self.summary = "create_chat_completion(prompt)"

        return self.summary_message()

    def get_milestones(self):
        return self.milestones

    def set_milestones(self, milestones):
        self.milestones = milestones
