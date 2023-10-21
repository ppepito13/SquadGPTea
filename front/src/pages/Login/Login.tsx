import React from 'react';
import { Button, Col, Row } from 'react-onsenui';
import '../../App.scss';
import store from '../../redux/store';
import { login} from '../../redux/UserSlice';

const Test = () =>{
  const dispatch = store.dispatch;

  return (
    <section>
      <Row>
        <Col className="text-center"><Button modifier='login' onClick={()=>dispatch(login("Mariolka Rydowicz", "test"))}>LOGIN kid1</Button></Col>
      </Row>
      <Row>
        <Col className="text-center"><Button modifier='login' onClick={()=>dispatch(login("Grzegorz Brzęczyszczykiewicz", "kid2"))}>LOGIN kid2</Button></Col>
      </Row>
      <Row>
        <Col className="text-center"><Button modifier='login' onClick={()=>dispatch(login("Mściwoj Północny", "terap1"))}>LOGIN therapist</Button></Col>
      </Row>
    </section>
  );
}

export default Test;
