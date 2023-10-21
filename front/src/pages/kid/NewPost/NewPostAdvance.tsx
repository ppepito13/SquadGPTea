import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Input, Navigator, Page, Row, Select } from 'react-onsenui';
import { Link, useNavigate } from 'react-router-dom';
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

const NewPostAdvance = () =>{
  const dispatch = store.dispatch;
  const navigate = useNavigate();
  const homeworks:HomeworkType[] = useSelector((root:RootState)=>root.homeworkSlice.homeworkStore.homeworks);

  const [comment, setComment] = useState("");
  const [feelLike, setFeelLike] = useState(-1);
  const [emotions, setEmotions] = useState([] as string[]);
  const [images, setImages] = useState([] as string[]);
  const [homework, setHomework] = useState("");

  const [selectGroupEmotion, setSelectGroupEmotion] = useState("");
  const [selectEmotion, setSelectEmotion] = useState("")

  useEffect(()=>{
    dispatch(requestHomeworks())
  },[])

  const addPost = () =>{
    dispatch(newPost({
      comment, feelLike, emotions, images, homework:{"__type":"Pointer",className:"Homework", objectId:homework}
    })).then(res=>{
      navigate("/")
    })
  }

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    var imageUrl = image.webPath;
    let blob = await fetch(image.webPath!).then(r => r.blob());
    var file = new File([blob], "name");
    dispatch(uploadFile("test1", file)).then((res)=>{
      setImages([...images, res.url]);
    })
  };

  return(
    <section>
      <Card  modifier="post">
        <Row className='form-padding text-center'>
          <Col className='margin' width={100}>Select how you feel like</Col>
          {feelLikeList.map((fl,i)=>
            <Col key={i}>
              <div className={classNames({'feelLikeIcon':true})} onClick={()=>{setFeelLike(fl.value)}}>
                <div className='feelLiceIcon-container emotionIcon-active'>
                  <Col>
                  <img src={fl.img} className={classNames({'feelLikeIcon-icon':true, 'feelLikeIcon-active':fl.value===feelLike})}/>
                  <div>{fl.desc}</div>
                  </Col>
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
        <Row className='newpost-section'>
          <Col width={100}>What are your emotions</Col>
          <Col width={100}>
            <Row className='form-padding  text-center'>
              {emotions.map((e,i)=>
                <Col key={i}>
                  <span className="notification" style={{'background-color':emotionsList.find(el=>el.name===e)?.color}}>
                    {e}
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
        <Row className='newpost-section'>
          <Col className='margin' width={100}>Do you like to post a photo?</Col>
          <Col width={100}>
            <Button modifier="fund" onClick={()=>takePicture()}>CAMERA</Button>
          </Col>
          {images.map((im, i)=>(
            <Col><img src={im} width="200" alt="img"/></Col>
          ))}
        </Row>
        <Row className='newpost-section'>
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
        <Row className='form-padding  text-right'>
          <Col>
            <Button modifier="" onClick={()=>addPost()}>SEND</Button>
          </Col>
        </Row>
      </Card>
    </section>
  )
}

export default NewPostAdvance;
