export default RunCommands;

declare namespace RunCommands {

    interface IConfig {
        reverse?: boolean,
        argsConvert?: ((s: any, cmd?: any[]) => any) | boolean,

    }

}

declare function RunCommands(
    queue: any[],
    scope?: object,
    config?: RunCommands.IConfig
): any