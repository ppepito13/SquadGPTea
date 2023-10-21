import React, { useState } from 'react';
import { FaCommentDots, FaSave } from 'react-icons/fa';
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
      <Card className='background_darkgrey'>
        <div className='wall_input_section'>
        <Input  className='wall-input'
            value={comment} float
            onChange={(event) => { setComment(event.target.value)} }
            modifier='material'
            placeholder='Start writing'/>
            <Button modifier='fund' onClick={()=>navigate("/newpost")}><FaCommentDots/>Advance</Button>
            <Button modifier="fund" onClick={()=>addPost()}><FaSave/>Send</Button>
            {showModal}
            <Modal showModal={showModal} setShowModal={setShowModal}>
              <div>Loading ...</div>
            </Modal>
            </div>
      </Card>
  )
}

export default NewPost;
