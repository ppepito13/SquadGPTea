import React, { useState } from 'react';
import { Button, Card, Input } from 'react-onsenui';
import { newPost } from '../../redux/PostSlice';
import store from '../../redux/store';

const NewPost = () =>{
  const dispatch = store.dispatch;

  const [comment, setComment] = useState("");

  const addPost = () =>{
    dispatch(newPost({
      comment,
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
      </Card>
  )
}

export default NewPost;
