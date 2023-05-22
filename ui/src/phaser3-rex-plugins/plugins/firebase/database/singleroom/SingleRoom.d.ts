import EventEmitter from "../../../utils/eventemitter/EventEmitter";
import Broadcast from "../broadcast/Broadcast";
import ItemTable from "../itemtable/ItemTable";

export default SingleRoom;

declare namespace SingleRoom {
    interface ITableConfig {
        key: string,
        type?: ItemTable.TableType
    }

    interface IConfig {
        root?: string,
        maxUsers?: number,
        broadcast: boolean |
        {
            history?: number | boolean,
        },
        tables?: undefined | ITableConfig[],

        userID?: string, userName?: string,

        eventEmitter?: EventEmitter | false,
    }
}

declare class SingleRoom extends EventEmitter {
    constructor(config?: SingleRoom.IConfig);

    setUser(
        userID: string, userName?: string
    ): this;

    setUser(
        config: { userID: string, userName?: string }
    ): this;

    userID: string;
    userName: string;
    readonly userInfo: { userID?: string, userName?: string };

    joinRoom(
    ): Promise<void>;

    leaveRoom(
    ): Promise<void>;

    kickUser(
        userID: string
    ): Promise<void>;

    getUsers(
    ): { userID?: string, userName?: string, }[];

    isFirstUser(
        userID?: string
    ): boolean;

    isFull(): boolean;

    readonly maxUsers: number;

    isInRoom(): boolean;

    readonly broadcast: Broadcast;

    changeUserName(
        userName: string
    ): Promise<void>;

    getTable(
        key: string
    ): ItemTable;

}