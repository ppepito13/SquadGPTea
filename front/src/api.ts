import axios from 'axios';

export default axios.create({
  baseURL: `https://www.polarny.it/parse/`,
  headers: {
     'X-Parse-Application-Id': 'collabothon',
     'X-Parse-Session-Token': JSON.parse(localStorage.getItem("user")||"{}")?.sessionToken
   }
});

export const watsonSpeach2Text = axios.create({
  baseURL: `https://api.eu-gb.speech-to-text.watson.cloud.ibm.com/instances/948d9855-c5ba-408f-a9be-3a3911eb48cd`,
  headers: {
    'Content-Type': 'audio/webm;codecs=opus'
   }
});
