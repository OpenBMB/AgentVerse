import openai
import json

# Environment Variables
import os, re

openai.api_key = os.getenv('OPENAI_API_KEY', 'YourAPIKeyIfNotSet')


'''
def construct_messages(prepend_prompt: str, history: [], append_prompt: str):

    messages = []
    if prepend_prompt != "":
        messages.append({"role": "system", "content": prepend_prompt})
    if len(history) > 0:
        messages += history
    if append_prompt != "":
        messages.append({"role": "user", "content": append_prompt})
    return messages


function_schema = {
  "name": "run_code",
  "description": "The solution has been written to `tmp/main.py`. Your are going to write the unit testing code for the solution.",
  "parameters": {
    "type": "object",
    "properties": {
      "thought": {
        "type": "string",
        "description": "Your thought"
      },
      "file_path": {
        "type": "string",
        "description": "The path to write your testing code"
      },
      "code": {
        "type": "string",
        "description": "The testing code"
      },
      "command": {
        "type": "string",
        "description": "The command to change directory and execute your testing code"
      }
    },
    "required": ["thought", "file_path", "code", "command"]
  },
}

messages = "The solution has been written to `tmp/main.py`. Your are going to write the unit testing code for the solution."

messages = construct_messages("", [], messages)


response = openai.ChatCompletion.create(
    model="gpt-4-0613",
    messages = messages,
    functions = [function_schema],
    #function_call = "auto",
    function_call={"name": "run_code"},
    #stream=True,
    temperature = 0,
)

#import pdb;
#pdb.set_trace()

#output = response.choices[0].message.function_call
output = response.choices[0].message.function_call.arguments


#output = "{\n\"thought\": \"I will write the unit testing code for the solution in `tmp/test_main.py`. The testing code will import the solution from `main.py` and test the functions. I will use the `unittest` module from Python for this. After writing the testing code, I will execute it using the command `python -m unittest tmp/test_main.py`.\",\n\"file_path\": \"tmp/test_main.py\",\n\"code\": \"import unittest\\nfrom main import *\\n\\nclass TestSolution(unittest.TestCase):\\n\\n    def test_function1(self):\\n        self.assertEqual(function1(1), 1)\\n\\n    def test_function2(self):\\n        self.assertEqual(function2(2), 4)\\n\\nif __name__ == '__main__':\\n    unittest.main()\",\n\"command\": \"python -m unittest tmp/test_main.py\"\n}"

'''


#output = '{\n"thought": "I will write the unit test in a new python file. I will import the function from the main file and then write tests for different scenarios. I will test for a list of positive numbers, a list of negative numbers, a list of both positive and negative numbers, and an empty list. I will use the assert keyword to check if the output is as expected.",\n"file_path": "tmp/test_main.py",\n"code": "import unittest\\nfrom main import mean_absolute_deviation\\n\\nclass TestMain(unittest.TestCase):\\n    def test_mean_absolute_deviation(self):\\n        self.assertEqual(mean_absolute_deviation([1.0, 2.0, 3.0, 4.0]), 1.0)\\n        self.assertEqual(mean_absolute_deviation([-1.0, -2.0, -3.0, -4.0]), 1.0)\\n        self.assertEqual(mean_absolute_deviation([-1.0, 2.0, -3.0, 4.0]), 2.5)\\n        self.assertEqual(mean_absolute_deviation([]), \'Error: Empty List\')\\n\\nif __name__ == \'__main__\':\\n    unittest.main()",\n"command": "cd tmp && python3 -m unittest test_main.py"\n}'

output = '{\n"thought": "I will write the unit test in a new python file. The test will import the function from the main file and test it with different inputs. I will use the assert keyword to make sure the function returns the expected output. I will test the function with a list of positive numbers, a list of negative numbers, a list of both positive and negative numbers, and a list with one number.",\n"file_path": "tmp/test_main.py",\n"code": "\nimport unittest\nfrom main import mean_absolute_deviation\n\nclass TestMain(unittest.TestCase):\n    def test_mean_absolute_deviation(self):\n        self.assertEqual(mean_absolute_deviation([1.0, 2.0, 3.0, 4.0]), 1.0)\n        self.assertEqual(mean_absolute_deviation([-1.0, -2.0, -3.0, -4.0]), 1.0)\n        self.assertEqual(mean_absolute_deviation([-1.0, 2.0, -3.0, 4.0]), 2.5)\n        self.assertEqual(mean_absolute_deviation([5.0]), 0.0)\n\nif __name__ == \'__main__\':\n    unittest.main()\n",\n"command": "cd tmp && python3 -m unittest test_main.py"\n}'


#js = eval(output)
js = json.loads(output, strict=True)
print(js)
exit()


js = json.loads(output, strict=True)




print(js["code"])

#for k, v in js.items():
#    print(k)
#    print(v)
#    print("====")

exit()

#print(js)
exit()


print(output)
exit()
print("Done1")

output = output.replace("{\n","{").replace("\n}","}")
print("Done2")

output = output.replace('\n"thought"',"thought")
output = output.replace('\n"file_path"',"file_path")
output = output.replace('\n"code"',"code")
output = output.replace('\n"command"',"command")
print("Done3")

try:
    json_object = json.loads(output)
except json.JSONDecodeError as e:
    print('Error:', e)


print(json_object)




