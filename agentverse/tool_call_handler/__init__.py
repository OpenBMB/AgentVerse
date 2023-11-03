import json
import os

current_file_directory = os.path.dirname(os.path.abspath(__file__))
os.chdir(current_file_directory)

BASIC_TOOLS = [
    {
        "tool_name": "read_file",
        "description": "Read a file and return the contents",
        "parameters": "filename (str): The name of the file to read"
    },
    {
        "tool_name": "write_to_file",
        "description": "Write text to a file",
        "parameters": "filename (str): The name of the file to write to\ntext (str): The text to write to the file"
    },
    {
        "tool_name": "append_to_file",
        "description": "Append text to a file",
        "parameters": "filename (str): The name of the file to append to\ntext (str): The text to append to the file\nshould_log (bool): Should log output"
    },
    {
        "tool_name": "delete_file",
        "description": "Delete a file",
        "parameters": "filename (str): The name of the file to delete"
    },
    {
        "tool_name": "list_files",
        "description": "lists files in a directory recursively",
        "parameters": "directory (str): The directory to search in"
    },
    {
        "tool_name": "download_file",
        "description": "Downloads a file",
        "parameters": "url (str): URL of the file to download\nfilename (str): Filename to save the file as"
    },
    {
        "tool_name": "clone_repository",
        "description": "Clone a GitHub repository locally.",
        "parameters": "url (str): The URL of the repository to clone.\nclone_path (str): The path to clone the repository to."
    },
    {
        "tool_name": "write_tests",
        "description": "A function that takes in code and focus topics and returns a response from create chat completion api call.",
        "parameters": "focus (list): A list of suggestions around what needs to be improved.\ncode (str): Code for test cases to be generated against."
    },
    {
        "tool_name": "execute_python_file",
        "description": "Execute a Python file in a Docker container and return the output",
        "parameters": "filename (str): The name of the file to execute"
    },
    {
        "tool_name": "execute_shell",
        "description": "Execute a shell command and return the output",
        "parameters": "command_line (str): The command line to execute"
    },
    {
        "tool_name": "execute_shell_popen",
        "description": "Execute a shell command with Popen and returns an english description of the event and the process id",
        "parameters": "command_line (str): The command line to execute"
    },
    {
        "tool_name": "browse_website",
        "description": "Browse a website and return the answer and links to the user",
        "parameters": "url (str): The url of the website to browse\nquestion (str): The question asked by the user"
    },
    {
        "tool_name": "scrape_text",
        "description": "Scrape text from a webpage",
        "parameters": "url (str): The URL to scrape text from"
    },
    {
        "tool_name": "analyze_code",
        "description": "A function that takes in a string and returns a response from create chat completion api call.",
        "parameters": "code (str): Code to be evaluated."
    }
]

