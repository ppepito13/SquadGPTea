import getpass
import os
from ibm_watson_machine_learning.foundation_models.utils.enums import ModelTypes
from ibm_watson_machine_learning.metanames import GenTextParamsMetaNames as GenParams
from ibm_watson_machine_learning.foundation_models.utils.enums import DecodingMethods
from ibm_watson_machine_learning.foundation_models import Model
from ibm_watson_machine_learning.foundation_models.extensions.langchain import WatsonxLLM
from ibm_watson_machine_learning import APIClient
from langchain import PromptTemplate
from langchain.chains import LLMChain
from langchain.chains import SimpleSequentialChain
import logging

logger = logging.getLogger()


class LlamaModel:
    def __init__(self):
        self.credentials = {
            "url":  "https://eu-de.ml.cloud.ibm.com",
            "apikey": os.getenv("APIKEY", ""),
        }
        self.project_id = os.getenv("PROJECTID", "")
        self.model = self.create_model()

    def create_model(self):
        model_id_llama = ModelTypes.LLAMA_2_70B_CHAT
        parameters_llama = {
            GenParams.MAX_NEW_TOKENS: 1000,
        }
        flan_llama_model = Model(
            model_id=model_id_llama,
            credentials=self.credentials,
            project_id=self.project_id,
            params=parameters_llama,
        )
        return flan_llama_model

    def create_prompt_template(self):
        ocena_prompt = "Please make sentiment analysis in below statement that is written in polish: {input_variables}." \
                       "Recognise emotions and their intensity. Put it all in one json, with key as emotion you have" \
                       "detected and value as its intensity. Give me only this json."
        prompt_llama = PromptTemplate(
            input_variables=["statement"],
            template=ocena_prompt,
        )
        logger.debug(prompt_llama.dict())
        return prompt_llama

    def run_model(self, statement_to_classify):
        if self.model is None:
            raise ValueError("Model is not created. Call create_model first.")
        logger.debug(statement_to_classify)
        prompt_llama = self.create_prompt_template()
        flan_to_llama = LLMChain(llm=self.model.to_langchain(), prompt=prompt_llama)
        qa = SimpleSequentialChain(chains=[flan_to_llama], verbose=True)
        outcome = qa.run(statement_to_classify)
        logger.debug(outcome)
        return outcome
