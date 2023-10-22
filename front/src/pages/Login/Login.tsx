import React from 'react';
import { FaChild, FaCommentMedical, FaHouseUser } from 'react-icons/fa';
import { Button, Col, Row } from 'react-onsenui';
import '../../App.scss';
import store from '../../redux/store';
import { login} from '../../redux/UserSlice';

const Test = () =>{
  const dispatch = store.dispatch;

  return (
    <section>
      <Row>
        <Col className="text-center">
          <Button modifier='login' onClick={()=>dispatch(login("Mariolka Rydowicz", "test"))}><FaChild/>LOGIN kid1</Button>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Button modifier='login' onClick={()=>dispatch(login("Grzymisława Pipka", "parent"))}><FaHouseUser/>LOGIN parent</Button>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Button modifier='login' onClick={()=>dispatch(login("Grzegorz Brzęczyszczykiewicz", "kid2"))}><FaChild/>LOGIN kid2</Button>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Button modifier='login' onClick={()=>dispatch(login("Mściwoj Północny", "terap1"))}><FaCommentMedical/>LOGIN therapist</Button>
        </Col>
      </Row>
    </section>
  );
}

export default Test;
