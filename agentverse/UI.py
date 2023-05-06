import time

from module.generate import Generate
import gradio as gr


class UI:
    """
    the UI of frontend
    """

    def __init__(self):
        """
        init a UI.
        default number of students is 0
        """
        self.generate = Generate(0)
        self.autoplay = False
        self.image_now = None
        self.text_now = None

    def stop_auto(self):
        self.autoplay = False

    def auto_play(self):
        self.autoplay = True
        while self.autoplay:
            outputs = self.generate.gen_output()
            self.image_now, self.text_now = outputs
            yield outputs
            time.sleep(5)

    def gen_output(self):
        yield self.image_now, self.text_now, gr.Button.update(interactive=False)
        outputs = self.generate.gen_output()
        self.image_now, self.text_now = outputs
        yield self.image_now, self.text_now, gr.Button.update(interactive=True)

    def reset(self):
        self.image_now, self.text_now = self.generate.reset()
        return self.image_now, self.text_now

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
                        stop_auto_btn = gr.Button("Stop Auto Play")
                        auto_btn = gr.Button("Start Auto Play")
                        next_btn = gr.Button("Next", variant="primary")
                text_output = gr.HTML(self.generate.reset()[1])
            # stu_num = gr.Number(label="Student Number", precision=0)
            next_btn.click(fn=self.gen_output, inputs=None, outputs=[image_output, text_output, next_btn],
                           show_progress=False)
            reset_btn.click(fn=self.reset, inputs=None, outputs=[image_output, text_output],
                            show_progress=False)
            auto_btn.click(
                fn=self.auto_play,
                inputs=None, outputs=[image_output, text_output], show_progress=False)
            stop_auto_btn.click(fn=self.stop_auto, inputs=None, outputs=None, show_progress=False)
        demo.queue(concurrency_count=5, max_size=20).launch()
