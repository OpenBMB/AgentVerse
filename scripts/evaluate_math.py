import re
import json
import subprocess
from importlib import reload
from argparse import ArgumentParser

parser = ArgumentParser()
parser.add_argument("--path", type=str, required=True)
parser.add_argument("--max_line", type=int, default=1000000000000)
parser.add_argument("--ci_smoke_test", action="store_true")
args = parser.parse_args()


def check_corr(result: str, correct_solution: str, tol: float = 1e-3):
    result = result.replace(",", "")
    if result.strip() == correct_solution.strip():
        return 1
    try:
        result = float(result.strip())
        correct_solution = float(correct_solution.strip())
        return abs(result - correct_solution) < tol
    except:
        return 0


# final_accs = []
# for i in range(2):
#     acc = 0
#     total = 0
#     with open(args.path) as f:
#         for line in f:
#             line = json.loads(line)
#             label = str(line["label"])
#             if i == 0:
#                 code = line["response"]
#             else:
#                 code = line["logs"][0]["content"]
#             total += 1
#             code = code.strip().replace("```", "")
#             code = code.lstrip("python3")
#             code = code.lstrip("python")
#             with open("tmp.py", "w") as f:
#                 f.write(code)

#             try:
#                 import tmp

#                 reload(tmp)
#                 result = str(tmp.solution())
#                 is_corr = check_corr(result, label)

#                 is_corr = int(is_corr)
#                 # Step 2
#                 if is_corr:
#                     acc += 1
#             except:
#                 print(code)
#     final_accs.append(acc / total)
# print(final_accs)

final_accs = []
err_cnts = []
for i in range(2):
    acc = 0
    total = 0
    err_cnt = 0
    with open(args.path) as f:
        for idx, line in enumerate(f):
            if idx == args.max_line:
                break
            line = json.loads(line)
            label = str(line["label"])
            if i == 0:
                response = line["response"]
            else:
                if line["logs"][0]["module"] == "Role Assigner":
                    response = line["logs"][1]["content"]
                else:
                    response = line["logs"][0]["content"]
            total += 1
            result = re.findall(r"\\boxed\{(.+?)\}", response)
            if len(result) == 0:
                err_cnt += 1
                print(response)
                continue
            result = result[0]
            acc += check_corr(result, label)
    final_accs.append(acc / total)
    err_cnts.append(err_cnt)
print(final_accs)
print(err_cnts)
if args.ci_smoke_test is True:
    assert final_accs[0] == 1.0
