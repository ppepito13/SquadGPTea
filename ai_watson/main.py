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

credentials = {
    "url":  "https://eu-de.ml.cloud.ibm.com",
    "apikey": "",
}

project_id = "66b362ff-0efd-4b78-ae71-c19963fe7d15"

print([model.name for model in ModelTypes])

model_id_llama = ModelTypes.LLAMA_2_70B_CHAT
parameters_llama = {
    GenParams.MAX_NEW_TOKENS: 1000,
}
flan_llama_model = Model(
    model_id=model_id_llama,
    credentials=credentials,
    project_id=project_id,
    params=parameters_llama,
)

ocena_prompt = "Please make sentiment analysis in below statement that is written in polish: {input_variables}. Recognise" \
               "emotions and their intensity. Put it all in one json, with key as emotion you have detected and" \
               "value as its intensity. Give me only this json."

prompt_llama = PromptTemplate(
    input_variables=["statement"],
    template=ocena_prompt,
)

flan_llama_llm = WatsonxLLM(model=flan_llama_model)
flan_to_llama = LLMChain(llm=flan_llama_model.to_langchain(), prompt=prompt_llama)
qa = SimpleSequentialChain(chains=[flan_to_llama], verbose=True)
statement = "Podczas lekcji plastyki, nie mogłem zrozumieć instrukcji na zadanie. Byłem zirytowany, ale poprosiłem nauczyciela o pomoc. To ważne nauczenie się, że można pytać o wsparcie, gdy czegoś nie rozumiesz."
qa.run(statement)

