import datetime
import os


NOW_TIME = datetime.datetime.now().strftime("%Y-%m-%d-%H-%M-%S")


class Config:
    # USE_AZURE = True if os.getenv('USE_AZURE') == 'True' else False
    USE_AZURE = True
    if USE_AZURE:
        OPENAI_API_TYPE = "azure"
        OPENAI_API_BASE = ""
        OPENAI_API_VERSION = "2023-07-01-preview"
        OPENAI_API_KEY = ""
        OPENAI_MODEL = "gpt-4"
    else:
        OPENAI_API_TYPE = None
        OPENAI_API_BASE = ""
        OPENAI_API_VERSION = None
        OPENAI_API_KEY = ""
        OPENAI_MODEL = "gpt-4-0613"
    MAX_TURNS = 3  # the maximum number of turns in each chat
    USE_TASKS_FILE = True  # whether to use tasks file
    MAX_TOKEN_LENGTH = 7500  # the maximum token length for each chat
    MAX_THREADS = 5  # the number of threads to run the simulation
    COMPANY_ROLES_LIMIT = 8  # the number of roles in a company
    ALLOW_AUTO_GEN = True  # whether to allow auto generate the roles by recruiter
    os.makedirs("logs", exist_ok=True)
    LOGGER = Logger("logs/" + NOW_TIME)  # the logger to record the logs
    INNER_LOOP = 2  # the number of inner loop in each turn
    USE_COMPANY = True  # whether to use company
    TASK_FILE_NAME = "task_15_test.json"  # the file name of the tasks to be executed
    ROLES_FILE_NAME = "roles.json"  # the file name of the roles to be executed
    USE_STRUCTURE_FILE = True  # whether to use designed company structure
    STRUCTURE_FILE = (
        "company.json"  # the structure file from the 'company_structure' folder
    )
    # whether to retrieve the roles or take all roles from the roles file
    ROLES_RETRIEVE = True
    COMPANY_STRUCTURE_ONLY = False  # whether to only build the company structure
    SUPPORT_DEPARTMENT_COMMUNICATION = (
        False  # whether to support department communication
    )
