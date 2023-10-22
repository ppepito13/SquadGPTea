import React, { useEffect, useState } from 'react';
import { Button, List, ListItem } from 'react-onsenui';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { requestAvailableKids, setSelectedKid } from '../../redux/StatusSlice';
import store, { RootState } from '../../redux/store';

const SelectKid = () =>{
  const dispatch = store.dispatch;
  const navigate = useNavigate();
  let availableKids:any[] = useSelector((root:RootState)=>root.statusSlice.status.availableKids).filter(k=>k.type==='kid');

  const [expandedItem, setExpandedItem] = useState()

  useEffect(()=>{
    dispatch(requestAvailableKids())
  },[])


  const gotoKid = (kid) =>{
    dispatch(setSelectedKid(kid))
    setTimeout(() => {
        navigate("/wall")
    }, 100);
  }

  return(
    <section>
      <List
        dataSource={availableKids}
        renderRow={(kid, idx) => (
          <ListItem expanded={idx === expandedItem } expandable>
            <div>{kid.username}</div>
            <div className="expandable-content">
              <Button onClick={()=>gotoKid(kid)}>select</Button>
            </div>
          </ListItem>
        )}
      />
    </section>
  )
}

export default SelectKid;
