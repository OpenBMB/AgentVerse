export default FuzzyModule;

declare class FuzzyModule {

    fuzzify(name: string, value: number): this;
    fuzzify(names: { [name: string]: number }): this;

    defuzzify(name: string, type?: string): this;
    defuzzify(name?: string[], type?: string): this;
}