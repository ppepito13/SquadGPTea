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
import Wall from './pages/kid/wall';
import NewPostAdvance from './pages/kid/NewPost/NewPostAdvance';
import HomeWork from './pages/kid/HomeWork';

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

  const userType = "kid";

  const getRoutes = (userType:string) =>{
    if(user && userType === "kid"){
      const menu = [
        {label:"root", href:"/"},
        {label:"homework", href:"/homework"},
        {label:"logout", href:"/logout"}
      ]
      return (
        <Route path="/" element={<Layout menu={menu} disableMenu={disableMenu}/>}>
          <Route index element={<Wall />} />
          <Route path="newpost" element={<NewPostAdvance />} />
          <Route path="homework" element={<HomeWork />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<Wall />} />
        </Route>
      )
    }else if(user && userType === "parent"){
      const menu = [
        {label:"root", href:"/"},
        {label:"logout", href:"/logout"}
      ]
      return (
        <Route path="/" element={<Layout menu={menu} disableMenu={disableMenu}/>}>
          <Route index element={<Wall />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<Wall />} />
        </Route>
      )
    }else if(user && userType === "terapist"){
      const menu = [
        {label:"root", href:"/"},
        {label:"logout", href:"/logout"}
      ]
      return (
        <Route path="/" element={<Layout menu={menu} disableMenu={disableMenu}/>}>
          <Route index element={<Wall />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<Wall />} />
        </Route>
      )
    }else if(user && userType === "test"){
      const menu = [
        {label:"root", href:"/"},
        {label:"api", href:"/api"},
        {label:"camera", href:"/camera"},
        {label:"voice", href:"/voice"},
        {label:"unknown", href:"/unknown"},
        {label:"logout", href:"/logout"}
      ]
      return (
        <Route path="/" element={<Layout menu={menu} disableMenu={disableMenu}/>}>
          <Route index element={<ApiTest />} />
          <Route path="api" element={<ApiTest />} />
          <Route path="camera" element={<CameraTest />} />
          <Route path="voice" element={<VoiceTest />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<ApiTest />} />
        </Route>
      )
    }else{
      return (
        <Route path="/" element={<Layout menu={[]} disableMenu={disableMenu}/>}>
          <Route index element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<Login />} />
        </Route>
      )
    }
  }

  return (
    <MemoryRouter>
      <Routes>
          { getRoutes(userType) }
      </Routes>
    </MemoryRouter>
  );
}

export default App;
