// import * as Phaser from 'phaser';
import Label from '../label/Label';


export default Toast;

declare namespace Toast {

    interface IConfig extends Label.IConfig {
        duration?: {
            in?: number,
            hold?: number,
            out?: number,
        },

        transitIn?: 0 | 1 | 'popUp' | 'fadeIn' |
        ((toast: Toast, duration: number) => void),

        transitOut?: 0 | 1 | 'scaleDown' | 'fadeOut' |
        ((toast: Toast, duration: number) => void),
    }
}

declare class Toast extends Label {
    constructor(
        scene: Phaser.Scene,
        config?: Toast.IConfig
    );

    showMessage(
        message: string | ((toast: Toast) => void)
    ): this;

    transitInTime: number;
    setTransitInTime(time: number): this;
    displayTime: number;
    setDisplayTime(time: number): this;
    transitOutTime: number;
    setTransitOutTime(time: number): this;

    setTransitInCallback(
        callback: 0 | 1 | 'popUp' | 'fadeIn' |
            ((toast: Toast, duration: number) => void)
    ): this;
    setTransitOutCallback(
        callback: 0 | 1 | 'scaleDown' | 'fadeOut' |
            ((toast: Toast, duration: number) => void)
    ): this;
}