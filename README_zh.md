<h1 align="center"> 🤖 AgentVerse 🪐 </h1>

<h3 align="center">
    <p>一个用于搭建多智能体交互平台的框架</p>
</h3>
<p align="center">
    <a href="https://github.com/OpenBMB/AgentVerse/blob/main/LICENSE">
        <img alt="License: Apache2" src="https://img.shields.io/badge/License-Apache_2.0-green.svg">
    </a>
    <a href="https://www.python.org/downloads/release/python-3916/">
        <img alt="Documentation" src="https://img.shields.io/badge/python-3.9+-blue.svg">
    </a>
    <a href="https://huggingface.co/spaces/AgentVerse/agentVerse">
        <img alt="Hugging Face" src="https://img.shields.io/badge/hugging_face-play-yellow">
    </a>
</p>

<p align="center">
<img src="./imgs/title.png" width="512">
</p>

<p align="center">
    【<a href="README.md">English </a> | Chinese】
</p>

**AgentVerse** 提供了一个多功能的框架，简化了为大型语言模型（LLMs）创建自定义多智能体环境的过程。旨在快速、低成本的开发和定制，我们的框架赋能研究人员专注于他们的研究，而不被实现细节所困扰。

---

## ✨ 特点

- 🥳 **高效的环境构建:** 我们的框架提供了一系列基础构建模块，轻松创建多智能体环境。只需在配置文件中写入几行，你就可以轻松建立如LLMs的聊天室这样的基础环境。这个过程包括为LLMs定义环境的设置和提示，使像你这样的研究者能够专注于实验和分析。

- ⚙️ **可定制组件**: AgentVerse通过将多智能体环境分为五个功能模块并定义其各自的接口来简化它。对于不能直接使用AgentVerse提供的基本模块构建的复杂环境，你可以定制这五个功能模块中的一个或多个接口，根据你的要求高效地创建自己的多智能体环境。

