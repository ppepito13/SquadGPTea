import React, { useEffect, useState } from 'react';
import { Button, Page, Tab, Tabbar } from 'react-onsenui';
import ApiTest from './ApiTest';
import {LocalNotifications} from '@capacitor/local-notifications';


const ComponentTest = () =>{
  const [permissions, setPermissions] = useState({} as any);
  const [notifications, setNotifications] = useState({} as any);

  const showNotification = () =>{
    LocalNotifications.schedule({
      notifications:[
          {
          id: 11,
          title: "test title",
          body: "test body",
          largeBody: " test largebody",
          summaryText: "test summary text",
          schedule: {
            repeats: true,
            allowWhileIdle: true,
            on:{
              hour:7,
              minute: 22
            }
          }
        }
      ]
    }).finally(()=>{
      logNtifications();
    })
  }

  const logNtifications = () =>{
    LocalNotifications.checkPermissions().then((res)=>{
      if(Object.keys(res).length === 0){
        LocalNotifications.requestPermissions();
      }else{
        setPermissions({res, dupa:Object.keys(res).length});
      }
    })
  }

  useEffect(()=>{
    logNtifications();
    LocalNotifications.getPending().then((notifications)=>{
      setNotifications(notifications)
    })
  })

  const notificationPage = (
    <Page modifier="toolbar">
      <Button modifier="fund" onClick={()=>showNotification()}>show notifications</Button>
      <pre>tu:{JSON.stringify(notifications, null, 2)}</pre>
      <pre>{JSON.stringify(permissions)}</pre>
    </Page>
  )


  return (
    <section>
      <Tabbar
        index={0}
        swipeable={true}
        renderTabs={(activeIndex, tabbar) => [
          {
            content: notificationPage,
            tab: <Tab label="Home" icon="md-home" />
          },
          {
            content: <Page modifier="toolbar"><ApiTest/></Page>,
            tab: <Tab label="Settings" icon="md-settings" />
          }]
        }
      />
    </section>
  );
}

export default ComponentTest;
