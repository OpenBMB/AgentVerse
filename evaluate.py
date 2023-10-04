import re
import json
import openai
from tqdm import tqdm
from string import Template
from argparse import ArgumentParser

parser = ArgumentParser()
parser.add_argument("--task", type=str, required=True)
args = parser.parse_args()

eval_prompt = r"""You are a mathematical expert who is helping a student with his homework.

\# Question and Student's Solution
Now the student is faced with the following question:
${question}

The student has written the following solution:
${solution}

\# Your Task
Your task is not to solve the problem again, but to check the correctness of the student's solution. Respond in the following format:
Thought: (your reasoning process on why the solution is correct)
Correctness: (0 or 1, 1 means correct, 0 means incorrect)

\#\# Examples 1
Thought: The solution is correct because ...
Correctness: 1

\#\# Examples 2
Thought: The solution is incorrect because ...
Correctness: 0

The label answer to this question is ${label}. Now, check whether the student's solution correctly matches the label answer and respond accordingly. You must give your thought AND the correctness!"""

eval_patttrn = re.compile(r"Thought: .*\nCorrectness:\s*(\d*)")

eval_result = []

f_write = open(f"results/{args.task}/eval.txt", "w")
with open(f"results/{args.task}/results.jsonl") as f:
    for i, line in tqdm(enumerate(f)):
        line = json.loads(line)
        input_text = line["input"]
        response = line["response"]
        label = line["label"]

        prompt = Template(eval_prompt).safe_substitute(
            question=input_text, solution=response, label=label
        )
        while True:
            try:
                eval_response = openai.ChatCompletion.create(
                    model="gpt-4-0314",
                    messages=[{"role": "user", "content": prompt}],
                    temperature=0.0,
                )
            except:
                continue
            break
        text = eval_response["choices"][0]["message"]["content"]
        text = re.sub(r"\n+", "\n", text)
        try:
            correctness = eval_patttrn.findall(text)[0]
        except IndexError:
            print(i)
            print(line)
            print(text)
            break
        f_write.write(correctness + "\n")
        f_write.flush()
f_write.close()
with open(f"results/{args.task}/eval.txt") as f:
    lines = f.readlines()
correct = 0
total = 0
for line in lines:
    total += 1
    if line.strip() == "1":
        correct += 1
print(correct / total)
