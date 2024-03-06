import asyncio
import json
import os
import random
import smtplib
import threading
import traceback
import uuid
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from typing import Annotated, Dict, List, Optional, Set, Union
from urllib.parse import parse_qs, urlparse

import uvicorn
import yagmail
from colorama import Fore
from fastapi import (
    Body,
    Cookie,
    Depends,
    FastAPI,
    File,
    Form,
    Path,
    Query,
    Request,
    Response,
    UploadFile,
    WebSocket,
)
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse
from markdown2 import markdown, markdown_path
from sqlalchemy.orm import Session
from starlette.endpoints import WebSocketEndpoint

from AgentVerseIO.BaseIO import AgentVerseIO
from AgentVerseIO.exception import (
    AgentVerseIOWebSocketConnectError,
    AgentVerseIOWebSocketReceiveError,
)
from AgentVerseIO.input.WebSocketInput import WebSocketInput
from AgentVerseIO.output.WebSocketOutput import WebSocketOutput
from AgentVerseServer.database import InteractionBaseInterface, UserBaseInterface
from AgentVerseServer.database.connect import DBConnection
from AgentVerseServer.envs import AgentVerseServerEnv
from AgentVerseServer.exts.mail_ext import email_content
from AgentVerseServer.interaction import AgentVerseInteraction
from agentverse.logging import Logger
from AgentVerseServer.manager import WebSocketConnectionManager
from AgentVerseServer.models.interaction import InteractionBase
from AgentVerseServer.models.parameter import InteractionParameter
from AgentVerseServer.response_body import ResponseBody, WebsocketResponseBody
from AgentVerseServer.server import AgentVerseServer
from AgentVerseServer.utils import AutoReplayUtil, ShareUtil

if not os.path.exists(os.path.join(AgentVerseServerEnv.base_dir, "logs")):
    os.makedirs(os.path.join(AgentVerseServerEnv.base_dir, "logs"))

logger = Logger(
    log_dir=os.path.join(AgentVerseServerEnv.base_dir, "logs"),
    log_file="app.log",
    log_name="AgentVerseServerApp",
)


app = FastAPI()


if AgentVerseServerEnv.DB.db_type != "file":
    connection = DBConnection(AgentVerseServerEnv)
else:
    connection = None


# 中间件
@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    # 默认响应
    response = Response("Internal server error", status_code=500)
    if AgentVerseServerEnv.DB.db_type in ["sqlite", "mysql", "postgresql"]:
        try:
            request.state.db = connection.db_session
            response = await call_next(request)
        finally:
            # 关闭数据库会话
            request.state.db.close()
    else:
        response = await call_next(request)
    return response


# 依赖项,获取数据库会话对象
def get_db(request: Request):
    if AgentVerseServerEnv.DB.db_type in ["sqlite", "mysql", "postgresql"]:
        return request.state.db
    else:
        return None


broadcast_lock = threading.Lock()
websocket_queue: asyncio.Queue = None
manager: WebSocketConnectionManager = None
executor: ThreadPoolExecutor = None
userInterface: UserBaseInterface = None
interactionInterface: InteractionBaseInterface = None
yag: yagmail.SMTP = None


