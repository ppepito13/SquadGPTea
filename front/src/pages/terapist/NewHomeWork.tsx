import React, { useState } from 'react';
import { Button, Col, Input, Row} from 'react-onsenui';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { newHomework } from '../../redux/HomeworkSlice';
import store, { RootState } from '../../redux/store';

const NewHomeWork = () =>{
  const dispatch = store.dispatch;
  const navigate = useNavigate();
  const selectedKid = useSelector((root:RootState)=>root.statusSlice.status.selectedKid)

  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");

  const addHomeWork = () =>{
    dispatch(newHomework({title, descr}, selectedKid))
    navigate("/homework")
  }

  return(
    <section>
    <Row>
      <Col className="form-padding">
        <Input
          className='full-width'
          value={title}
          onChange={(event) => { setTitle(event.target.value)} }
          modifier='underbar full-width'
          placeholder='title' />
      </Col>
    </Row>
    <Row>
      <Col className="form-padding">
        <textarea
          class="textarea"
          value={descr}
          rows="5"
          placeholder="descryption"
          onChange={(event) => { setDescr(event.target.value)} }/>
      </Col>
    </Row>
    <Row>
      <Col>
        <Button onClick={()=>addHomeWork()}>Save</Button>
      </Col>
    </Row>
    </section>
  )
}

export default NewHomeWork;
