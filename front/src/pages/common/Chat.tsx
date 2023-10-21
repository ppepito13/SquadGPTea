import classNames from 'classnames';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Card, Input, LazyList, ListItem } from 'react-onsenui';
import { useSelector } from 'react-redux';
import { addNewMsg } from '../../redux/ChatSlice';
import store, { RootState } from '../../redux/store';
import { MsgType, UserType } from '../../types';

const Chat = ({selectedKid}:Props) =>{
  const dispatch = store.dispatch;
  const [newMsg, setNewMsg] = useState("");
  const user:UserType = useSelector((root:RootState)=>root.userSlice.api.user);
  const conversations = useSelector((root:RootState)=>root.chatSlice.chat.conversations);
  const count = useSelector((root:RootState)=>root.chatSlice.chat.count);
  const particianetId = user.therapist?.objectId || selectedKid?.objectId;
  
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, [count])

  const newMessage:MsgType = {
    message: newMsg,
    sender:{"__type":"Pointer",className:"_User", objectId:user.objectId},
    reciver:{"__type":"Pointer",className:"_User", objectId:particianetId}
  }

  const newMessage2:MsgType = {
    message: newMsg,
    sender:{"__type":"Pointer",className:"_User", objectId:particianetId},
    reciver:{"__type":"Pointer",className:"_User", objectId:user.objectId}
  }

  return(
    <>
      <section className='rotate chat-section'>
        <div>
          <LazyList
            modifier="no-backgroud"
            length={conversations[particianetId]?.length || 0}
            renderRow={(idx) =>{
              const msg = conversations[particianetId][idx];
              const isSender = (msg.sender?.objectId || msg.get('sender').id)===user.objectId;
              const isReciver = (msg.reciver?.objectId || msg.get('reciver').id)===user.objectId;
              return(
                <ListItem key={idx} modifier="nodivider" className={'rotate'}>
                  <Card modifier={classNames({"post":true, "chatMsg-sender":isSender, "chatMsg-reciver":isReciver})}>
                    <p className='chat-msg'>{msg.message || msg.get('message')}</p>
                    <p className='chat-date'>{moment(msg.createdAt || msg.get('createdAt')).format("YYYY-MM-DD HH:mm")}</p>
                  </Card>
                </ListItem>
            )}}
            calculateItemHeight={() => 44}
          />
        </div>

      </section>
      <div className='chat-send'>
        <Input
          value={newMsg} float
          onChange={(event) => { setNewMsg(event.target.value) } }
          modifier='material'
          placeholder='Username' />
        <Button onClick={()=>{dispatch(addNewMsg(newMessage))}}>1</Button>
        <Button onClick={()=>{dispatch(addNewMsg(newMessage2))}}>2</Button>
      </div>
    </>
  )
}

interface Props{
  selectedKid: UserType;
}

export default Chat;
