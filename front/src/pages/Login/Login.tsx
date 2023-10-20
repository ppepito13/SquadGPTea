import React from 'react';
import { Button } from 'react-onsenui';
import '../../App.scss';
import store from '../../redux/store';
import { login} from '../../redux/UserSlice';

const Test = () =>{
  const dispatch = store.dispatch;

  return (
    <section>
      <Button onClick={()=>dispatch(login())}>LOGIN</Button>
    </section>
  );
}

export default Test;
