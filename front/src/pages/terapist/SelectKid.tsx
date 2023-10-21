import React, { useEffect, useState } from 'react';
import { Button, List, ListItem } from 'react-onsenui';
import { useSelector } from 'react-redux';
import { requestAvailableKids, setSelectedKid } from '../../redux/StatusSlice';
import store, { RootState } from '../../redux/store';

const SelectKid = () =>{
  const dispatch = store.dispatch;
  let availableKids:any[] = useSelector((root:RootState)=>root.statusSlice.status.availableKids);

  const [expandedItem, setExpandedItem] = useState()

  useEffect(()=>{
    dispatch(requestAvailableKids())
  },[])

  return(
    <section>
      <List
        dataSource={availableKids}
        renderRow={(kid, idx) => (
          <ListItem expanded={idx === expandedItem } expandable>
            <div>{kid.username}</div>
            <div className="expandable-content">
              <Button onClick={()=>dispatch(setSelectedKid(kid))}>select</Button>
            </div>
          </ListItem>
        )}
      />
    </section>
  )
}

export default SelectKid;