- 🛠 **工具(插件)利用**: AgentVerse支持多智能体环境的工具。目前，AgentVerse支持[BMTools](https://github.com/OpenBMB/BMTools)中提供的工具。 

## 📰 最新消息
- [2023/10/17] 我们很高兴来分享我们AI开源社区 hugging face: [`AgentVerse`](https://huggingface.co/spaces/AgentVerse/agentVerse). 在你提供openai API 密钥 and the openai 组织码之后，你可以体验NLP教室和囚徒困境两个模拟应用程序。祝你玩得开心！

- [2023/8/22] 📝 我们很高兴分享与此仓库相关的正在进行中的论文[AgentVerse: Facilitating Multi-Agent Collaboration and Exploring Emergent Behaviors in Agents](https://arxiv.org/abs/2308.10848).
<img width="616" alt="Screen Shot 2023-09-01 at 12 08 57 PM" src="https://github.com/OpenBMB/AgentVerse/assets/11704492/6db1c907-b7fc-42f9-946c-89853a28f386">

You could refer the stay-tuned code in this [branch](https://github.com/OpenBMB/AgentVerse/tree/AgentVerse-TaskSolving).

- [2023/6/5] 🎉 我们很荣幸地展示了一系列 [demos](#-simple-demo-video), 包括 [NLP教室](#nlp教室), [囚徒困境](#囚徒困境), [软件开发](#软件开发), [数据库运维](#数据库运维), 以及一个简单的 [H5宝可梦游戏](#宝可梦游戏) 该游戏允许与宝可梦中的角色互动！你可以试玩这些demo，祝你玩得开心！
- [2023/5/1] 🚀 [AgentVerse](https://github.com/OpenBMB/AgentVerse) 正式发布！

## 🌟 加入我们!
AgentVerse致力于为大型语言模型革命化多智能体环境，我们急切地寻找充满激情的合作伙伴与我们一起这一令人兴奋的旅程。

### 您能如何贡献?
- **代码开发**: 如果您是工程师，我们希望您能够帮助我们细化、优化和扩展当前的框架。我们一直在寻找有才华的开发者来增强我们现有的特性和开发新模块。

- **文档和教程**: 如果您擅长写作，我们希望您能帮助我们改进文档，创建教程或写博客文章，使AgentVerse更容易被广大社区接受。

- **应用探索**: 如果您对多智能体应用感兴趣，并渴望使用AgentVerse进行实验，我们会很高兴支持您的旅程并看到您创造的内容！

- **反馈和建议**: 使用AgentVerse并为我们提供反馈。您的见解可以导致潜在的改进并确保我们的框架保持最佳状态。

此外，如果您热衷于推进多智能体环境的前沿，并渴望更深入地进行研究，我们邀请您加入我们在THUNLP的团队。为了探索这一令人兴奋的机会，并与我们开始合作之旅，请联系[chenweize1998@gmail.com](chenweize1998@gmail.com) 和 [yushengsu.thu@gmail.com](yushengsu.thu@gmail.com) 表达您的兴趣。我们很乐意欢迎像您这样的有动力的个人加入我们的实验室！

## 🗓 即将到来
- [ ] 我们的[paper](https://arxiv.org/abs/2308.10848)的代码发布
- [ ] 增加文档
- [ ] 支持更复杂的对话历史内存
- [ ] 支持本地LLM


## 👾 Demo视频

我们演示了由AgentVerse精心制作的以下案例。
<!--
### [![Demo video](https://i.imgur.com/vKb2F1B.png)](https://youtu.be/9JCVfzMFhaM)
-->
<!--![image](imgs/multiagent-min.gif)-->

<!-- - **NLP Classroom**: -->

#### NLP教室
在NLP课堂中，教授和学生进行互动交流。当学生有问题时，他们会举手并耐心等待教授指名。只有在教授点名后，学生才能发言并提问。

使用以下命令启动NLP教室示例：
```bash
python main_demo.py --task nlp_classroom_9players
```

https://github.com/OpenBMB/AgentVerse/assets/11704492/6ea07850-595e-4a28-a82e-f863011353c2


#### 囚徒困境
囚徒的困境是一个思考实验，它挑战两个完全理性的智能体面临的困境：他们可以与伙伴合作以获得互利，或背叛伙伴（"违背"）以获得个人奖励。

使用以下命令启动NLP教室示例：
```bash
python main_demo.py --task prisoner_dilemma
```

https://github.com/OpenBMB/AgentVerse/assets/11704492/017c46e5-c738-4fca-9352-b008e2d518bd


#### 软件开发
在软件设计示例中，代码编写者、代码测试者和代码审查者在代码生成问题上进行合作。给定一个问题，代码编写者首先撰写代码实现。代码测试者运行单元测试并提供反馈。然后，代码审查者生成评审。在收集了测试反馈和审查后，代码编写者迭代地优化代码。

使用以下命令启动软件设计示例：
```bash
python main_demo.py --task sde_team/sde_team_2players
```

https://github.com/OpenBMB/AgentVerse/assets/11704492/5058066a-abee-490d-8659-b4e54661626a


#### [数据库运维](https://github.com/zhouxh19/AgentVerse_for_Database_Diagnosis)
在数据库诊断场景中，首席DBA监控数据库系统以查找异常。如果检测到，会提醒内存和CPU智能体进行根源分析并建议优化解决方案。然后，首席DBA向用户提供总结的诊断，用户也可以通过给予指导或评估所提议解决方案的有效性来作出贡献。

首先，您应该在BMTools中配置[数据库工具](https://github.com/OpenBMB/BMTools/blob/main/bmtools/tools/db_diag/readme.md), 并根据[指南](https://github.com/OpenBMB/BMTools/tree/main#211-local-tools)启动BMTools服务器。然后使用以下命令启动数据库管理员示例：
```bash
python main_demo.py --task db_diag
```

https://github.com/OpenBMB/AgentVerse/assets/11704492/c633419d-afbb-47d4-bb12-6bb512e7af3a

#### [文本评估 (ChatEval)](https://github.com/chanchimin/ChatEval)
在文本评估场景的背景下，我们建议用户探索[ChatEval](https://github.com/chanchimin/ChatEval)仓库。他们在AgentVerse上实现了一个多智能体裁判团来评估不同模型生成的文本质量。给定两个不同的文本，ChatEval中的角色可以自主地辩论其细微差别，并根据分配给他们的人物特点提供其判断。实验表明，他们的裁判团，根据[config.yaml](#2-configuring-the-agents)中规定的多样角色，与人类的评估更为接近。这个演示是基于[Fastchat](https://github.com/lm-sys/FastChat)仓库构建的，我们想对他们的基础工作表示感谢。


https://github.com/OpenBMB/AgentVerse/assets/75533759/58f33468-f15b-4bac-ae01-8d0780019f85

#### 宝可梦游戏
在这个简易游戏中，NPC之间可以自主互动。作为玩家，你扮演一个角色，可以随时与其他NPC互动。在这一游戏中有6个宝可梦绿宝石版中出现的角色: [May](https://bulbapedia.bulbagarden.net/wiki/May_(game)), [Professor Birch](https://bulbapedia.bulbagarden.net/wiki/Professor_Birch), [Steven Stone](https://bulbapedia.bulbagarden.net/wiki/Steven_Stone), [Maxie](https://bulbapedia.bulbagarden.net/wiki/Maxie), [Archie](https://bulbapedia.bulbagarden.net/wiki/Archie) 和[Joseph](https://bulbapedia.bulbagarden.net/wiki/Mr._Stone). 

要启动宝可梦游戏，首先使用以下命令启动本地服务器：
```bash
uvicorn pokemon_server:app --reload --port 10002
```
然后在项目的根路径中打开另一个终端并运行以下命令：
```bash
cd ui
# If you do not have npm installed, you need to install it before running the following commands 
# https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
# We have tested on npm@9.6.4, node@20.0.0
npm install
npm run watch
```
等待编译完成。祝你玩得开心！(使用WASD移动，SPACE键启动对话。)

https://github.com/OpenBMB/AgentVerse/assets/11704492/4d07da68-f942-4205-b558-f155e95782e7



## Contents

- [✨ 特点](#-特点)
- [📰 最新消息](#-最新消息)
- [🌟 加入我们!](#-加入我们)
  - [您能如何贡献?](#您能如何贡献)
- [🗓 即将到来](#-即将到来)
- [👾 Demo视频](#-demo视频)
    - [NLP教室](#nlp教室)
    - [囚徒困境](#囚徒困境)
    - [软件开发](#软件开发)
    - [数据库运维](#数据库运维)
    - [文本评估 (ChatEval)](#文本评估-chateval)
    - [宝可梦游戏](#宝可梦游戏)
- [Contents](#contents)
- [🚀 开始使用](#-开始使用)
  - [安装](#安装)
  - [命令行示例](#命令行示例)
  - [本地网站演示](#本地网站演示)
- [💡 理念](#-理念)
  - [Environment](#environment)
  - [智能体](#智能体)
- [✍️ 定制您自己的环境](#️-定制您自己的环境)
  - [一个简单的例子：构建一个教室环境](#一个简单的例子构建一个教室环境)
      - [1. 创建任务目录并配置环境](#1-创建任务目录并配置环境)
      - [2. 配置智能体](#2-配置智能体)
      - [3. 编写一个输出解析器](#3-编写一个输出解析器)
  - [更复杂环境的定制指南](#更复杂环境的定制指南)
- [🔎 示例](#-示例)
- [Star History](#star-history)
- [Citation](#citation)
- [Contact](#contact)



## 🚀 开始使用

### 安装

```bash
pip install -U agentverse
```
或者您可以通过手动克隆最新的仓库来安装此包：
```bash
git clone https://github.com/OpenBMB/AgentVerse.git --depth 1
cd AgentVerse
pip install -r requirements.txt
```
一些用户报告在安装`gradio`所需的`orjson`时遇到问题。一个简单的解决方法是使用Anaconda来安装它：`conda install -c conda-forge orjson`。

您还需要按如下方式导出您的OpenAI API密钥：
```bash
# 导出你的OpenAI API密钥
export OPENAI_API_KEY="your_api_key_here"
```
或者您想使用 Azure OpenAI 服务，请按照以下方式配置 OpenAI API 密钥和 API base：
```bash
export AZURE_OPENAI_API_KEY="your_api_key_here"
export AZURE_OPENAI_API_BASE="your_api_base_here"
```

如果您想使用BMTools提供的工具，您需要按如下方式安装BMTools：
```bash
git clone git+https://github.com/OpenBMB/BMTools.git
cd BMTools
pip install -r requirements.txt
python setup.py develop
```

### 命令行示例

您可以创建由我们提供的多智能体环境。以教室场景为例。在这个场景中，有九个智能体，一个扮演教授的角色，其他八个是学生。

```shell
python3 main.py --task nlp_classroom_9players
```

### 本地网站演示

我们还为这个环境提供了一个本地网站的演示。您可以用以下命令启动它：

```shell
python3 main_demo.py --task nlp_classroom_9players
```
成功启动本地服务器后，您可以访问[http://127.0.0.1:7860/](http://127.0.0.1:7860/) 查看教室环境。

## 💡 理念

### Environment

我们框架的核心是环境，它在使研究人员能够在不同条件下研究智能体行为方面起着至关重要的作用。我们认为环境应该是灵活的和可扩展的，允许研究人员轻松地定制它以适应他们的需求。为了实现这一点，我们将环境抽象为五个规则组件，实现不同的环境实际上是实现不同的规则：

- **Describer（描述器）**：此组件为每个智能体在每一轮提供环境的描述。您可以自定义描述器来定义他们的环境的具体要求，例如一个智能体可以与哪些智能体互动。
- **Order（顺序）**：此组件定义智能体在环境中采取行动的顺序。您可以自定义顺序以反映智能体之间所需的交互。我们提供了几个基本的顺序选项，包括`random`（随机），`sequential`（连续）和`concurrent`（所有智能体在每轮都采取行动）。
- **Selector（选择器）**：此组件选择由智能体生成的有效消息。有时智能体可能生成无效的响应，选择器用于过滤出意外的结果。
- **Updater（更新器）**：此组件更新每个智能体的记忆。在某些情况下，一个智能体生成的响应不应被所有智能体看到（例如，如果智能体在不同的房间里）。对于每个响应，更新器只更新可以看到它的智能体。
- **Visibility（可见性）**：此组件维护每个智能体在环境变化中可以看到的智能体列表。例如，当一个智能体从一个房间移动到另一个房间时，每个智能体的可见智能体列表应由`visibility`更新。

通过将环境抽象为这五个组件，我们创建了一个高度灵活且可扩展的框架，使研究人员可以轻松地构建和定制自己的多智能体环境。

### 智能体

另一个基本组件是智能体。目前我们提供了两种类型的智能体：**ConversationAgent（对话智能体）** 和 **ToolAgent（工具智能体）**。您还可以通过继承BaseAgent类来自定义自己的智能体。

## ✍️ 定制您自己的环境

我们在`agentverse/tasks`目录中提供了几个示例。要定制您的环境，您应该

1. 在`agentverse/tasks`中创建一个任务目录
2. 编写配置文件
3. 编写解析您智能体响应的输出解析器。
4. 在`agentverse/tasks/__init__.py`中添加您的解析器

我们将使用`agentverse/tasks/nlp_classroom_3players`中的一个简单示例来说明这个程序。

### 一个简单的例子：构建一个教室环境

为了说明如何定制您的环境，我们将使用一个简单的示例来构建一个教室环境，其中一个智能体是教授，一个是学生，一个是助教。

##### 1. 创建任务目录并配置环境

首先，我们需要创建一个任务目录并为环境编写我们的配置文件。在`agentverse/tasks`目录中，创建一个新目录，名为`nlp_classroom_3players`。在此目录中，创建一个`config.yaml`文件并写入以下配置：

```yaml
# config.yaml
environment:
  env_type: basic				# 使用AgentVerse中提供的基本环境
  max_turns: 10					# 指定对话的最大轮数
  rule:
    order:
      type: sequential	# 使用连续的顺序
    visibility:
      type: all					# 每条消息都可以被所有智能体看到
    selector:
      type: basic				# 基本选择器（不选择）
    updater:
      type: basic				# 基本更新器（将消息更新给所有智能体）
    describer:
      type: basic				# 基本描述器（无描述）
```

这个配置指定我们将使用AgentVerse中提供的基本环境，对话的最大轮数为10。我们将使用连续的顺序，所有消息对所有智能体都是可见的。我们不使用任何选择器，我们的更新器会将消息更新给所有的智能体，而我们的描述器不会提供任何描述。

##### 2. 配置智能体

接下来，我们将配置智能体。在`config.yaml`文件中，我们将为每个智能体添加配置。以下是教授的示例配置：

```yaml
# config.yaml
agents:
  -
    agent_type: conversation
    name: Professor Micheal		# 智能体的名称
    role_description: You are Prof. Micheal, ...	# 智能体的描述
    memory: 
      memory_type: chat_history		# 将存储所有的聊天记录
    prompt_template: *professor_prompt
    llm:
      llm_type: text-davinci-003    # 将使用OpenAICompletion LLM
      model: text-davinci-003       # 传递给api调用的参数
      temperature: 0.7
      max_tokens: 250
```

在此示例中，我们将使用`conversation`智能体类型。我们为智能体指定了一个名称和描述，并将聊天记录存储在内存中。我们还提供了一个带有占位符的提示模板，这些占位符标记为${placeholder}。这些将由智能体的`_fill_prompt_template`方法实例化。

##### 3. 编写一个输出解析器

下一步是为您的智能体的响应编写一个简单的解析器。因为您可能已经在您的提示模板中指定了输出格式，所以您需要提供一个相应的解析器。在此示例中，我们在我们的提示模板中通知模型以以下格式输出

```
Action: Speak
Action Input: (the content)
```

我们将编写一个解析器来从智能体的响应中提取内容。有关更多详细信息，请参考代码。我们使用`@output_parser_registry.register('classroom_parser')`修饰我们的解析器函数，以将其注册到我们的框架中。最后，我们在`agentverse/tasks/__init__.py`中导入我们的解析器。

通过这些步骤，我们已经成功地构建了一个简单的教室环境，并根据我们的需求进行了定制。

### 更复杂环境的定制指南

虽然我们提供了一个基本框架来构建环境，使用我们的五个规则组件，但更复杂的环境可能需要进一步的定制。详细的文档和教程即将推出。在此，我们简要介绍如何定制您的环境的一些步骤：

1. **定制五个规则组件**。每个规则组件都有一个接口，允许您根据特定的需求定制其行为。需要注意的是，这些组件并不一定是独立的，可以通过环境中的`rule_params`字典进行交互。您可以创建自己的规则组件，并与现有的组件集成，以构建智能体之间更复杂的交互。
2. **定制环境本身**。我们的`basic`环境为五个规则组件提供了一个默认的执行顺序，适合大多数情况，但您可以继承`BaseEnvironment`类并编写自己的`run`方法来实现更复杂的执行顺序。
3. **定制智能体**。根据您的特定用例，您可能还需要继承`BaseAgent`类。例如，您可能希望使用您的本地LLM作为智能体，或创建具有专门知识或技能的智能体。

## 🔎 示例

目前，我们在`agentverse/tasks`目录中提供了一些简单的示例，每个示例都展示了我们框架的不同可能性。尽管这些示例的性能可能由于有限的提示工程而不是最佳的，但它们旨在展示我们框架的能力，例如允许使用工具。

以下是每个示例的简要概述：

1. `nlp_classroom_3players`：此示例说明了智能体将按顺序交谈的简单情况。
2. `nlp_classroom_9players`：这是一个NLP课堂示例。在这里，学生们可以在有问题时举手，教授可以叫学生让他们提问。只有在被叫到之后，学生才被允许说话。
3. `nlp_classroom_9players_group`：此示例展示了小组讨论。必要时，教授可以发起小组讨论，学生们可以在讨论期间只与同一小组的同学交互。
4. `nlp_classroom_3players_withtool`：在这个课堂中，学生们在听课时可以使用Bing搜索API。
5. `math_problem_2players_tools`：一个简单的示例，展示了如何使用WolframAlpha API的两个智能体来玩算术游戏。
6. `prisoner_dilema`：囚犯困境是一个涉及两个理性智能体面临的思想实验，他们可以选择为相互利益而合作，或为个人利益而背叛伙伴。
7. `db_diag`：首席DBA（智能体）监控数据库系统中的异常，并在检测到任何异常时提醒内存和CPU智能体。他们（智能体）分析根本原因并建议优化解决方案。首席DBA（智能体）向用户提供诊断摘要，用户可以给出指示或评估所提议的解决方案的有效性。
8. `sde_team`：在SDE团队中，代码编写者、代码测试者和代码审查者在代码生成问题上进行合作。
9. `pokemon`：此示例模仿宝可梦游戏。


## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=OpenBMB/AgentVerse&type=Date)](https://star-history.com/#OpenBMB/AgentVerse&Date)


## Citation
如果您在您的工作中使用了我们的框架，请使用以下形式进行引用
```
@misc{chen2023agentverse,
      title={AgentVerse: Facilitating Multi-Agent Collaboration and Exploring Emergent Behaviors in Agents}, 
      author={Weize Chen and Yusheng Su and Jingwei Zuo and Cheng Yang and Chenfei Yuan and Chen Qian and Chi-Min Chan and Yujia Qin and Yaxi Lu and Ruobing Xie and Zhiyuan Liu and Maosong Sun and Jie Zhou},
      year={2023},
      eprint={2308.10848},
      archivePrefix={arXiv},
      primaryClass={cs.CL}
}
```

## Contact

陈纬泽: chenwz21@mails.tsinghua.edu.cn

[苏裕胜](https://yushengsu-thu.github.io/): yushengsu.thu@gmail.com

