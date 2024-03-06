type historyRole = 'USER' | 'AI'
export type feedbackRating = 'THUMBS_UP' | 'THUMBS_DOWN' | 'THUMBS_NO'

interface SubTaskInter {
  content?: string
  tools: Array<ToolInter>
}
interface ToolInter {
  thought?: string
  id?: number
  apiName?: string
  apiParameter?: string
}
export interface ChatMsgInfoInf {
  msgID: string
  content: { task_des: string, cnt_agents: string }
  parentMsgID: string
  complete?: boolean
  role: historyRole
  rating?: feedbackRating
  feedbackMsg?: string | null
  costTimeMilli?: number | 0
  content_html?: string
  childrenIds?: string[]
  subTasks?: Array<SubTaskInter>
  isLatest?: boolean // 是不是AI最新生成的那条？
}

export interface HistoryListInf {
  content: {
    pairs: string
    type: 'TEXT'
    costTime: number
    pairs_html?: string | undefined
    rating?: feedbackRating
    feedbackMsg?: string
  }
  id: string
  role: historyRole
  parentMsgID: string //parent id
}

export interface HistoryInf {
  conversationId: string
  parentMessageId: string
  chatMessage: Array<HistoryListInf>
}

export interface ChatInf {
  chatMessage: Array<{ content: { pairs: string; type: 'TEXT' }; id: string; role: 'USER' | 'AI' }>
  conversationId: string
  parentMessageId: string
}

interface Setting {
  mode?: string
  agent?: string
  plugins?: Array<string>
  temperature?: number
}

export interface IChatRequest {
  chatMessage: Array<{ content: { pairs: string; type: 'TEXT' }; id: string; role: 'USER' | 'AI' }>
  conversationId: string
  parentMessageId: string
  generateType?: 'REGENERATE' | 'NORMAL'
  setting?: Setting,
}
