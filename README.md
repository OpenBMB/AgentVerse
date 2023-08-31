<h1 align="center"> 🤖 AgentVerse 🪐 </h1>

<h3 align="center">
    <p>A Framework for Multi-LLM Environment Simulation</p>
</h3>
<p align="center">
    <a href="https://github.com/OpenBMB/AgentVerse/blob/main/LICENSE">
        <img alt="License: Apache2" src="https://img.shields.io/badge/License-Apache_2.0-green.svg">
    </a>
    <a href="https://www.python.org/downloads/release/python-3916/">
        <img alt="Documentation" src="https://img.shields.io/badge/python-3.9+-blue.svg">
    </a>
</p>

<p align="center">
<img src="./imgs/title.png" width="512">
</p>

**AgentVerse** offers a versatile framework that streamlines the process of creating custom multi-agent environments for large language models (LLMs). Designed to facilitate swift development and customization with minimal effort, our framework empowers researchers to concentrate on their research, rather than being bogged down by implementation details.

---


## Contents

- [✨ Features](#-features)
- [📰 What's New](#-whats-new)
- [🗓 Coming Soon](#-coming-soon)
- [👾 Simple Demo Video](#-simple-demo-video)
    - [NLP Classroom](#nlp-classroom)
    - [Prisoner Dilemma](#prisoner-dilemma)
    - [Software Design](#software-design)
    - [Database Administrator (DBA)](#database-administrator-dba)
    - [Pokemon](#pokemon)
- [Contents](#contents)
- [🚀 Getting Started](#-getting-started)
  - [Installation](#installation)
  - [CLI Example](#cli-example)
  - [Local Website Demo](#local-website-demo)
- [💡 Philosophy](#-philosophy)
  - [Environment](#environment)
  - [Agent](#agent)
- [✍️ Customize Your Own Environment](#️-customize-your-own-environment)
  - [A Simple Example: Building a Classroom Environment](#a-simple-example-building-a-classroom-environment)
      - [1. Creating a Task Directory and Configuring the Environment](#1-creating-a-task-directory-and-configuring-the-environment)
      - [2. Configuring the Agents](#2-configuring-the-agents)
      - [3. Writing an Output Parser](#3-writing-an-output-parser)
  - [Customization Guide for More Complex Environments](#customization-guide-for-more-complex-environments)
- [🔎 Examples](#-examples)



## 🚀 Getting Started

### Installation

```bash
pip install -U agentverse
```
Or you can install the package by manually cloning the latest repository
```bash
git clone https://github.com/OpenBMB/AgentVerse.git --depth 1
cd AgentVerse
pip install -r requirements.txt
```
Some users have reported problems installing the `orjson` required by `gradio`. One simple workaround is to install it with Anaconda `conda install -c conda-forge orjson`.

You also need to export your OpenAI API key as follows
```bash
# Export your OpenAI API key
export OPENAI_API_KEY="your_api_key_here"
```


### AgentVerse-ProblemSolving Example


### Consulting

#### Multi-Agent

python3 pipeline.py --task pipeline_projectv --discussion_mode

```bash
export OPENAI_API_KEY=YOUR_API_KEY
export LOG_LEVEL=INFO  choose one of them {DEBUG, INFO, WARNING, ERROR, CRITICAL}
python3 pipeline.py --task pipeline_brainstorming --discussion_mode
```

#### Single-Agent

python3 pipeline.py --task pipeline_projectv --single_agent

```bash
export OPENAI_API_KEY=YOUR_API_KEY
export LOG_LEVEL=INFO  choose one of them {DEBUG, INFO, WARNING, ERROR, CRITICAL}
python3 pipeline.py --task pipeline_brainstorming --single_agent
```

With the `--discussion_mode` (or `-d` in short) parameter, the pipeline will enter the p-p discussion mode,
otherwise enter criticizing mode (which is used in the `pipeline_pythoncalculator` task).

With the `--single_agent` (or `-s` in short) parameter, the pipeline will enter single agent CoT mode.


### Software Development

#### multi-Agent 

python3 pipeline.py --task pipeline_projectv

```bash
export OPENAI_API_KEY=your api key
export LOG_LEVEL=INFO  choose one of them {DEBUG, INFO, WARNING, ERROR, CRITICAL}
python3 pipeline.py --task pipeline_pythoncalculator
```

#### Single-Agent 

```bash
export OPENAI_API_KEY=your api key
export LOG_LEVEL=INFO  choose one of them {DEBUG, INFO, WARNING, ERROR, CRITICAL}
python3 pipeline.py --task pipeline_pythoncalculator --single_agent
```


**Notice**: LOG_LEVEL = DEBUG will output all prompts to the terminal and log file.
LOG_LEVEL = INFO will only output the parsed response and the pipeline stage info.



### Contact
- Weize Chen: chenwz21@mails.tsinghua.edu.cn
- Yusheng Su: yushengsu.thu@gmail.com
