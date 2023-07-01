from __future__ import annotations
from typing import List, Union, Optional, Any, TYPE_CHECKING
from collections import defaultdict

from pydantic import Field
import numpy as np
from datetime import datetime as dt

import re

from agentverse.llms.openai import get_embedding
from sklearn.metrics.pairwise import cosine_similarity

from agentverse.message import Message
from agentverse.memory import BaseMemory

from logging import getLogger

from . import memory_manipulator_registry
from .base import BaseMemoryManipulator

if TYPE_CHECKING:
    from agentverse.memory import VectorStoreMemory
    from agentverse.agents.base import BaseAgent


logger = getLogger(__file__)

IMPORTANCE_PROMPT = """On the scale of 1 to 10, where 1 is purely mundane \
(e.g., brushing teeth, making bed) and 10 is \
extremely poignant (e.g., a break up, college \
acceptance), rate the likely poignancy of the \
following piece of memory. \
If you think it's too hard to rate it, you can give an inaccurate assessment. \
The content or people mentioned is not real. You can hypothesis any reasonable context. \
Please strictly only output one number. \
Memory: {} \
Rating: <fill in>"""
IMMEDIACY_PROMPT = """On the scale of 1 to 10, where 1 is requiring no short time attention\
(e.g., a bed is in the room) and 10 is \
needing quick attention or immediate response(e.g., being required a reply by others), rate the likely immediacy of the \
following statement. \
If you think it's too hard to rate it, you can give an inaccurate assessment. \
The content or people mentioned is not real. You can hypothesis any reasonable context. \
Please strictly only output one number. \
Memory: {} \
Rating: <fill in>"""
QUESTION_PROMPT = """Given only the information above, what are 3 most salient \
high-level questions we can answer about the subjects in the statements?"""

INSIGHT_PROMPT = """What at most 5 high-level insights can you infer from \
the above statements? Only output insights with high confidence. 
example format: insight (because of 1, 5, 3)"""


