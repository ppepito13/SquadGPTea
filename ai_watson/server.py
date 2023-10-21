from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
import uvicorn
import watson
import logging

logging.basicConfig(level=10, format='%(asctime)s %(levelname)s: %(message)s')
logger = logging.getLogger()
logger.debug("log level: 10")

app = FastAPI()

# Replace these with your MongoDB connection details
MONGODB_CONNECTION_STRING = "mongodb://localhost:27017/"
DB_NAME = "collabothon"
COLLECTION_NAME = "Post"

client = MongoClient(MONGODB_CONNECTION_STRING)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

statement_example = {"filled_exercise": "I was sad"}


@app.post("/classify_emotions")
async def classify_emotions(post_message: dict):
    try:
        new_model = watson.LlamaModel()
        logger.debug(post_message["filled_excercise"])
        print(post_message["filled_excercise"])
        response = new_model.run_model(statement_to_classify=post_message["filled_excercise"])
        # collection.insert_one(data_dict)
        logger.debug(response)
        return {"message": "Emotion data added successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
