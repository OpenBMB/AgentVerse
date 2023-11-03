"""这里包装一些RapidAPI的信息
"""
import json
import re
import os
import random
from pydantic import BaseModel
from typing import Union
import requests
import time

from mallm.utils.common import ToolCallStatusCode


def standardize(string):
    res = re.compile("[^\\u4e00-\\u9fa5^a-z^A-Z^0-9^_]")
    string = res.sub("_", string)
    string = re.sub(r"(_)\1+", "_", string)

    while True:
        if len(string) == 0:
            return string
        if string[0] == "_":
            string = string[1:]
        else:
            break

    while True:
        if len(string) == 0:
            return string
        if string[-1] == "_":
            string = string[:-1]
        else:
            break
    string = string.lower()
    return string


def change_name(name):
    if name == "from":
        name = "is_from"
    if name == "class":
        name = "is_class"
    if name == "return":
        name = "is_return"
    if name == "false":
        name = "is_false"
    if name == "true":
        name = "is_true"
    if name == "id":
        name = "is_id"
    if name == "and":
        name = "is_and"
    return name


def api_json_to_openai_json(api_json, standard_tool_name):
    description_max_length = 256
    templete = {
        "name": "",
        "description": "",
        "parameters": {
            "type": "object",
            "properties": {},
            "required": [],
            "optional": [],
        },
    }
    # 参数类型映射，不然直接用rapidapi的参数传到openai function会无法识别报错
    map_type = {"NUMBER": "integer", "STRING": "string", "BOOLEAN": "boolean"}

    pure_api_name = change_name(standardize(api_json["api_name"]))
    templete["name"] = pure_api_name + f"_for_{standard_tool_name}"
    templete["name"] = templete["name"][-64:]  # 最后64个字母

    templete[
        "description"
    ] = f'This is the subfunction for tool "{standard_tool_name}", you can use this tool.'

    if api_json["api_description"].strip() != "":
        tuncated_description = (
            api_json["api_description"]
            .strip()
            .replace(api_json["api_name"], templete["name"])[:description_max_length]
        )
        templete["description"] = (
            templete["description"]
            + f'The description of this function is: "{tuncated_description}"'
        )
    if (
        "required_parameters" in api_json.keys()
        and len(api_json["required_parameters"]) > 0
    ):
        for para in api_json["required_parameters"]:
            name = standardize(para["name"])
            name = change_name(name)
            if para["type"] in map_type:
                param_type = map_type[para["type"]]
            else:  # 其他参数类型都默认设为string
                param_type = "string"
            prompt = {
                "type": param_type,
                "description": para["description"][:description_max_length],
            }

            default_value = para["default"]
            if len(str(default_value)) != 0:
                prompt = {
                    "type": param_type,
                    "description": para["description"][:description_max_length],
                    "example_value": default_value,
                }
            else:
                prompt = {
                    "type": param_type,
                    "description": para["description"][:description_max_length],
                }

            templete["parameters"]["properties"][name] = prompt
            templete["parameters"]["required"].append(name)
        for para in api_json["optional_parameters"]:
            name = standardize(para["name"])
            name = change_name(name)
            if para["type"] in map_type:
                param_type = map_type[para["type"]]
            else:  # 其他参数类型都默认设为string
                param_type = "string"

            default_value = para["default"]
            if len(str(default_value)) != 0:
                prompt = {
                    "type": param_type,
                    "description": para["description"][:description_max_length],
                    "example_value": default_value,
                }
            else:
                prompt = {
                    "type": param_type,
                    "description": para["description"][:description_max_length],
                }

            templete["parameters"]["properties"][name] = prompt
            templete["parameters"]["optional"].append(name)

    return templete, api_json["category_name"], pure_api_name


