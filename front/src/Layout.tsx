import React, { useState } from 'react';
import './App.scss';
import logo from './assets/logo.svg';
import bg from './assets/bg.png';
import { WebChatContainer, setEnableDebug, WebChatConfig } from '@ibm-watson/assistant-web-chat-react';
import {BackButton, Icon, List, ListItem, Page, Splitter, SplitterContent, SplitterSide, Toolbar, ToolbarButton} from 'react-onsenui';
import { isBrowser, isMobile, MobileView } from 'react-device-detect';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const webChatOptions:WebChatConfig = {
  integrationID: '46fef89b-5750-4a68-ab59-ef1041728772',
  region: 'eu-de',
  serviceInstanceID: 'a6394b40-e604-4897-9e35-c6e4a0e35cad',
  // subscriptionID: 'only on enterprise plans',
  // Note that there is no onLoad property here. The WebChatContainer component will override it.
  // Use the onBeforeRender or onAfterRender prop instead.
};

const Layout = ({menu, disableMenu, user}: React.PropsWithChildren<Props>) =>{
  const [openMenu, setOpenMenu] = useState(isBrowser);
  const navigate = useNavigate();
  const location = useLocation();
  setEnableDebug(false);

  return (
    <Page renderToolbar={() =>
      <Toolbar modifier="menu">
        <div className="left">
          <MobileView>
            <BackButton modifier="menu">
                Back
            </BackButton>
          </MobileView>
        </div>
        <div className="center">
          {user?.username}
        </div>
        <div className="right">
          <MobileView>
            <ToolbarButton  modifier="menu" onCLick={()=>setOpenMenu(!openMenu)}>
              <Icon icon="md-menu" />
            </ToolbarButton>
          </MobileView>
        </div>
      </Toolbar> }
    >
    <Splitter>
      <SplitterSide
        side={isMobile ? "right" : "left"}
        width={200}
        collapse="portrait"
        isOpen={openMenu}
        onClose={()=>setOpenMenu(false)}
        isSwipeable={true}>
        <Page modifier="menu">

          <List
            modifier="menu"
            renderHeader={()=><img src={logo} alt="logo" className='menuLogo'/>}
            dataSource={menu}
            renderRow={(row, idx) => (
              <ListItem
                tappable={true}
                onClick={()=>navigate(row.href)}
                modifier={location.pathname===row.href? "active": "not-active"}
                >
                {row.label}
              </ListItem>
            )}
            />
        </Page>
      </SplitterSide>
      <SplitterContent>
        <Page modifier={isMobile ? 'main' : 'main-browser'}>
          <Outlet/>
        </Page>
      </SplitterContent>
      </Splitter>
      <img src={bg} className='bg' alt=""/>
      <WebChatContainer config={webChatOptions} />
    </Page>

  );
}


interface Props{
  menu:AppLink[],
  disableMenu: boolean;
  user?: any
}

interface AppLink{
  label: string;
  href: string;
}

export default Layout;
