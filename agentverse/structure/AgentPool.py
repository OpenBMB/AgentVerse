from typing import List
from tqdm import tqdm
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import json
import os
from agentverse.agents.company_agent.Role import Role
from agentverse.config import Config
from agentverse.logging import Logger


class AgentPool:
    def __init__(self, roles: List[Role]):
        self.roles = roles
        self.role_map = {role.name: role for role in roles}
        # self.openai_chat = OpenAIUtils()
        self.logger = Logger()

    def get_role(self, role_name: str):
        return self.role_map.get(role_name, None)

    def get_roles(self, name_list: List[str]):
        return [self.role_map[name] for name in name_list if name in self.role_map]

    def get_role_uncased(self, role_name: str):
        return next(
            (role for role in self.roles if role.name.lower() == role_name.lower()),
            None,
        )

    def get_roles_list(self):
        return self.roles

    def get_roles_name_list(self):
        return [role.name for role in self.roles]

    def add_role(self, role: Role):
        self.roles.append(role)
        self.role_map[role.name] = role
        return self

    def save_embeddings(self):
        self.logger.log("Saving role embeddings...")
        role_info_and_embeddings = []
        for role in tqdm(self.roles):
            role_info_and_embeddings.append(
                {
                    "name": role.name,
                    "description": role.description,
                    "embedding": self.openai_chat.get_embedding(
                        role.name + "\t" + role.description
                    ),
                }
            )
        with open("./data/role_info_and_embeddings.json", "w") as f_out:
            json.dump(role_info_and_embeddings, f_out)

    def roles_retrieve(
        self, task: str, top_k: int = Config.COMPANY_ROLES_LIMIT
    ) -> List[str]:
        with open("./data/role_info_and_embeddings.json", "r") as f_out:
            items = json.load(f_out)
        role_embeddings = []
        for item in items:
            role_embedding = item["embedding"]
            role_embeddings.append(role_embedding)
        task_embedding = np.array(self.openai_chat.get_embedding(task))
        similarities = cosine_similarity([task_embedding], role_embeddings)
        sorted_doc_indices = sorted(
            range(len(similarities[0])), key=lambda i: similarities[0][i], reverse=True
        )
        role_name_list = []
        for i in sorted_doc_indices[:top_k]:
            print(items[i]["name"])
            role_name_list.append(items[i]["name"])

        return role_name_list
