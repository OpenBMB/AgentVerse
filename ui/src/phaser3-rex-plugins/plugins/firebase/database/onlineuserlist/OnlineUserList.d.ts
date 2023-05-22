import EventEmitter from "../../../utils/eventemitter/EventEmitter";

export default OnlineUserList;

declare namespace OnlineUserList {

    interface IConfig {
        root?: string,
        maxUsers?: number,

        userID?: string, userName?: string,

        eventEmitter?: EventEmitter | false,
    }
}

declare class OnlineUserList extends EventEmitter {
    constructor(
        config?: OnlineUserList.IConfig
    );

    setUser(
        userID: string, userName?: string
    ): this;

    setUser(
        config: { userID: string, userName?: string }
    ): this;

    userID: string;
    userName: string;
    readonly userInfo: { userID?: string, userName?: string };

    join(
    ): Promise<void>;

    leave(
        userID?: string,
    ): Promise<void>;

    changeUserName(
        userName: string
    ): Promise<void>;

    getUsers(
    ): { userID?: string, userName?: string, }[];

    isFirstUser(
        userID?: string
    ): boolean;

    isFull(): boolean;

    readonly maxUsers: number;

    readonly isInList: boolean;

}