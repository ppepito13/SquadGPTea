import React, { useEffect } from 'react';
import { Page } from 'react-onsenui';
import { useNavigate } from 'react-router-dom';
import '../../App.scss';
import store from '../../redux/store';
import { logout} from '../../redux/UserSlice';

const Test = () =>{
  const navigate = useNavigate();
  const dispatch = store.dispatch;

  useEffect(()=>{
    dispatch(logout());
    navigate("/");
  })

  return (
    <Page modifier='main'>
    </Page>
  );
}

export default Test;
