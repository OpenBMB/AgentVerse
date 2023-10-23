from mallm.agent import Company
from mallm.openai_utils import OpenAIUtils
from mallm.utils import retry
from mallm.config import Config
from mallm.agent.Role import Role
from mallm.prompt import Prompt


class Customer(Role):
    def __init__(
        self,
        name="customer",
        persona: str = "You are a helpful assistant",
        tools: list = [],
        task: str = "",
    ):
        super().__init__(name, persona, tools)
        self.logger = Config.LOGGER
        self.company = None
        self.openai_chat = OpenAIUtils()
        self.task = task

    def give_feedback(self, requirement: str):
        response = self.openai_chat.chat(
            Prompt.get_customer_feedback_prompt(self.task, requirement)
        )
        return response
