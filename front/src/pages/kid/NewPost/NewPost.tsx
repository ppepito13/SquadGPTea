import React, { useState } from 'react';
import { Button, Card, Input, Navigator, Page } from 'react-onsenui';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../../common/atoms/Modal';
import { newPost } from '../../../redux/PostSlice';
import store from '../../../redux/store';
import ApiTest from '../../Test/ApiTest';

const NewPost = () =>{
  const dispatch = store.dispatch;
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);

  const addPost = () =>{
    dispatch(newPost({
      comment
    }))
  }

  return(
      <Card style={{ textAlign: 'center', background: '#4A5568'}}>
        <div style={{margin: '10px'}}>
        <Input  style={{margin: '10px', width: '60%'}}
            value={comment} float
            onChange={(event) => { setComment(event.target.value)} }
            modifier='material'
            placeholder='Start writing' />
            <Button  style={{margin: '10px'}} onClick={()=>navigate("/newpost")}>DODAJ EMOCJE</Button>
            <Button  style={{margin: '10px'}} modifier="" onClick={()=>addPost()}>WYŚLIJ</Button>

{showModal}

            <Modal showModal={showModal} setShowModal={setShowModal}>
              <div>Loading ...</div>
            </Modal>
            </div>
      </Card>
  )
}

export default NewPost;
