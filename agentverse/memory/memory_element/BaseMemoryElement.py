from dataclasses import dataclass
import numpy as np

from abc import abstractclassmethod
from pydantic import BaseModel, Field

from agentverse.agents import BaseAgent

from datetime import datetime as dt

import orjson

from agentverse.llms.openai import get_embedding


EMBED_DIM = 1536
SAVE_OPTIONS = (
    orjson.OPT_SERIALIZE_NUMPY | orjson.OPT_SERIALIZE_DATACLASS | orjson.OPT_INDENT_2
)


class BaseMemoryElement(BaseModel):
    """
    Base class for memory elements.
    TODO: later make Message inherit this MemoryElement
    """

    content: str = Field(default="")
    subject: BaseAgent = Field(default=None)
    embedding: list[float] = Field(default_factory=list)
    create_time: dt = Field(default=None)
    last_access_time: dt = Field(default=None)

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
