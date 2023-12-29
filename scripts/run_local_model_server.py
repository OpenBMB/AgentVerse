import os
import subprocess

# Set the necessary environment variable for Windows
os.environ["CUDA_VISIBLE_DEVICES"] = "0"

# Define constants
# Vicuna because fuck you gated llama repo.
MODEL_PATH = "lmsys/vicuna-7b-v1.5"
MODEL_NAME = "vicuna-7b-v1.5"
CONTROLLER_PORT = 20002

# Start controller
controller_command = [
    "python",
    "-m",
    "fastchat.serve.controller",
    "--host",
    "127.0.0.1",
    "--port",
    str(CONTROLLER_PORT),
]
subprocess.Popen(controller_command, shell=True)

# Start multi_model_worker
worker_command = [
    "python",
    "-m",
    "fastchat.serve.multi_model_worker",
    "--model-path",
    MODEL_PATH,
    "--model-names",
    MODEL_NAME,
    "--host",
    "127.0.0.1",
    "--controller-address",
    f"http://127.0.0.1:{CONTROLLER_PORT}",
    "--worker-address",
    "http://127.0.0.1:21002",
]
subprocess.Popen(worker_command, shell=True)

# Start openai_api_server
api_server_command = [
    "python",
    "-m",
    "fastchat.serve.openai_api_server",
    "--host",
    "127.0.0.1",
    "--port",
    "5000",
    "--controller-address",
    f"http://127.0.0.1:{CONTROLLER_PORT}",
]
subprocess.run(api_server_command, shell=True)
