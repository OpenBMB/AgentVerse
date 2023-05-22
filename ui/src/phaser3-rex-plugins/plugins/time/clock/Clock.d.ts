import BaseClock from "./BaseClock";

export default Clock;

declare namespace Clock {
    interface IConfig extends BaseClock.IConfig {
    }
}

declare class Clock extends BaseClock {

}