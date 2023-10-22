import { createSlice } from '@reduxjs/toolkit';
import Redux from 'redux';
import api from '../api';
import { HomeworkType, UserType } from '../types';
import store from './store';

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
    updateHomework: ({homeworkStore}, {payload}) => {
      const homeworkToUpdate = homeworkStore.homeworks.find(h=>h.objectId === payload.objectId);
      if(homeworkToUpdate && payload.rating){
        homeworkToUpdate.rating = payload.rating;
      }
      if(homeworkToUpdate && payload.archived){
        homeworkToUpdate.archived = true;
        homeworkStore.homeworks = homeworkStore.homeworks.filter(h=>!h.archived)
      }
    }
  },
})

export const requestHomeworks = (selectedKid?:UserType)=>{
  return (dispatch:Redux.Dispatch) =>{
    return new Promise((resolve) =>{
      const where = selectedKid ? '&where={"$and":[{"archived":false},{"owner":{"__type":"Pointer","className":"_User", "objectId":"'+selectedKid.objectId+'"}}]}' : "";
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
      ACL[selectedKid.objectId] = { "read": true, "write": true }
      ACL[selectedKid.parent.objectId] = { "read": true, "write": false }
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

export const updateHomeworks = (objectId, archived, rating) =>{
  return (dispatch:Redux.Dispatch) =>{
    return new Promise((resolve) =>{
      api.put('/classes/Homework/'+objectId, {archived, rating}).then((response:any) =>{
        console.log(response.data)
        dispatch(updateHomework({objectId, archived, rating}));
        resolve(response.data);
        return response.data;
      }).catch((error:any) =>{
        console.log(error)
        return error;
      });
    });
  }
}

export const { addHomework, setHomeworks, updateHomework } = HomeworkSlice.actions

export default HomeworkSlice.reducer