class RapidAPIRegistry:
    def __init__(
        self, data_dict=None, query=None, tool_descriptions=None, process_id=0
    ):
        self.process_id = process_id

        self.tool_names = []
        self.cate_names = []

        self.input_description = query

        self.functions = []

        self.api_name_reflect = {}
        if data_dict != None:
            for k, api_json in enumerate(data_dict["api_list"]):
                standard_tool_name = tool_descriptions[k][0]

                (
                    openai_function_json,
                    cate_name,
                    pure_api_name,
                ) = api_json_to_openai_json(api_json, standard_tool_name)
                self.functions.append(openai_function_json)

                self.api_name_reflect[openai_function_json["name"]] = pure_api_name
                self.tool_names.append(standard_tool_name)
                self.cate_names.append(cate_name)

        finish_func = {
            "name": "Finish",
            # "description": "If you believe that you have obtained a result that can answer the task, please call this function to provide the final answer. Alternatively, if you recognize that you are unable to proceed with the task in the current state, call this function to restart. Remember: you must ALWAYS call this function at the end of your attempt, and this is the only part that will be shown to the user is the final answer, so both final_answer or give_up_reason should contain sufficient information for user.",
            "description": "This function is called at the end of the subtask. Use 'give_answer' when you think this subtask is done, use 'give_and_and_restart' when you think you can't handle the given sub-task",
            "parameters": {
                "type": "object",
                "properties": {
                    "return_type": {
                        "type": "string",
                        "enum": ["give_answer", "give_up_and_restart"],
                    },
                    "final_answer": {
                        "type": "string",
                        "description": 'The final answer you want to give the user. You should have this field if "return_type"=="give_answer".',
                    },
                    "give_up_reason": {
                        "type": "string",
                        "description": 'The main problem that causes you to give up. You should have this field if "return_type"=="give_up_and_restart"',
                    },
                },
                "required": ["return_type"],
            },
        }

        self.config = None
        self.functions.append(finish_func)

        self.commands = {value["name"]: True for value in self.functions}

        self.task_description = f"""You should use functions to help handle the real time user querys. Remember:
1.ALWAYS call \"Finish\" function at the end of the task. And the final answer should contain enough information to show to the user,If you can't handle the task, or you find that function calls always fail(the function is not valid now), use function Finish->give_up_and_restart.
2.Do not use origin tool names, use only subfunctions' names.
You have access of the following tools:\n"""

        unduplicated_reflection = {}
        if tool_descriptions != None:
            for standardize_tool_name, tool_des in tool_descriptions:
                unduplicated_reflection[standardize_tool_name] = tool_des

            for k, (standardize_tool_name, tool_des) in enumerate(
                unduplicated_reflection.items()
            ):
                striped = tool_des[:512].replace("\n", "").strip()
                if striped == "":
                    striped = "None"
                self.task_description += f"{k+1}.{standardize_tool_name}: {striped}\n"

    @property
    def OpenAI_functions(self):
        return self.functions

    def handle(self, action_name, action_input):
        output, code = self._handle(action_name, action_input)
        return str(output)[:1024], code

    def _handle(self, action_name, action_input):
        """当调用来临时，委托给这个函数去执行调用，返回结果"""
        if action_name == "Finish":
            json_data = action_input
            if "return_type" not in json_data.keys():
                return (
                    '{error:"must have "return_type""}',
                    ToolCallStatusCode.FORMAT_ERROR,
                )

            if json_data["return_type"] == "give_up_and_restart":
                return (
                    '{"response":"chose to give up and restart"}',
                    ToolCallStatusCode.GIVE_UP,
                )
            elif json_data["return_type"] == "give_answer":
                if "final_answer" not in json_data.keys():
                    return (
                        '{error:"must have "final_answer""}',
                        ToolCallStatusCode.FORMAT_ERROR,
                    )

                self.success = 1  # succesfully return final_answer
                return (
                    '{"response":"successfully giving the final answer."}',
                    ToolCallStatusCode.GIVE_ANSWER,
                )
            else:
                return (
                    '{error:""return_type" is not a valid choice"}',
                    ToolCallStatusCode.FORMAT_ERROR,
                )
        else:  # 正常 rapidAPI 函数
            for k, function in enumerate(self.functions):
                if function["name"].endswith(action_name):
                    pure_api_name = self.api_name_reflect[function["name"]]
                    # response = get_rapidapi_response(payload)
                    try:
                        self.toolbench_key = ""
                        payload = {
                            "category": self.cate_names[k],
                            "tool_name": self.tool_names[k],
                            "api_name": pure_api_name,
                            "tool_input": str(action_input),
                            "strip": "truncate",
                            "toolbench_key": self.toolbench_key,
                        }
                        # print(payload)
                        # url  = "http://47.251.13.204:8080/rapidapi"
                        url = "http://8.218.239.54:8080/rapidapi"
                        headers = {"toolbench_key": self.toolbench_key}
                        response = requests.post(
                            url, json=payload, headers=headers, timeout=15
                        )
                        if response.status_code != 200:
                            return (
                                json.dumps(
                                    {
                                        "error": f"request invalid, data error. status_code={response.status_code}",
                                        "response": "",
                                    }
                                ),
                                ToolCallStatusCode.SERVER_ERROR,
                            )
                        try:
                            response = response.json()
                        except:
                            print(response)
                            return (
                                json.dumps(
                                    {
                                        "error": f"request invalid, data error",
                                        "response": "",
                                    }
                                ),
                                ToolCallStatusCode.SERVER_ERROR,
                            )

                        # 1幻觉函数名
                        # 4代表模型自己决定剪枝
                        # 5代表api调用timeout
                        # 6代表404
                        # 7代表未订阅
                        # 8代表unauthorized
                        # 9代表too many requests
                        # 10代表rate limit per minute
                        # 11信息包含 "error"字段
                        # 12,请求返回错误，500
                        if response["error"] == "API not working error...":
                            status_code = ToolCallStatusCode.OTHER_ERROR
                        elif response["error"] == "Unauthorized error...":
                            status_code = ToolCallStatusCode.OTHER_ERROR
                        elif response["error"] == "Unsubscribed error...":
                            status_code = ToolCallStatusCode.OTHER_ERROR
                        elif response["error"] == "Too many requests error...":
                            status_code = ToolCallStatusCode.OTHER_ERROR
                        elif response["error"] == "Rate limit per minute error...":
                            print("Reach api calling limit per minute, sleeping...")
                            time.sleep(60)
                            status_code = ToolCallStatusCode.OTHER_ERROR
                        elif response["error"] == "Message error...":
                            status_code = ToolCallStatusCode.OTHER_ERROR
                        else:
                            status_code = ToolCallStatusCode.TOOL_CALL_SUCCESS

                        return json.dumps(response), status_code
                    except Exception as e:
                        return (
                            json.dumps(
                                {"error": f"Timeout error...{e}", "response": ""}
                            ),
                            ToolCallStatusCode.OTHER_ERROR,
                        )
            return (
                json.dumps(
                    {"error": f"No such function name: {action_name}", "response": ""}
                ),
                ToolCallStatusCode.HALLUCINATE_NAME,
            )


