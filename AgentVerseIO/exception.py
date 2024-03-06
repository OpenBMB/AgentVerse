class AgentVerseIOError(Exception):
    """Base class for exceptions in this module."""

    pass


class AgentVerseIOInterruptError(AgentVerseIOError):
    """Exception raised for errors in the input.

    Attributes:
        message -- explanation of the error
    """

    def __init__(self, message="AgentVerse IO Interrupt!"):
        self.message = message
        super().__init__(self.message)


class AgentVerseIOTimeoutError(AgentVerseIOError):
    """Exception raised for errors in the input.

    Attributes:
        message -- explanation of the error
    """

    def __init__(self, message="AgentVerse IO Timeout!"):
        self.message = message
        super().__init__(self.message)


class AgentVerseIOCloseError(AgentVerseIOError):
    """Exception raised for errors in the input.

    Attributes:
        message -- explanation of the error
    """

    def __init__(self, message="AgentVerse IO Close!"):
        self.message = message
        super().__init__(self.message)


class AgentVerseIOWebSocketError(AgentVerseIOError):
    """Exception raised for errors in the input.

    Attributes:
        message -- explanation of the error
    """

    def __init__(self, message="AgentVerse IO WebSocket Error!"):
        self.message = message
        super().__init__(self.message)


class AgentVerseIOWebSocketTimeoutError(AgentVerseIOWebSocketError):
    """Exception raised for errors in the input.

    Attributes:
        message -- explanation of the error
    """

    def __init__(self, message="AgentVerse IO WebSocket Timeout!"):
        self.message = message
        super().__init__(self.message)


class AgentVerseIOWebSocketDisconnectError(AgentVerseIOWebSocketError):
    """Exception raised for errors in the input.

    Attributes:
        message -- explanation of the error
    """

    def __init__(self, message="AgentVerse IO WebSocket Disconnect!"):
        self.message = message
        super().__init__(self.message)


class AgentVerseIOWebSocketConnectError(AgentVerseIOWebSocketError):
    """Exception raised for errors in the input.

    Attributes:
        message -- explanation of the error
    """

    def __init__(self, message="AgentVerse IO WebSocket Connect Error!"):
        self.message = message
        super().__init__(self.message)


class AgentVerseIOWebSocketCloseError(AgentVerseIOWebSocketError):
    """Exception raised for errors in the input.

    Attributes:
        message -- explanation of the error
    """

    def __init__(self, message="AgentVerse IO WebSocket Close!"):
        self.message = message
        super().__init__(self.message)


class AgentVerseIOWebSocketSendError(AgentVerseIOWebSocketError):
    """Exception raised for errors in the input.

    Attributes:
        message -- explanation of the error
    """

    def __init__(self, message="AgentVerse IO WebSocket Send Error!"):
        self.message = message
        super().__init__(self.message)


class AgentVerseIOWebSocketReceiveError(AgentVerseIOWebSocketError):
    """Exception raised for errors in the input.

    Attributes:
        message -- explanation of the error
    """

    def __init__(self, message="AgentVerse IO WebSocket Receive Error!"):
        self.message = message
        super().__init__(self.message)
