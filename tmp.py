import json
import requests
import time

payload = {
    "tool_name": "market_capitalization_for_realtime_crypto_prices",
    "arguments": {"symbol": "btc"},
    "hash_id": "",
    "is_finish": False,
}
# url = "http://8.217.97.110:8080/execute_tool"
session = requests.Session()
# url = "http://8.217.97.110:8080"
url = "http://127.0.0.1:8080"

response = session.post(url + "/get_cookie")
cookie = response.cookies

time.sleep(5)

tools = session.post(
    url + "/get_available_tools",
    json={"tool_category": ["rapidapi"]},
    headers={"toolbench_key": "p5ZASSLBO0EknAQLE5ecNZ7kq5i1YfY9eoWUXNxL3TM6lXwdXs"},
    # cookies=cookie
)
import pdb; pdb.set_trace()
print(json.dumps(tools.json(), indent=2))
with open("tools_tmp.json", "w") as f:
    json.dump(tools.json(), f, indent=2)
import pdb; pdb.set_trace()
# tools = session.post(
#     url + "/retrieving_tools",
#     json={
#         "tool_category": "rapidapi",
#         "question": "get the weather in Beijing tomorrow",
#         "top_k": 10,
#     },
#     headers={"toolbench_key": "p5ZASSLBO0EknAQLE5ecNZ7kq5i1YfY9eoWUXNxL3TM6lXwdXs"},
# )
# print(json.dumps(json.loads(tools.json()), indent=2))
# import pdb
#
# pdb.set_trace()

response = session.post(
    url + "/execute_tool",
    json=payload,
    headers={"toolbench_key": "p5ZASSLBO0EknAQLE5ecNZ7kq5i1YfY9eoWUXNxL3TM6lXwdXs"},
    timeout=30,
)
print(response.json())
import pdb

pdb.set_trace()

response = session.post(url + "/release_session")
print(response.json())
