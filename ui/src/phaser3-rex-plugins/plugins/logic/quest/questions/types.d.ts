export type QuestionType = {
    key?: string,
    [param: string]: any,
    options?: OptionsType[],
}

export type OptionsType = {
    key?: string,
    [param: string]: any,
}