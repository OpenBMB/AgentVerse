from agentverse.environments.executor import ToolUsingExecutor
from agentverse.message import SolverMessage
import asyncio


async def test_tool_call():
    response = await asyncio.gather(
        *[
            ToolUsingExecutor.call_tool(
                "bing_search",
                # "WebEnv_browse_website",
                {
                    "thought": "xxx",
                    "query": "weather forecast near Tsinghua University tomorrow",
                    # "num_results": 5,
                    # "url": "https://www.google.com/search?q=hey",
                    # "question": "what is this page about?"
                    # "symbol": "btc",
                },
            )
            for _ in range(1)
        ]
    )
    return response


async def test_tool_retrieve():
    import json

    tools = json.load(open("tools_simplified.json"))["tools_json"]

    plan = [
        # "Li Mei - Use the RapidAPIEnv_rapi_weather_api_by_any_city_get_weather_updates tool to get the weather updates for Tsinghua University area tomorrow.",
        # "Wang Lei - Use the bing_search tool to find the best places for a party near Tsinghua University, and consider the type of party and the preferences of the guests.",
        # "Liu Yang - Use the WebEnv_browse_website tool to find some popular party activities that are suitable for different types of parties and guest preferences.",
        "Li Mei - retrieve the market performance of the XLU sector in the Stoxx market",
        "Li Mei - retrieve the market performance of the XLU sector in the Stoxx market",
        "Li Mei - retrieve the market performance of the XLU sector in the Stoxx market"
    ]

    response = await asyncio.gather(
        *[
            ToolUsingExecutor.retrieve_tools(SolverMessage(content=plan[i]), tools)
            for i in range(3)
        ]
    )
    return response


response = asyncio.run(test_tool_call())
print(response)

# response = asyncio.run(test_tool_retrieve())
# print([[r["name"] for r in res] for res in response])
