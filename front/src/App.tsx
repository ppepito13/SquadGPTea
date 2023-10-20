import React, { useEffect } from 'react';
import './App.scss';
import { useSelector } from 'react-redux';
import store, { RootState } from './redux/store';
import { logout, validate } from './redux/UserSlice';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Login from './pages/Login/Login';
import CameraTest from './pages/Test/CameraTest';
import { AndroidFullScreen } from '@awesome-cordova-plugins/android-full-screen';
import VoiceTest from './pages/Test/VoiceTest';
import ApiTest from './pages/Test/ApiTest';
import ComponentTest from './pages/Test/ComponentsTest';
import Logout from './pages/Login/Logout';

const App = () =>{
  const dispatch = store.dispatch;
  const user = useSelector((root:RootState)=>root.userSlice.api.user)
  let disableMenu = !user;

  useEffect(()=>{
    AndroidFullScreen.isImmersiveModeSupported()
    .then(() => AndroidFullScreen.immersiveMode())
    .catch(console.warn);
  },[])

  if(user){
    dispatch(validate()).catch(err=>{
      dispatch(logout());
    })
  }

  const menu = [
    {label:"root", href:"/"},
    {label:"api", href:"/api"},
    {label:"camera", href:"/camera"},
    {label:"voice", href:"/voice"},
    {label:"unknown", href:"/unknown"},
    {label:"logout", href:"/logout"}
  ]

  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Layout menu={menu} disableMenu={disableMenu}/>}>
          {
            user ?
              <>
                <Route index element={<ComponentTest />} />
                <Route path="api" element={<ApiTest />} />
                <Route path="camera" element={<CameraTest />} />
                <Route path="voice" element={<VoiceTest />} />
                <Route path="logout" element={<Logout />} />
                <Route path="*" element={<ComponentTest />} />
              </>:
                <>
                  <Route index element={<Login />} />
                  <Route path="*" element={<Login />} />
                </>
          }
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

export default App;
