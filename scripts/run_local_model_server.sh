# See https://github.com/lm-sys/FastChat/blob/main/docs/openai_api.md for more usages.

# export CUDA_VISIBLE_DEVICES=0
MODEL_PATH="meta-llama/Llama-2-7b-chat-hf"   # path_to_the_downloaded_model_dir
MODEL_NAME="llama-2-7b-chat-hf"              # name_of_the_model
CONTROLLER_PORT=20002
python3 -m fastchat.serve.controller --host 127.0.0.1 --port ${CONTROLLER_PORT} & \
python3 -m fastchat.serve.multi_model_worker \
    --model-path ${MODEL_PATH} \
    --model-names ${MODEL_NAME} \
    --host 127.0.0.1 \
    --controller-address http://127.0.0.1:${CONTROLLER_PORT} \
    --worker-address http://127.0.0.1:21002 & \
python3 -m fastchat.serve.openai_api_server --host 127.0.0.1 --port 5000 --controller-address http://127.0.0.1:${CONTROLLER_PORT}
