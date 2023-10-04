import yaml
import json

config_path = "partial_config.yaml"

code_problem = json.load(open("code_problem.json", "r"))
problem_string = "\n\n<problem>:\n" + code_problem["problem"]
unit_tests = str(code_problem["unit_tests"])

print(problem_string)
print(unit_tests)

task_config = yaml.safe_load(open(config_path))

for agent_configs in task_config["agents"]:
    if agent_configs["name"] != "code_tester":
        agent_configs["role_description"] += problem_string
task_config["environment"]["unit_tests"] = unit_tests

with open("config.yaml", "w") as f:
    yaml.safe_dump(task_config, f)