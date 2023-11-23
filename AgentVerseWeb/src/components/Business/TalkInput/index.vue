<template>
  <div class="talk-input-border flex-row">
    <div class="flex-column">
      <div class="talk-input flex-column" :class="{ sensitive: isSensitive, focus: isFocus }"
        :style="{ '--line-length': input_data.cnt_agents.split('\n')?.length }">
        <el-input ref="inputRef_cnt_agents" v-model="input_data.cnt_agents" type="textarea" rows="1"
          placeholder="Please enter your cnt_agents" maxlength="2000" contenteditable :autofocus="isFocus"
          @focus="isFocus = true" @blur="isFocus = false" @keydown.enter="enterInput" />
      </div>
      <div class="divider"></div>
      <div class="talk-input flex-column" :class="{ sensitive: isSensitive, focus: isFocus }"
        :style="{ '--line-length': input_data.task_des.split('\n')?.length }">
        <el-input ref="inputRef_task_des" v-model="input_data.task_des" type="textarea" rows="1"
          placeholder="Please enter your task_description " maxlength="2000" contenteditable :autofocus="isFocus"
          @focus="isFocus = true" @blur="isFocus = false" @keydown.enter="enterInput" />
      </div>
    </div>
    <el-button type="primary" color="#3D4AC6" class="send-btn submit"
      :disabled="isProgress || input_data.task_des.length <= 0" @click="sendMessage">
      <img alt="" v-show="!isProgress" src="@/assets/images/playground/send.svg" />
      <LoadingDot v-show="isProgress" />
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';

// TODO: 最多下发10轮对话
const emits = defineEmits<{ (e: 'sendMessage', data: { task_des: string, cnt_agents: string }): void }>()
const props = withDefaults(
  defineProps<{
    message?: any
    isProgress?: boolean
  }>(), {
  message: {
    task_des: '',
    cnt_agents: ''
  }, isProgress: false
})
const { message: outInPut, isProgress } = toRefs(props)

const route = useRoute()

const isSensitive = ref(false)
const isFocus = ref(false)
const inputRef_task_des = ref<Nullable<HTMLInputElement>>()
const inputRef_cnt_agents = ref<Nullable<HTMLInputElement>>(null)
const input_data = reactive({
  task_des: '',
  cnt_agents: '',
})

watchEffect(() => {
  console.log("talkinput.vue watchEffect", input_data)
  // input_data.task_des = outInPut.value.task_des
  // input_data.cnt_agents = outInPut.value.cnt_agents;

  if (route.query) {
    inputRef_task_des.value?.focus();
    inputRef_cnt_agents.value?.focus();
  }
  console.log("talkinput.vue watchEffect", input_data)
});

const historyTalkStore = useHistoryTalkStore()
const { isRequestingAi } = storeToRefs(historyTalkStore)

const enterInput = (e: any) => {
  if (e.shiftKey && e.keyCode === 13) {
    e.stopPropagation()
    e.preventDefault()

    const startPos = e.target.selectionStart
    const endPos = e.target.selectionEnd
    input_data.task_des = input_data.task_des.substring(0, startPos) + '\n' + input_data.task_des.substring(endPos)

    setTimeout(() => {
      e.target.setSelectionRange(startPos + 1, startPos + 1)
    })

    setTimeout(() => {
      const textarea = document.querySelector('.el-textarea__inner') as HTMLElement
      textarea.scrollTop = textarea.scrollHeight
    })
    return
  }

  if (!e.shiftKey && e.keyCode === 13) {
    e.preventDefault()
    const val = input_data.task_des.replace(/\n/g, '')
    if (val.length > 0) {
      sendMessage(e)
    }
  }
}

const sendMessage = async ($event: any, val?: any) => {
  console.log("sendMessage in TalkInput.vue", input_data)
  if (!(await useCheckAuth())) return
  if (isProgress.value) return

  if (!/^\d*$/.test(input_data.cnt_agents)) {
    ElMessage({
      type: 'error',
      message: 'cnt_tool_agents must be an integer. Please enter a valid integer value.'
    });
    // 清空输入框或进行其他处理
    inputRef_cnt_agents.value?.focus();
    return;
  }

  if (isRequestingAi.value) {
    ElMessage({
      type: 'warning',
      message: `You have a request in progress, 
          please wait for the request to complete and try again.`
    });
    return
  }

  emits('sendMessage', input_data)
  // nextTick(() => (input_data.task_des = '', input_data.cnt_agents = ''))
  console.log("sendMessage in TalkInput.vue", input_data)
}

// const clearMessage = () => {
//   input_data.task_des = ''
// }
</script>

<style scoped lang="scss">
.divider {
  height: 5px;
  /* 调整垂直空隙的高度 */
  /* 调整分割线和上下元素之间的距离 */
}

.talk-input-border {
  column-gap: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 700px;

  .gradient-mask {
    width: 100%;
    height: 64px;
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(-100%);
    background: linear-gradient(180deg, rgba(235, 236, 248, 0.00) 0%, #EAEBF9 100%);
    z-index: 40;
  }

}

.talk-input {
  flex: 1;
  // min-height: 88px;
  max-height: 350px;
  margin: 0 var(--size-50100);
  width: 700px;
  position: sticky;
  bottom: 0;
  z-index: 110;

  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 8px;

  :deep(.el-textarea) {
    flex: 1;
    height: 100%;
    border: 0;
    background: transparent;

    .el-textarea__inner {
      max-height: 200px;
      height: calc(calc(var(--line-length) + 1) * 14px);
      padding: 10px 12px;
      box-shadow: none;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      line-height: 14px;
      border-radius: 8px;
      resize: none;
    }

    textarea {
      min-height: 34px !important;

      &::placeholder {
        color: #eee;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #CCCCCC;
        font-weight: 400;
      }
    }
  }

  .operate {
    min-height: 28px;
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #cccccc;
    font-weight: 400;
    padding: 0 24px 12px;
    border-radius: 0 0 8px 8px;
    background: #fff;

    .length {
      user-select: none;
    }

    .tip {
      margin-left: auto;
      margin-right: 24px;
      user-select: none;
    }

    .btn {
      gap: 16px;

      img {
        cursor: pointer;
        width: 16px;
        height: 16px;
      }

      &.disabled {
        cursor: default;

        :deep(svg) {
          path {
            fill: #ccc;
          }
        }
      }
    }
  }

  &.focus {
    border-color: #3d4ac6;
  }

  &.sensitive .word-sensitive-wrapper {
    animation: fadeInBottom 0.6s ease-in-out forwards;
  }

  .word-sensitive-wrapper {
    pointer-events: none;
    position: absolute;
    bottom: 120%;
    z-index: 10;
    // transform: translateY(30px);
    opacity: 0;
    width: 100%;
    display: flex;
    justify-content: center;

    .word-sensitive {
      width: fit-content;
      padding-bottom: 0;
      background: #fffdfc;
      border: 1px solid #ffd1ba;
      border-radius: 4px;

      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #1c2848;
      letter-spacing: 0;
      font-weight: 400;
      display: flex;
      flex-direction: row;
      gap: 10px;

      padding: 10px 20px;
    }
  }
}

.submit {
  flex-basis: 86px;
  height: 34px;
  width: 86px;
  background: #3D4AC6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    height: 16px;
    width: 16px;
    background: transparent;
    transform: rotate(-35deg);
    margin-bottom: 5px;
  }
}

.send-btn {
  width: 86px;
  height: 70px;
  padding: 5px !important;
  background: #3D4AC6;
  border-radius: 8px;

  path {
    scale: 1.33 !important;
  }
}
</style>
