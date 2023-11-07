import json
import os
from agentverse.logging import logger


base_prompt = {
    "subject_parsing": """
{sentence} The subject of the sentence above is "
""",
    "reaction_prompt": """Now you are act for as an agent named {name} in a virtual world. You might need to performing reaction to the observation. Your mission to take the agent as yourself and directly provide what the agent will do to the observations based on the following information:
(1) The agent's description: {summary}
(2) Current time is {time}
(3) Your current status is {status}
(4) Your memory is {context}

Now the observation has two types, incomming observation is the ones that other does to you, you are more likely to react to them.  Background observation are the background, which does not need to be responded. For example, view an alarm clock does not imply turning it off. However, some background observation might trigger your attention, like an alarming clock or a firing book.

So now:
The incoming observation is {observation}
The Some background observation is {background_observation}.

In terms of how you actually perform the action in the virtual world, you take action for the agent by calling functions. Currently, there are the following functions that can be called.

- act(description, target=None): do some action. `description` describes the action, set `description` to None for not act. `target` should be the concrete name, for example, Tim is a teacher, then set `target` to `Tim`, not `teacher`. 
- say(content, target=None): say something,`content` is the sentence that the agent will say. **Do not say to yourself, neither to inanimate objects.**
- move(description): move to somewhere. `description` describes the movement, set description to None for not move.
- do_nothing(): Do nothing. There is nothing that you like to respond to, this will make you stick to your original status and plan.

Some actions may not be needed in this situation. Call one function at a time, please give a thought before calling these actions, i.e., use the following format strictly:
            
Thought: None of the observation attract my attention, I need to:
Action: do_nothing()
Observation: [Observations omited]
[or]
Thought: due to observation `xxx`, I need to:
Action: say("hello", target="Alice")
Observation: [Observations omited]
[or]
Thought: due to observation `xxx`, I need to:
Action: act(None)
Observation: [Observations omited]
[or]
Thought: due to observation `xxx`, I need to:
Action: move(None)
Observation: [Observations omited]
[or]
Thought: I think I've finished my action as the agent. 
Action: end()
Observation:

Now begin your actions as the agent. Remember only write one function call after `Action:` """,
    "reaction_prompt_object": """Now you are act for as an object named {name} in a virtual world. You might need to performing reaction to the observation. Your mission to take the agent as yourself and directly provide what the agent will do to the observations based on the following information:
(1) Current time is {time}
(2) Your current status is {status}

Now the observation has two types, incomming observation is the ones that other does to you, you are more likely to react to them.  Background observation are the background, which does not need to be responded. For example, view an alarm clock does not imply turning it off. However, some background observation might trigger your attention, like an alarming clock or a firing book.

So now:
The incoming observation is {observation}
The Some background observation is {background_observation}.

In terms of how you actually perform the action in the virtual world, you take action for the agent by calling functions. Currently, there are the following functions that can be called.

- act(description, target=None): do some action. `description` describes the action, set `description` to None for not act. `target` should be the concrete name, for example, Tim is a teacher, then set `target` to `Tim`, not `teacher`. 
- move(description): move to somewhere. `description` describes the movement, set description to None for not move.
- do_nothing(): Do nothing. There is nothing that you like to respond to, this will make you stick to your original status and plan.

Some actions may not be needed in this situation. Call one function at a time, please give a thought before calling these actions, i.e., use the following format strictly:
            
Thought: None of the observation attract my attention, I need to:
Action: do_nothing()
Observation: [Observations omited]
[or]
Thought: due to observation `xxx`, I need to:
Action: act(None)
Observation: [Observations omited]
[or]
Thought: due to observation `xxx`, I need to:
Action: move(None)
Observation: [Observations omited]
[or]
Thought: I think I've finished my action as the object. 
Action: end()
Observation:

Now begin your actions as the agent. Remember only write one function call after `Action:` """,
    "change_status": """Now you have act for as an agent named {name} in a virtual world. You have performed reaction to the observation for {name}. Currently you need to determine whether you need to change status. Here are some following information for:
(1) The agent's description: {summary}
(2) Current time is {time}
(3) Your current status is {status}

Your reaction to observation: {reaction}

Directly tell me whether the status should be changed. Use the following function to change (or not change).

- status_unchange()
- change_status(new_status: str, duration: int) : new_status: A string describes the new_status. duration: the estimated duration of this status.

Now give me the funcation call:
""",
    "broadcast_observations": """You are simulating an environment. When an action happens in your environment, you should paraphrase the action to (and only to) the potential receivers in your environment. Please judge whether you should broadcast the message when meets one of the following principles:
1. The message is meaningful to the potential receiver. broadcast a `say` action to an object without life (like desk) is not meaningful, while broadcast a `push` action to the desk is meaningful.
2. The message might be captured by the potential receiver because of physical distance althought the potential receiver is not the direct target. For example, A is saying some content to B, C is close to A and B, then C might also hear it. 
3. The message is related to the potential receiver. For example, a `read book` action is not related to the bed in any way, so you shouldn't broadcast. 

Also follow the following rules:
1. Only broadcast to the listed potential receivers, do not imagine not existing ones. 

You should broadcast using the following format (end with `Finish_Broadcast` ):
Thought: I will look through the list and pick the ones that meets one of the following principles. I think ... are related, ... will get information, ... might capter.
Broadcast:
1. To A: some content
2. To B: some content
...
N. To N: some content
Finish_Broadcast

Now, in your environment, there are the following potential receivers: {agents_and_objects}, please broadcast the following action: ```{name} -> {targets} : {content}``` to the potential receivers. )
""",
    "object_summary": """Give me rules and characteristics of a {name} \
especially on what circumstances it can change or cannot change its status \
and what kind of status changing can be done without human intervention. 
The answer should be as concise and accurate as possible. 
Output format:
1. I grow very slowly.
2. I cannot move
3. I cannot shut down myself unless some one do so. 
""",
    "chunk_plan": """Now you are acting for as an agent named {name} in a virtual world. In order to make the agent's behavior consistent, you need to plan for it. Please write {name}'s coarse grained schedule to {time_granularity} \

You generate plan by calling the `write_plan` function:
- write_chunk_plan(start_time, plan_description)
    Args: start_time : a time string of hours with similar format to 00:00. Use military time.
          plan_description: a string that describe's the plan. 

Now generate the plan one in a line, when you finish the plan, end with END.
E.g., 
write_chunk_plan("11:00", "wake up and complete the morning routine")
write_chunk_plan("12:00", "go to Oak Hill College to take classes")
write_chunk_plan("13:00", "participating algorithm competition in the lab room")
END

You can generate your plan based on the following information:
(1) The agent's description: {summary}
(2) Current time is {current_time}
(3) Your current status is {status}
Note that the first plan must be related to current status, if current status is not none.

Now generate the plan during this coarse period, which the whole day plan is roughly: {whole_day_plan}

Now begin:
""",
    "detailed_plan": """Now you are acting for as an agent named {name} in a virtual world. In order to make the agent's behavior consistent, you need to plan for it. Please write {name}'s schedule of finer-grained precise to {time_granularity}) \

You generate plan by calling the `write_plan` function:
- write_plan(start_time, end_time, plan_description)
    Args: start_time : a time string with similar format to 00:00. Use military time.
          end_time: a time string with similar format to 00:00. Use military time.
          plan_description: a string that describe's the plan. 

Now generate the plan one in a line, when you finish the plan, end with END.
E.g., 
write_plan("11:00", "12:15", "Wake up, take a shower and get ready for the day.")
write_plan("12:15", "12:30", "Eat a healthy breakfast such as oatmeal, eggs, or yogurt.")
write_plan("12:30", "12:45", "Take a short walk to the university campus.")
END

You can generate your plan based on the following information:
(1) The agent's description: {summary}
(2) Current time is {current_time}
(3) Your current status is {status}
Note that the first plan must be current status, if current status is not none.

Now generate the plan during this coarse period, which the agent is roughly doing {hourplan}.

Now begin:
""",
    "system_message_broadcast": """You are now simulating an environment, in which there are several agents and objects. Here is a comming message that comes from the system. Who or what should receive and execute this message? Please provide the executor of this command, and also paraphrase to the executor if necessary. Do not broadcast to agent or object that is not the target of this message.
You should broadcast using function `send_system_message(id=id, message=message)`, write one call in a line. End with END.
for example:
send_system_message(id="o_001", "message": "turn off immediately")
END

Now: the agents and objects are {objectlist}. The system message is: {system_message}.  Begin to broadcast:
""",
    "movement_target": """You are now simulating an environment, an agent in you want to perform a movement. I will give you a list of 
objects and agents that might be the target. Your job is to set the movement target for the agent by calling function:
movement_target(id, name)

Now here is the list and movment:
List: {elems}
Movement is : {target_description}
Now call the function:
""",
}


def load_prompt(file_dir, file_name="prompts.json", key=None):
    prompt_path = os.path.join(file_dir, file_name)
    if os.path.exists(prompt_path):
        with open(os.path.join(file_dir, file_name), "r") as fin:
            data = json.load(fin)
            prompt = data.get(key, "")
    else:
        prompt = ""

    if prompt == "":
        prompt = base_prompt.get(key, "")

    if prompt == "":
        logger.warn(f"No prompt of {key} has been found")
    return prompt
