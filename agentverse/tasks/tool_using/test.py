import requests
url  = "http://8.217.97.110:8080/get_available_tools"
param = {
    "tool_category": 
        ["autogpt"]
}
response = requests.post(url, json=param, headers={"toolbench_key":"p5ZASSLBO0EknAQLE5ecNZ7kq5i1YfY9eoWUXNxL3TM6lXwdXs"}, timeout=10)
result = response.json()
print(result)