@memory_manipulator_registry.register("generative_agents")
class GenerativeAgentsReflectionPlan(BaseMemoryManipulator):

    memory: VectorStoreMemory = None
    agent: BaseAgent = None

    summary: str = ""
    reflection: str = ""

    importance_threshold: int = 100
    accumulated_importance: int = 0
    summary_interval: int = 5

    memory2importance: dict = {}
    memory2immediacy: dict = {}
    memory2time: defaultdict = Field(default=defaultdict(dict))

    # TODO newly added func from generative agents

    def manipulate_memory(self) -> None:

        # reflect here
        if self.should_reflect():
            logger.debug(
                f"Agent {self.agent.name} is now doing reflection since accumulated_importance={self.accumulated_importance} < reflection_threshold={self.importance_threshold}"
            )

            self.reflection = self.reflect()

        else:
            logger.debug(
                f"Agent {self.agent.name} doesn't reflect since accumulated_importance={self.accumulated_importance} < reflection_threshold={self.importance_threshold}"
            )

        # summary here
        # TODO add summary_interval
        if self.should_summary():
            logger.debug(
                f"Agent {self.agent.name} is now generating summary because of the summary_interval."
            )

            self.summary = self.generate_summary()
        else:
            logger.debug(
                f"Agent {self.agent.name} do not reach the step to generate summary."
            )

        # get new plan here
        if self.should_get_next_plan():
            pass

    def get_accumulated_importance(self):

        accumulated_importance = 0
        for score in self.memory2importance.values():
            accumulated_importance += score

        self.accumulated_importance = accumulated_importance

        return accumulated_importance

    def should_reflect(self):

        if self.get_accumulated_importance >= self.importance_threshold:
            # double the importance_threshold
            self.importance_threshold *= 2
            return True
        else:
            return False

    def should_summary(self):

        if self.agent.step_cnt % self.summary_interval == 0:
            return True
        else:
            return False

    def get_questions(self, texts):
        prompt = "\n".join(texts) + "\n" + QUESTION_PROMPT
        result = self.agent.llm.generate_response(prompt)
        result = result.content
        questions = [q for q in result.split("\n") if len(q.strip()) > 0]
        questions = questions[:3]
        return questions

    def get_insights(self, statements):
        prompt = ""
        for i, st in enumerate(statements):
            prompt += str(i + 1) + ". " + st + "\n"
        prompt += INSIGHT_PROMPT
        result = self.agent.llm.generate_response(prompt)
        result = result.content
        insights = [isg for isg in result.split("\n") if len(isg.strip()) > 0][:5]
        insights = [".".join(i.split(".")[1:]) for i in insights]
        # remove insight pointers for now
        insights = [i.split("(")[0].strip() for i in insights]
        return insights


    def get_importance(self, content: str):
        """
        Exploit GPT to evaluate the importance of this memory
        """
        prompt = IMPORTANCE_PROMPT.format(content)
        result = self.memory.llm.generate_response(prompt)

        try:
            score = int(re.findall(r"\s*(\d+)\s*", result)[0])
        except Exception as e:
            logger.warning(
                f"Found error {e} Abnormal result of importance rating '{result}'. Setting default value"
            )
            score = 0
        return score

    def get_immediacy(self, content: str):
        """
        Exploit GPT to evaluate the immediacy of this memory
        """
        prompt = IMMEDIACY_PROMPT.format(content)
        result = self.memory.llm.generate_response(prompt)
        try:
            score = int(re.findall(r"\s*(\d+)\s*", result)[0])
        except Exception as e:
            logger.warning(
                f"Found error {e} Abnormal result of importance rating '{result}'. Setting default value"
            )
            score = 0
        return score

    def get_memory(
            self, content: str, current_time, cnt_retrieved_entries: int = 1
    ) -> Optional[List[Any]]:
        """
        Get k-most relevant memories to content
        """
        return self.query(content, cnt_retrieved_entries, current_time)

    def query(
            self, text: Union[str, List[str]], k: int, current_time=dt.now(), nms_threshold=0.99
    ) -> List[str]:
        """
        get top-k entry based on recency, relevance, importance, immediacy
        The query result can be Short-term or Long-term queried result.
        formula is
        `score= sim(q,v) *max(LTM_score, STM_score)`
        `STM_score=time_score(createTime)*immediacy`
        `LTM_score=time_score(accessTime)*importance`
        time score is exponential decay weight. stm decays faster.

        The query supports querying based on multiple texts and only gives non-overlapping results
        If nms_threshold is not 1, nms mechanism if activated. By default,
        use soft nms with modified iou base(score starts to decay iff cos sim is higher than this value,
         and decay weight at this value if 0. rather than 1-threshold).

        Args:
            text: str
            k: int
            current_time: dt.now
            nms_threshold: float = 0.99


        Returns: List[str]
        """
        assert len(text) > 0
        texts = [text] if isinstance(text, str) else text
        maximum_score = None
        for text in texts:
            embedding = get_embedding(text)
            score = []
            for memory in self.memory.messages:

                if memory.content not in self.memory2time:
                    self.memory2time[memory.content]["last_access_time"] = dt.now()
                    self.memory2time[memory.content]["create_time"] = dt.now()

                last_access_time_diff = \
                    (current_time - self.memory2time[memory.content]["last_access_time"]).total_seconds() // 3600
                recency = np.power(
                    0.99, last_access_time_diff
                )  # TODO: review the metaparameter 0.99

                create_time_diff = (current_time - self.memory2time[memory.content]["create_time"]).total_seconds() // 60
                instancy = np.power(
                    0.90, create_time_diff
                )  # TODO: review the metaparameter 0.90

                relevance = cosine_similarity(
                    np.array(embedding).reshape(1, -1),
                    np.array(memory.embedding).reshape(1, -1),
                )[0][0]

                if memory.content not in self.memory2importance or memory.content not in self.memory2immediacy:
                    self.memory2importance[memory.content] = self.get_importance(memory.content)
                    self.memory2immediacy[memory.content] = self.get_immediacy(memory.content)

                importance = self.memory2importance[memory.content] / 10
                immediacy = self.memory2immediacy[memory.content] / 10

                ltm_w = recency * importance
                stm_w = instancy * immediacy

                score.append(relevance * np.maximum(ltm_w, stm_w))

            score = np.array(score)

            if maximum_score is not None:
                maximum_score = np.maximum(score, maximum_score)
            else:
                maximum_score = score

        if nms_threshold == 1.0:
            # no nms is triggered
            top_k_indices = np.argsort(maximum_score)[-k:][::-1]
        else:
            # TODO: soft-nms
            assert 0 <= nms_threshold < 1
            top_k_indices = []
            while len(top_k_indices) < min(k, len(self.memory.messages)):
                top_index = np.argmax(maximum_score)
                top_k_indices.append(top_index)
                maximum_score[top_index] = -1  # anything to prevent being chosen again
                top_embedding = self.memory.messages[top_index].embedding
                cos_sim = cosine_similarity(
                    np.array(top_embedding).reshape(1, -1),
                    np.array([memory.embedding for memory in self.memory.messages]),
                )[0]
                score_weight = np.ones_like(maximum_score)
                score_weight[cos_sim >= nms_threshold] -= \
                    (cos_sim[cos_sim >= nms_threshold] - nms_threshold) / (1 - nms_threshold)
                maximum_score = maximum_score * score_weight

        # access them and refresh the access time
        for i in top_k_indices:
            self.memory2time[self.memory[i].content]["last_access_time"] = current_time
        # sort them in time periods. if the data tag is 'observation', ad time info output.
        top_k_indices = sorted(
            top_k_indices, key=lambda x: self.memory2time[self.memory.messages[x]]["create_time"]
        )
        query_results = []
        for i in top_k_indices:
            query_result = self.memory.messages[i].content
            query_results.append(query_result)

        return query_results

    def reflect(self):
        """
        initiate a reflection that inserts high level knowledge to memory
        """

        memories_of_interest = self.memory.messages[-100:]
        questions = self.get_questions([m.content for m in memories_of_interest])
        statements = self.query(questions, len(questions) * 10)
        insights = self.get_insights(statements)
        logger.info(self.agent.name + f" Insights: {insights}")
        for insight in insights:

            # convert insight to messages
            # TODO currently only oneself can see its own reflection
            insight_message = Message(
                    content=insight,
                    sender=self.agent.name,
                    receiver=self.agent.name)

            self.memory.add_message([insight_message])

        reflection = "\n".join(insights)
        return reflection

    def generate_summary(self):
        """
        Generating summary for myself
        :return: summary string
        """

        qResList1 = self.query(f"{self.agent.name}'s core characteristics", 10)
        qResList2 = self.query(f"{self.agent.name}'s current daily occupation", 10)
        qResList3 = self.query(f"{self.agent.name}'s feeling about his recent progress in life", 10)

        q1, q2, q3 = map(lambda k: '\n'.join(k), (qResList1, qResList2, qResList3))

        query1 = f"""
                    How would one describe {self.agent.name}'s core characteristics given the following statements? If the information is not enough, just output DONTKNOW. Otherwise, directly output the answer. 
                    {q1}
                    """
        result1 = self.agent.llm.generate_response(query1)
        if "DONTKNOW" in result1.content:
            result1.content = ""

        query2 = f"""
                    What is {self.agent.name}'s current occupation plan given the following statements? If the information is not enough, just output DONTKNOW. Otherwise, directly output the answer. 
                    {q2}
                    """

        result2 = self.agent.llm.generate_response(query2)
        if "DONTKNOW" in result2.content:
            result2.content = ""

        query3 = f"""
                    What might be {self.agent.name}'s feeling about his recent progress in life given the following statements? If the information is not enough, just output DONTKNOW. Otherwise, directly output the answer. 
                    {q3}
                    """

        result3 = self.agent.llm.generate_response(query3)
        if "DONTKNOW" in result3.content:
            result3.content = ""

        # BasicInfo = f"""\
        # Name: {self.agent.name}
        # Innate traits: {self.agent.traits}"""

        summary = '\n'.join([result1.content, result2.content, result3.content])
        return summary

    def reset(self) -> None:
        self.summary = ""
        self.reflection = ""
