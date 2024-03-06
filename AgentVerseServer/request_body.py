import re
from typing import Optional, Union
from fastapi import Form
from pydantic import BaseModel, validator
from typing import Union
class User(BaseModel):
    email: str
    token: Union[str, None] = None

    @validator("email")
    def email_is_valid(cls, v):
        if v == "":
            raise ValueError("email is empty")
        if re.match(r"[^@]+@[^@]+\.[^@]+", v) == None:
            raise ValueError("email is invalid")
        
        return v
    


    # @validator("email")
    # def email_is_valid(cls, v):
    #     if v == "":
    #         raise ValueError("email is empty")
    #     if re.match(r"[^@]+@[^@]+\.[^@]+", v) == None:
    #         raise ValueError("email is invalid")
        
    #     return v


class RequestBody(BaseModel):
    token: str
    query: str
    mode: str
