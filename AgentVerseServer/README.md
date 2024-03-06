# AgentVerse-Server Frontend and Backend Demo

This is a demo of the AgentVerse-Server frontend and backend. The backend communication is mainly implemented using fastapi's `websocket`, supplemented with essential restful APIs. The frontend service is deployed locally.


## Launching AgentVerse-Server

First, we ran web ui docker when build ToolServer network.

This will start an instance of AgentVerse-Server listening to port `8090` on the local machine. The configuration details can be found in the `AgentVerseServer/docker-compose.yml` file.

After completing the image compilation and startup, you need to start the nginx service. Execute the following command on another command line:

```
docker exec AgentVerse-Server systemctl start nginx
```

When you see the following output, it means the image has been successfully compiled and launched:

![AgentVerse-Server成功示例](https://gitee.com/sailaoda/pic2/raw/master/2023/202309272123424.png)


## Using AgentVerse-Server

After completing the above steps, you can access the frontend interface by visiting http://localhost:5173 in a web browser. Default user: admin, token: agentverse-admin, you can use it to login. An example of the interface is shown below:

![login](https://gitee.com/sailaoda/pic2/raw/master/2023/202309272130865.png)

Once you're inside the AgentVerse-Server, you can start using it as demonstrated:

![playground](https://gitee.com/sailaoda/pic2/raw/master/2023/202309272132478.png)

## Additional Information

If you are running this in a Windows environment, you might encounter an error while building the image, which looks like this: `AgentVerseServer/dockerfiles/build.sh: line 2: cd: $'AgentVerseServer/dockerfiles\r': No such file or directory` as shown below:

![windows_build_docker](https://gitee.com/sailaoda/pic2/raw/master/2023/202309280213559.png)

To resolve this, you can navigate to the directory first, then proceed with the compilation. Use the following commands:

```bash
cd AgentVerseServer/dockerfiles/
bash build.sh
```

