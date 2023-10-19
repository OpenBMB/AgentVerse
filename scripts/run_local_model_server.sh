:<<COMMENT
See https://github.com/lm-sys/FastChat/blob/main/docs/openai_api.md for more usages.
COMMENT
# export CUDA_VISIBLE_DEVICES=0
MODEL_PATH="path_to_the_downloaded_model_dir"
MODEL_NAME="name_of_the_model"
python3 -m fastchat.serve.controller & \
python3 -m fastchat.serve.multi_model_worker \
    --model-path ${MODEL_PATH} \
    --model-names ${MODEL_NAME} & \
python3 -m fastchat.serve.openai_api_server --host localhost --port 5000
