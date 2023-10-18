:<<COMMENT
See https://github.com/lm-sys/FastChat/blob/main/docs/openai_api.md for more usages.
COMMENT
export CUDA_VISIBLE_DEVICES=1
python3 -m fastchat.serve.controller & \
python3 -m fastchat.serve.multi_model_worker \
    --model-path /data/private/xiayu/huggingface_cache/Llama-2-7b-chat-hf \
    --model-names llama-2-7b-chat-hf & \
python3 -m fastchat.serve.openai_api_server --host localhost --port 5000