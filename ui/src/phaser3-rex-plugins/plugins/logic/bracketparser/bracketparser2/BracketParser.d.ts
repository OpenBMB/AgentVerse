import BracketParserBase from '../bracketparserbase/BracketParser';

export default BracketParser;

declare namespace BracketParser {
    interface IConfig extends BracketParserBase.IConfig {

    }

    namespace Events {
        type StartCallbackType = (parser: BracketParser) => void;
        type CompleteCallbackType = (parser: BracketParser) => void;
        type PauseCallbackType = (parser: BracketParser) => void;
        type ResumeCallbackType = (parser: BracketParser) => void;

        type TagOnCallbackType = (payload: { [name: string]: any }) => void;
        type AnyTagOnCallbackType = (tagName: string, payload: { [name: string]: any }) => void;
        type TagOffCallbackType = (payload: { [name: string]: any }) => void;
        type AnyTagOffCallbackType = (tagName: string, payload: { [name: string]: any }) => void;
        type ContentCallbackType = (content: string) => void;
    }
}

declare class BracketParser extends BracketParserBase {
    constructor(config?: BracketParser.IConfig);
}