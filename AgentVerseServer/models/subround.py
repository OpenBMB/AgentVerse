import abc
import json
import uuid
from AgentVerseServer.models.node import Node


class Subround(metaclass=abc.ABCMeta):
    def __init__(
        self,
        name: str = "",
        goal: str = "",
        exceute_status: str = "",
        task_id: str = "",
        recruitment: list = None,
        decision_make: list = None,
        aciton_exectuion: list = None,
        evaluation: list = None,
        node_id: str = None,
        refinement: dict = None,
    ):
        self.name = name
        self.goal = goal
        self.task_id = task_id
        self.exceute_status = exceute_status
        self.recruitment = recruitment
        self.decision_make = decision_make
        self.aciton_exectuion = aciton_exectuion
        self.evaluation = evaluation
        self.refinement = refinement
        if node_id is None:
            self.node_id = uuid.uuid4().hex
        else:
            self.node_id = node_id

    def to_dict(self):
        return {
            "node_id": self.node_id,
            "task_id": self.task_id,
            "name": self.name,
            "goal": self.goal,
            "exceute_status": self.exceute_status,
            "refinement": self.refinement,
            "recruitment": [
                node.to_dict() if isinstance(node, Node) else node
                for node in self.recruitment
            ],
            "decision_makes": [
                node.to_dict() if isinstance(node, Node) else node
                for node in self.decision_make
            ],
            "aciton_exectuion": [
                node.to_dict() if isinstance(node, Node) else node
                for node in self.aciton_exectuion
            ],
            "evaluation": [
                node.to_dict() if isinstance(node, Node) else node
                for node in self.evaluation
            ],
        }

    def to_json(self):
        return json.dumps(self.to_dict(), indent=2, ensure_ascii=False)

    @classmethod
    def from_json(cls, json_data):
        return cls(**json_data)
