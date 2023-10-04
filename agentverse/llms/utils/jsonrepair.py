# jsonrepair.py - Repair invalid JSON documents in Python
#
# Just https://github.com/josdejong/jsonrepair ported from TypeScript to Python.
#
# This port won't get updates, because the goal should be to generate this library instead.
#
# See: https://github.com/josdejong/jsonrepair/issues/84
#

import json
import re
from typing import Optional

CONTROL_CHARACTERS = {"\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "\t": "\\t"}

ESCAPE_CHARACTERS = {
    '"': '"',
    "\\": "\\",
    "/": "/",
    "b": "\b",
    "f": "\f",
    "n": "\n",
    "r": "\r",
    "t": "\t"
    # note that \u is handled separately in parseString()
}


def remove_at_index(text: str, start: int, count: int) -> str:
    return text[0:start] + text[start + count :]


def is_control_character(char: str) -> bool:
    return char in CONTROL_CHARACTERS


def is_valid_string_character(char: str) -> bool:
    return 0x20 <= ord(char) <= 0x10FFFF


def is_quote(char: str) -> bool:
    return is_single_quote(char) or is_double_quote(char)


def is_single_quote(char: str) -> bool:
    """Test whether the given character is a single quote character.
    Also tests for special variants of single quotes.
    """
    return char in (
        "'",  # U+0027
        "‘",  # U+2018
        "’",  # U+2019
        "`",  # U+0060
        "´",  # U+00B4
    )


def is_double_quote(char: str) -> bool:
    return (
        is_ascii_double_quote(char)
        or is_double_quote_left(char)
        or is_double_quote_right(char)
    )


def is_ascii_double_quote(char: str) -> bool:
    return char == '"'  # U+0022


def is_double_quote_left(char: str) -> bool:
    return char == "“"  # U+201C


def is_double_quote_right(char: str) -> bool:
    return char == "”"  # U+201D


def is_start_of_value(char: str) -> bool:
    regex_start_of_value = (
        r"^[[{\w-]$"  # alpha, number, minus, or opening bracket or brace
    )
    return bool(re.search(regex_start_of_value, char)) or is_quote(char)


def ends_with_comma_or_newline(text: str) -> bool:
    return bool(re.search(r"[,\n][ \t\r]*$", text))


def is_whitespace(char: str) -> bool:
    return char.isspace()


def is_special_whitespace(char: str) -> bool:
    """Check if the given character is a special whitespace character, some unicode variant"""
    return (
        char == "\u00A0"  # non-breaking space
        or ord("\u2000") <= ord(char) <= ord("\u200A")
        or char == "\u202F"
        or char == "\u205F"
        or char == "\u3000"
    )


def insert_before_last_whitespace(text: str, text_to_insert: str) -> str:
    index = len(text)

    if not is_whitespace(text[index - 1]):
        # no trailing whitespaces
        return text + text_to_insert

    while is_whitespace(text[index - 1]):
        index -= 1

    return text[:index] + text_to_insert + text[index:]


def strip_last_occurrence(
    text: str, text_to_strip: str, strip_remaining: bool = False
) -> str:
    index = text.rindex(text_to_strip)
    try:
        return text[:index] + ("" if strip_remaining else text[index + 1 :])
    except ValueError:
        return text


def is_hex(char: str) -> bool:
    try:
        int(char, 16)
        return True
    except ValueError:
        return False


def is_delimiter(char: str) -> bool:
    return char in ",:[]{}()\n'" or is_quote(char)


def at_end_of_block_comment(text: str, i: int) -> bool:
    return text[i] == "*" and text[i + 1] == "/"


class JsonRepairError(Exception):
    def __init__(self, message: str, position: int):
        super(JsonRepairError, self).__init__(message + f" at position {position}")
        self.position = position


class JsonRepair:
    """Repairs invalid JSON, i.e. change JavaScript notation into JSON notation.

    Example:

    try:
        json = "{name: 'John'}"
        repaired = JsonRepair(json).repair()
        print(repaired)
        # '{"name": "John"}'
    except JsonRepairFailed as err:
        print(err)

    """

    def __init__(self, text: str):
        self.text = text
        self.i = 0  # current index in text
        self.output = ""  # generated output

    def char(self, pos: int = 0) -> str:
        return self.text[self.i + pos]

    def inc(self, by: int = 1) -> None:
        self.i += by

    def dec(self, by: int = 1) -> None:
        self.i -= by

    def is_start_of_document(self, pos: int = 0) -> bool:
        return self.i + pos == 0

    def is_end_of_document(self, pos: int = 0) -> bool:
        return self.i + pos >= len(self.text)

    def repair(self) -> str:
        processed = self.parse_value()
        if not processed:
            raise self.unexpected_end()

        processed_comma = self.parse_character(",")
        if processed_comma:
            self.parse_whitespace_and_skip_comments()

        if (
            not self.is_end_of_document()
            and is_start_of_value(self.char())
            and ends_with_comma_or_newline(self.output)
        ):
            # start of a new value after end of the root level object: looks like
            # newline delimited JSON -> turn into a root level array
            if not processed_comma:
                # repair missing comma
                self.output = insert_before_last_whitespace(self.output, ",")

            self.parse_newline_delimited_json()
        elif processed_comma:
            # repair: remove trailing comma
            self.output = strip_last_occurrence(self.output, ",")

        if self.is_end_of_document():
            # reached the end of the document properly
            return self.output

        raise self.unexpected_character()

    def parse_value(self) -> bool:
        self.parse_whitespace_and_skip_comments()
        processed = (
            self.parse_object()
            or self.parse_array()
            or self.parse_string()
            or self.parse_number()
            or self.parse_keywords()
            or self.parse_unquoted_string()
        )
        self.parse_whitespace_and_skip_comments()
        return processed

    def parse_whitespace_and_skip_comments(self) -> bool:
        start = self.i

        changed = self.parse_whitespace()
        while True:
            changed = self.parse_comment()
            if changed:
                changed = self.parse_whitespace()
            if not changed:
                break

        return self.i > start

    def parse_whitespace(self) -> bool:
        whitespace = ""

        while not self.is_end_of_document():
            char = self.char()

            normal = is_whitespace(char)
            special = is_special_whitespace(char)

            if not normal and not special:
                break

            if special:
                whitespace += " "  # repair special whitespace
            else:
                whitespace += char

            self.inc()

        if whitespace:
            self.output += whitespace
            return True
        return False

    def parse_comment(self) -> bool:
        # find a block comment '/* ... */'
        if not self.is_end_of_document() and not self.is_end_of_document(pos=+1):
            if self.char() == "/" and self.char(pos=+1) == "*":
                # repair block comment by skipping it
                while not self.is_end_of_document() and not at_end_of_block_comment(
                    self.text, self.i
                ):
                    self.inc()
                self.inc(by=2)
                return True

            # find a line comment '// ...'
            if self.char() == "/" and self.char(pos=+1) == "/":
                # repair line comment by skipping it
                while not self.is_end_of_document() and self.char() != "\n":
                    self.inc()
                return True

        return False

    def parse_character(self, char: str) -> bool:
        if not self.is_end_of_document():
            if self.char() == char:
                self.output += char
                self.inc()
                return True
        return False

    def skip_character(self, char: str) -> bool:
        if not self.is_end_of_document() and self.char() == char:
            self.inc()
            return True
        return False

    def skip_escape_character(self) -> bool:
        return self.skip_character("\\")

    def parse_object(self) -> bool:
        """Parse an object like '{"key": "value"}'"""
        if not self.is_end_of_document() and self.char() == "{":
            self.output += "{"
            self.inc()
            self.parse_whitespace_and_skip_comments()

            initial = True
            while not self.is_end_of_document() and self.char() != "}":
                if not initial:
                    processed_comma = self.parse_character(",")
                    if not processed_comma:
                        # repair missing comma
                        self.output = insert_before_last_whitespace(self.output, ",")
                    self.parse_whitespace_and_skip_comments()
                else:
                    processed_comma = True
                    initial = False

                processed_key = self.parse_string() or self.parse_unquoted_string()
                if not processed_key:
                    if self.is_end_of_document() or self.char() in "{}[]":
                        # repair trailing comma
                        self.output = strip_last_occurrence(self.output, ",")
                        break
                    raise self.object_key_expected()

                self.parse_whitespace_and_skip_comments()
                processed_colon = self.parse_character(":")
                if not processed_colon:
                    if is_start_of_value(self.char()):
                        # repair missing colon
                        self.output = insert_before_last_whitespace(self.output, ":")
                    else:
                        raise self.colon_expected()
                processed_value = self.parse_value()
                if not processed_value:
                    if processed_colon:
                        raise self.object_value_expected()
                    raise self.colon_expected()

            if not self.is_end_of_document() and self.char() == "}":
                self.output += "}"
                self.inc()
            else:
                # repair missing end bracket
                self.output = insert_before_last_whitespace(self.output, "}")

            return True

        return False

    def parse_array(self) -> bool:
        """Parse an array like '["item1", "item2", ...]'"""
        if not self.is_end_of_document() and self.char() == "[":
            self.output += "["
            self.inc()
            self.parse_whitespace_and_skip_comments()

            initial = True
            while not self.is_end_of_document() and self.char() != "]":
                if not initial:
                    processed_comma = self.parse_character(",")
                    if not processed_comma:
                        # repair missing comma
                        self.output = insert_before_last_whitespace(self.output, ",")
                else:
                    initial = False

                processed_value = self.parse_value()
                if not processed_value:
                    # repair trailing comma
                    self.output = strip_last_occurrence(self.output, ",")
                    break

            if not self.is_end_of_document() and self.char() == "]":
                self.output += "]"
                self.inc()
            else:
                # repair missing closing array bracket
                self.output = insert_before_last_whitespace(self.output, "]")

            return True

        return False

    def parse_newline_delimited_json(self):
        """Parse and repair Newline Delimited JSON (NDJSON):
        multiple JSON objects separated by a newline character
        """
        # repair NDJSON
        initial = True
        processed_value = True
        while processed_value:
            if not initial:
                # parse optional comma, insert when missing
                processed_comma = self.parse_character(",")
                if not processed_comma:
                    # repair: add missing comma
                    self.output = insert_before_last_whitespace(self.output, ",")
            else:
                initial = False

            processed_value = self.parse_value()

            if not processed_value:
                # repair: remove trailing comma
                self.output = strip_last_occurrence(self.output, ",")

        # repair: wrap the output inside array brackets
        self.output = f"[\n{self.output}\n]"

    def parse_string(self) -> bool:
        """Parse a string enclosed by double quotes "...". Can contain escaped quotes
        Repair strings enclosed in single quotes or special quotes
        Repair an escaped string
        """
        if not self.is_end_of_document():
            skip_escape_chars = self.char() == "\\"
            if skip_escape_chars:
                # repair: remove the first escape character
                self.inc()
                skip_escape_chars = True

            if not self.is_end_of_document() and is_quote(self.char()):
                is_end_quote = (
                    is_single_quote if is_single_quote(self.char()) else is_double_quote
                )

                if self.char() != '"':
                    pass  # TODO?: repair non-normalized quote
                self.output += '"'
                self.inc()

                while not self.is_end_of_document() and not is_end_quote(self.char()):
                    if self.char() == "\\":
                        char = self.char(pos=+1)
                        escape_char = ESCAPE_CHARACTERS.get(char)
                        if escape_char:
                            self.output += self.text[self.i : self.i + 2]
                            self.inc(by=2)
                        elif char == "u":
                            if (
                                not self.is_end_of_document(pos=+5)
                                and is_hex(self.char(pos=+2))
                                and is_hex(self.char(pos=+3))
                                and is_hex(self.char(pos=+4))
                                and is_hex(self.char(pos=+5))
                            ):
                                self.output += self.text[self.i : self.i + 6]
                                self.inc(by=6)
                            else:
                                raise self.invalid_unicode_character(self.i)
                        else:
                            # repair invalid escape character: remove it
                            self.output += char
                            self.inc(by=2)
                    else:
                        char = self.char()

                        if char == '"' and self.char(pos=-1) != "\\":
                            # repair unescaped double quote
                            self.output += "\\" + char
                            self.inc()
                        elif is_control_character(char):
                            # unescaped control character
                            self.output += CONTROL_CHARACTERS[char]
                            self.inc()
                        else:
                            if not is_valid_string_character(char):
                                raise self.invalid_character(char)
                            self.output += char
                            self.inc()

                    if skip_escape_chars:
                        processed = self.skip_escape_character()
                        if processed:
                            pass  # repair: skipped escape character (nothing to do)

                if not self.is_end_of_document() and is_quote(self.char()):
                    if self.char() != '"':
                        pass  # TODO:? repair non-normalized quote

                    self.output += '"'
                    self.inc()
                else:
                    # repair missing end quote
                    self.output += '"'

                self.parse_concatenated_string()

                return True

        return False

    def parse_concatenated_string(self) -> bool:
        """Repair concatenated strings like \"hello\" + \"world\", change this into \"helloworld\" """
        processed = False

        self.parse_whitespace_and_skip_comments()
        while not self.is_end_of_document() and self.char() == "+":
            processed = True
            self.inc()
            self.parse_whitespace_and_skip_comments()

            # repair: remove the end quote of the first string
            self.output = strip_last_occurrence(self.output, '"', True)
            start = len(self.output)
            self.parse_string()

            # repair: remove the start quote of the second string
            self.output = remove_at_index(self.output, start, 1)

        return processed

    def parse_number(self) -> bool:
        """Parse a number like 2.4 or 2.4e6"""
        if not self.is_end_of_document():
            start = self.i
            if self.char() == "-":
                self.inc()
                err = self.expect_digit(start)
                if err:
                    raise err

            if not self.is_end_of_document() and self.char() == "0":
                self.inc()
            elif not self.is_end_of_document() and self.char() in "123456789":
                self.inc()
                while not self.is_end_of_document() and self.char().isdigit():
                    self.inc()

            if not self.is_end_of_document() and self.char() == ".":
                self.inc()
                err = self.expect_digit(start)
                if err:
                    raise err
                while not self.is_end_of_document() and self.char().isdigit():
                    self.inc()

            if not self.is_end_of_document() and self.char() in "eE":
                self.inc()
                if not self.is_end_of_document() and self.char() in "+-":
                    self.inc()
                err = self.expect_digit(start)
                if err:
                    raise err
                while not self.is_end_of_document() and self.char().isdigit():
                    self.inc()

            if self.i > start:
                self.output += self.text[start : self.i]
                return True

        return False

    def parse_keywords(self) -> bool:
        """Parse keywords true, false, null
        Repair Python keywords True, False, None
        """
        return (
            self.parse_keyword("true", "true")
            or self.parse_keyword("false", "false")
            or self.parse_keyword("null", "null")
            # repair Python keywords True, False, None
            or self.parse_keyword("True", "true")
            or self.parse_keyword("False", "false")
            or self.parse_keyword("None", "null")
        )

    def parse_keyword(self, name: str, value: str) -> bool:
        if self.text[self.i : self.i + len(name)] == name:
            self.output += value
            self.inc(by=len(name))
            return True

        return False

    def parse_unquoted_string(self) -> bool:
        """Repair and unquoted string by adding quotes around it
        Repair a MongoDB function call like NumberLong("2")
        Repair a JSONP function call like callback({...});
        """
        # note that the symbol can end with whitespaces: we stop at the next delimiter
        start = self.i
        while not self.is_end_of_document() and not is_delimiter(self.char()):
            self.inc()

        if self.i > start:
            if not self.is_end_of_document() and self.char() == "(":
                # repair a MongoDB function call like NumberLong("2")
                # repair a JSONP function call like callback({...});
                self.inc()

                self.parse_value()

                if not self.is_end_of_document() and self.char() == ")":
                    # repair: skip close bracket of function call
                    self.inc()
                    if not self.is_end_of_document() and self.char() == ";":
                        # repair: skip semicolon after JSONP call
                        self.inc()

                return True

            # else repair unquoted string

            # first, go back to prevent getting trailing whitespaces in the string
            while not self.is_start_of_document() and is_whitespace(self.char(pos=-1)):
                self.dec()

            symbol = self.text[start : self.i]
            self.output += json.dumps(symbol)

            return True

        return False

    def expect_digit(self, start: int) -> Optional[JsonRepairError]:
        if self.is_end_of_document() or not self.char().isdigit():
            num_so_far = self.text[start : self.i]
            return JsonRepairError(
                f"Invalid number '{num_so_far}', expecting a digit {self.got()}", 2
            )

    def invalid_character(self, char: str) -> JsonRepairError:
        return JsonRepairError("Invalid character " + json.dumps(char), self.i)

    def unexpected_character(self) -> JsonRepairError:
        return JsonRepairError(
            "Unexpected character " + json.dumps(self.text[self.i]), self.i
        )

    def unexpected_end(self) -> JsonRepairError:
        return JsonRepairError("Unexpected end of json string", len(self.text))

    def object_key_expected(self) -> JsonRepairError:
        return JsonRepairError("Object key expected", self.i)

    def object_value_expected(self) -> JsonRepairError:
        return JsonRepairError("Object value expected", self.i)

    def colon_expected(self) -> JsonRepairError:
        return JsonRepairError("Colon expected", self.i)

    def invalid_unicode_character(self, start: int) -> JsonRepairError:
        end = start + 2
        while re.match(r"\w", self.text[end]):
            end += 1
        chars = self.text[start:end]
        return JsonRepairError(f'Invalid unicode character "{chars}"', self.i)

    def got(self) -> str:
        return (
            f"but got '{self.char()}'"
            if not self.is_end_of_document()
            else "but reached end of input"
        )
