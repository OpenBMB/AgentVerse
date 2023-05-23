# A SDE team with two players

In this task, LLMs working in a software development team to solve python code implementation problem. There are 2 agents in this task: code writer and code reviewer.

### Roles

#### *code writer*

Code writer will write the code to satisfy the given requirement. The requirements were given in \<problem\> parts. The code writer first think about the task (the thoughts written in \<thoughts\> parts) and then write relevant code in \<code\> part.

Code writer will modify the written code to debug. The written code will be tested on a series of unit tests to get the feedback. Then the feedback (in \<unit test feedback\> part) together with a proffesional review (in \<code\> review part) will be given. Then code writer will leverage this information to refine the generated code.

The refinement will take multiple iterations.

#### *code reviewer*

Code reviewer will write professional review for the code writer written code. The code writer written code will be given in \<submitted code\> part, the execution feedback of unit tests will be given in \<unit tests feedback\> part and the review will be written in \<code review\> part.

### How to use

#### Write problem and tests in a json

The code problem and relevant unit tests should be given in `agentverse/tasks/sde_team_2players_nolc/code_problem.json`. Here is an example.

```json
{
    "problem": "from typing import List\n\n\ndef mean_absolute_deviation(numbers: List[float]) -> float:\n    \"\"\" For a given list of input numbers, calculate Mean Absolute Deviation\n    around the mean of this dataset.\n    Mean Absolute Deviation is the average absolute difference between each\n    element and a centerpoint (mean in this case):\n    MAD = average | x - x_mean |\n    >>> mean_absolute_deviation([1.0, 2.0, 3.0, 4.0])\n    1.0\n    \"\"\"\n",
    "unit_tests": [
        "assert abs(mean_absolute_deviation([1.0, 2.0, 3.0]) - 2.0/3.0) < 1e-6\n",
        "assert abs(mean_absolute_deviation([1.0, 2.0, 3.0, 4.0]) - 1.0) < 1e-6\n",
        "assert abs(mean_absolute_deviation([1.0, 2.0, 3.0, 4.0, 5.0]) - 6.0/5.0) < 1e-6\n\n"
    ]
}
```

#### Build the configuration

Run `agentverse/tasks/sde_team_2players_nolc/build_config.py` to generate `config.yaml`.

```bash
python agentverse/tasks/sde_team_2players_nolc/build_config.py
```

#### Run the session

After generating `config.yaml`, run the `main.py` to start the task.

```python
from agentverse.agentverse import AgentVerse
from argparse import ArgumentParser

parser = ArgumentParser()
parser.add_argument("--task", type=str, default="sde_team_2players_nolc")

args = parser.parse_args()
agentverse = AgentVerse.from_task(args.task)
agentverse.run()
```

### A running case

This part will show an example of the whole code writing progress.

<!-- #### 3.1 code writer writes the code

```python
<current code>:

from typing import List

def separate_paren_groups(paren_string: str) -> List[str]:    result = []
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
```

#### 3.2 unit test

```
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
```

#### 3.3 code reviewer writes the review

```
<code review>:
The code is correct in terms of logic and passes one of the test cases. However, it fails the other two test cases. The reason for the failure is that the code does not ignore spaces in the input string as mentioned in the problem statement. 

To fix this issue, we can modify the code to remove all spaces from the input string before processing it. We can do this by adding the following line at the beginning of the function:

paren_string = paren_string.replace(" ", "")

This will remove all spaces from the input string and the code should now pass all the test cases.
```

#### 3.4 code writer refine the code

```
ode_writer: <current code>:

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
```

#### 3.5 unit test

```
<unit test feedback>:
{"is_passing": true, "feedback": "Tested passed:\nassert separate_paren_groups('(()()) ((())) () ((())()())') == ['(()())', '((()))', '()', '((())()())']\nassert separate_paren_groups('() (()) ((())) (((())))') == ['()', '(())', '((()))', '(((())))']\nassert separate_paren_groups('(()(())((())))') == ['(()(())((())))']\nassert separate_paren_groups('( ) (( )) (( )( ))') == ['()', '(())', '(()())']\n\nTests failed:"}
```

Having passed all the unit tests, the task finished. -->

Here is an example problem and unit tests.

Problem:
```python
from typing import List


def separate_paren_groups(paren_string: str) -> List[str]:
    """ Input to this function is a string containing multiple groups of nested parentheses. Your goal is to
    separate those group into separate strings and return the list of those.
    Separate groups are balanced (each open brace is properly closed) and not nested within each other
    Ignore any spaces in the input string.
    >>> separate_paren_groups('( ) (( )) (( )( ))')
    ['()', '(())', '(()())']
    """
```

Unit test:
```python
assert candidate('(()()) ((())) () ((())()())') == ['(()())', '((()))', '()', '((())()())']
assert candidate('() (()) ((())) (((())))') == ['()', '(())', '((()))', '(((())))']
assert candidate('(()(())((())))') == ['(()(())((())))']
assert candidate('( ) (( )) (( )( ))') == ['()', '(())', '(()())']
```

A typical running log is like
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
