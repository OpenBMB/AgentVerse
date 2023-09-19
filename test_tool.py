from agentverse.environments.executor import ToolUsingExecutor
import asyncio


async def main():
    response = await asyncio.gather(
        *[
            ToolUsingExecutor.call_tool(
                "bing_search",
                {
                    "thought": "xxx",
                    "query": "weather forecast near Tsinghua University tomorrow",
                    "num_results": "5",
                },
            )
            for _ in range(3)
        ]
    )
    return response


response = asyncio.run(main())
print(response)
