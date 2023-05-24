import Base from '../achievements/Achievements';

export default Achievements;

declare namespace Achievements {
}

declare class Achievements extends Base {
    loadYML(
        ymlString: string
    ): this;
}