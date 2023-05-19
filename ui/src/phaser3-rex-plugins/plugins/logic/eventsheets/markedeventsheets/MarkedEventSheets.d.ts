import EventSheetTrees from '../eventsheettrees/EventSheetTrees';

export default MarkedEventSheets;

declare namespace MarkedEventSheets {
    interface IConfig extends EventSheetTrees.IConfig {

    }

    interface IAddEventSheet {
        lineReturn?: string,
        commentLineStart?: string,
        parallel?: boolean,
    }
}

declare class MarkedEventSheets extends EventSheetTrees {
    addEventSheet(
        content: string,
        config?: MarkedEventSheets.IAddEventSheet
    ): this;

}