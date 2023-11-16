import openai
from agentverse.config import Config
import os
import ast

engine_list = [
    "gpt-3.5-turbo",
    "gpt-3.5-turbo-16k",
    "gpt-35-turbo-0613",
    "gpt-4",
    "gpt-4-32k",
    "text-embedding-ada-002",
    "gpt-35-turbo",
    "gpt-35-turbo-16k",
    "gpt-4-0613",
    "gpt-4-0314",
]


def extract_json_from_response(response_content: str) -> dict:
    response_content = response_content.replace("false", "False").replace(
        "true", "True"
    )
    # Sometimes the response includes the JSON in a code block with ```
    if response_content.startswith("```") and response_content.endswith("```"):
        # Discard the first and last ```, then re-join in case the response naturally included ```
        response_content = "```".join(response_content.split("```")[1:-1])

    # response content comes from OpenAI as a Python `str(content_dict)`, literal_eval reverses this
    try:
        return ast.literal_eval(response_content)
    except BaseException as e:
        print(f"Error parsing JSON response with literal_eval {e}")
        print(f"Invalid JSON received in response: {response_content}")
        # TODO: How to raise an error here without causing the program to exit?
        return {}


class OpenAIUtils:
    def __init__(self, model_name=Config.OPENAI_MODEL):
        if Config.USE_AZURE:
            openai.api_type = "azure"
            openai.api_version = "2023-07-01-preview"
            openai.api_base = os.environ.get("OPENAI_API_BASE")
        openai.api_key = os.environ.get("OPENAI_API_KEY")
        if model_name not in engine_list:
            raise ValueError(
                "The model name is not in the list of available models among gpt-35-turbo, gpt-35-turbo-16k, gpt-4, gpt-4-32k, text-embedding-ada-002."
            )
        self.model_name = model_name
        self.messages = [{"role": "system", "content": "You are a helpful assistant."}]
        self.use_azure = Config.USE_AZURE

    def get_embedding(self, text: str):
        if self.use_azure:
            response = openai.Embedding.create(
                input=text, engine="text-embedding-ada-002"
            )
        else:
            response = openai.Embedding.create(
                input=text, model="text-embedding-ada-002"
            )
        return response["data"][0]["embedding"]

    def chat_with_message_history(self, prompt: str, message_history: list):
        messages = message_history.append({"role": "user", "content": prompt})
        if self.use_azure:
            response = openai.ChatCompletion.create(
                engine=self.model_name,
                messages=messages,
            )
        else:
            response = openai.ChatCompletion.create(
                model=self.model_name,
                messages=messages,
            )
        return response["choices"][0]["message"]["content"]

    def chat(self, message: str):
        self.messages.append({"role": "user", "content": message})

        if self.use_azure:
            response = openai.ChatCompletion.create(
                engine=self.model_name,
                messages=self.messages,
                # max_tokens=2048
            )
        else:
            response = openai.ChatCompletion.create(
                model=self.model_name,
                messages=self.messages,
            )

        self.messages.append(
            {
                "role": "assistant",
                "content": response["choices"][0]["message"]["content"],
            }
        )
        return response["choices"][0]["message"]["content"]

    def function_call(self, prompt: str, functions):
        messages = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ]
        if self.use_azure:
            response = openai.ChatCompletion.create(
                engine=self.model_name,
                messages=messages,
                functions=functions,
                function_call={"name": functions[0]["name"]},
            )
        else:
            response = openai.ChatCompletion.create(
                model=self.model_name,
                messages=messages,
                functions=functions,
                function_call={"name": functions[0]["name"]},
            )
        return extract_json_from_response(
            response["choices"][0]["message"]["function_call"]["arguments"]
        )

    def function_call_inter_loop(
        self, messages, system_prompt="", user_prompt="", functions=[]
    ):
        if messages == []:
            messages = [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ]
        if self.use_azure:
            response = openai.ChatCompletion.create(
                engine=self.model_name,
                messages=messages,
                functions=functions,
                # function_call={"name": functions[0]['name']},
            )
        else:
            response = openai.ChatCompletion.create(
                model=self.model_name,
                messages=messages,
                functions=functions,
                # function_call={"name": functions[0]['name']},
            )
        try:
            result = response["choices"][0]["message"]
        except Exception as e:
            result = {
                "role": "assistant",
                "content": f"OpenAI function call error: {e}",
                "function_call": {"name": "", "arguments": ""},
            }
        return result

    def set_system_prompt(self, prompt):
        self.messages[0]["content"] = prompt

    def get_history(self):
        return self.messages


# test the class
if __name__ == "__main__":
    openai_chat = OpenAIUtils()
    print(
        openai_chat.chat(
            "You are a skilled planner. Organize a department structure given the task:Write a command line snake game for the following task, considering these roles: Developer, Tester, Designer, Manager."
        )
    )
