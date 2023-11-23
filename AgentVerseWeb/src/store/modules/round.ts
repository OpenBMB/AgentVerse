import { da } from "element-plus/es/locale"

interface subround {
    node_id: number | string
    task_id: number | string
    name: string

    recruitment: any[]
    decision_make: any[]
    aciton_exectuion: any[]
    evaluation: any[]

    isFinished?: boolean
    isRunning?: boolean
    refinement: any
    isShowRefinement?: boolean
}


interface RoundState {
    current_subround_index: number
    subrounds: subround[]
    isCompleted: boolean
}

export const useRoundStore = defineStore('ruond', {
    state: (): RoundState => {
        return {
            subrounds: [],
            current_subround_index: 0,
            isCompleted: false,
        }
    },

    actions: {
        initializeRounds(data: any) {
            if (this.isCompleted) {
                return
            }
            this.subrounds = data.subrounds;
            this.current_subround_index = -1
        },

        addSubround(data: any) {
            if (this.isCompleted) {
                return
            }
            this.subrounds.push(data.subround);
            this.current_subround_index += 1
        },

        addPipeline(data: any) {
            if (this.isCompleted) {
                return
            }
            switch (data.stage_id) {
                case 'role_assign':
                    this.subrounds[this.current_subround_index].recruitment.push(data.data);
                    break;
                case 'decision_make':
                    this.subrounds[this.current_subround_index].decision_make.push(data.data);
                    break;
                case 'aciton_exectuion':
                    this.subrounds[this.current_subround_index].aciton_exectuion.push(data.data);
                    break;
                case 'evaluation':
                    this.subrounds[this.current_subround_index].evaluation.push(data.data);
                    break;
            }
        },

        addRefinementInfo(data: any) {
            if (this.isCompleted) {
                return
            }
            this.subrounds[this.current_subround_index].refinement = data.data
            this.subrounds[this.current_subround_index].isShowRefinement = true;
        },



        completeSubround() {
            this.isCompleted = true
            this.current_subround_index = this.subrounds.length - 1;
            // set current index to a number that is larger than the length of subrounds
        },

        setTaskRefineInfoArray(data: any[]) {
            if (this.isCompleted) {
                return
            } else {
                data.forEach((item: any, index: number) => {
                    this.subrounds[index].refinement = item
                });
            }
        },

        reset() {
            this.subrounds = []
            this.current_subround_index = 0
            this.isCompleted = false
        }

    },

    getters: {

        getCurrentsubroundIndex(): number {
            return this.current_subround_index
        },

        // getGoalArray(): any[] {
        //     return this.subrounds.map((item) => item.goal)
        // },

        getCurrentsubround(): subround {
            return this.subrounds[this.current_subround_index]
        },

        getIssubroundCompleted(): boolean {
            return this.isCompleted
        },

        getsubrounds(): subround[] {
            return this.subrounds
        }
    }
})


