# The Minecraft Experiment

Welcome to the codebase for our Minecraft experiment, as presented in the paper [AgentVerse: Facilitating Multi-Agent Collaboration and Exploring Emergent Behaviors](https://arxiv.org/abs/2308.10848). This project is an extension of the [Voyager](https://github.com/MineDojo/Voyager/tree/main) codebase. Our modification focuses on ensuring compatibility with multiple agents. Furthermore, we've provided a Docker wrap-around for convenient deployment.

Follow the subsequent instructions to deploy the experiment on your local system. **Please note that our tests were primarily on MacOS.** However, the setup is expected to be compatible with other operating systems.

## Getting Started

### 1. Setting up Docker
Ensure you've installed [Docker](https://docs.docker.com/get-docker/). Docker will be used for running the Minecraft server and the mineflayer client.

### 2. Setting up MongoDB
Pull the MongoDB Docker to handle the environmental data storage:
```bash
docker pull mongo
docker network create mcbot-net
docker run --name mongodb -p 27017:27017 --network mcbot-net -d -e MONGO_INITDB_ROOT_USERNAME=user -e MONGO_INITDB_ROOT_PASSWORD=000000 mongo
```

### 3. Installing and Using Mongosh
Grab a copy of [Mongosh](https://www.mongodb.com/docs/mongodb-shell/) and install it. Once completed, use the command below to initiate a connection with the MongoDB server:
```bash
mongosh --host localhost --port 27017 --username user --password 000000 --authenticationDatabase admin
```

After successfully connecting, generate a new database titled `mc`:
```bash
# Within the mongosh
use mc
db.createUser({ user: "user", pwd: "000000", roles: [{ role: "readWrite", db: "mc" }] })
```

### 4. Acquiring and Building the Environment via Docker
Start by downloading the necessary files from either [Tsinghua Cloud](https://cloud.tsinghua.edu.cn/f/f57bb9ae244d4607a066/?dl=1) or [Google Drive](https://drive.google.com/file/d/1S-NyuD6MoZSjUIX3-zFvFN8DGm9bgB6R/view?usp=sharing). After extraction, navigate to the folder via terminal and execute the command below to construct the Docker image:
```bash
bash build_all.sh
```

### 5. Executing the Environment Docker
With the Docker image prepared, run the image utilizing the following command:
```bash
docker-compose up
```

### 6. Cloning and Deploying the Code
```bash
git clone git@github.com:OpenBMB/AgentVerse.git -b minecraft AgentVerse-minecraft
cd AgentVerse-minecraft
pip install -r requirements.txt
bash run.sh
```
Feel free to adjust the `task` variable within the script for alternate tasks. Browse `agentverse/tasks/minecraft` for a catalog of available tasks.