class Info(BaseModel):
    category: str
    tool_name: str
    api_name: str
    tool_input: Union[str, dict]
    strip: str


def get_rapidapi_response(
    input_dict: dict,
    tools_root="data.toolenv.tools",
    schema_root="data/toolenv/response_examples",
):
    info = Info
    info.category = input_dict["category"]
    info.tool_name = input_dict["tool_name"]
    info.api_name = input_dict["api_name"]
    info.tool_input = input_dict["tool_input"]
    info.strip = input_dict["strip"]
    rapidapi_key = input_dict["rapidapi_key"]

    tool_name, standard_category, api_name, code_string = prepare_tool_name_and_url(
        tools_root, info
    )
    tool_input = info.tool_input

    strip_method = info.strip

    try:
        tool_input = json.loads(tool_input)
    except Exception as e:
        if tool_input == "":
            tool_input = {}
        else:
            print(f"Can not parse tool input into json: {tool_input}")
            response_dict = {"error": f"Tool input parse error...\n", "response": ""}
            return response_dict

    input_params_str = ""
    if len(tool_input) > 0:
        for key, value in tool_input.items():
            if isinstance(value, str):
                input_params_str += f'{key}="{value}", '
            else:
                input_params_str += f"{key}={value}, "

    input_params_str += f"toolbench_rapidapi_key='{rapidapi_key}'"
    success_flag, switch_flag, response_dict, save_cache = run(
        code_string, api_name, input_params_str
    )
    observation = observation_shorten(
        schema_root,
        response_dict,
        standard_category,
        tool_name.replace(f"_for_{standard_category}", ""),
        api_name,
        strip_method,
    )
    result = str(observation)[:2048]
    return {"error": response_dict["error"], "response": result}


