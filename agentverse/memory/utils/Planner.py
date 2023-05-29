import datetime
import re
from datetime import datetime as dt
from pydantic import Field, BaseModel
from agentverse.memory.memory_element.BaseMemoryElement import BaseMemoryElement
from agentverse.llms.base import BaseLLM
from agentverse.llms.openai import get_embedding
from typing import Optional, TYPE_CHECKING
from agentverse.agents.base import BaseAgent
from agentverse.environments.base import BaseEnvironment
from logging import getLogger
import json

logger = getLogger(__file__)


planner_prompt_template = {

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
"""
}


class Planner(BaseModel):
    """
    A plan is a memory element.
    """

    # ["alice wakes up at 7", "..."]
    daily_plans: list[str] = Field(default_factory=list)
    # {"7:00":"alice wake up", "8:00":"alice2 wake up"}
    hourly_plans: dict = Field(default_factory=dict)
    # [{"start":"7:00", "end": "8:00", tasl: "alice wake up"}]
    immediate_plans: list[dict] = Field(default_factory=list)
    status: str = ""
    summary: str = ""

    current_time: dt
    agent: BaseAgent
    environment: BaseEnvironment

    # return a plain text showing the whole day plan
    def get_whole_day_plan_text(self,):

        whole_day_plan = f"This is {self.agent.name}'s plan for {self.current_time.date()}: " + ','.join(self.daily_plans)

        return whole_day_plan

    def get_plan(self, current_time: dt):
        """
        Get the plan for current time. If there is no plan, generate some.
        param: current_time: the current time that the agent needs a plan to perform action
        """

        self.current_time = current_time  # update current_time field in planner

        next_plan = {}

        for plan_entry in self.immediate_plans:

            logger.debug("plan_entry: " + str(plan_entry) + str(type(plan_entry)))
            start_time, end_time = dt.strptime(plan_entry['start_time'], '%Y-%m-%d %H:%M:%S'), dt.strptime(
                plan_entry['end_time'], '%Y-%m-%d %H:%M:%S')

            if end_time > self.current_time >= start_time:
                next_plan = {'status': plan_entry['task'], 'duration': (end_time - self.current_time).total_seconds()}
                break

        # No found means that we do not have plan currently, then generate some
        if len(next_plan) == 0:
            self._generate_more_plans()
            next_plan = {'status': self.immediate_plans[0]['task'],
                         'duration': (dt.strptime(self.immediate_plans[0]['end_time'], '%Y-%m-%d %H:%M:%S') - self.current_time).total_seconds()}
        return next_plan

    def _generate_more_plans(self,):

        """
        generate more detailed plan on the basis of a broad stroke plan(or just a relatively not detailed plan)
        If reaction is not None, the first plan must be reaction
        remove all conflicting plans with the plans generated. Including all plans after the new plans.

        :param current_time: the starting time of the new plans.
        :param time_granularity: the time granularity that the generated plan should be (e.g. 15 minutes) in NL


        """
        hourly_plans = []

        found = False
        while not found:
            for k, v in self.hourly_plans.items():  # TODO: use more flexible way to find the most close plan ahead.
                if k - self.current_time < datetime.timedelta(hours=2) and k >= self.current_time:
                    found = True
                    hourly_plans.append((k, v))
            if not found:
                self.plan_in_chunk()



        detailed_plan_template = planner_prompt_template["detailed_plan"]
        time_granularity = str(10 * self.environment.time_delta // 60) + "mins"
        get_immediately_prompt = detailed_plan_template.format(name=self.agent.name,
                                                               time_granularity=time_granularity,
                                                               hourplan=hourly_plans,
                                                               summary=self.summary,
                                                               status=self.status,
                                                               current_time=self.current_time)

        result = self.agent.llm.generate_response(get_immediately_prompt)

        result = [x.strip() for x in result.content.split("\n")]
        immediately_plans = []

        for plan in result:
            try:
                # would call self.write_plan and return desired dict
                new_plan = eval("self." + plan)
            except:
                logger.warning("{}'s generated immediate plan contains error format: {}".format(self.agent.name, plan))
                continue
            immediately_plans.append(new_plan)

        logger.info(self.agent.name + "Plan: " + json.dumps(immediately_plans))
        # self.plan=[entry for entry in self.plan if dt.strptime(entry['end_time'],'%Y-%m-%d %H:%M:%S')<=minimum_time]
        self.immediate_plans.extend(immediately_plans)


    def plan_in_chunk(self, ):
        """
        update hourly plans from time(including this hour)
        """
        prompt_template=planner_prompt_template['chunk_plan']
        time_granularity = str(min(1, 60 * self.environment.time_delta // 3600)) + "hour(s)"
        prompt = prompt_template.format(name=self.agent.name,
                                        time_granularity=time_granularity,
                                        whole_day_plan=self.get_whole_day_plan_text(),
                                        summary=self.summary,
                                        status=self.status,
                                        current_time=self.current_time)

        result = self.agent.llm.generate_response(prompt)
        result = [x.strip() for x in result.content.split("\n")]

        for plan in result:
            try:
                # will call chunk_plan and update self.hourly plan
                eval("self."+plan)
            except:
                logger.warning("{}'s generated rough plan contains error format: {}".format(self.agent.name, plan))
                continue


    def write_chunk_plan(self, start_hour, task):
        time_obj = datetime.datetime.strptime(start_hour, '%H:%M').time()
        combined_datetime = datetime.datetime.combine(self.current_time.date(), time_obj)
        self.hourly_plans[combined_datetime] = task

    def write_plan(self, start_time, end_time, plan_description):
        start_time = str(dt.combine(self.current_time.date(), dt.strptime(start_time, '%H:%M').time()))
        end_time = str(dt.combine(self.current_time.date(), dt.strptime(end_time, '%H:%M').time()))
        return {'start_time': start_time, 'end_time': end_time, 'task': plan_description}


