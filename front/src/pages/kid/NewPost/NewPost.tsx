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
      <Card>
        <Input
            value={comment} float
            onChange={(event) => { setComment(event.target.value)} }
            modifier='material'
            placeholder='Start writing' />
            <Button modifier="" onClick={()=>addPost()}>send</Button>
            <Button onClick={()=>navigate("/newpost")}>navigate</Button>
{showModal}dupa

            <Modal showModal={showModal} setShowModal={setShowModal}>
              <div>Loading ...</div>
            </Modal>

      </Card>
  )
}

export default NewPost;
