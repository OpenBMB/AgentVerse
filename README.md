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

🤖 **AgentVerse** 🪐 provides a flexible framework that simplifies the process of building custom multi-agent environments for large language models (LLMs). Our framework is designed to enable researchers to quickly build and customize their own environments with minimal effort, allowing them to focus on their research rather than implementation details.

---

### ✨ Features

- 🥳 **Efficient Environment Building:** Our framework offers a set of fundamental building blocks for creating a multi-agent environment with ease. With just a few lines in a configuration file, you can effortlessly construct simple environments such as a chat room for LLMs. This process involves specifying the environment's settings and prompts for LLMs, empowering researchers like you to focus on experimentation and analysis rather than wrestling with environment setup.

- ⚙️ **Customizable Components**: AgentVerse abstracts the multi-agent environment into five functional modules and defined their respective interfaces. For complex environments that cannot be built directly using the basic modules provided in AgentVerse, you can customize one or more of the interfaces in the five functional modules to quickly build your own multi-agent environment according to your needs. 

- 🛠 **Tools (Plugins) Utilization**: AgentVerse supports the multi-agent environments with tools. Currently, AgentVerse supports tools provided in [BMTools](https://github.com/OpenBMB/BMTools). 

- 🤖 **Supports a Wide Range of LLMs**: You can easily customize your own LLM by implementing a new LLM by inheriting and extending our BaseLLM class (tutorial coming soon).

### 🗓 Coming Soon

- [ ] Demonstrate how to use AgentVerse to support the behavior of agents in a [sandbox environment GPT-World](https://github.com/ShengdingHu/GPT-World)
- [ ] Add documentation
- [ ] Support more sophisticated memory for conversation history
- [ ] Add support for local LLM
- [ ] Auto-generate UI based on the given multi-agent environment
- [ ] ...

### 👾 A Simple Demo Video

We have created a video showcasing simple interactions between LLMs, with a LLM acting as the professor and others as students in a lecture on Transformer architecture. 

<!--
### [![Demo video](https://i.imgur.com/vKb2F1B.png)](https://youtu.be/9JCVfzMFhaM)
-->

![image](imgs/multiagent-min.gif)



### Contents

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
# Install the dependencies
git clone https://github.com/OpenBMB/AgentVerse.git --depth 1
pip install -r requirements.txt

cd ../
git clone 
git+https://github.com/OpenBMB/BMTools.git
cd BMTools
pip install -r requirements.txt
python setup.py develop

# Export your OpenAI API key
export OPENAI_API_KEY="your_api_key_here"
```

Some users have reported problems installing the `orjson` required by `gradio`. One simple workaround is to install it with Anaconda `conda install -c conda-forge orjson`.

<!--
# Install BMTools
cd ../
git clone git@github.com:OpenBMB/BMTools.git
cd BMTools
python setup.py develop
-->

### CLI Example

We have provided several basic examples that demonstrate the potential of our framework for constructing multi-agent environments. One such example is a classroom scenario where one agent assumes the role of the professor while the other eight agents act as students.

```shell
python3 main.py --task nlp_classroom_9players
```

### Local Website Demo

We also have a local website demo for this environment. You can launch it with

```shell
python3 main_demo.py --task nlp_classroom_9players
```
After successfully launching the local server, you can visit [http://127.0.0.1:7860/](http://127.0.0.1:7860/) to view the classroom environment.



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
      model: text-davinci-003       # The argument passed to the api call
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
3. **Customize the agent**. Depending on your specific use case, you may also need to customize the `Agent` class. For example, you may want to use your local LLM as your agents or create agents with specialized knowledge or skills.



## 🔎 Examples

Currently, we offer five simple examples in the `agentverse/tasks` directory, each demonstrating different possibilities of our framework. While the performance of these examples may not be optimal due to limited prompt engineering, they are intended to showcase the capabilities of our framework, such as allowing the use of tools.

Here's a brief overview of each example:

1. `nlp_classroom_3players`: An example demonstrating the simplicity of building a classroom with sequential speaking order.
2. `nlp_classroom_9players`: This classroom introduces several. Here, students can raise their hand when they have a question, and the professor can call on the students to let them ask. Students are only allowed to speak after they are called on.
3. `nlp_classroom_9players_group`: This example introduces group discussions. The professor can launch a group discussion when necessary, and students can only interact with other students in the same group during the group discussion.
4. `nlp_classroom_3players_withtool`: Students in this classroom can use Bing search API when listening to the class.
5. `math_problem_2players_tools`: A simple example demonstrating how two agents can use the WolframAlpha API to play an arithmetic game.
6. `prisoner_dilema`: A simple example showing how LLMs handle the prisoner dilema.
