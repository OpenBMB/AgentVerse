import base64
import itertools
import json
from typing import Dict, List, Tuple

import cv2
import gradio as gr

from agentverse.agentverse import AgentVerse
from agentverse.message import Message


def cover_img(background, img, place: Tuple[int, int]):
    """
    Overlays the specified image to the specified position of the background image.
    :param background: background image
    :param img: the specified image
    :param place: the top-left coordinate of the target location
    """
    back_h, back_w, _ = background.shape
    height, width, _ = img.shape
    for i, j in itertools.product(range(height), range(width)):
        if img[i, j, 3]:
            background[place[0] + i, place[1] + j] = img[i, j, :3]


class UI:
    """
    the UI of frontend
    """

    def __init__(self, task: str):
        """
        init a UI.
        default number of students is 0
        """
        self.messages = []
        self.task = task
        self.backend = AgentVerse.from_task(task)
        self.turns_remain = 0
        self.agent_id = {
            self.backend.agents[idx].name: idx
            for idx in range(len(self.backend.agents))
        }
        self.stu_num = len(self.agent_id) - 1
        self.autoplay = False
        self.image_now = None
        self.text_now = None
        self.tot_solutions = 5
        self.solution_status = [False] * self.tot_solutions

    def get_avatar(self, idx):
        if idx == -1:
            img = cv2.imread("./imgs/db_diag/-1.png")
        elif self.task == "prisoner_dilemma":
            img = cv2.imread(f"./imgs/prison/{idx}.png")
        elif self.task == "db_diag":
            img = cv2.imread(f"./imgs/db_diag/{idx}.png")
        elif "sde" in self.task:
            img = cv2.imread(f"./imgs/sde/{idx}.png")
        else:
            img = cv2.imread(f"./imgs/{idx}.png")
        base64_str = cv2.imencode(".png", img)[1].tostring()
        return "data:image/png;base64," + base64.b64encode(base64_str).decode("utf-8")

    def stop_autoplay(self):
        self.autoplay = False
        return (
            gr.Button.update(interactive=False),
            gr.Button.update(interactive=False),
            gr.Button.update(interactive=False),
        )

    def start_autoplay(self):
        self.autoplay = True
        yield (
            self.image_now,
            self.text_now,
            gr.Button.update(interactive=False),
            gr.Button.update(interactive=True),
            gr.Button.update(interactive=False),
            *[gr.Button.update(visible=statu) for statu in self.solution_status],
            gr.Box.update(visible=any(self.solution_status)),
        )

        while self.autoplay and self.turns_remain > 0:
            outputs = self.gen_output()
            self.image_now, self.text_now = outputs

            yield (
                *outputs,
                gr.Button.update(interactive=not self.autoplay and self.turns_remain > 0),
                gr.Button.update(interactive=self.autoplay and self.turns_remain > 0),
                gr.Button.update(interactive=not self.autoplay and self.turns_remain > 0),
                *[gr.Button.update(visible=statu) for statu in self.solution_status],
                gr.Box.update(visible=any(self.solution_status))
            )

    def delay_gen_output(self):
        yield (
            self.image_now,
            self.text_now,
            gr.Button.update(interactive=False),
            gr.Button.update(interactive=False),
            *[gr.Button.update(visible=statu) for statu in self.solution_status],
            gr.Box.update(visible=any(self.solution_status))
        )

        outputs = self.gen_output()
        self.image_now, self.text_now = outputs

        yield (
            self.image_now,
            self.text_now,
            gr.Button.update(interactive=self.turns_remain > 0),
            gr.Button.update(interactive=self.turns_remain > 0),
            *[gr.Button.update(visible=statu) for statu in self.solution_status],
            gr.Box.update(visible=any(self.solution_status))
        )

    def delay_reset(self):
        self.autoplay = False
        self.image_now, self.text_now = self.reset()
        return (
            self.image_now,
            self.text_now,
            gr.Button.update(interactive=True),
            gr.Button.update(interactive=False),
            gr.Button.update(interactive=True),
            *[gr.Button.update(visible=statu) for statu in self.solution_status],
            gr.Box.update(visible=any(self.solution_status))
        )

    def reset(self, stu_num=0):
        """
        tell backend the new number of students and generate new empty image
        :param stu_num:
        :return: [empty image, empty message]
        """
        if not 0 <= stu_num <= 30:
            raise gr.Error("the number of students must be between 0 and 30.")

        """
        # [To-Do] Need to add a function to assign agent numbers into the backend.
        """
        # self.backend.reset(stu_num)
        # self.stu_num = stu_num

        """
        # [To-Do] Pass the parameters to reset
        """
        self.backend.reset()
        self.turns_remain = self.backend.environment.max_turns

        if self.task == "prisoner_dilemma":
            background = cv2.imread("./imgs/prison/case_1.png")
        elif self.task == "db_diag":
            background = cv2.imread("./imgs/db_diag/background.png")
        elif "sde" in self.task:
            background = cv2.imread("./imgs/sde/background.png")
        else:
            background = cv2.imread("./imgs/background.png")
            back_h, back_w, _ = background.shape
            stu_cnt = 0
            for h_begin, w_begin in itertools.product(
                    range(800, back_h, 300), range(135, back_w - 200, 200)
            ):
                stu_cnt += 1
                img = cv2.imread(
                    f"./imgs/{(stu_cnt - 1) % 11 + 1 if stu_cnt <= self.stu_num else 'empty'}.png",
                    cv2.IMREAD_UNCHANGED,
                )
                cover_img(
                    background,
                    img,
                    (h_begin - 30 if img.shape[0] > 190 else h_begin, w_begin),
                )
        self.messages = []
        self.solution_status = [False] * self.tot_solutions
        return [cv2.cvtColor(background, cv2.COLOR_BGR2RGB), ""]

    def gen_img(self, data: List[Dict]):
        """
        generate new image with sender rank
        :param data:
        :return: the new image
        """
        # The following code need to be more general. This one is too task-specific.
        # if len(data) != self.stu_num:
        if len(data) != self.stu_num + 1:
            raise gr.Error("data length is not equal to the total number of students.")
        if self.task == "prisoner_dilemma":
            img = cv2.imread("./imgs/speaking.png", cv2.IMREAD_UNCHANGED)
            if (
                    len(self.messages) < 2
                    or self.messages[-1][0] == 1
                    or self.messages[-2][0] == 2
            ):
                background = cv2.imread("./imgs/prison/case_1.png")
                if data[0]["message"] != "":
                    cover_img(background, img, (400, 480))
            else:
                background = cv2.imread("./imgs/prison/case_2.png")
                if data[0]["message"] != "":
                    cover_img(background, img, (400, 880))
            if data[1]["message"] != "":
                cover_img(background, img, (550, 480))
            if data[2]["message"] != "":
                cover_img(background, img, (550, 880))
        elif self.task == "db_diag":
            background = cv2.imread("./imgs/db_diag/background.png")
            img = cv2.imread("./imgs/db_diag/speaking.png", cv2.IMREAD_UNCHANGED)
            if data[0]["message"] != "":
                cover_img(background, img, (750, 80))
            if data[1]["message"] != "":
                cover_img(background, img, (310, 220))
            if data[2]["message"] != "":
                cover_img(background, img, (522, 11))
        elif "sde" in self.task:
            background = cv2.imread("./imgs/sde/background.png")
            img = cv2.imread("./imgs/sde/speaking.png", cv2.IMREAD_UNCHANGED)
            if data[0]["message"] != "":
                cover_img(background, img, (692, 330))
            if data[1]["message"] != "":
                cover_img(background, img, (692, 660))
            if data[2]["message"] != "":
                cover_img(background, img, (692, 990))
        else:
            background = cv2.imread("./imgs/background.png")
            back_h, back_w, _ = background.shape
            stu_cnt = 0
            if data[stu_cnt]["message"] not in ["", "[RaiseHand]"]:
                img = cv2.imread("./imgs/speaking.png", cv2.IMREAD_UNCHANGED)
                cover_img(background, img, (370, 1250))
            for h_begin, w_begin in itertools.product(
                    range(800, back_h, 300), range(135, back_w - 200, 200)
            ):
                stu_cnt += 1
                if stu_cnt <= self.stu_num:
                    img = cv2.imread(
                        f"./imgs/{(stu_cnt - 1) % 11 + 1}.png", cv2.IMREAD_UNCHANGED
                    )
                    cover_img(
                        background,
                        img,
                        (h_begin - 30 if img.shape[0] > 190 else h_begin, w_begin),
                    )
                    if "[RaiseHand]" in data[stu_cnt]["message"]:
                        # elif data[stu_cnt]["message"] == "[RaiseHand]":
                        img = cv2.imread("./imgs/hand.png", cv2.IMREAD_UNCHANGED)
                        cover_img(background, img, (h_begin - 90, w_begin + 10))
                    elif data[stu_cnt]["message"] not in ["", "[RaiseHand]"]:
                        img = cv2.imread("./imgs/speaking.png", cv2.IMREAD_UNCHANGED)
                        cover_img(background, img, (h_begin - 90, w_begin + 10))

                else:
                    img = cv2.imread("./imgs/empty.png", cv2.IMREAD_UNCHANGED)
                    cover_img(background, img, (h_begin, w_begin))
        return cv2.cvtColor(background, cv2.COLOR_BGR2RGB)

    def return_format(self, messages: List[Message]):
        _format = [{"message": "", "sender": idx} for idx in range(len(self.agent_id))]

        for message in messages:
            if self.task == "db_diag":
                content_json: dict = message.content
                content_json["diagnose"] = f"[{message.sender}]: {content_json['diagnose']}"
                _format[self.agent_id[message.sender]]["message"] = json.dumps(content_json)
            elif "sde" in self.task:
                if message.sender == "code_tester":
                    pre_message, message_ = message.content.split("\n")
                    message_ = "{}\n{}".format(pre_message, json.loads(message_)["feedback"])
                    _format[self.agent_id[message.sender]]["message"] = "[{}]: {}".format(
                        message.sender, message_
                    )
                else:
                    _format[self.agent_id[message.sender]]["message"] = "[{}]: {}".format(
                        message.sender, message.content
                    )

            else:
                _format[self.agent_id[message.sender]]["message"] = "[{}]: {}".format(
                    message.sender, message.content
                )

        return _format

    def gen_output(self):
        """
        generate new image and message of next step
        :return: [new image, new message]
        """

        # data = self.backend.next_data()
        return_message = self.backend.next()
        data = self.return_format(return_message)

        # data.sort(key=lambda item: item["sender"])
        """
        # [To-Do]; Check the message from the backend: only 1 person can speak
        """

        for item in data:
            if item["message"] not in ["", "[RaiseHand]"]:
                self.messages.append((item["sender"], item["message"]))

        message = self.gen_message()
        self.turns_remain -= 1
        return [self.gen_img(data), message]

    def gen_message(self):
        # If the backend cannot handle this error, use the following code.
        message = ""
        """
        for item in data:
            if item["message"] not in ["", "[RaiseHand]"]:
                message = item["message"]
                break
        """
        for sender, msg in self.messages:
            if sender == 0:
                avatar = self.get_avatar(0)
            elif sender == -1:
                avatar = self.get_avatar(-1)
            else:
                avatar = self.get_avatar((sender - 1) % 11 + 1)
            if self.task == "db_diag":
                msg_json = json.loads(msg)
                self.solution_status = [False] * self.tot_solutions
                msg = msg_json["diagnose"]
                if msg_json["solution"] != "":
                    solution: List[str] = msg_json["solution"]
                    for solu in solution:
                        if "query" in solu or "queries" in solu:
                            self.solution_status[0] = True
                            solu = solu.replace("query", '<span style="color:yellow;">query</span>')
                            solu = solu.replace("queries", '<span style="color:yellow;">queries</span>')
                        if "join" in solu:
                            self.solution_status[1] = True
                            solu = solu.replace("join", '<span style="color:yellow;">join</span>')
                        if "index" in solu:
                            self.solution_status[2] = True
                            solu = solu.replace("index", '<span style="color:yellow;">index</span>')
                        if "system configuration" in solu:
                            self.solution_status[3] = True
                            solu = solu.replace("system configuration",
                                                '<span style="color:yellow;">system configuration</span>')
                        if "monitor" in solu or "Monitor" in solu or "Investigate" in solu:
                            self.solution_status[4] = True
                            solu = solu.replace("monitor", '<span style="color:yellow;">monitor</span>')
                            solu = solu.replace("Monitor", '<span style="color:yellow;">Monitor</span>')
                            solu = solu.replace("Investigate", '<span style="color:yellow;">Investigate</span>')
                        msg = f"{msg}<br>{solu}"
                if msg_json["knowledge"] != "":
                    msg = f'{msg}<hr style="margin: 5px 0"><span style="font-style: italic">{msg_json["knowledge"]}<span>'
            else:
                msg = msg.replace("<", "&lt;")
                msg = msg.replace(">", "&gt;")
            message = (
                f'<div style="display: flex; align-items: center; margin-bottom: 10px;overflow:auto;">'
                f'<img src="{avatar}" style="width: 5%; height: 5%; border-radius: 25px; margin-right: 10px;">'
                f'<div style="background-color: gray; color: white; padding: 10px; border-radius: 10px;'
                f'max-width: 70%; white-space: pre-wrap">'
                f"{msg}"
                f"</div></div>" + message
            )
        message = '<div id="divDetail" style="height:600px;overflow:auto;">' + message + "</div>"
        return message

    def submit(self, message: str):
        """
        submit message to backend
        :param message: message
        :return: [new image, new message]
        """
        self.backend.submit(message)
        self.messages.append((-1, f"[User]: {message}"))
        return self.gen_img([{"message": ""}] * len(self.agent_id)), self.gen_message()

    def launch(self):
        """
        start a frontend
        """
        with gr.Blocks() as demo:
            with gr.Row():
                with gr.Column():
                    image_output = gr.Image()
                    with gr.Row():
                        reset_btn = gr.Button("Reset")
                        # next_btn = gr.Button("Next", variant="primary")
                        next_btn = gr.Button("Next", interactive=False)
                        stop_autoplay_btn = gr.Button(
                            "Stop Autoplay", interactive=False
                        )
                        start_autoplay_btn = gr.Button("Start Autoplay", interactive=False)
                    with gr.Box(visible=False) as solutions:
                        with gr.Column():
                            gr.HTML("Optimization Solutions:")
                            with gr.Row():
                                rewrite_slow_query_btn = gr.Button("Rewrite Slow Query", visible=False)
                                add_query_hints_btn = gr.Button("Add Query Hints", visible=False)
                                update_indexes_btn = gr.Button("Update Indexes", visible=False)
                                tune_parameters_btn = gr.Button("Tune Parameters", visible=False)
                                gather_more_info_btn = gr.Button("Gather More Info", visible=False)
                # text_output = gr.Textbox()
                text_output = gr.HTML(self.reset()[1])

            # Given a botton to provide student numbers and their inf.
            # stu_num = gr.Number(label="Student Number", precision=0)
            # stu_num = self.stu_num

            if self.task == "db_diag":
                user_msg = gr.Textbox()
                submit_btn = gr.Button("Submit", variant="primary")

                submit_btn.click(fn=self.submit, inputs=user_msg, outputs=[image_output, text_output], show_progress=False)
            else:
                pass

            # next_btn.click(fn=self.gen_output, inputs=None, outputs=[image_output, text_output], show_progress=False)
            next_btn.click(
                fn=self.delay_gen_output,
                inputs=None,
                outputs=[
                    image_output,
                    text_output,
                    next_btn,
                    start_autoplay_btn,
                    rewrite_slow_query_btn,
                    add_query_hints_btn,
                    update_indexes_btn,
                    tune_parameters_btn,
                    gather_more_info_btn,
                    solutions
                ],
                show_progress=False,
            )

            # [To-Do] Add botton: re-start (load different people and env)
            # reset_btn.click(fn=self.reset, inputs=stu_num, outputs=[image_output, text_output], show_progress=False)
            # reset_btn.click(fn=self.reset, inputs=None, outputs=[image_output, text_output], show_progress=False)
            reset_btn.click(
                fn=self.delay_reset,
                inputs=None,
                outputs=[
                    image_output,
                    text_output,
                    next_btn,
                    stop_autoplay_btn,
                    start_autoplay_btn,
                    rewrite_slow_query_btn,
                    add_query_hints_btn,
                    update_indexes_btn,
                    tune_parameters_btn,
                    gather_more_info_btn,
                    solutions
                ],
                show_progress=False,
            )

            stop_autoplay_btn.click(
                fn=self.stop_autoplay,
                inputs=None,
                outputs=[next_btn, stop_autoplay_btn, start_autoplay_btn],
                show_progress=False,
            )
            start_autoplay_btn.click(
                fn=self.start_autoplay,
                inputs=None,
                outputs=[
                    image_output,
                    text_output,
                    next_btn,
                    stop_autoplay_btn,
                    start_autoplay_btn,
                    rewrite_slow_query_btn,
                    add_query_hints_btn,
                    update_indexes_btn,
                    tune_parameters_btn,
                    gather_more_info_btn,
                    solutions
                ],
                show_progress=False,
            )

        demo.queue(concurrency_count=5, max_size=20).launch()
        # demo.launch()
