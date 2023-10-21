import classNames from 'classnames';
import React, { useState } from 'react';
import { Button, Card, Col, Input, Navigator, Page, Row } from 'react-onsenui';
import { Link, useNavigate } from 'react-router-dom';
import { newPost } from '../../../redux/PostSlice';
import store, { RootState } from '../../../redux/store';
import { Camera, CameraResultType } from '@capacitor/camera';
import { uploadFile } from '../../../redux/ApiSice';
import { emotionsList, feelLikeList } from '../../common/const';

const NewPostAdvance = () =>{
  const dispatch = store.dispatch;
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [feelLike, setFeelLike] = useState(-1);
  const [emotions, setEmotions] = useState([] as string[]);
  const [images, setImages] = useState([] as string[]);

  const addPost = () =>{
    dispatch(newPost({
      comment, feelLike, emotions, images
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
      <Row>
        <Col>
          <textarea
            class="textarea"
            value={comment}
            rows="5"
            placeholder="Start writing"
            onChange={(event) => { setComment(event.target.value)} }/>
        </Col>
      </Row>
      <Row>
        {feelLikeList.map((fl,i)=>
          <Col key={i}>
            <div className={classNames({'feelLikeIcon':true, 'feelLikeIcon-active':fl.value===feelLike})} onClick={()=>{setFeelLike(fl.value)}}>
              <img src={fl.img} className='feelLikeIcon-icon'/>
            </div>
          </Col>)}
      </Row>
      <Row>
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
      <Row>
        {images.map((im, i)=>(
          <Col><img src={im} width="200" alt="img"/></Col>
        ))}
      </Row>
      <Row>
        <Col>
          <Button modifier="" onClick={()=>addPost()}>send</Button>
          <Button modifier="fund" onClick={()=>takePicture()}>CAMERA</Button>
        </Col>
      </Row>

    </section>
  )
}

export default NewPostAdvance;
