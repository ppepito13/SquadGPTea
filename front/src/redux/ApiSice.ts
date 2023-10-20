import { createSlice } from '@reduxjs/toolkit';
import Redux from 'redux';
import api from '../api';

// let userInit:User = JSON.parse(localStorage.getItem("user") || JSON.stringify({exp:1000, resources:1000, tech:basicTech}));

export const ApiSlice = createSlice({
  name: 'userData',
  initialState: {
    api: {
      example: null
    },
  },
  reducers: {
    setResponse: ({api}, {payload}) => {
      api.example = payload;
      // localStorage.setItem("user", JSON.stringify(user));
    },
  },
})

export const requestExample = ()=>{
  return (dispatch:Redux.Dispatch) =>{
    return new Promise((resolve) =>{
      api.get('/classes/GameScore').then((response:any) =>{
        dispatch(setResponse(response.data.results))
        resolve(response.data);
        return response.data;
      }).catch((error:any) =>{
        console.log(error)
        dispatch(setResponse(error))
        return error;
      });
    });
  }
}

export const uploadFile = (name:string, file:any)=>{
  const config = {
    headers:{
      "Content-Type": "image/png "
    }
  };
  return (dispatch:Redux.Dispatch) =>{
    return new Promise((resolve) =>{
      api.post('/files/'+name, file, config).then((response:any) =>{
        console.log(response);
        // dispatch(setResponse(response.data.results))
        resolve(response.data);
        return response.data;
      }).catch((error:any) =>{
        console.log(error)
        // dispatch(setResponse(error))
        return error;
      });
    });
  }
}

export const { setResponse } = ApiSlice.actions

export default ApiSlice.reducer
