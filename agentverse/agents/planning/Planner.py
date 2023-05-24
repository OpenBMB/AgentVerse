import datetime

from pydantic import BaseModel, Field
from typing import List, Dict
from datetime import datetime as dt


from agentverse.agents import BaseAgent
from agentverse.memory.memory_element.Plan import (
    Plan,
    HourlyPlan,
    DailyPlan,
    ImmediatePlan,
)


class Planner(BaseModel):
    agent: BaseAgent = Field(default=None)
    daily_plans: List[Dict[datetime.date, DailyPlan]] = Field(default_factory=list)
    hourly_plans: List[Dict[dt, HourlyPlan]] = Field(default_factory=list)
    immediate_plans: List[Dict[dt, ImmediatePlan]] = Field(default_factory=list)

    def get_plan(self, current_time: dt) -> Plan:
        raise NotImplementedError

    def plan_daily(self) -> None:
        raise NotImplementedError

    def plan_hourly(self) -> None:
        raise NotImplementedError

    def plan_immediately(self) -> None:
        raise NotImplementedError
