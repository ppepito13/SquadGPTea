import { GenericResponse, RecordingData, VoiceRecorder } from 'capacitor-voice-recorder';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-onsenui';
import { watsonSpeach2Text } from '../../api';
import audio from '../../assets/audio-file.flac';

const VoiceTest = () =>{
  const [recording, setRecording] = useState(false);
  const [record, setRecord] = useState(null as RecordingData|null);
  const [response, setResponse] = useState({});

  const ibmSpeachToTextCredencials = {
    "apikey": "WPBFo66pgEKC6eiu8YhjiZD1KLDy22fS0Bv6Ea2BnB5O",
    "iam_apikey_description": "Auto-generated for key crn:v1:bluemix:public:speech-to-text:eu-gb:a/a3e4a9f9151e4d52804092188ab4e4e8:948d9855-c5ba-408f-a9be-3a3911eb48cd:resource-key:5f0ccd29-1aee-452a-a520-871146d08305",
    "iam_apikey_name": "Auto-generated service credentials",
    "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
    "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/a3e4a9f9151e4d52804092188ab4e4e8::serviceid:ServiceId-af86f138-dff5-4a63-aafd-5452591bd11e",
    "url": "https://api.eu-gb.speech-to-text.watson.cloud.ibm.com/instances/948d9855-c5ba-408f-a9be-3a3911eb48cd"
  }


  useEffect(()=>{
      VoiceRecorder.canDeviceVoiceRecord().then((result: GenericResponse) => console.log(result.value))

      VoiceRecorder.hasAudioRecordingPermission().then((result: GenericResponse) => {
        if(!result.value){
          VoiceRecorder.requestAudioRecordingPermission().then((result: GenericResponse) => {
            console.log(result.value)
          })
        }
      })
  },[])

  const startRecord = () =>{
    VoiceRecorder.startRecording()
      .then((result: GenericResponse) => setRecording(true))
      .catch(error => console.log(error))
  }

  const stopRecord = () =>{
    VoiceRecorder.stopRecording()
      .then((result: RecordingData) => {
        setRecording(false);
        setRecord(result);
        console.log(result.value)
      })
      .catch(error => console.log(error))
  }

  const playRecord = () =>{
    const audioRef = new Audio(`data:${record!.value.mimeType};base64,${record!.value.recordDataBase64}`)
    audioRef.oncanplaythrough = () => audioRef.play()
    audioRef.load()
  }

  const readRecord = () =>{

    const dataURLtoFile = (dataurl, filename) =>{
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }
    const file = dataURLtoFile(`data:${record!.value.mimeType};base64,${record!.value.recordDataBase64}`, 'test.webm');

    watsonSpeach2Text.post("/v1/recognize", file,{
      auth: {
        username: "apikey",
        password: ibmSpeachToTextCredencials.apikey
      }
    }).then(({data})=>{
      setResponse(data.results[0].alternatives[0])
    })
  }


  return (
    <section>
      <h1>Vice Test</h1>
      {!recording && <Button modifier="fund" onClick={()=>startRecord()}>Stat Recording</Button>}
      {recording && <Button modifier="fund" onClick={()=>stopRecord()}>Stop Recording</Button>}
      <hr/>
      {record && <Button modifier="fund" onClick={()=>playRecord()}>Play Recording</Button>}
      {record && <Button modifier="fund" onClick={()=>readRecord()}>Read Recording</Button>}
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </section>
  )
}

export default VoiceTest;
