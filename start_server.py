import uvicorn

from AgentVerseServer.envs import AgentVerseServerEnv

if __name__ == "__main__":
    uvicorn.run(
        app="app:app",
        host=AgentVerseServerEnv.host,
        port=AgentVerseServerEnv.port,
        reload=AgentVerseServerEnv.reload,
        workers=AgentVerseServerEnv.workers,
    )
