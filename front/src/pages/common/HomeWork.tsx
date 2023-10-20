import React, { useEffect, useState } from 'react';
import { Button, List, ListItem,} from 'react-onsenui';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { requestHomeworks } from '../../redux/HomeworkSlice';
import store, { RootState } from '../../redux/store';
import { HomeworkType } from '../../types';

const HomeWork = () =>{
  const dispatch = store.dispatch;
  const navigate = useNavigate();
  const [expandedItem, setExpandedItem] = useState()

  let homeworks:HomeworkType[] = useSelector((root:RootState)=>root.homeworkSlice.homeworkStore.homeworks);
console.log(homeworks)

  useEffect(()=>{
    dispatch(requestHomeworks())
  },[])

  return(
    <section>
    <List
      dataSource={homeworks}
      renderRow={(row, idx) => (
        <ListItem expanded={idx === expandedItem } expandable>
          <div>{row.title}</div>
          <div className="expandable-content">{row.descr}</div>
        </ListItem>
      )}
    />


    <Button onClick={()=>navigate("/newhomework")}>Add new homework</Button>

    </section>
  )
}

export default HomeWork;