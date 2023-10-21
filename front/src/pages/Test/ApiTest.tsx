import React, { useEffect, useState } from 'react';
import '../../App.scss';
import { useSelector } from 'react-redux';
import { requestExample } from '../../redux/ApiSice';
import store, { RootState } from '../../redux/store';
import { Button } from 'react-onsenui';
import Parse from 'parse';

const ApiTest = () =>{
  const [liveQuery, setLiveQuery] = useState([]as any[])
  const dispatch = store.dispatch;
  const response = useSelector((root:RootState)=>root.apiSlice.api.example);

  useEffect(()=>{
    const createLiveQuery = async () =>{
      Parse.initialize("collabothon");
      Parse.serverURL = 'https://polarny.it/parse'
      let query = new Parse.Query('Msg');
      // query.equalTo('name', 'Mengyan');
      let subscription = await query.subscribe();
      subscription.on('create', (pushMsg) => {
        setLiveQuery([...liveQuery, pushMsg]);
      });
    }
    createLiveQuery();
  })


  return (
    <section>
      <h1>Api Test</h1>
      <Button  modifier="fund" onClick={(e?: React.MouseEvent<HTMLElement>)=>dispatch(requestExample())}>TEST</Button>
      <pre>{JSON.stringify(response, null, 2)}</pre>
      <h1>LiveQuery Test</h1>
      <pre>{JSON.stringify(liveQuery, null, 2)}</pre>
    </section>
  );
}

export default ApiTest;
