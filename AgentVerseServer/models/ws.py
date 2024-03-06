import abc
import json
import uuid

from AgentVerseServer.models.subround import Subround


class AgentVerseOutputData(metaclass=abc.ABCMeta):
    def __init__(
        self,
        task_id: str,
        name: str,
        goal: str,
        subrounds: None,
        node_id: str = None,
    ):
        if subrounds is None:
            subrounds = []
        self.name = name
        self.goal = goal
        self.task_id = task_id
        self.subrounds = subrounds
        if node_id is None:
            self.node_id = uuid.uuid4().hex
        else:
            self.node_id = node_id

    def to_dict(self):
        return {
            "task_id": self.task_id,
            "node_id": self.node_id,
            "name": self.name,
            "goal": self.goal,
            "subrounds": [subround.to_dict() for subround in self.subrounds],
        }

    def to_json(self):
        return json.dumps(self.to_dict(), indent=2, ensure_ascii=False)

    @classmethod
    def from_json(cls, json_data):
        return cls(**json_data)

    def update(self, update_data: dict):
        for k, v in update_data.items():
            setattr(self, k, v)
        return self
