import io
import sys
import ast
import json
import astunparse
import concurrent.futures
from typing import List


def get_call_str(assert_statement: str) -> str:
    call_str = ast.parse(assert_statement).body[0].test.left # type: ignore
    return astunparse.unparse(call_str).strip()

def get_output(func: str, assert_statement: str) -> str:
    try:
        func_call = get_call_str(assert_statement)
        exec(func, globals())
        output = eval(func_call)
        return output
    except Exception as e:
        return str(type(e).__name__)

def worker(code, globals=None, locals=None):
    old_stdout = sys.stdout
    redirected_output = sys.stdout = io.StringIO()
    if locals is None:
        locals = {}
    try:
        # TODO: exec(code, globals, locals) could be buggy
        # In cases where both import statement and function exits in the code, if the locals are given, 
        # the code will not find the imported package. 
        # For example,
        # code = "import math\ndef f(x):\n\treturn math.pow(x, 2)\nassert f(2) == 4"
        # It will return "NameError: name 'math' is not defined"
        exec(code, locals, locals)
        stdout = redirected_output.getvalue()
        return stdout, globals, locals
    except Exception as e:
        return f"Error: {e}", globals, locals
    finally:
        sys.stdout = old_stdout  # restore the original stdout
        
def execute_code(code: str) -> str:
    """Execute a snippet of python code and return the output or the error message.
    """
    timeout = 5
    try:
        with concurrent.futures.ThreadPoolExecutor() as executor:
            future = executor.submit(worker, code)
            result, _, _ = future.result(timeout)
            return result
    except concurrent.futures.TimeoutError:
        return "Timeout"

def execute_unit_tests(func_impl: str, tests: str) -> str:
    """Run a python function on a bunch of unit tests tests and return detailed feedback.
    """
    # tests = eval(tests)
    # assert type(tests) == list

    # Combine function code and assert statement
    func_test_list = [f'{func_impl}\n{test}' for test in tests]

    # Run the tests and collect the results
    success_tests = []
    failed_tests = []
    is_passing = True
    num_tests = len(func_test_list)
    for i in range(num_tests):
        output = execute_code(func_test_list[i])
        if output == "Timeout":
            failed_tests += [f"{tests[i]} # output: Timeout"]
            is_passing = False
        elif output.startswith("Error: "):
            print(output)
            func_output = get_output(func_impl, tests[i])
            failed_tests += [f"{tests[i]} # output: {func_output}"]
            is_passing = False
        else:
            success_tests += [tests[i]]
                
    feedback = "Tested passed:"
    for test in success_tests:
        feedback += f"\n{test}"
    feedback += "\n\nTests failed:"
    for test in failed_tests:
        feedback += f"\n{test}"
        
    return json.dumps({"is_passing": is_passing, 
            "feedback": feedback})

if __name__ == "__main__":
    code = """
from typing import List

def two_sum(nums: List[int], target: int) -> List[int]:
    for i in range(len(nums)):
        for j in range(len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
"""
    tests = ["assert two_sum([2, 7, 11, 15], 9) == [0, 1]", "assert two_sum([3, 2, 4], 6) == [1, 2]", "assert two_sum([3, 5, 2, 7], 9) == [2, 3]"]
    print(execute_unit_tests(code, tests))