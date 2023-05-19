export default Files;

declare namespace Files {
    interface IConfig {
        root?: string
    }

    interface IBaseData {
        userID?: string;
        fileID?: string;
        type?: 'header' | 'content';

        // Other properties
        [name: string]: unknown;
    }

    interface IHeader extends IBaseData { }

    interface IContent extends IBaseData { }
}

declare class Files {
    constructor(
        config: Files.IConfig
    );

    setOwner(userID: string): this;

    setOwner(
        config: { userID: string }
    ): this;

    userID: string;
    readonly userInfo: { userID?: string, userName?: string };

    save(
        fileID: string,
        header?: Files.IHeader,
        content?: Files.IContent,
        updateMode?: boolean
    ): Promise<
        { userID: string, fileID: string }
    >;

    loadHeaders(
    ): Promise<
        {
            userID: string,
            headers: { [fileID: string]: Files.IHeader }
        }
    >;

    load(
        fileID: string
    ): Promise<
        {
            userID: string, fileID: string,
            header: Files.IHeader,
            content: Files.IContent
        }
    >;
}