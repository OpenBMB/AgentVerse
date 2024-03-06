from abc import ABCMeta, abstractmethod

from AgentVerseIO.exception import AgentVerseIOCloseError


class BaseOutput(metaclass=ABCMeta):
    def __init__(self, kwargs: dict = None):
        self.kwargs = kwargs

    def set_logger(self, logger):
        self.logger = logger

    def run(self):
        raise NotImplementedError

    def close(self):
        # raise AgentVerseIOCloseError("close connection!")
        pass
