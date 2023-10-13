import os
from agentverse.gui import GUI
from argparse import ArgumentParser

def is_share(v):
    if isinstance(v, bool):
        return v
    if v.lower() in ('yes', 'true', 't', 'y', '1'):
        return True
    elif v.lower() in ('no', 'false', 'f', 'n', '0'):
        return False
    else:
        import argparse
        raise argparse.ArgumentTypeError('Boolean value expected.')

parser = ArgumentParser()
parser.add_argument("--task", type=str, default="simulation/nlp_classroom_9players")
parser.add_argument(
    "--tasks_dir",
    type=str,
    default=os.path.join(os.path.dirname(__file__), "..", "agentverse", "tasks"),
)
parser.add_argument("--share",
                        type=is_share,
                        default=False,
                        help="Create a publicly shareable link")
parser.add_argument("--server_name",type=str,default="127.0.0.1",help="Server name")

args = parser.parse_args()


def cli_main():
    ui = GUI(args.task, args.tasks_dir,ui_kwargs={"share":args.share,"server_name":args.server_name})
    ui.launch()


if __name__ == "__main__":
    cli_main()
