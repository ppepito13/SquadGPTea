import { createSlice } from '@reduxjs/toolkit';
import Redux from 'redux';
import api from '../api';
import Parse from 'parse';
import store from './store';
import { MsgType } from '../types';

// let userInit:User = JSON.parse(localStorage.getItem("user") || JSON.stringify({exp:1000, resources:1000, tech:basicTech}));

export const ChatSlice = createSlice({
  name: 'userData',
  initialState: {
    chat: {
      conversations: {},
      partycipantsIds: [],
      count: 0
    },
  },
  reducers: {
    setConversations: ({chat}, {payload}) => {
      chat.conversations = payload;
    },
    setPartycipats: ({chat}, {payload}) => {
      chat.partycipantsIds = payload;
    },
    addToConversaton: ({chat}, {payload}) => {
      chat.partycipantsIds.forEach(p=>{
        if(payload.attributes.sender.id === p){
          chat.conversations[p].unshift(payload);
          chat.count = chat.count +1;
        }else if(payload.attributes.reciver.id === p){
          chat.conversations[p].unshift(payload);
          chat.count = chat.count +1;
        }
      })
    },
  },
})

export const startLiveQuery = (autorId:string, partycipantsIds:string[])=>{
  return (dispatch:Redux.Dispatch) =>{


    dispatch(setPartycipats(partycipantsIds));

    const where= {
      "$or":[ {sender:{"__type":"Pointer", className:"_User", objectId:autorId}},
              {reciver:{"__type":"Pointer", className:"_User", objectId:autorId}}]
    }
    const whereStr = "&where="+JSON.stringify(where);
    api.get('/classes/Msg?order=-createdAt'+whereStr).then((response:any) =>{
      const newConverstaions = {};
      partycipantsIds.forEach(pi=>{
        newConverstaions[pi]=response.data.results.filter(r=>r.reciver.objectId===pi || r.sender.objectId===pi);
      })
      dispatch(setConversations(newConverstaions));
      return response.data;
    }).catch((error:any) =>{
      console.log(error)
      return error;
    });

    const createLiveQuery = async (field:string, value:any) =>{
      Parse.initialize("collabothon");
      Parse.serverURL = 'https://polarny.it/parse'
      let query = new Parse.Query('Msg');
      query.equalTo(field, value);
      let subscription = await query.subscribe();
      subscription.on('create', (msg) => {
        dispatch(addToConversaton(msg));
      });
    }
    createLiveQuery('sender', {"__type":"Pointer", className:"_User", objectId:autorId});
    createLiveQuery('reciver', {"__type":"Pointer", className:"_User", objectId:autorId});
  }
}

export const addNewMsg = (newMsg:MsgType) =>{
  return (dispatch:Redux.Dispatch) =>{
    const objectId=store.getState().userSlice.api.user.objectId;
    const ACL = {}
    ACL[objectId] = { "read": true, "write": true }
    api.post('/classes/Msg', {...newMsg}).then((response:any) =>{
      // resolve(response.data);
      return response.data;
    }).catch((error:any) =>{
      console.log(error)
      return error;
    });
  }
}


export const { addToConversaton, setConversations, setPartycipats } = ChatSlice.actions

export default ChatSlice.reducer
