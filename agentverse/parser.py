from agentverse.registry import Registry

output_parser_registry = Registry(name="OutputParserRegistry")

class OutputParseError(BaseException):
    """Exception raised when parsing output from a command fails."""
    def __init__(self, message):
        self.message = message

    def __str__(self):
        return "Failed to parse output of the model:%s\n " % self.message
