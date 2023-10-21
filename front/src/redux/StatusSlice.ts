import { createSlice } from '@reduxjs/toolkit';
import Redux from 'redux';
import api from '../api';

// let userInit:User = JSON.parse(localStorage.getItem("user") || JSON.stringify({exp:1000, resources:1000, tech:basicTech}));

export const StatusSlice = createSlice({
  name: 'userData',
  initialState: {
    status: {
      selectedKid: null as any,
      availableKids: [] as any[]
    },
  },
  reducers: {
    setSelectedKid: ({status}, {payload}) => {
      status.selectedKid = payload;
    },
    setAvailableKids: ({status}, {payload}) => {
      status.availableKids = payload.filter(p=>p.type==='kid');
    },
  },
})


export const requestAvailableKids = ()=>{
  return (dispatch:Redux.Dispatch) =>{
    return new Promise((resolve) =>{
      api.get('/users').then((response:any) =>{
        dispatch(setAvailableKids(response.data.results))
        resolve(response.data);
        return response.data;
      }).catch((error:any) =>{
        console.log(error)
        dispatch(setAvailableKids([]))
        return error;
      });
    });
  }
}

export const { setSelectedKid, setAvailableKids } = StatusSlice.actions

export default StatusSlice.reducer