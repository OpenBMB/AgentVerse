"""
"""

import abc
import json


class InteractionBase(metaclass=abc.ABCMeta):
    def __init__(
        self,
        interaction_id: str,
        user_id: str,
        create_time: str,
        description: str,
        recorder_root_dir: str = "",
        status: str = "",
        message: str = "",
        current_step: str = "",
        update_time: str = "",
        is_deleted: bool = False,
    ):
        self.interaction_id = interaction_id
        self.user_id = user_id
        self.create_time = create_time
        self.description = description
        self.recorder_root_dir = recorder_root_dir
        self.status = status
        self.message = message
        self.current_step = current_step
        self.update_time = update_time
        self.is_deleted = is_deleted

    def to_dict(self, include=None, exclude=None):
        data = {
            "interaction_id": self.interaction_id,
            "user_id": self.user_id,
            "create_time": self.create_time,
            "description": self.description,
            "recorder_root_dir": self.recorder_root_dir,
            "status": self.status,
            "message": self.message,
            "current_step": self.current_step,
            "update_time": self.update_time,
            "is_deleted": self.is_deleted,
        }
        if include:
            data = {k: v for k, v in data.items() if k in include}
        if exclude:
            data = {k: v for k, v in data.items() if k not in exclude}
        return data

    def to_json(self):
        return json.dumps(self.to_dict(), indent=2, ensure_ascii=False)

    @classmethod
    def from_json(cls, json_data):
        return cls(**json_data)

    @classmethod
    def from_db(cls, interaction):
        return cls(
            interaction.interaction_id,
            interaction.user_id,
            interaction.create_time,
            interaction.description,
            interaction.recorder_root_dir,
            interaction.status,
            interaction.message,
            interaction.current_step,
            interaction.update_time,
            interaction.is_deleted,
        )
