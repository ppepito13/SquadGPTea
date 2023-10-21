import React, { useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { Button, Card, Col, Input, Row} from 'react-onsenui';
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
      <Card modifier="post nomargin">
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
          <Col class='text-right'>
            <Button modifier="fund" onClick={()=>addHomeWork()}><FaSave/>Save</Button>
          </Col>
        </Row>
      </Card>
    </section>
  )
}

export default NewHomeWork;
