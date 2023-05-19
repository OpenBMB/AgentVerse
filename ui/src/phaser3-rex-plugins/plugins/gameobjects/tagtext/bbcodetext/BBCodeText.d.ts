import Text from '../textbase/Text';

export default BBCodeText;

declare namespace BBCodeText {

    interface TextStyle extends Text.TextStyle {
        delimiters: string | string[];
    }
}

declare class BBCodeText extends Text {
    setDelimiters(
        delimiterLeft: string | string[],
        delimiterRight?: string
    ): this;
}