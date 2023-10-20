import { createSlice } from '@reduxjs/toolkit';
import Redux from 'redux';
import api from '../api';
import { HomeworkType } from '../types';

// let userInit:User = JSON.parse(localStorage.getItem("user") || JSON.stringify({exp:1000, resources:1000, tech:basicTech}));

export const HomeworkSlice = createSlice({
  name: 'userData',
  initialState: {
    homeworkStore: {
      homeworks:[] as HomeworkType[]
    },
  },
  reducers: {
    addPost: ({homeworkStore}, {payload}) => {
      homeworkStore.homeworks.unshift(payload);
    },
    setPosts: ({homeworkStore}, {payload}) => {
      homeworkStore.homeworks = payload;
    },
  },
})

export const requestHomeworks = ()=>{
  return (dispatch:Redux.Dispatch) =>{
    return new Promise((resolve) =>{
      api.get('/classes/Homework?order=-createdAt').then((response:any) =>{
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

export const newHomework = (newPost:HomeworkType) =>{
  return (dispatch:Redux.Dispatch) =>{
    return new Promise((resolve) =>{
      api.post('/classes/Homework', newPost).then((response:any) =>{
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

export const { addPost, setPosts } = HomeworkSlice.actions

export default HomeworkSlice.reducer
