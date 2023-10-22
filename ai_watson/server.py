from fastapi import FastAPI, HTTPException
import uvicorn
import watson
import logging
import os
import requests
import json

logging.basicConfig(level=10, format='%(asctime)s %(levelname)s: %(message)s')
logger = logging.getLogger()
logger.debug("log level: 10")

app = FastAPI()


def send_to_parse(object_id: str, llm_response: dict):

    parse_server_url = "https://polarny.it/parse"
    headers = {
        'X-Parse-Application-Id': 'collabothon',
        'X-Parse-Master-Key': os.getenv("MASTERKEYPARSE",""),
        'Content-Type': 'application/json',
    }

    # Specify the object's objectId and the field you want to update
    object_id = object_id
    field_to_update = "sentiment"
    new_field_value = llm_response

    logger.debug(f"headers:{headers}, new_field_value: {new_field_value}")

    # Retrieve the current object data
    response = requests.get(f"{parse_server_url}/classes/Post/{object_id}", headers=headers)

    if response.status_code == 200:
        # current_data = response.json()
        # current_data[field_to_update] = new_field_value
        # # Exclude the createdAt field from the data to avoid the schema mismatch error
        # if "createdAt" in current_data:
        #     del current_data["createdAt"]
        # update_response = requests.put(f"{parse_server_url}/classes/Post/{object_id}",
        #                                headers=headers, data=json.dumps(current_data))

        # Create a JSON object with only the field you want to update
        update_data = {
            field_to_update: new_field_value
        }
        update_response = requests.put(f"{parse_server_url}/classes/Post/{object_id}",
                                       headers=headers, data=json.dumps(update_data))

        if update_response.status_code == 200:
            print(f"Field '{field_to_update}' in object '{object_id}' updated successfully.")
        else:
            print(f"Error updating object: {update_response.text}")
    else:
        print(f"Error retrieving object: {response.text}")


@app.post("/classify_emotions")
async def classify_emotions(post_message: dict):
    try:
        logger.debug(f"post_message: {post_message}")
        statement_to_classify = post_message["comment"]
        object_id = post_message["objectId"]

        new_model = watson.LlamaModel(statement_to_classify)
        logger.debug(statement_to_classify)
        response = new_model.run_model()
        logger.debug(response)

        send_to_parse(object_id, response)
        return {"message": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
