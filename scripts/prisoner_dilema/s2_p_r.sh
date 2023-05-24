source activate agent

root_dir="/mnt/c/users/dalabengba/AgentVerse"
log_dir="${root_dir}/outputs/prisoner_dilema/s2_p_r"

mkdir -p "${log_dir}"

cp "${root_dir}/agentverse/tasks/prisoner_dilema/s2_p_r/config.yaml" "${log_dir}"

python ${root_dir}/main.py --task "prisoner_dilema/s2_p_r" \
        2>&1 > /dev/null | tee  "${log_dir}/log"