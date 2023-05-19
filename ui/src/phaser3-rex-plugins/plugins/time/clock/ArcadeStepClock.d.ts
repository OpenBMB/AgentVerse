import BaseClock from "./BaseClock";

export default ArcadeStepClock;

declare namespace ArcadeStepClock {
    interface IConfig extends BaseClock.IConfig {
    }
}

declare class ArcadeStepClock extends BaseClock {

}