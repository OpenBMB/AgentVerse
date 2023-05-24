export default IdAlias;

declare namespace IdAlias {
    interface IConfig {
        root?: string
    }

    interface IGetRandomAliasConfig {
        digits?: number,
        candidates?: string,
        retry?: number
    }

    type ResultType = {
        id: string | undefined,
        alias: string | undefined
    }
}

declare class IdAlias {
    constructor(
        config: IdAlias.IConfig
    );

    getRandomAlias(
        id: string,
        config?: IdAlias.IGetRandomAliasConfig
    ): Promise<IdAlias.ResultType>;

    add(
        id: string, alias: string
    ): Promise<IdAlias.ResultType>;

    getId(
        alias: string
    ): Promise<IdAlias.ResultType>;

    getAlias(
        id: string
    ): Promise<IdAlias.ResultType>;

}