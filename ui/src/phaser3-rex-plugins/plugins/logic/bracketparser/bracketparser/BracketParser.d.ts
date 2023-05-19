import BracketParserBase from '../bracketparserbase/BracketParser';
export default BracketParser;

declare namespace BracketParser {
    interface IConfig extends BracketParserBase.IConfig {
        regex?: {
            tag?: string,
            value?: string,
        }
    }
    namespace Events {
        type StartCallbackType = (parser: BracketParser) => void;
        type CompleteCallbackType = (parser: BracketParser) => void;
        type PauseCallbackType = (parser: BracketParser) => void;
        type ResumeCallbackType = (parser: BracketParser) => void;

        type TagOnCallbackType = (...values: any) => void;
        type AnyTagOnCallbackType = (tagName: string, ...values: any) => void;
        type TagOffCallbackType = () => void;
        type AnyTagOffCallbackType = (tagName: string) => void;
        type ContentCallbackType = (content: string) => void;
    }
}

declare class BracketParser extends BracketParserBase {
    constructor(config?: BracketParser.IConfig);
}