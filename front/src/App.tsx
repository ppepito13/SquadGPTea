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
import Logout from './pages/Login/Logout';
import Wall from './pages/kid/wall';
import NewPostAdvance from './pages/kid/NewPost/NewPostAdvance';
import HomeWork from './pages/common/HomeWork';
import NewHomeWork from './pages/terapist/NewHomeWork';
import SelectKid from './pages/terapist/SelectKid';
import ChartEmo from './pages/common/ChartEmo';
const App = () =>{
  const dispatch = store.dispatch;
  const user = useSelector((root:RootState)=>root.userSlice.api.user);
  const selectedKid = useSelector((root:RootState)=>root.statusSlice.status.selectedKid);

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
    if(user && user.type === "kid"){
      const menu = [
        {label:"wall", href:"/"},
        {label:"homework", href:"/homework"},
        {label:"chart", href:"/chart"},
        {label:"logout", href:"/logout"}
      ]
      return (
        <Route path="/" element={<Layout menu={menu} disableMenu={disableMenu} user={user}/>}>
          <Route index element={<Wall />} />
          <Route path="newpost" element={<NewPostAdvance />} />
          <Route path="homework" element={<HomeWork />} />
          <Route path="chart" element={<ChartEmo />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<Wall />} />
        </Route>
      )
    }else if(user && user.type === "parent"){
      const menu = [
        {label:"wall", href:"/"},
        {label:"logout", href:"/logout"}
      ]
      return (
        <Route path="/" element={<Layout menu={menu} disableMenu={disableMenu}/>}>
          <Route index element={<Wall />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<Wall />} />
        </Route>
      )
    }else if(user && user.type === "terap"){
      if(selectedKid){
        const menu = [
          {label:"select kid", href:"/"},
          {label:"wall", href:"/wall"},
          {label:"homework", href:"/homework"},
          {label:"chart", href:"/chart"},
          {label:"logout", href:"/logout"}
        ]
        return (
          <Route path="/" element={<Layout menu={menu} disableMenu={disableMenu} user={selectedKid}/>}>
            <Route index element={<SelectKid />} />
            <Route path="wall" element={<Wall selectedKid={selectedKid}/>} />
            <Route path="homework" element={<HomeWork selectedKid={selectedKid} />} />
            <Route path="newhomework" element={<NewHomeWork />} />
            <Route path="logout" element={<Logout />} />
            <Route path="*" element={<SelectKid />} />
          </Route>
        )
      }else{
        const menu = [
          {label:"select kid", href:"/"},
          {label:"logout", href:"/logout"}
        ]
        return (
          <Route path="/" element={<Layout menu={menu} disableMenu={disableMenu}/>}>
            <Route index element={<SelectKid />} />
            <Route path="logout" element={<Logout />} />
            <Route path="*" element={<SelectKid />} />
          </Route>
        )
      }
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
