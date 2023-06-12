from __future__ import annotations

from dataclasses import dataclass
import numpy as np

from abc import abstractclassmethod
from pydantic import BaseModel, Field
from typing import TYPE_CHECKING, Any

from datetime import datetime as dt

import orjson

from agentverse.llms.openai import get_embedding


EMBED_DIM = 1536
SAVE_OPTIONS = (
    orjson.OPT_SERIALIZE_NUMPY | orjson.OPT_SERIALIZE_DATACLASS | orjson.OPT_INDENT_2
)

if TYPE_CHECKING:
    from agentverse.agents.base import BaseAgent

class BaseMemoryElement(BaseModel):
    """
    Base class for memory elements.
    TODO: later make Message inherit this MemoryElement
    """

    content: str = None
    subject: BaseAgent = None
    embedding: list[float] = []
    create_time: dt = None
    last_access_time: dt = None
    importance: int = 0
    immediacy: int = 0

    def __init__(self,
                 content: str,
                 subject: BaseAgent,
                 embedding: list[float],
                 create_time: dt,
                 last_access_time: dt,
                 importance: int,
                 immediacy: int,
                 **kwargs):

        super().__init__(**kwargs)
        self.content = content
        self.subject = subject
        self.embedding = embedding
        self.create_time = create_time
        self.last_access_time = last_access_time
        self.importance = importance
        self.immediacy = immediacy


    @classmethod
    def create_memory(
        cls,
        content: str,
        time: dt,
        subject: BaseAgent = None,
        embedding: np.ndarray = None,
    ):
        embedding = get_embedding(content) if embedding is None else embedding
        create_time = time
        last_access_time = time
        return cls(
            content=content,
            subject=subject,
            embedding=embedding,
            create_time=create_time,
            last_access_time=last_access_time,
        )
