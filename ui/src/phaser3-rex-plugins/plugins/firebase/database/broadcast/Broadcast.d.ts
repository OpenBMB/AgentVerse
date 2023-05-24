import EventEmitter from "../../../utils/eventemitter/EventEmitter";

export default Broadcast;

declare namespace Broadcast {
    interface IConfig {
        root?: string,
        senderID?: string,
        senderName?: string,
        receiverID?: string,
        history?: number | boolean,

        eventEmitter?: EventEmitter | false,
    }

    type MessageType = string |
    { [name: string]: number | string | boolean };

    interface IReceiveData {
        senderID: string, senderName?: string,
        message: MessageType
    }
}

declare class Broadcast extends EventEmitter {
    constructor(
        config?: Broadcast.IConfig
    );

    setSender(
        userID: string, userName?: string
    ): this;

    setSender(
        config: { userID: string, userName?: string }
    ): this;

    userID: string;
    userName: string;
    readonly userInfo: { userID?: string, userName?: string };

    setReceiver(receiverID: string): this;
    receiverID: string;

    send(
        message: Broadcast.MessageType
    ): Promise<any>;

    startReceiving(): this;
    stopReceiving(): this;

    getHistory(): Broadcast.IReceiveData[];
    clearHistory(): this;
}