def prepare_tool_name_and_url(tools_root, info):
    category = info.category
    standard_category = category.replace(" ", "_").replace(",", "_").replace("/", "_")
    while " " in standard_category or "," in standard_category:
        standard_category = standard_category.replace(" ", "_").replace(",", "_")
    standard_category = standard_category.replace("__", "_")

    tool_name = info.tool_name
    api_name = change_name(standardize(info.api_name))
    if not tool_name.endswith(f"_for_{standard_category}"):
        tool_name = standardize(info.tool_name)
        code_string = f"""from {tools_root}.{standard_category}.{tool_name}.api import {api_name}"""
        tool_name += f"_for_{standard_category}"
    else:
        tmp_tool_name = standardize(tool_name.replace(f"_for_{standard_category}", ""))
        code_string = f"""from {tools_root}.{standard_category}.{tmp_tool_name}.api import {api_name}"""
    return tool_name, standard_category, api_name, code_string


def observation_shorten(
    schema_root, response_dict, category, tool_name, api_name, strip_method
):
    print(random.random())
    if strip_method == "filter" or (strip_method == "random" and random.random() > 0.5):
        if isinstance(response_dict["response"], dict):
            if os.path.exists(os.path.join(schema_root, category)):
                if os.path.exists(
                    os.path.join(schema_root, category, tool_name + ".json")
                ):
                    schema_dicts = json.load(
                        open(
                            os.path.join(schema_root, category, tool_name + ".json"),
                            "r",
                        )
                    )
                    api_list = schema_dicts["api_list"]
                    schema = None
                    for schema_dict in api_list:
                        schema_api_name = change_name(standardize(schema_dict["name"]))
                        if (
                            schema_api_name == api_name
                            and len(schema_dict["schema"]) > 0
                        ):
                            schema = schema_dict["schema"]
                            break
                    if schema is not None:
                        response_dict["response"] = dict_shorten(
                            response_dict["response"], schema
                        )
    return str(response_dict["response"])


def dict_shorten(origin: dict, schema: dict):
    for key, value in list(origin.items()):
        if key not in schema:
            del origin[key]
        else:
            if isinstance(value, dict):
                dict_shorten(value, schema[key])  # schema[key] should be a dict
            elif isinstance(value, list):
                if value:
                    if isinstance(value[0], dict):
                        for item in value:
                            dict_shorten(
                                item, schema[key][0]
                            )  # schema[key] should be a list with only one dict element
    return origin


def run(toolbench_code_string, toolbench_api_name, toolbench_input_params_str):
    # get observation
    success_flag = False
    switch_flag = False
    save_cache = False
    exec(toolbench_code_string)
    try:
        eval_func_str = f"{toolbench_api_name}({toolbench_input_params_str})"
        new_func = eval(eval_func_str)
        response, save_cache, switch_flag = process_error(new_func)
        success_flag = True
    except Exception as e:
        response = {
            "error": f"Function executing {toolbench_code_string} error...\n{e}",
            "response": "",
        }
        save_cache = False
    return success_flag, switch_flag, response, save_cache


def process_error(response):
    save_cache_flag = False
    switch_flag = False
    if (
        "The request to the API has timed out. Please try again later, or if the issue persists"
        in str(response)
    ):
        return_dict = {
            "error": "API temporarily not working error...",
            "response": response,
        }

    if "Your Client (working) ---> Gateway (working) ---> API (not working)" in str(
        response
    ):
        return_dict = {"error": "API not working error...", "response": response}

    elif "Unauthorized" in str(response) or "unauthorized" in str(response):
        save_cache_flag = True
        return_dict = {"error": "Unauthorized error...", "response": response}

    elif "You are not subscribed to this API." in str(response):
        switch_flag = True
        return_dict = {"error": "Unsubscribed error...", "response": response}

    elif "Too many requests" in str(response):
        switch_flag = True
        return_dict = {"error": "Too many requests error...", "response": response}

    elif "You have exceeded" in str(response) or "you are being rate limited" in str(
        response
    ):
        switch_flag = True
        return_dict = {"error": "Rate limit error...", "response": response}

    elif (
        "Access restricted. Check credits balance or enter the correct API key."
        in str(response)
    ):
        switch_flag = True
        return_dict = {"error": "Rate limit error...", "response": response}

    elif "Oops, an error in the gateway has occurred." in str(response):
        switch_flag = True
        return_dict = {"error": "Gateway error...", "response": response}

    elif "Blocked User. Please contact your API provider." in str(response):
        switch_flag = True
        return_dict = {"error": "Blocked error...", "response": response}

    elif "error" in str(response):
        return_dict = {"error": "Message error...", "response": response}

    else:
        save_cache_flag = True
        return_dict = {"error": "", "response": response}
    return return_dict, save_cache_flag, switch_flag
