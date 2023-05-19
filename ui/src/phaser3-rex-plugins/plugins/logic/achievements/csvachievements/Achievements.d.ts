import Base from '../achievements/Achievements';

export default Achievements;

declare namespace Achievements {
    interface ILoadCSVConfig {
        delimiter?: string
    }
}
declare class Achievements extends Base {
    loadCSV(
        csvString: string,
        config?: Achievements.ILoadCSVConfig
    ): this;
}