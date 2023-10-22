from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
import uvicorn
import watson
import logging
from parse_rest.connection import register
from parse_rest.datatypes import Object
import os

logging.basicConfig(level=10, format='%(asctime)s %(levelname)s: %(message)s')
logger = logging.getLogger()
logger.debug("log level: 10")

app = FastAPI()


class PostParseObject(Object):
    pass


def send_to_parse(object_id: str, llm_response: dict):
    # Initialize Parse SDK with your Parse Server details
    register(
        "collabothon",
        # "YOUR_REST_API_KEY",
        master_key=os.getenv("MASTERKEYPARSE",""),
        server_url="https://polarny.it/parse/classes/Post"
    )

    # Specify the object's objectId and the field you want to update
    field_to_update = "sentiment"
    new_field_value = llm_response

    # Retrieve the object by its objectId
    try:
        obj = PostParseObject.Query.get(objectId=object_id)
        if obj:
            # Update the specified field
            obj[field_to_update] = new_field_value
            obj.save()
            print(f"Field '{field_to_update}' in object '{object_id}' updated successfully.")
        else:
            print(f"Object with objectId '{object_id}' not found.")
    except Exception as e:
        print(f"Error updating object: {e}")


@app.post("/classify_emotions")
async def classify_emotions(post_message: dict):
    try:
        statement_to_classify = post_message["comment"]
        object_id = post_message["objectId"]

        new_model = watson.LlamaModel()
        logger.debug(statement_to_classify)
        response = new_model.run_model(statement_to_classify)
        logger.debug(response)

        send_to_parse(object_id, response)
        return {"message": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
