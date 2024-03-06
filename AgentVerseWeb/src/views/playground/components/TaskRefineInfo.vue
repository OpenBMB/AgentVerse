<template>
    <div class="task-refine-info">
        <div class="task-refine-info-title">
            <span> 🔍 Evaluation</span>
        </div>
        <div class="task-refine-info-content">
            <div class="task-refine-info-content-item">
                <span class="task-refine-info-content-item-title">SubRound Score:</span>
                <json-viewer class="subround-score" :class="{ 'subround-score-true': subround_score }" :expand-depth="0"
                    :expanded="false" :value="subround_score"></json-viewer>
                <!-- <json-viewer :expand-depth="0" :expanded="false" v-else :value="subround_score"></json-viewer> -->
            </div>
            <div class="task-refine-info-content-item">
                <span class="task-refine-info-content-item-title">SubRound Advice:</span>
                <json-viewer :expand-depth="0" :expanded="false" :value="subround_advice"></json-viewer>
            </div>
            <!-- <div class="task-refine-info-content-item">
                <span class="task-refine-info-content-item-title">Posterior Tool Reflection:</span>
                <json-viewer :expand-depth="0" :expanded="false" :value="posterior_tool_reflection"></json-viewer>
            </div> -->
        </div>
    </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const props = defineProps(['data'])

const objectToString = (obj: any) => {
    return JSON.stringify(obj)
}

const subround_score = computed(
    () => props?.data?.score)
const subround_advice = computed(
    () => props?.data?.advice)
const posterior_tool_reflection = computed(
    () => props?.data?.tool_reflection)

</script>

<style lang="scss" scoped>
.json-viewer .subround-score-true {
    color: #00ff00 !important;
}

.task-refine-info {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .task-refine-info-title {
        width: 100%;
        height: 10%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #1C2848;
        letter-spacing: 0;
        line-height: 26px;
        font-weight: 500;
    }

    .task-refine-info-content {
        width: 100%;
        height: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .task-refine-info-content-item {
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            background: #FFFFFF;
            border-radius: 8px;
            margin: 5px 0;
            padding: 8px 10px;

            .task-refine-info-content-item-title {
                width: 100%;
                height: auto;
                font-size: 15px;
                margin-left: 5px;
                flex: 0 0 auto;
                padding: 0;
                background-color: transparent;
                font-family: PingFangSC-Regular;
                text-align: left;
            }

            .task-refine-info-content-item-content {
                width: calc(100% - 150px);
                height: auto;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 15px;

            }

            :deep(.jv-code) {
                padding: 5px 5px !important;
            }
        }
    }
}

:deep(.jv-item.jv-string) {
    color: #676C90 !important;
}
</style>
