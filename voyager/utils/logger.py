import json
# import logging

class JSONLogger:
    def __init__(self, log_path):
        self.file = open(log_path,mode='a',)
        
    def log(self, message):
        self.file.write(json.dumps(message))
        self.file.flush()

