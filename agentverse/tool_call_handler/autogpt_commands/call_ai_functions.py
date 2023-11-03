import abc
import os
import requests
import json
import openai
from colorama import Fore


from mallm.config import Inter_Config as Config
from mallm.memory.message_history import OpenAIMessage as Message


def default_LLM_completion_request(messages, stop=None, **args):
    output = _chat_completion_request(messages, model="gpt-4")
    message = output["choices"][0]["message"]
    return message


def _chat_completion_request(messages, model="gpt-3.5-turbo-16k", stop=None, **args):
    messages = [message.raw() for message in messages]
    json_data = {
        "messages": messages,
        # "max_tokens": 1024,
        # "frequency_penalty": 0,
        # "presence_penalty": 0,
        **args,
    }
    if stop is not None:
        json_data.update({"stop": stop})
    # print(json_data)
    try:
        # Official OpenAI API
        openai.api_key = "31b8638c9eea48709a596501490f9e88"
        openai.api_base = "https://gersteinbiocodeeval-eastus2.openai.azure.com/"
        openai.api_type = "azure"
        openai.api_version = (
            "2023-07-01-preview"  # this may change in the future 2023-05-15 2023-06-13
        )
        response = openai.ChatCompletion.create(
            engine=model,
            **json_data,
        )

        return response
    except Exception as e:
        print("Unable to generate ChatCompletion response")
        print(f"Exception: {e}")
        return e


def call_ai_function(
    function: str,
    args: list,
    description: str,
    model: str | None = None,
    config: Config = None,
) -> str:
    """Call an AI function

    This is a magic function that can do anything with no-code. See
    https://github.com/Torantulino/AI-Functions for more info.

    Args:
        function (str): The function to call
        args (list): The arguments to pass to the function
        description (str): The description of the function
        model (str, optional): The model to use. Defaults to None.

    Returns:
        str: The response from the function
    """
    if model is None:
        model = config.smart_llm_model
    # For each arg, if any are None, convert to "None":
    args = [str(arg) if arg is not None else "None" for arg in args]
    # parse args to comma separated string
    arg_str: str = ", ".join(args)

    message_list = [
        Message(
            "system",
            f"You are now the following python function: ```# {description}"
            f"\n{function}```\n\nOnly respond with your `return` value.",
        ),
        Message("user", arg_str),
    ]

    return default_LLM_completion_request(messages=message_list)
