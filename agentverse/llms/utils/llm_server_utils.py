import requests
from typing import Optional

def get_llm_server_modelname(
    base_url: str = "http://localhost:8000", api_key=None, logger=None
) -> Optional[str]:
    # remove /v1 and any trailing slashes from the base_url
    base_url = base_url.replace("/v1", "").rstrip("/")
    try:
        if api_key:
            response = requests.get(
                f"{base_url}/v1/models", headers={"Authorization": f"Bearer {api_key}"}
            )
        else:
            response = requests.get(f"{base_url}/v1/models")
        if response.status_code == 200:
            # get the model name hosted by vLLM
            models = [m for m in response.json()["data"] if m["object"] == "model"]
            if len(models) == 0:
                if logger:
                    logger.warn(
                        "The vLLM server is running but not hosting any models."
                    )
                return None
            model_name = models[0]["id"]
            if logger:
                logger.info(f"vLLM server is running. Selecting: {model_name}.")
            return model_name
        else:
            if logger:
                logger.warn(
                    f"vLLM server is running but could not get the list of models. Status code: {response.status_code}"
                )
            return None
    except requests.exceptions.ConnectionError:
        if logger:
            logger.warn("No vLLM server running at the specified URL.")
        return None
    except Exception as e:
        if logger:
            logger.warn(f"Error while trying to get the vLLM model name: {e}")
        return None
