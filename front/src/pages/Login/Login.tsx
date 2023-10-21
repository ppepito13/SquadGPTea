import React from 'react';
import { Button } from 'react-onsenui';
import '../../App.scss';
import store from '../../redux/store';
import { login} from '../../redux/UserSlice';

const Test = () =>{
  const dispatch = store.dispatch;

  return (
    <section>
      <Button onClick={()=>dispatch(login("test", "test"))}>LOGIN kid1</Button>
      <Button onClick={()=>dispatch(login("kid2", "kid2"))}>LOGIN kid2</Button>
      <Button onClick={()=>dispatch(login("terap1", "terap1"))}>LOGIN terap1</Button>
    </section>
  );
}

export default Test;
