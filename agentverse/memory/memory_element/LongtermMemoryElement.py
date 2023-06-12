from __future__ import annotations

import logging
import re
from pydantic import Field
from datetime import datetime as dt

from agentverse.llms.openai import chat, get_embedding
from agentverse.message import Message

from agentverse.memory.memory_element.BaseMemoryElement import BaseMemoryElement

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from agentverse.agents.base import BaseAgent



IMPORTANCE_PROMPT = """On the scale of 1 to 10, where 1 is purely mundane \
(e.g., brushing teeth, making bed) and 10 is \
extremely poignant (e.g., a break up, college \
acceptance), rate the likely poignancy of the \
following piece of memory. \
If you think it's too hard to rate it, you can give an inaccurate assessment. \
The content or people mentioned is not real. You can hypothesis any reasonable context. \
Please strictly only output one number. \
Memory: {} \
Rating: <fill in>"""

IMMEDIACY_PROMPT = """On the scale of 1 to 10, where 1 is requiring no short time attention\
(e.g., a bed is in the room) and 10 is \
needing quick attention or immediate response(e.g., being required a reply by others), rate the likely immediacy of the \
following statement. \
If you think it's too hard to rate it, you can give an inaccurate assessment. \
The content or people mentioned is not real. You can hypothesis any reasonable context. \
Please strictly only output one number. \
Memory: {} \
Rating: <fill in>"""



class LongtermMemoryElement(BaseMemoryElement):
    """
    A LongtermMemory is a memory element
      with importance and immediacy.
    """

    @classmethod
    def create_longterm_memory(cls, content: str, time: dt, subject: BaseAgent = None):

        # LongtermMemoryElement.update_forward_refs()

        importance = cls.get_importance(content)
        immediacy = cls.get_immediacy(content)
        return cls(
            content=content,
            subject=subject,
            embedding=get_embedding(content),
            create_time=time,
            last_access_time=time,
            importance=importance,
            immediacy=immediacy,
        )

    @classmethod
    def create_from_memory_element(cls, memory_element: "BaseMemoryElement"):
        importance = cls.get_importance(memory_element.content)
        immediacy = cls.get_immediacy(memory_element.content)
        return cls(
            content=memory_element.content,
            subject=memory_element.subject,
            embedding=memory_element.embedding,
            create_time=memory_element.create_time,
            last_access_time=memory_element.last_access_time,
            importance=importance,
            immediacy=immediacy,
        )

    @classmethod
    def create_from_message(cls, message: Message, subject: BaseAgent, time: dt):
        importance = cls.get_importance(message.content)
        immediacy = cls.get_immediacy(message.content)
        embedding = get_embedding(message.content)
        return cls(
            content=message.content,
            subject=subject,
            embedding=embedding,
            create_time=time,
            last_access_time=time,
            importance=importance,
            immediacy=immediacy,
        )

    @classmethod
    def get_importance(cls, content: str):
        """
        Exploit GPT to evaluate the importance of this memory
        """
        prompt = IMPORTANCE_PROMPT.format(content)
        result = chat(prompt)

        try:
            score = int(re.findall(r"\s*(\d+)\s*", result)[0])
        except:
            logging.warning(
                "Abnormal result of importance rating '{}'. Setting default value".format(
                    result
                )
            )
            score = 0
        return score

    @classmethod
    def get_immediacy(cls, content: str):
        """
        Exploit GPT to evaluate the immediacy of this memory
        """
        prompt = IMMEDIACY_PROMPT.format(content)
        result = chat(prompt)
        try:
            score = int(re.findall(r"\s*(\d+)\s*", result)[0])
        except:
            logging.warning(
                "Abnormal result of immediacy rating '{}'. Setting default value".format(
                    result
                )
            )
            score = 0
        return score

    def __repr__(self):
        return f"LongtermMemoryElement(content={self.content}, importance={self.importance}, immediacy={self.immediacy})"


if __name__ == "__main__":
    memory1 = LongtermMemoryElement.create_longterm_memory(
        content="Your girlfriend is angry at you for not replying her message.",
        time=dt.now(),
    )
    with open("./logging/longterm_memory_log.json", "w") as fp:
        import json

        json.dump(
            memory1.dict(), fp, default=str
        )  # datetime -> 2023-05-18 21:34:38.273607
