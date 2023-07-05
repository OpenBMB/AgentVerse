# Database Diagnosis

Inherited from *nlp_classroom_3players_withtool*

### Changes

- Roles

    - *Chief DBA*: In charge of anomaly detection and diagnosis scheduling
    - *XXX Agent*: In charge of a specific diagnosis region (e.g., Memory Agent handles problems of high memory usage)

- Actions

    - We remove *RaiseHand* and *CallOn* actions, and each agent can annouce their analysis by order

- Tools

    - We support the *[DB_diag](https://github.com/OpenBMB/BMTools/tree/main/bmtools/tools/db_diag)* tool in bmtools

- Memory

    - In the prompt of each agent, we place the memory for *conversation history* before *tool_observation*, which is extremely important to conduct actions with close relations (e.g., diagnosis and speak)
    - Use *chat_history* for memory_type

- LLM

    - In current version, gpt-4 shows superior performance over text-davinci-003
    - Increase max_tokens for complex analysis tasks (e.g., 512 or 1024)
