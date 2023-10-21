import { createSlice } from '@reduxjs/toolkit';
import Redux from 'redux';
import api from '../api';
let userInit:any = JSON.parse(localStorage.getItem("user")||"{}");

export const UserSlice = createSlice({
  name: 'userData',
  initialState: {
    api:{
      user: userInit
    }
  },
  reducers: {
    setUser: ({api}, {payload}) => {
      api.user = payload;
      localStorage.setItem("user", JSON.stringify(payload));
    },
  },
})

export const login = (username:string, password:string)=>{
  return (dispatch:Redux.Dispatch) =>{
      api.post('/login', {"username":username,"password":password}).then((response:any) =>{
        dispatch(setUser(response.data))
        // window.location.reload();
      }).catch((error:any) =>{
        console.log(error)
      });
  }
}

export const validate = ()=>{
  return (dispatch:Redux.Dispatch) =>{
    return new Promise((resolve, reject) =>{
      api.get('/users/me',{
        headers: {
          'X-Parse-Session-Token': JSON.parse(localStorage.getItem("user")||"{}")?.sessionToken
        }
      }).then((response:any) =>{
        resolve(response.data);
        return response.data;
      }).catch((error:any) =>{
        reject(error)
        return error;
      });
    });
  }
}

export const logout = ()=>{
  return (dispatch:Redux.Dispatch) =>{
    return new Promise((resolve, reject) =>{
      api.post('/logout',{
        headers: {
          'X-Parse-Session-Token': JSON.parse(localStorage.getItem("user")||"{}").sessionToken
        }
      }).then((response:any) =>{
        dispatch(setUser(null))
        resolve(response.data);
        return response.data;
      }).catch((error:any) =>{
        dispatch(setUser(null))
        return error;
      });
    });
  }
}

export const { setUser } = UserSlice.actions

export default UserSlice.reducer
