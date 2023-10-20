import classNames from 'classnames';
import React, { useState } from 'react';
import { Button, Card, Col, Input, Navigator, Page, Row } from 'react-onsenui';
import { Link, useNavigate } from 'react-router-dom';
import { newPost } from '../../../redux/PostSlice';
import store from '../../../redux/store';
import verySadIcon from '../../../assets/feel-like/1_very_sad.png';
import sadIcon from '../../../assets/feel-like/2_sad.png';
import neutralIcon from '../../../assets/feel-like/3_neutral.png';
import hepiIcon from '../../../assets/feel-like/4_hepi.png';
import veryHepiIcon from '../../../assets/feel-like/5_very_hepi.png';

const NewPostAdvance = () =>{
  const dispatch = store.dispatch;
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [feelLike, setFeelLike] = useState(-1);
  const [emotions, setEmotions] = useState([] as string[]);

  const feelLikeList = [
    {img:verySadIcon, value:0},
    {img:sadIcon, value:1},
    {img:neutralIcon, value:2},
    {img:hepiIcon, value:3},
    {img:veryHepiIcon, value:4}
  ]

  const emotionsList = [
    {img:"dupa.png", value:"emotion0", label:"emotion0"},
    {img:"dupa.png", value:"emotion1", label:"emotion1"},
    {img:"dupa.png", value:"emotion2", label:"emotion2"},
    {img:"dupa.png", value:"emotion3", label:"emotion3"}
  ]

  const addPost = () =>{
    dispatch(newPost({
      comment, feelLike, emotions
    })).then(res=>{
      navigate("/")
    })
  }

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
              <img src={el.img}/>
            </div>
          </Col>)}
      </Row>
      <Row>
        <Col>
          <Button modifier="" onClick={()=>addPost()}>send</Button>
        </Col>
        </Row>

      </section>
  )
}

export default NewPostAdvance;