async def startup_event():
    logger.info("AgentVerse Service Startup Param:")
    for key, item in AgentVerseServerEnv.__dict__.items():
        if not key.startswith("__"):
            logger.info(f"{' '*10}{key}: {item}")

    global websocket_queue
    global manager
    global executor
    global userInterface
    global interactionInterface
    global yag
    websocket_queue = asyncio.Queue()
    logger.info("init websocket_queue")
    logger.typewriter_log(
        title=f"AgentVerseServer is running on {AgentVerseServerEnv.host}:{AgentVerseServerEnv.port}",
        title_color=Fore.RED,
    )
    if AgentVerseServerEnv.default_login:
        logger.typewriter_log(
            title=f"Default user: admin, token: agentverse-admin, you can use it to login",
            title_color=Fore.RED,
        )

    manager = WebSocketConnectionManager()
    logger.typewriter_log(title=f"init a websocket manager", title_color=Fore.RED)

    logger.typewriter_log(
        title=f"init a thread pool executor, max_workers: {AgentVerseServerEnv.workers}",
        title_color=Fore.RED,
    )
    executor = ThreadPoolExecutor(max_workers=AgentVerseServerEnv.workers)

    if AgentVerseServerEnv.DB.db_type in ["sqlite", "mysql", "postgresql"]:
        from AgentVerseServer.database.connect import DBConnection
        from AgentVerseServer.database.dbi import (
            InteractionDBInterface,
            UserDBInterface,
        )

        userInterface = UserDBInterface(AgentVerseServerEnv)
        interactionInterface = InteractionDBInterface(AgentVerseServerEnv)

    else:
        from AgentVerseServer.database.lsi import (
            InteractionLocalStorageInterface,
            UserLocalStorageInterface,
        )

        logger.info("init localstorage connection: users.json")
        userInterface = UserLocalStorageInterface(AgentVerseServerEnv)
        logger.info("init localstorage connection: interaction.json")
        interactionInterface = InteractionLocalStorageInterface(AgentVerseServerEnv)

    if AgentVerseServerEnv.Email.send_email:
        yag = yagmail.SMTP(
            user=AgentVerseServerEnv.Email.email_user,
            password=AgentVerseServerEnv.Email.email_password,
            host=AgentVerseServerEnv.Email.email_host,
        )
        logger.info("init yagmail")

    ShareUtil.register_db(db=interactionInterface, user_db=userInterface)


@app.on_event("startup")
async def startup():
    await startup_event()


@app.on_event("shutdown")
async def shutdown():
    if websocket_queue:
        await websocket_queue.put(None)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=400, content={"status": "failed", "message": exc.errors()}
    )


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def check_user_auth(user_id: str = Form(...), token: str = Form(...)):
    """ """
    if userInterface.user_is_exist(user_id=user_id) == False:
        return False
    if not userInterface.user_is_valid(user_id=user_id, token=token):
        return False
    return True


@app.post("/register")
async def register(
    email: str = Form(...),
    name: str = Form(...),
    corporation: str = Form(...),
    position: str = Form(...),
    industry: str = Form(...),
    db: Session = Depends(get_db),
) -> ResponseBody:
    """ """
    userInterface.register_db(db)
    if userInterface.user_is_exist(email=email):
        return ResponseBody(success=False, message="user is already exist")

    token = uuid.uuid4().hex
    user = {
        "user_id": uuid.uuid4().hex,
        "email": email,
        "name": name,
        "token": token,
        "available": False,
        "corporation": corporation,
        "position": position,
        "industry": industry,
        "create_time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "update_time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }
    try:
        contents = email_content(user)

        if AgentVerseServerEnv.Email.send_email:
            yag.send(user["email"], "AgentVerse Token Verification", contents)
        else:
            user["available"] = True
        userInterface.add_user(user)
    except smtplib.SMTPAuthenticationError as e:
        logger.error(traceback.format_exc())
        return ResponseBody(success=False, message="email send failed!", data=None)

    except:
        logger.error(traceback.format_exc())
        return ResponseBody(success=False, message="register failed", data=None)
    return ResponseBody(
        data=user,
        success=True,
        message="Register success, we will send a email to you!",
    )


@app.get("/auth")
async def auth(
    user_id: str = Query(...), token: str = Query(...), db: Session = Depends(get_db)
) -> ResponseBody:
    """ """
    userInterface.register_db(db)
    user = userInterface.get_user(user_id=user_id)
    if (
        AgentVerseServerEnv.default_login
        and user_id == "admin"
        and token == "agentverse-admin"
    ):
        return ResponseBody(data=user.to_dict(), success=True, message="auth success")

    if user == None:
        return ResponseBody(success=False, message="user is not exist")

    if user.token != token:
        return ResponseBody(success=False, message="token is not correct")
    expired_time = datetime.now() - datetime.strptime(
        user.update_time, "%Y-%m-%d %H:%M:%S"
    )
    if expired_time.seconds > 60 * 60 * 24 * 7:
        return ResponseBody(success=False, message="token is expired")
    if user.available == False:
        user.available = True
        user.update_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        userInterface.update_user(user)
    else:
        return ResponseBody(success=False, message="user is already available!")

    return ResponseBody(data=user.to_dict(), success=True, message="auth success")


