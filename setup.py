import setuptools
from setuptools.command.develop import develop
import subprocess

# with open("requirements.txt", "r") as f:
#     requirements = f.read().splitlines()

setuptools.setup(
    name="agentverse",
    version="0.1.0",
    author="OpenBMB",
    author_email="chenweize1998@gmail.com",
    description="A versatile framework that streamlines the process of creating custom multi-agent environments for large language models (LLMs).",
    url="https://github.com/OpenBMB/AgentVerse",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        'License :: OSI Approved :: Apache Software License',
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.9",
    install_requires=[
        "PyYAML",
        "fastapi",
        "uvicorn",
        "py3langid",
        "iso-639",
        "openai",
        "opencv-python",
        "gradio",
        "httpx[socks]",
        "astunparse",
        "langchain",
    ],
)
