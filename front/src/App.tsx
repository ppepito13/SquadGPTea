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
import Chat from './pages/common/Chat';
import { startLiveQuery } from './redux/ChatSlice';
import { UserType } from './types';
import { FaChalkboard, FaClipboardCheck, FaCommentDots, FaExchangeAlt, FaRegChartBar, FaSignOutAlt } from 'react-icons/fa';
const App = () =>{
  const dispatch = store.dispatch;
  const user:UserType = useSelector((root:RootState)=>root.userSlice.api.user);
  const selectedKid = useSelector((root:RootState)=>root.statusSlice.status.selectedKid);
  const availableKids:UserType[] = useSelector((root:RootState)=>root.statusSlice.status.availableKids);

  let disableMenu = !user;

  useEffect(()=>{
    AndroidFullScreen.isImmersiveModeSupported()
    .then(() => AndroidFullScreen.immersiveMode())
    .catch(console.warn);
  },[])

  useEffect(()=>{
    if(user?.type === 'kid'){
      dispatch(startLiveQuery(user.objectId, [user.therapist.objectId]));
    }else if(user?.type === 'parent'){
      dispatch(startLiveQuery(user.objectId, [user.therapist.objectId]));
    }else if(user?.type === 'terap'){
      if(availableKids.length>0){
        dispatch(startLiveQuery(user.objectId, availableKids.map(ak=>ak.objectId)));
      }
    }
  }, [availableKids])

  if(user){
    dispatch(validate()).catch(err=>{
      dispatch(logout());
    })
  }

  const userType = "kid";

  const getRoutes = (userType:string) =>{
    if(user && user.type === "kid"){
      const menu = [
        {label:"Wall", href:"/", icon:<FaChalkboard/>},
        {label:"Homework", href:"/homework", icon:<FaClipboardCheck/>},
        {label:"Emotion chart", href:"/chart", icon:<FaRegChartBar/>},
        {label:"Chat", href:"/chat", icon:<FaCommentDots/>},
        {label:"Logout", href:"/logout", icon:<FaSignOutAlt/>}
      ]
      return (
        <Route path="/" element={<Layout menu={menu} disableMenu={disableMenu} user={user}/>}>
          <Route index element={<Wall />} />
          <Route path="newpost" element={<NewPostAdvance />} />
          <Route path="homework" element={<HomeWork />} />
          <Route path="chart" element={<ChartEmo />} />
          <Route path="chat" element={<Chat />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<Wall />} />
        </Route>
      )
    }else if(user && user.type === "parent"){
      const menu = [
        {label:"Homework", href:"/homework", icon:<FaClipboardCheck/>},
        {label:"Chat", href:"/chat", icon:<FaCommentDots/>},
        {label:"Logout", href:"/logout", icon:<FaSignOutAlt/>}
      ]
      return (
        <Route path="/" element={<Layout menu={menu} disableMenu={disableMenu}/>}>
          <Route index element={<HomeWork />} />
          <Route path="homework" element={<HomeWork />} />
          <Route path="chat" element={<Chat />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<HomeWork />} />
        </Route>
      )
    }else if(user && user.type === "terap"){
      if(selectedKid){
        const menu = [
          {label:"Select patient", href:"/", icon:<FaExchangeAlt/>},
          {label:"Patient wall", href:"/wall", icon:<FaChalkboard/>},
          {label:"Patient homework's", href:"/homework", icon:<FaClipboardCheck/>},
          {label:"Patient emotion chart", href:"/chart", icon:<FaRegChartBar/>},
          {label:"Patient chat", href:"/patientchat", icon:<FaCommentDots/>},
          {label:"Parent chat", href:"/parentchat", icon:<FaCommentDots/>},
          {label:"Logout", href:"/logout", icon:<FaSignOutAlt/>}
        ]
        return (
          <Route path="/" element={<Layout menu={menu} disableMenu={disableMenu} user={selectedKid}/>}>
            <Route index element={<SelectKid />} />
            <Route path="wall" element={<Wall selectedKid={selectedKid}/>} />
            <Route path="homework" element={<HomeWork selectedKid={selectedKid} />} />
            <Route path="newhomework" element={<NewHomeWork />} />
            <Route path="chart" element={<ChartEmo />} />
            <Route path="patientchat" element={<Chat selectedKid={selectedKid}/>} />
            <Route path="parentchat" element={<Chat slectedParent={selectedKid.parent?.objectId}/>} />
            <Route path="logout" element={<Logout />} />
            <Route path="*" element={<SelectKid />} />
          </Route>
        )
      }else{
        const menu = [
          {label:"select kid", href:"/", icon:<FaExchangeAlt/>},
          {label:"logout", href:"/logout", icon:<FaSignOutAlt/>}
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
        {label:"root", href:"/", icon:<FaClipboardCheck/>},
        {label:"api", href:"/api", icon:<FaClipboardCheck/>},
        {label:"camera", href:"/camera", icon:<FaClipboardCheck/>},
        {label:"voice", href:"/voice", icon:<FaClipboardCheck/>},
        {label:"unknown", href:"/unknown", icon:<FaClipboardCheck/>},
        {label:"logout", href:"/logout", icon:<FaSignOutAlt/>}
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
