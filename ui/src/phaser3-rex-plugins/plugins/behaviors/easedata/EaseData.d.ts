import ComponentBase from '../../utils/componentbase/ComponentBase';

export default EaseData;

declare namespace EaseData {
    interface IConfig extends ComponentBase.IConfig {
    }
}

declare class EaseData extends ComponentBase {
    easeTo(
        key: string,
        value: number,
        duration?: number,
        ease?: string
    ): this;

    easeTo(
        config: {
            key: string,
            value: number,
            duration?: number,
            ease?: string,
            speed?: number
        }
    ): this;

    easeFrom(
        key: string,
        value: number,
        duration?: number,
        ease?: string
    ): this;

    easeFrom(
        config: {
            key: string,
            value: number,
            duration?: number,
            ease?: string,
            speed?: number
        }
    ): this;

    stopEase(
        key: string,
        toEnd?: boolean
    ): this;

    stopAll(
        toEnd?: boolean
    ): this;
}