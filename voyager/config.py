import os


# 读取环境变量并设置全局配置参数
def load_config():
    config = {}

    # 从环境变量读取配置参数
    config["API_KEY"] = os.getenv(
        "API_KEY", ""
    )
    config["API_BASE"] = os.getenv("API_BASE", "https://api.openai.com/v1")
    config["BOT_NAME"] = os.getenv("BOT_NAME", "bot")
    config["AGENT_MODEL_NAME"] = os.getenv("AGENT_MODEL_NAME", "gpt-3.5-turbo")
    config["RECORD_SERVER"] = os.environ.get("RECORD_SERVER", "http://127.0.0.1:8000")
    config["MAX_LOG_TIMES"] = int(os.environ.get("MAX_LOG_TIMES", "10000"))

    return config


# 全局配置参数
CONFIG = load_config()
