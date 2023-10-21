import { createSlice } from '@reduxjs/toolkit';
import Redux from 'redux';
import api from '../api';
import { HomeworkType, UserType } from '../types';
import store from './store';

// let userInit:User = JSON.parse(localStorage.getItem("user") || JSON.stringify({exp:1000, resources:1000, tech:basicTech}));

export const HomeworkSlice = createSlice({
  name: 'userData',
  initialState: {
    homeworkStore: {
      homeworks:[] as HomeworkType[]
    },
  },
  reducers: {
    addHomework: ({homeworkStore}, {payload}) => {
      homeworkStore.homeworks.unshift(payload);
    },
    setHomeworks: ({homeworkStore}, {payload}) => {
      homeworkStore.homeworks = payload;
    },
  },
})

export const requestHomeworks = (selectedKid?:UserType)=>{
  return (dispatch:Redux.Dispatch) =>{
    return new Promise((resolve) =>{
      const where = selectedKid ? '&where={"owner":{"__type":"Pointer","className":"_User", "objectId":"'+selectedKid.objectId+'"}}' : "";
      api.get('/classes/Homework?order=-createdAt'+where).then((response:any) =>{
        dispatch(setHomeworks(response.data.results))
        resolve(response.data);
        return response.data;
      }).catch((error:any) =>{
        console.log(error)
        dispatch(setHomeworks(error))
        return error;
      });
    });
  }
}

export const newHomework = (newHomework:HomeworkType, selectedKid:UserType) =>{
  return (dispatch:Redux.Dispatch) =>{
    return new Promise((resolve) =>{
      const objectId=store.getState().userSlice.api.user.objectId;
      const ACL = {}
      ACL[objectId] = { "read": true, "write": true }
      ACL[selectedKid.objectId] = { "read": true, "write": false }
      api.post('/classes/Homework', {...newHomework, ACL, owner:{"__type":"Pointer",className:"_User", objectId:selectedKid.objectId}}).then((response:any) =>{
        dispatch(addHomework({...response.data, ...newHomework}))
        resolve(response.data);
        return response.data;
      }).catch((error:any) =>{
        console.log(error)
        dispatch(setHomeworks([]))
        return error;
      });
    });
  }
}

export const { addHomework, setHomeworks } = HomeworkSlice.actions

export default HomeworkSlice.reducer
