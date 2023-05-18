import datetime

from datetime import datetime as dt
from pydantic import Field
from agentverse.memory.memory_element import BaseMemoryElement


class Plan(BaseMemoryElement):
    """
    A plan is a memory element.
    """

    pass


class DailyPlan(Plan):
    """
    A daily plan is a plan that is generated for each day.
    Which consists of broadstrokes of what the agent wants to do in that day.
    """

    date: datetime.date = Field(default=None)

    pass


class HourlyPlan(Plan):
    """
    A hourly plan is a plan that is generated for each hour.
    Which consists more detailed information
      of what the agent wants to do in that hour.
    """

    start_time: dt = Field(default=None)

    pass


class ImmediatePlan(Plan):
    """
    An immediate plan is a plan that is generated in finer grain.
    Which consists of the the most detailed information
      of what the agent wants to do in that several minutes.

      example:
      detailed plan:['write_plan("07:00", "07:10", "Wake up and get out of bed.")', 'write_plan("07:10", "07:30", "Complete the morning routine.")', 'write_plan("07:30", "08:00", "Practice playing the piano.")', 'write_plan("08:00", "08:20", "Help her mother prepare breakfast.")', 'write_plan("08:20", "08:40", "Have breakfast with her family.")', 'write_plan("08:40", "09:00", "Walk to school with her sister Lily.")', 'write_plan("09:00", "10:00", "Participate in the science class.")', 'write_plan("10:00", "11:00", "Participate in the math class.")', 'write_plan("11:00", "11:20", "Play soccer with friends during recess.")', 'write_plan("11:20", "12:00", "Participate in the English class.")', 'write_plan("12:00", "12:20", "Walk home from school with her sister Lily.")', 'write_plan("12:20", "13:00", "Have lunch with her family and practice drawing.")', 'write_plan("13:00", "14:30", "Complete homework and review lessons.")', 'write_plan("14:30", "15:00", "Read a book for pleasure.")', 'write_plan("15:00", "16:00", "Play soccer with friends after school.")', 'write_plan("16:00", "18:00", "Practice drawing and explore space exploration topics.")', 'write_plan("18:00", "19:00", "Help her mother prepare dinner and eat with the family.")', 'write_plan("19:00", "20:00", "Spend time with family and do various activities.")', 'write_plan("20:00", "21:00", "Read another Science fiction book before going to sleep.")']

    """

    start_time: dt = Field(default=None)
    end_time: dt = Field(default=None)

    pass
