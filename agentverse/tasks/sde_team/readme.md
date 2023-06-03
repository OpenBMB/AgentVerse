# SDE team 🧑🏾‍💻👩‍💻🧑🏻‍💻

In this task, LLMs work as a software development team to solve code implementation problem. We have simulated two scenarios *sde_team/sde_team_2players* and *sde_team/sde_team_3players*.

The performance on [HumanEval](https://github.com/openai/human-eval) is shown below.

| Methods                         | Pass@1 HumanEval |
|---------------------------------|-----------|
| Codex (175B)*                   | 0.47      |
| &nbsp;&nbsp;&nbsp;&nbsp;+ CodeT*                      | 0.658     |
| PaLM Coder (540B)*              | 0.36      |
| GPT-4*                          | 0.67      |
| ChatGPT (gpt-3.5-turbo)*        | 0.573     |
| &nbsp;&nbsp;&nbsp;&nbsp;+ Self-collaboration*         | 0.744     |
| Our *sde_team/sde_team_2players* (gpt-3.5-turbo) | **0.799**     |

*: Results are from [Self-collaboration](https://arxiv.org/abs/2304.07590). The methods in the table all employed the provided unit tests.

Our *sde_team/sde_team_2players* shares the similar spirit as Self-collaboration at the moment. We are working to introduce more features in this repo! 


## *sde_team/sde_team_2players*

In this case, we are simulating a code generation problem that a python function body is required to be generated given function signature, doc string and unit tests. In the following, we will elaborate the details.

### Roles

Detailed role description and prompts can be found in `config.yaml`

#### *code writer*

Code writer will write the code to satisfy the given requirement. The requirement is given in the \<problem\> field of the prompt. The code writer first thinks about the task (the thoughts written in \<thoughts\>) and then write the code in \<code\>.

The submitted code will be tested automatically on a series of unit tests. Then the feedback (in \<unit test feedback\>) together with a professional code review (in \<code review\>) will be returned. Then code writer will leverage this information to refine the previously submitted code. The refinement will take multiple iterations.

#### *code reviewer*

Code reviewer will write professional review for the submitted code. The submitted code will be given in \<submitted code\>, the execution feedback of unit tests will be given in \<unit tests feedback\> and the review will be composed in \<code review\>.

### How to run the simulation

#### Provide problem and unit tests

The code problem and unit tests should be given in `agentverse/tasks/sde_team/sde_team_2players/code_problem.json`. Here is an example.

```json
{
    "problem": "from typing import List\n\n\ndef separate_paren_groups(paren_string: str) -> List[str]:\n    \"\"\" Input to this function is a string containing multiple groups of nested parentheses. Your goal is to\n    separate those group into separate strings and return the list of those.\n    Separate groups are balanced (each open brace is properly closed) and not nested within each other\n    Ignore any spaces in the input string.\n    >>> separate_paren_groups('( ) (( )) (( )( ))')\n    ['()', '(())', '(()())']\n    \"\"\"\n",
    "unit_tests": [
        "assert separate_paren_groups('(()()) ((())) () ((())()())') == ['(()())', '((()))', '()', '((())()())']",
        "assert separate_paren_groups('() (()) ((())) (((())))') == ['()', '(())', '((()))', '(((())))']",
        "assert separate_paren_groups('(()(())((())))') == ['(()(())((())))']",
        "assert separate_paren_groups('( ) (( )) (( )( ))') == ['()', '(())', '(()())']"
    ]
}
```

#### Build the configuration file

Run `agentverse/tasks/sde_team/sde_team_2players/build_config.py` to generate `config.yaml`.

```bash
cd agentverse/tasks/sde_team/sde_team_2players/
python build_config.py
```

#### Run the session

After generating `config.yaml`, run the `main.py` to start the task.

```python
from agentverse.agentverse import AgentVerse
from argparse import ArgumentParser

parser = ArgumentParser()
parser.add_argument("--task", type=str, default="sde_team/sde_team_2players")

args = parser.parse_args()
agentverse = AgentVerse.from_task(args.task)
agentverse.run()
```

### A running case

A typical running log of the previous problem is shown below.

```bash
05/22/2023 15:36:18 - INFO - root - code_writer: <current code>:

from typing import List

def separate_paren_groups(paren_string: str) -> List[str]:
    result = []
    open_count = 0
    start = 0
    for i, c in enumerate(paren_string):
        if c == '(':
            open_count += 1
        elif c == ')':
            open_count -= 1
            if open_count == 0:
                result.append(paren_string[start:i+1])
                start = i+1
    return result


<unit test feedback>:
{"is_passing": false, "feedback": "Tested passed:\nassert separate_paren_groups('(()(())((())))') == ['(()(())((())))']\n\nTests failed:\nassert separate_paren_groups('(()()) ((())) () ((())()())') == ['(()())', '((()))', '()', '((())()())'] # output: ['(()())', ' ((()))', ' ()', ' ((())()())']\nassert separate_paren_groups('() (()) ((())) (((())))') == ['()', '(())', '((()))', '(((())))'] # output: ['()', ' (())', ' ((()))', ' (((())))']\nassert separate_paren_groups('( ) (( )) (( )( ))') == ['()', '(())', '(()())'] # output: ['( )', ' (( ))', ' (( )( ))']"}

05/22/2023 15:36:33 - INFO - root - code_reviewer: <current code>:

from typing import List

def separate_paren_groups(paren_string: str) -> List[str]:
    result = []
    open_count = 0
    start = 0
    for i, c in enumerate(paren_string):
        if c == '(':
            open_count += 1
        elif c == ')':
            open_count -= 1
            if open_count == 0:
                result.append(paren_string[start:i+1])
                start = i+1
    return result


<code review>:
The code is correct in terms of logic and passes one of the test cases. However, it fails the other two test cases. The reason for the failure is that the code does not ignore spaces in the input string as mentioned in the problem statement. 

To fix this issue, we can modify the code to remove all spaces from the input string before processing it. We can do this by adding the following line at the beginning of the function:

paren_string = paren_string.replace(" ", "")

This will remove all spaces from the input string and the code should now pass all the test cases.

05/22/2023 15:36:54 - INFO - root - code_writer: <current code>:

from typing import List

def separate_paren_groups(paren_string: str) -> List[str]:
    paren_string = paren_string.replace(" ", "")
    result = []
    open_count = 0
    start = 0
    for i, c in enumerate(paren_string):
        if c == '(':
            open_count += 1
        elif c == ')':
            open_count -= 1
            if open_count == 0:
                result.append(paren_string[start:i+1])
                start = i+1
    return result


<unit test feedback>:
{"is_passing": true, "feedback": "Tested passed:\nassert separate_paren_groups('(()()) ((())) () ((())()())') == ['(()())', '((()))', '()', '((())()())']\nassert separate_paren_groups('() (()) ((())) (((())))') == ['()', '(())', '((()))', '(((())))']\nassert separate_paren_groups('(()(())((())))') == ['(()(())((())))']\nassert separate_paren_groups('( ) (( )) (( )( ))') == ['()', '(())', '(()())']\n\nTests failed:"}
```

## *sde_team/sde_team_3players*

Different from *sde_team/sde_team_2players*, we additionally introduce a role to automatically generate unit tests.

- *unit test generator*: generate a series of unit test cases for the coding problem.

### Stay tuned

The generated unit tests are not always perfect, as they may not be correct. We plan to incorporate tools to raise the correctness of the generated cases. 