<h1 align="center"> 🤖 AgentVerse 🪐 </h1>

<h3 align="center">
    <p>A Framework for Multi-LLM Environment Simulation</p>
</h3>

<p align="center">
    <a href="https://github.com/OpenBMB/AgentVerse/blob/main/LICENSE">
        <img alt="License: Apache2" src="https://img.shields.io/badge/License-Apache_2.0-green.svg">
    </a>
    <a href="https://www.python.org/downloads/release/python-3916/">
        <img alt="Python Version" src="https://img.shields.io/badge/python-3.9+-blue.svg">
    </a>
    <a href="https://github.com/OpenBMB/AgentVerse/actions/">
        <img alt="Build" src="https://img.shields.io/github/actions/workflow/status/OpenBMB/AgentVerse/test.yml">
    </a>
    <a href="https://github.com/psf/black">
        <img alt="Code Style: Black" src="https://img.shields.io/badge/code%20style-black-black">
    </a>
    <a href="https://github.com/OpenBMB/AgentVerse/issues">
        <img alt="Contributions: Welcome" src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat">
    </a>
    
</p>

<p align="center">
<img src="./imgs/title.png" width="512">
</p>

<p align="center">
    【English | <a href="README_zh.md">Chinese</a>】
</p>

**AgentVerse** offers a versatile framework that streamlines the process of creating custom multi-agent environments for large language models (LLMs). Designed to facilitate swift development and customization with minimal effort, our framework empowers researchers to concentrate on their research, rather than being bogged down by implementation details.

⚠️⚠️⚠️ We're refactoring the code, and the goal is to provide a flexibility to construct simulation(without a predefined goal) and task-solving(with a specific goal) environments. Please note that this README is slightly outdated, we will update it soon. If you require a stable version that exclusively supports simulation environments, you can use [`release-1.0`](https://github.com/OpenBMB/AgentVerse/tree/release-1.0) branch.

---

## ✨ Features

- 🥳 **Efficient Environment Building:** Our framework provides a collection of essential building blocks for effortlessly creating a multi-agent environment. With only a few lines in a configuration file, you can easily construct basic environments such as a chat room for LLMs. This process entails defining the environment's settings and prompts for LLMs, enabling researchers like you to concentrate on experimentation and analysis.

- ⚙️ **Customizable Components**: AgentVerse simplifies the multi-agent environment by dividing it into five functional modules and defining their respective interfaces. For complex environments that cannot be constructed directly using the basic modules offered in AgentVerse, you can customize one or more of the interfaces within these five functional modules to efficiently create your own multi-agent environment according to your requirements.

