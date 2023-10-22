import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Select } from 'react-onsenui';
import { useNavigate } from 'react-router-dom';
import { newPost } from '../../../redux/PostSlice';
import store, { RootState } from '../../../redux/store';
import { Camera, CameraResultType } from '@capacitor/camera';
import { uploadFile } from '../../../redux/ApiSice';
import { feelLikeList } from '../../common/const';
import { useSelector } from 'react-redux';
import { HomeworkType } from '../../../types';
import { requestHomeworks } from '../../../redux/HomeworkSlice';
import emotionsList from '../../common/emocje.json';
import emotionGrupsList from '../../common/grupyEmocji.json';
import { FaCamera, FaCircle, FaPlay, FaRegTimesCircle, FaRegTrashAlt, FaSave, FaStop } from "react-icons/fa";
import { GenericResponse, RecordingData, VoiceRecorder } from 'capacitor-voice-recorder';
import ons from 'onsenui';

const NewPostAdvance = () =>{
  const dispatch = store.dispatch;
  const navigate = useNavigate();
  const homeworks:HomeworkType[] = useSelector((root:RootState)=>root.homeworkSlice.homeworkStore.homeworks);

  const [comment, setComment] = useState("");
  const [feelLike, setFeelLike] = useState(-1);
  const [emotions, setEmotions] = useState([] as string[]);
  const [images, setImages] = useState([] as string[]);
  const [homework, setHomework] = useState("");
  const [record, setRecord] = useState(null as RecordingData|null);
  const [records, setRecords] = useState([] as string[]);

  const [recording, setRecording] = useState(false);
  const [selectGroupEmotion, setSelectGroupEmotion] = useState("");
  const [selectEmotion, setSelectEmotion] = useState("")

  useEffect(()=>{
    dispatch(requestHomeworks())
  },[dispatch])

  useEffect(()=>{
    try{
      VoiceRecorder.canDeviceVoiceRecord().then((result: GenericResponse) => console.log(result.value));
      VoiceRecorder.hasAudioRecordingPermission().then((result: GenericResponse) => {
        if(!result.value){
          VoiceRecorder.requestAudioRecordingPermission().then((result: GenericResponse) => {
            console.log(result.value)
          })
        }
      })
    }catch(e){
      ons.notification.toast("NO privilages", {
        timeout: 2000
      });
    }
  },[])

  const addPost = () =>{
    dispatch(newPost({
      comment, feelLike, emotions, images, records, homework:{"__type":"Pointer",className:"Homework", objectId:homework}
    })).then(res=>{
      navigate("/")
    })
  }

  const takePicture = async () => {
    try{
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
      let blob = await fetch(image.webPath!).then(r => r.blob());
      var file = new File([blob], "name");
      dispatch(uploadFile("test1", file, "png")).then((res)=>{
        setImages([...images, res.url]);
      }).catch(err=>{
          setImages([err]);
      })
    }catch(ee){
      ons.notification.toast("NO privilages", {
        timeout: 2000
      });
    }
  };

  const startRecord = () =>{
    try{
      VoiceRecorder.startRecording()
        .then((result: GenericResponse) => setRecording(true))
        .catch(error => console.log(error))
    }catch(ee){
      ons.notification.toast("NO privilages", {
        timeout: 2000
      });
    }
  }

  const stopRecord = () =>{
    VoiceRecorder.stopRecording()
      .then(async(result: RecordingData) => {
        setRecording(false);
        setRecord(result);
        // let blob = await fetch(`data:${result!.value.mimeType};base64,${result!.value.recordDataBase64}`).then(r => r.blob());
        // var file = new File([blob], "name");

        const dataURLtoFile = (dataurl, filename) =>{
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
        }
        const file = dataURLtoFile(`data:${result!.value.mimeType};base64,${result!.value.recordDataBase64}`, 'test.webm');
        // const file = new Audio(`data:${result!.value.mimeType};base64,${result!.value.recordDataBase64}`)
        dispatch(uploadFile("record.webm", file, "webm")).then((res)=>{
          // setRecords([...records, res.url]);
          setRecords([...records, `data:${result!.value.mimeType};base64,${result!.value.recordDataBase64}`]);
        }).catch(err=>{
            setRecords([err]);
        })
      })
      .catch(error => console.log(error))
  }

  const playRecord = (r) =>{
    console.log(r)
    // const audioRef = new Audio(`data:${record!.value.mimeType};base64,${record!.value.recordDataBase64}`)
    const audioRef = new Audio(r);
    console.log(audioRef)
    audioRef.oncanplaythrough = () => audioRef.play()
    audioRef.load()
  }

  const removeEmotion = (id:number) =>{
    emotions.splice(id, 1);
    setEmotions([...emotions]);
  }

  return(
    <section>
      <Card>
        <Row className='form-padding text-center'>
          <Col className='margin' width={100}>Select how you feel like</Col>
          {feelLikeList.map((fl,i)=>
            <Col key={i}>
              <div className={classNames({'feelLikeIcon':true})} onClick={()=>{setFeelLike(fl.value)}}>
                <div className='feelLiceIcon-container'>
                  <img src={fl.img} className={classNames({'feelLikeIcon-icon':true, 'feelLikeIcon-active':fl.value===feelLike})} alt=""/>
                </div>
              </div>
            </Col>)}
        </Row>
        <Row className='form-padding text-center'>
          <Col className='margin' width={100}>Comment what happend</Col>
          <Col>
            <textarea
              class="textarea"
              value={comment}
              rows="5"
              placeholder="Start writing..."
              onChange={(event) => { setComment(event.target.value)} }/>
          </Col>
        </Row>
        <Row className='form-padding  text-center'>
          <Col width={100}>What are your emotions</Col>
          <Col width={100}>
            <Row className='form-padding  text-center'>
              {emotions.map((e,i)=>
                <Col key={i}>
                  <span className="notification" style={{'background-color':emotionsList.find(el=>el.name===e)?.color}} onClick={()=>removeEmotion(i)}>
                    {e} <FaRegTimesCircle />
                  </span>
                </Col>)}
            </Row>
          </Col>
          <Col className='text-center'>
            <Select modifier="material"
              value={selectGroupEmotion}
              onChange={(event) => setSelectGroupEmotion(event.target.value)}>
              <option value=""></option>
              {emotionGrupsList.map(egl=><option value={egl}>{egl}</option>)}
            </Select>
            {selectGroupEmotion && <Select modifier="material"
              value={selectEmotion}
              onChange={(event) => setSelectEmotion(event.target.value)}>
              <option value=""></option>
              {emotionsList.filter(el=>el.group === selectGroupEmotion).map(el=><option value={el.name}>{el.name}</option>)}
            </Select>}
            {selectEmotion && <Button onClick={()=>{setEmotions([...emotions, selectEmotion])}}>add</Button>}
          </Col>
        </Row>
        <Row className='form-padding  text-center'>
          <Col width={100}>Is it related with you homework?</Col>
          <Col width={100}>
            <Select modifier="material"
              value={homework}
              onChange={(event) => setHomework(event.target.value)}>
              <option value={""}>-</option>
              {homeworks.map(h=><option value={h.objectId}>{h.title}</option>)}
            </Select>
          </Col>
        </Row>
        <Row className='form-padding  text-center'>
          <Col className='margin' width={100}>
            Do you like to post a photo?
            <Button modifier="icon" onClick={()=>takePicture()}><FaCamera/></Button>
          </Col>
          {images.map((im, i)=>(
            <Col><img src={im} width="200" alt="img"/></Col>
          ))}
        </Row>
        <Row className='form-padding  text-center'>
          <Col className='margin' width={100}>
            Do you like to record a note?
            {!recording && <Button modifier="icon" onClick={()=>startRecord()}><FaCircle/></Button>}
            {recording && <Button modifier="icon" onClick={()=>stopRecord()}><FaStop/></Button>}
          </Col>
          {records.map((r,i)=>(
            <Col>
              <Button modifier="icon" onClick={()=>playRecord(r)}><FaPlay/></Button>
              <p className="recorTitle">record {i+1}</p>
            </Col>
          ))}
        </Row>
        <Row className='form-padding  text-right'>
          <Col className='text-center'>
            <Button modifier="fund" onClick={()=>addPost()}><FaRegTrashAlt/>Cancel</Button>
          </Col>
          <Col className='text-center'>
            <Button modifier="fund" onClick={()=>addPost()}><FaSave/>SEND</Button>
          </Col>
        </Row>
      </Card>
    </section>
  )
}

export default NewPostAdvance;
