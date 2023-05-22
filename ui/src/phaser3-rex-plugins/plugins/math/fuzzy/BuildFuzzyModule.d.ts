import FuzzyModule from './FuzzyModule';
export default BuildFuzzyModule;

declare namespace BuildFuzzyModule {
    type FuzzySetConfig =
        [string, number, number, number, string] |
        [string, number, number, number];

    interface IConfig {
        variables: string | string[] | { [varName: string]: FuzzySetConfig[] },
        rules: string | string[]
    }
}

declare function BuildFuzzyModule(
    config: string
): FuzzyModule;

declare function BuildFuzzyModule(
    config: BuildFuzzyModule.IConfig
): FuzzyModule;