- 🛠 **Tools (Plugins) Utilization**: AgentVerse supports the multi-agent environments with tools. Currently, AgentVerse supports tools provided in [BMTools](https://github.com/OpenBMB/BMTools). 

## 📰 What's New
- [2023/10/5] 💡 We release the code of our paper [AgentVerse: Facilitating Multi-Agent Collaboration and Exploring Emergent Behaviors in Agents](https://arxiv.org/abs/2308.10848), and refactor our codebase to enable the creation of both simulation and task-solving environment!

- [2023/8/22] 📝 We're excited to share our work-in-progress paper [AgentVerse: Facilitating Multi-Agent Collaboration and Exploring Emergent Behaviors in Agents](https://arxiv.org/abs/2308.10848) related to this repository.
<p align="center">
<img width="616" alt="Screen Shot 2023-09-01 at 12 08 57 PM" src="https://github.com/OpenBMB/AgentVerse/assets/11704492/6db1c907-b7fc-42f9-946c-89853a28f386">
</p>

- [2023/6/5] 🎉 We are thrilled to present an array of [demos](#-simple-demo-video), including [NLP Classroom](#nlp-classroom), [Prisoner Dilemma](#prisoner-dilemma), [Software Design](#software-design), [Database Administrator](#database-administrator-dba), and a simple [H5 Pokemon Game](#pokemon) that enables the interaction with the characters in Pokemon! Try out these demos and have fun!
- [2023/5/1] 🚀 [AgentVerse](https://github.com/OpenBMB/AgentVerse) is officially launched!

## 🌟 Join Us!
AgentVerse is on a mission to revolutionize the multi-agent environment for large language models, and we're eagerly looking for passionate collaborators to join us on this exciting journey.
### How Can You Contribute?
- **Code Development**: If you're an engineer, help us refine, optimize, and expand the current framework. We're always looking for talented developers to enhance our existing features and develop new modules.

- **Documentation and Tutorials**: If you have a knack for writing, help us improve our documentation, create tutorials, or write blog posts to make AgentVerse more accessible to the broader community.

- **Application Exploration**: If you're intrigued by multi-agent applications and are eager to experiment using AgentVerse, we'd be thrilled to support your journey and see what you create!

- **Feedback and Suggestions**: Use AgentVerse and provide us with feedback. Your insights can lead to potential improvements and ensure that our framework remains top-notch.

Also, if you're passionate about advancing the frontiers of multi-agent environments and are eager to dive deeper into research, we invite you to join our team at THUNLP. To explore this exciting opportunity and embark on a collaborative journey with us, please reach out to [chenweize1998@gmail.com](chenweize1998@gmail.com) and [yushengsu.thu@gmail.com](yushengsu.thu@gmail.com) and express your interest. We're keen to welcome motivated individuals like you to our lab!

👉Also, our Discord: https://discord.gg/cnutfCtC.

## 🗓 Coming Soon
- [x] Code release of our [paper](https://arxiv.org/abs/2308.10848)
- [ ] Add documentation
- [ ] Support more sophisticated memory for conversation history
- [ ] Add support for local LLM


## 👾 Simple Demo Video

We demonstrate the following cases that are expertly crafted by AgentVerse.
<!--
### [![Demo video](https://i.imgur.com/vKb2F1B.png)](https://youtu.be/9JCVfzMFhaM)
-->
<!--![image](imgs/multiagent-min.gif)-->

<!-- - **NLP Classroom**: -->

#### NLP Classroom
In the NLP class, the professor and students engage in interactive communication. When students have a question, they raise their hands and patiently wait for the professor to call on them. Only after being called on by the professor, can students speak and ask their questions.

Use the following command to launch the NLP Classroom example:
```bash
python main_simulation_gui.py --task simulation/nlp_classroom_9players
```

https://github.com/OpenBMB/AgentVerse/assets/11704492/6ea07850-595e-4a28-a82e-f863011353c2


#### Prisoner Dilemma
A prisoner's Dilemma is a thought experiment that challenges two completely rational agents to a dilemma: they can cooperate with their partner for mutual benefit or betray their partner ("defect") for individual reward.

Use the following command to launch the Prisoner Dilemma example:
```bash
python main_simulation_cli.py --task simulation/prisoner_dilemma
```

https://github.com/OpenBMB/AgentVerse/assets/11704492/017c46e5-c738-4fca-9352-b008e2d518bd


#### Software Design
In the Software Design example, a code writer, a code tester and a code reviewer collaborate on the code generation problem. Given a problem, the code writer first composes the code implementation. The code tester runs the unit tests and provides the feedback. The code viewer then generates a review. After collecting the test feedback and review, the code writer iteratively refines the code.

Use the following command to launch the Software Design example:
```bash
python main_demo.py --task simulation/sde_team/sde_team_2players
```

https://github.com/OpenBMB/AgentVerse/assets/11704492/5058066a-abee-490d-8659-b4e54661626a


#### [Database Administrator (DBA)](https://github.com/TsinghuaDatabaseGroup/DB-GPT)

In the database diagnosis scenario, the Chief DBA monitors the system anomalies (e.g., slow queries, locks, crash down). If detected, the domain experts are alerted to analyze root causes, share insights, and suggest optimization solutions together. The Chief DBA then provides a summarized report to the user.

```bash
python main_simulation_gui.py --task simulation/db_diag
```

https://github.com/OpenBMB/AgentVerse/assets/11704492/c633419d-afbb-47d4-bb12-6bb512e7af3a

#### [Text Evaluation (ChatEval)](https://github.com/chanchimin/ChatEval)
In the context of the text evaluation scenario, we recommend users explore the [ChatEval](https://github.com/chanchimin/ChatEval) repo. They've implemented a multi-agent referee team on AgentVerse to assess the quality of text generated by different models. When given two distinct pieces of text, roles within ChatEval can autonomously debate the nuances and disparities, drawing upon their assigned personas, and subsequently provide their judgments. Experiments indicate that their referee team, enriched with diverse roles specified in [config.yaml](#2-configuring-the-agents), aligns more closely with human evaluations. This demo is built upon the [Fastchat](https://github.com/lm-sys/FastChat) repo, and we'd like to express our appreciation for their foundational work.


https://github.com/OpenBMB/AgentVerse/assets/75533759/58f33468-f15b-4bac-ae01-8d0780019f85

#### Pokemon
**Currently available only in [`release-1.0`](https://github.com/OpenBMB/AgentVerse/tree/release-1.0)**. In the game, agents can walk around the game world, and interact with one another. As a player, you take on the role of an agent and can engage with others at any time. There are 6 characters in the Pokémon environment who appeared in Pokemon Emerald: [May](https://bulbapedia.bulbagarden.net/wiki/May_(game)), [Professor Birch](https://bulbapedia.bulbagarden.net/wiki/Professor_Birch), [Steven Stone](https://bulbapedia.bulbagarden.net/wiki/Steven_Stone), [Maxie](https://bulbapedia.bulbagarden.net/wiki/Maxie), [Archie](https://bulbapedia.bulbagarden.net/wiki/Archie) and [Joseph](https://bulbapedia.bulbagarden.net/wiki/Mr._Stone). 

To launch the Pokemon game, first launch a local server with the following command:
```bash
uvicorn pokemon_server:app --reload --port 10002
```
Then open another terminal in the project's root path and run the following command:
```bash
cd ui
# If you do not have npm installed, you need to install it before running the following commands 
# https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
# We have tested on npm@9.6.4, node@20.0.0
npm install
npm run watch
```
Wait for the compilation to complete, and have fun! (WASD for moving around, and SPACE for launching a conversation.)

https://github.com/OpenBMB/AgentVerse/assets/11704492/4d07da68-f942-4205-b558-f155e95782e7



## Contents

- [✨ Features](#-features)
- [📰 What's New](#-whats-new)
- [🌟 Join Us!](#-join-us)
  - [How Can You Contribute?](#how-can-you-contribute)
- [🗓 Coming Soon](#-coming-soon)
- [👾 Simple Demo Video](#-simple-demo-video)
    - [NLP Classroom](#nlp-classroom)
    - [Prisoner Dilemma](#prisoner-dilemma)
    - [Software Design](#software-design)
    - [Database Administrator (DBA)](#database-administrator-dba)
    - [Text Evaluation (ChatEval)](#text-evaluation-chateval)
    - [Pokemon](#pokemon)
- [Contents](#contents)
- [🚀 Getting Started](#-getting-started)
  - [Installation](#installation)
  - [Simulation CLI Example](#simulation-cli-example)
  - [Simulation Local Website Demo](#simulation-local-website-demo)
  - [Task-Solving CLI Example](#task-solving-cli-example)
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
- [Star History](#star-history)
- [Citation](#citation)
- [Contact](#contact)



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

You also need to export your OpenAI API key as follows：
```bash
# Export your OpenAI API key
export OPENAI_API_KEY="your_api_key_here"
# Or if you are using Azure
export AZURE_OPENAI_API_KEY="your_api_key_here"
export AZURE_OPENAI_API_BASE="your_api_base_here"
```

If you want use Azure OpenAI services, pleas export your Azure OpenAI key and OpenAI API base as follows：
```bash
export AZURE_OPENAI_API_KEY="your_api_key_here"
export AZURE_OPENAI_API_BASE="your_api_base_here"
```

If you want to use the tools provided by BMTools, you need to install BMTools as follows:
```bash
git clone git+https://github.com/OpenBMB/BMTools.git
cd BMTools
pip install -r requirements.txt
python setup.py develop
```


<!--
# Install BMTools
cd ../
git clone git@github.com:OpenBMB/BMTools.git
cd BMTools
python setup.py develop
-->

### Simulation CLI Example

You can create a multi-agent environments provided by us. Using the classroom scenario as an example. In this scenario, there are nine agents, one playing the role of a professor and the other eight as students.

```shell
python3 main_simulation_cli.py --task simulation/nlp_classroom_9players
```

### Simulation Local Website Demo

We also provide a local website demo for this environment. You can launch it with

```shell
python3 main_simulation_gui.py --task simulation/nlp_classroom_9players
```
After successfully launching the local server, you can visit [http://127.0.0.1:7860/](http://127.0.0.1:7860/) to view the classroom environment.

### Task-Solving CLI Example

To run the experiments with the task-solving environment proposed in our [paper](https://arxiv.org/abs/2308.10848), you can use the following command:

```shell
# Run the Humaneval benchmark using gpt-3.5-turbo
python3 main_tasksolving_cli.py --task tasksolving/humaneval/gpt-3.5 --dataset_path data/humaneval/test.jsonl --overwrite
```

You can take a look at `agentverse/tasks/tasksolving` for more experiments we have done in our paper.


## 💡 Philosophy

### Environment

At the core of our framework is the environment, which plays a crucial role in enabling researchers to study the behavior of agents under different conditions. We believe that the environment should be flexible and extensible, allowing researchers to easily customize it to fit their needs. To achieve this, we have abstracted the environment into five rule components, and implementing different environments is actually implementing different rules:

- **Describer**: This component provides a description of the environment at each turn for each agent. You can customize the describer to define the specific requirements of their environment, such as the agents with whom an agent can interact.
- **Order**: This component defines the order in which agents take actions within the environment. You can customize the order to reflect the desired interaction between agents. We provide several basic order options, including `random`, `sequential`, and `concurrent` (in which all agents take an action in each turn).
- **Selector**: This component selects the valid messages generated by agents. Sometimes agents may generate invalid responses, and the selector is used to filter out unexpected results.
- **Updater**: This component updates the memory of each agent. In certain cases, the response generated by one agent should not be seen by all agents (e.g., if agents are in different rooms). For each response, the updater updates only the agents who can see it.
- **Visibility**: This component maintains the list of agents that each agent can see throughout the environment's changes. For example, when an agent moves from one room to another, the list of visible agents of each agent should be updated by `visibility`.

By abstracting the environment into these five components, we have created a highly flexible and extensible framework that enables researchers to easily build and customize their own multi-agent environments.

### Agent

Another fundamental component is the agent. Currently we provide two types of agents: **ConversationAgent** and **ToolAgent**. You can also customize your own agent by inheriting BaseAgent class (tutorial coming soon).

## ✍️ Customize Your Own Environment

We have provided several examples in the `agentverse/tasks` directory. To customize your environment, you should

1. Create a task directory in `agentverse/tasks` 
2. Write the configuration file
3. Write the output parser that parses the response of your agents.
4. Add your parser in `agentverse/tasks/__init__.py`

We will use a simple example in `agentverse/tasks/nlp_classroom_3players` to illustrate the procedure.

### A Simple Example: Building a Classroom Environment

To illustrate how to customize your environment, we'll use a simple example of building a classroom environment where one agent is the professor, one is the student, and one is the teaching assistant.

##### 1. Creating a Task Directory and Configuring the Environment

First, we need to create a task directory and write our configuration file for the environment. In the `agentverse/tasks` directory, create a new directory called `nlp_classroom_3players`. Inside this directory, create a `config.yaml` file and write the following configuration:

```yaml
# config.yaml
environment:
  env_type: basic				# Use the basic environment provided in AgentVerse
  max_turns: 10					# Specify the maximum number of dialogue turns
  rule:
    order:
      type: sequential	# Use the sequential order
    visibility:
      type: all					# Each message can be seen by all agents
    selector:
      type: basic				# Basic selector (do not select)
    updater:
      type: basic				# Basic updater (update the message to all agents)
    describer:
      type: basic				# Basic describer (no description)
```

This configuration specifies that we will use the basic environment provided in AgentVerse, with a maximum of 10 dialogue turns. We'll use the sequential order, with all messages visible to all agents. We won't be using any selectors, our updater will update the messages to all the agents and our describer will provide no description.

##### 2. Configuring the Agents

Next, we'll configure the agents. In the `config.yaml` file, we'll add the configuration for each agent. Here's an example configuration for the professor:

```yaml
# config.yaml
agents:
  -
    agent_type: conversation
    name: Professor Micheal		# Name of the agent
    role_description: You are Prof. Micheal, ...	# Description of the agent
    memory: 
      memory_type: chat_history		# Will store all the chat history
    prompt_template: *professor_prompt
    llm:
      llm_type: text-davinci-003    # Will use OpenAICompletion LLM
      model: text-davinci-003       # The arguments passed to the api call
      temperature: 0.7
      max_tokens: 250
```

In this example, we'll use the `conversation` agent type. We've given the agent a name and a description, and we'll store the chat history in memory. We've also provided a prompt template with placeholders marked as ${placeholder}. These will be instantiated by the `_fill_prompt_template` method of the agent.

##### 3. Writing an Output Parser

The next step is to write a simple parser for your agent's response. Because you may have specified the output format in your prompt template, you need to provide a corresponding parser. In this example, we inform the model to output in the following format in our prompt template

```
Action: Speak
Action Input: (the content)
```

We'll write a parser to extract the content from the agent's response. Refer to the code for more details. We've decorated our parser function with `@output_parser_registry.register('classroom_parser')` to register it with our framework. Finally, we import our parser in `agentverse/tasks/__init__.py`.

With these steps, we've successfully built a simple classroom environment and customized it for our needs.

### Customization Guide for More Complex Environments

While we provide a basic framework for building environments with our five rule components, more complex environments may require further customization. A detailed documentation and tutorial is coming soon. Here we briefly introduce some steps you can take to customize your environment:

1. **Customize the five rule components**. Each rule component has an interface, allowing you to customize its behavior to suit your specific needs. It's important to note that these components are not necessarily independent and can interact through the `rule_params` dictionary in the environment. You can create your own rule components and integrate them with the existing ones to build more complex interactions between agents.
2. **Customize the environment itself**. Our `basic` environment provides a default execution order for the five rule components that is suitable for most cases, but you can inherit the `BaseEnvironment` class and write your own `run` method to implement a more sophisticated execution order.
3. **Customize the agent**. Depending on your specific use case, you may also need to inherit the `BaseAgent` class. For example, you may want to use your local LLM as your agents or create agents with specialized knowledge or skills.



## 🔎 Examples

Currently, we offer some simple examples in the `agentverse/tasks` directory, each demonstrating different possibilities of our framework. While the performance of these examples may not be optimal due to limited prompt engineering, they are intended to showcase the capabilities of our framework, such as allowing the use of tools.

Here's a brief overview of each example:

1. `nlp_classroom_3players`: This example illustrates a simple case in which agents will speak in sequential order. 
2. `nlp_classroom_9players`: This is an NLP class example. Here, students can raise their hand when they have a question, and the professor can call on the students to let them ask. Students are only allowed to speak after they are called on.
3. `nlp_classroom_9players_group`: This example showcases group discussions. The professor may initiate a group discussion when needed, and students can exclusively interact with fellow students within the same group during the discussion.
4. `nlp_classroom_3players_withtool`: Students in this classroom can use Bing search API when listening to the class.
5. `math_problem_2players_tools`: A simple example demonstrating how two agents can use the WolframAlpha API to play an arithmetic game.
6. `prisoner_dilema`: The Prisoner's Dilemma is a thought experiment involving two rational agents facing a choice between cooperating for mutual benefit or betraying their partner for individual gain.
7. `db_diag`: The Chief DBA monitors (agents) the database system for anomalies and alerts memory and CPU agents if any are detected. They (agents) analyze root causes and suggest optimization solutions. The Chief DBA (agent) provides a diagnosis summary to the user, who can give instructions or evaluate the proposed solutions' effectiveness.
8. `sde_team`: In the SDE team, code writer, code tester and code reviewer collaborate on the code generation problem. 
9. `pokemon`:  This example intimates Pokemon game.


## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=OpenBMB/AgentVerse&type=Date)](https://star-history.com/#OpenBMB/AgentVerse&Date)


## Citation
If you find this repo helpful, feel free to cite us.
```
@article{chen2023agentverse,
  title={Agentverse: Facilitating multi-agent collaboration and exploring emergent behaviors in agents},
  author={Chen, Weize and Su, Yusheng and Zuo, Jingwei and Yang, Cheng and Yuan, Chenfei and Qian, Chen and Chan, Chi-Min and Qin, Yujia and Lu, Yaxi and Xie, Ruobing and others},
  journal={arXiv preprint arXiv:2308.10848},
  year={2023}
}
```

## Contact

Weize Chen: chenweize1998@gmail.com

[Yusheng Su](https://yushengsu-thu.github.io/): yushengsu.thu@gmail.com

