import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Input, Navigator, Page, Row, Select } from 'react-onsenui';
import { Link, useNavigate } from 'react-router-dom';
import { newPost } from '../../../redux/PostSlice';
import store, { RootState } from '../../../redux/store';
import { Camera, CameraResultType } from '@capacitor/camera';
import { uploadFile } from '../../../redux/ApiSice';
import { emotionsList, feelLikeList } from '../../common/const';
import { useSelector } from 'react-redux';
import { HomeworkType } from '../../../types';
import { requestHomeworks } from '../../../redux/HomeworkSlice';

const NewPostAdvance = () =>{
  const dispatch = store.dispatch;
  const navigate = useNavigate();
  const homeworks:HomeworkType[] = useSelector((root:RootState)=>root.homeworkSlice.homeworkStore.homeworks);
  
  const [comment, setComment] = useState("");
  const [feelLike, setFeelLike] = useState(-1);
  const [emotions, setEmotions] = useState([] as string[]);
  const [images, setImages] = useState([] as string[]);
  const [homework, setHomework] = useState("");

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
      <Card>
        <Row className='form-padding'>
          <Col width={100}>Select how you feel like</Col>
          {feelLikeList.map((fl,i)=>
            <Col key={i}>
              <div className={classNames({'feelLikeIcon':true})} onClick={()=>{setFeelLike(fl.value)}}>
                <div className='feelLiceIcon-container'>
                  <img src={fl.img} className={classNames({'feelLikeIcon-icon':true, 'feelLikeIcon-active':fl.value===feelLike})}/>
                </div>
              </div>
            </Col>)}
        </Row>
        <Row className='form-padding'>
          <Col width={100}>Comment what happend</Col>
          <Col>
            <textarea
              class="textarea"
              value={comment}
              rows="5"
              placeholder="Start writing"
              onChange={(event) => { setComment(event.target.value)} }/>
          </Col>
        </Row>
        <Row className='form-padding'>
          <Col width={100}>What are your emotions</Col>
          {emotionsList.map((el,i)=>
            <Col key={i}>
              <div className={classNames({'emotionIcon':true, 'emotionIcon-active':emotions.includes(el.value)})} onClick={()=>{
                if(emotions.includes(el.value)){
                  setEmotions(emotions.filter(e=>e!==el.value))
                }else{
                  setEmotions([...emotions, el.value])
                }
              }}>
                {el.label}
              </div>
            </Col>)}
        </Row>
        <Row className='form-padding'>
          <Col width={100}>Do you like to post a photo?</Col>
          <Col width={100}>
            <Button modifier="fund" onClick={()=>takePicture()}>CAMERA</Button>
          </Col>
          {images.map((im, i)=>(
            <Col><img src={im} width="200" alt="img"/></Col>
          ))}
        </Row>
        <Row className='form-padding'>
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
        <Row className='form-padding'>
          <Col>
            <Button modifier="" onClick={()=>addPost()}>send</Button>
          </Col>
        </Row>
      </Card>
    </section>
  )
}

export default NewPostAdvance;