@app.post("/login")
async def login(
    email: str = Form(...), token: str = Form(...), db: Session = Depends(get_db)
) -> ResponseBody:
    """ """
    userInterface.register_db(db)
    user = userInterface.get_user(email=email)
    if (
        AgentVerseServerEnv.default_login
        and email == "admin"
        and token == "agentverse-admin"
    ):
        return ResponseBody(data=user.to_dict(), success=True, message="auth success")
    if user == None:
        return ResponseBody(success=False, message="user is not exist")

    if user.token != token:
        return ResponseBody(success=False, message="token is not correct")
    if user.available == False:
        return ResponseBody(success=False, message="user is not available")

    return ResponseBody(data=user.to_dict(), success=True, message="login success")


@app.post("/check")
async def check(token: str = Form(...), db: Session = Depends(get_db)) -> ResponseBody:
    """ """
    userInterface.register_db(db)
    if token is None:
        return ResponseBody(success=False, message="token is none")

    check = userInterface.token_is_exist(token)

    if check is True:
        return ResponseBody(data=check, success=True, message="token is effective")

    return ResponseBody(data=check, success=True, message="token is invalid")


@app.websocket_route("/ws/{client_id}", name="ws")
class MainServer(WebSocketEndpoint):
    encoding: str = "text"
    session_name: str = ""
    count: int = 0
    client_id: str = ""
    websocket: WebSocket = None

    """
    In this websocket, we will receive the args from user,
    and you can use it to run the interaction.
    specifically, the args is a dict, and it must contain a key named "goal" to tell AgentVerse what do you want to do.
    and you can add other keys to the args to tell AgentVerse what do you want to do.

    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.db: Session = None
        self.userInterface = userInterface
        self.interactionInterface = interactionInterface

    def register_db(self):
        if connection:
            self.db = connection.db_session
            logger.info("init websocket db session")
        else:
            self.db = None
        self.userInterface.register_db(self.db)
        self.interactionInterface.register_db(self.db)

    async def on_connect(self, websocket: WebSocket):
        self.client_id = self.scope.get("path_params", {}).get("client_id", None)
        self.date_str = datetime.now().strftime("%Y-%m-%d")
        self.log_dir = os.path.join(
            os.path.join(
                AgentVerseServerEnv.base_dir, "localstorage", "interact_records"
            ),
            self.date_str,
            self.client_id,
        )
        if not os.path.exists(self.log_dir):
            os.makedirs(self.log_dir)

        self.logger = Logger(
            log_dir=self.log_dir,
            log_file=f"interact.log",
            log_name=f"{self.client_id}_INTERACT",
        )
        query_string = self.scope.get("query_string", b"").decode()
        parameters = parse_qs(query_string)
        user_id = parameters.get("user_id", [""])[0]
        token = parameters.get("token", [""])[0]
        description = parameters.get("description", [""])[0]
        self.logger.typewriter_log(
            title=f"Receive connection from {self.client_id}: ",
            title_color=Fore.RED,
            content=f"user_id: {user_id}, token: {token}, description: {description}",
        )
        with broadcast_lock:
            await manager.connect(websocket=websocket, websocket_id=self.client_id)
        # await websocket.accept()
        # await websocket_queue.put(websocket)
        self.websocket = websocket
        self.register_db()

        if self.userInterface.user_is_exist(user_id=user_id) == False:
            raise AgentVerseIOWebSocketConnectError("user is not exist!")
        # auth
        if not self.userInterface.user_is_valid(user_id=user_id, token=token):
            raise AgentVerseIOWebSocketConnectError(
                f"userid='{user_id}', token='{token}', user is not available!"
            )
        # check running, you can edit it by yourself in envs.py to skip this check
        if AgentVerseServerEnv.check_running:
            if self.interactionInterface.is_running(user_id=user_id):
                raise AgentVerseIOWebSocketConnectError(
                    "You have a running interaction, please wait for it to finish!"
                )

        base = InteractionBase(
            interaction_id=self.client_id,
            user_id=user_id,
            create_time=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            description=description if description else "AgentVerse",
            recorder_root_dir="",
            status="waiting",
            message="waiting...",
            current_step=uuid.uuid4().hex,
            update_time=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        )
        self.interactionInterface.create_interaction(base)
        await websocket.send_text(
            WebsocketResponseBody(
                status="connect",
                success=True,
                message="connect success",
                data=base.to_dict(),
            ).to_text()
        )

    async def on_disconnect(self, websocket, close_code):
        try:
            self.interactionInterface.update_interaction_status(
                interaction_id=self.client_id,
                status="failed",
                message=f"failed, code: {close_code}",
                current_step=uuid.uuid4().hex,
            )
            self.logger.typewriter_log(
                title=f"Disconnect with client {self.client_id}: ", title_color=Fore.RED
            )
            await manager.disconnect(self.client_id, websocket)
        except Exception as e:
            logger.error(traceback.format_exc())
        finally:
            if self.db:
                self.db.close()

    async def on_receive(self, websocket, data):
        self.logger.typewriter_log(
            title=f"Receive data from {self.client_id}: ",
            title_color=Fore.RED,
            content=data,
        )
        args = await self.check_receive_data(data)
        # in this step, we need to update interaction to register file_list
        self.interactionInterface.update_interaction(
            {
                "interaction_id": self.client_id,
            }
        )
        parameter = InteractionParameter(
            interaction_id=self.client_id,
            parameter_id=uuid.uuid4().hex,
            args=args,
        )
        self.interactionInterface.add_parameter(parameter)
        self.logger.info(
            f"Register parameter: {parameter.to_dict()} into interaction of {self.client_id}, done!"
        )
        await asyncio.create_task(self.do_running_long_task(parameter))

    async def on_send(self, websocket: WebSocket):
        while True:
            await asyncio.sleep(10)
            await websocket.send_text(
                WebsocketResponseBody(
                    status="pong", success=True, message="pong", data={"type": "pong"}
                ).to_text()
            )

    async def check_receive_data(self, data):
        data = json.loads(data)
        args = data.get("args", {})
        # self.logger.info(f"!!!args :{args}")
        if not isinstance(args, dict):
            await self.websocket.send_text(
                WebsocketResponseBody(
                    status="failed", message="args is empty!", data=None
                ).to_text()
            )
            raise AgentVerseIOWebSocketReceiveError("args is empty!")
        return args

    async def do_running_long_task(self, parameter):
        current_step = uuid.uuid4().hex
        base = self.interactionInterface.get_interaction(interaction_id=self.client_id)
        self.interactionInterface.update_interaction_status(
            interaction_id=base.interaction_id,
            status="running",
            message="running",
            current_step=current_step,
        )

        interaction = AgentVerseInteraction(base=base, parameter=parameter)

        io = AgentVerseIO(
            input=WebSocketInput(
                max_wait_seconds=600,
                websocket=self.websocket,
            ),
            output=WebSocketOutput(websocket=self.websocket),
        )

        interaction.resister_logger(self.logger)
        self.logger.info(
            f"Register logger into interaction of {base.interaction_id}, done!"
        )

        io.set_logger(logger=interaction.logger)
        interaction.resister_io(io)
        self.logger.info(
            f"Register io into interaction of {base.interaction_id}, done!"
        )
        interaction.register_db(self.interactionInterface)
        self.logger.info(
            f"Register db into interaction of {base.interaction_id}, done!"
        )
        # Create AgentVerseServer
        server = AgentVerseServer()
        server.set_logger(logger=self.logger)
        self.logger.info(
            f"Register logger into AgentVerseServer of {base.interaction_id}, done!"
        )
        self.logger.info(
            f"Start a new thread to run interaction of {base.interaction_id}, done!"
        )
        task = asyncio.create_task(server.interact(interaction))
        await task
        with broadcast_lock:
            if manager.is_connected(self.client_id):
                await manager.disconnect(self.client_id, self.websocket)
        interaction.logger.info("done!")


if __name__ == "__main__":
    uvicorn.run(
        app=AgentVerseServerEnv.app,
        port=AgentVerseServerEnv.port,
        reload=AgentVerseServerEnv.reload,
        workers=AgentVerseServerEnv.workers,
        host=AgentVerseServerEnv.host,
    )
