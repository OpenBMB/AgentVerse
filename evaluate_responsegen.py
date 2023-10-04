import os
import json
from string import Template
import time
import openai
from tqdm import tqdm

with open("./results.jsonl", "r") as f:
    lines = list(f.readlines())

eval_prompt = r"""Which response is better given this context: 
${context}

Response A: ${response_a} 

Response B: ${response_b}. 

Pick your answer from ['Response A', 'Response B', 'both', 'neither']. Generate a short explanation for your choice first. Then, generate 'The better response is A' or 'The better response is B' or 'The better response is both' or 'The better response is neither'.

Your response format should be:
Explanation: <explanation>
Answer: ('The better response is A' or 'The better response is B' or 'The better response is both' or 'The better response is neither')
"""

res = []
eval = []


def write_eval_to_file(file, skip=0):
    for idx, line in tqdm(enumerate(lines)):
        if idx < skip:
            continue
        data = json.loads(line)
        # print(idx + 1)
        context = data["input"]
        response_a = data["response"]
        response_b = data["label"]

        context_quote = "> " + "\n> ".join(context.split("\n"))
        response_a_quote = "> " + "\n> ".join(response_a.split("\n"))
        response_b_quote = "> " + "\n> ".join(response_b.split("\n"))

        f.write(f"## {idx + 1}\n\n")
        f.write(f"Context:\n" f"{context_quote}\n\n")
        f.write(f"Response A (pipeline):\n" f"{response_a_quote}\n\n")
        f.write(f"Response B (init):\n" f"{response_b_quote}\n\n")

        prompt = Template(eval_prompt).safe_substitute(
            context=context, response_a=response_a, response_b=response_b
        )
        for i in range(100):
            try:
                eval_response = openai.ChatCompletion.create(
                    model="gpt-4",
                    messages=[{"role": "user", "content": prompt}],
                    temperature=0.0,
                )
            except:
                time.sleep(min(i**2, 60))
                continue
            break
        text = eval_response["choices"][0]["message"]["content"]
        eval.append(text)
        text = text.replace("\n", "\n\n")
        f.write(f"{text}\n\n")

        if "The better response is A" in text:
            res.append("A")
        elif "The better response is B" in text:
            res.append("B")
        elif "The better response is both" in text:
            res.append("both")
        elif "The better response is neither" in text:
            res.append("neither")
        else:
            res.append("unknown")


if not os.path.exists("./eval.md"):
    with open("./eval.md", "w") as f:
        f.write("# ResponseGen Eval\n\n")
        write_eval_to_file(f)
    win_cnt = 0
    for r in res:
        if r == "A":
            win_cnt += 1
    print(f"win rate: {win_cnt / len(res)}")
else:
    win_cnt = 0
    total_cnt = 0
    with open("./eval.md", "r") as f:
        for line in f:
            if line.startswith("Answer"):
                total_cnt += 1
                if "The better response is A" in line:
                    res.append("A")
                elif "The better response is B" in line:
                    res.append("B")
                elif "The better response is both" in line:
                    res.append("both")
                elif "The better response is neither" in line:
                    res.append("neither")
                else:
                    res.append("unknown")
    with open("./eval.md", "a") as f:
        f.write("\n")
        write_eval_to_file(f, total_cnt)
    win_cnt = 0
    for r in res:
        if r == "A":
            win_cnt += 1
    print(f"win rate: {win_cnt / len(res)}")
