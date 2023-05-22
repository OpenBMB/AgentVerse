export default Files;

declare namespace Files {
    interface IConfig {
        name?: string;
        zip?: boolean;
    }

    interface IBaseData {
        fileID?: string;

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

    save(
        fileID: string,
        header?: Files.IHeader,
        content?: Files.IContent,
        updateMode?: boolean
    ): Promise<
        { fileID: string }
    >;

    loadHeaders(
    ): Promise<
        {
            headers: { [fileID: string]: Files.IHeader }
        }
    >;

    load(
        fileID: string
    ): Promise<
        {
            fileID: string,
            header: Files.IHeader,
            content: Files.IContent
        }
    >;
}