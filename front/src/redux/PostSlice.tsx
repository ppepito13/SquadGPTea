import { createSlice } from '@reduxjs/toolkit';
import Redux from 'redux';
import api from '../api';
import Post from '../pages/kid/Post';

// let userInit:User = JSON.parse(localStorage.getItem("user") || JSON.stringify({exp:1000, resources:1000, tech:basicTech}));

export const PostSlice = createSlice({
  name: 'userData',
  initialState: {
    postStore: {
      posts:[] as Post[]
    },
  },
  reducers: {
    addPost: ({postStore}, {payload}) => {
      postStore.posts.unshift(payload);
    },
    setPosts: ({postStore}, {payload}) => {
      postStore.posts = payload;
    },
  },
})

export const requestPosts = ()=>{
  return (dispatch:Redux.Dispatch) =>{
    return new Promise((resolve) =>{
      api.get('/classes/Post?order=-createdAt').then((response:any) =>{
        dispatch(setPosts(response.data.results))
        resolve(response.data);
        return response.data;
      }).catch((error:any) =>{
        console.log(error)
        dispatch(setPosts(error))
        return error;
      });
    });
  }
}

export const newPost = (newPost:Post) =>{
  return (dispatch:Redux.Dispatch) =>{
    return new Promise((resolve) =>{
      api.post('/classes/Post', newPost).then((response:any) =>{
        dispatch(addPost({...response.data, ...newPost}))
        console.log(response)
        resolve(response.data);
        return response.data;
      }).catch((error:any) =>{
        console.log(error)
        dispatch(setPosts(error))
        return error;
      });
    });
  }
}

export const { addPost, setPosts } = PostSlice.actions

export default PostSlice.reducer
