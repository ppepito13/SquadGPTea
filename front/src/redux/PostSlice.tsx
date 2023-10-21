import { createSlice } from '@reduxjs/toolkit';
import Redux from 'redux';
import api from '../api';
import { PostType, UserType } from '../types';
import store from './store';

// let userInit:User = JSON.parse(localStorage.getItem("user") || JSON.stringify({exp:1000, resources:1000, tech:basicTech}));

export const PostSlice = createSlice({
  name: 'userData',
  initialState: {
    postStore: {
      posts:[] as PostType[]
    },
  },
  reducers: {
    addPost: ({postStore}, {payload}) => {
      postStore.posts.unshift(payload);
    },
    setPosts: ({postStore}, {payload}) => {
      postStore.posts = payload;
    },
    changeACL: ({postStore}, {payload}) => {
      const post  = postStore.posts.find(p=>p.objectId===payload.objectId)
      if(post){ post.ACL = payload.ACL; }
    },
  },
})

export const requestPosts = (selectedKid?:UserType)=>{
  return (dispatch:Redux.Dispatch) =>{
    return new Promise((resolve) =>{
      const where = selectedKid ? '&where={"owner":{"__type":"Pointer","className":"_User", "objectId":"'+selectedKid.objectId+'"}}' : "";
      api.get('/classes/Post?order=-createdAt'+where).then((response:any) =>{
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

export const newPost = (newPost:PostType) =>{
  return (dispatch:Redux.Dispatch) =>{
    return new Promise((resolve) =>{
      const objectId=store.getState().userSlice.api.user.objectId;
      const ACL = {}
      ACL[objectId] = { "read": true, "write": true }
      api.post('/classes/Post', {...newPost, ACL, owner:{"__type":"Pointer",className:"_User", objectId}}).then((response:any) =>{
        dispatch(addPost({...response.data, ...newPost}))
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

export const sharePost = (newPost:PostType, share:boolean) =>{
  return (dispatch:Redux.Dispatch) =>{
    return new Promise((resolve) =>{
      const objectId = newPost.objectId
      const ACL = {}
      ACL[store.getState().userSlice.api.user.objectId] = { "read": true, "write": true }
      if(share){ ACL[store.getState().userSlice.api.user.therapist.objectId] = { "read": true, "write": false }; }
      api.put('/classes/Post/'+objectId, {ACL}).then((response:any) =>{
        dispatch(changeACL({objectId, ACL}));
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


export const { addPost, changeACL, setPosts } = PostSlice.actions

export default PostSlice.reducer
