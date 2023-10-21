import React, { useState } from 'react';
import './App.scss';
import logo from './assets/logo.svg';
import bg from './assets/bg.png';
import { WebChatContainer, setEnableDebug, WebChatConfig, WebChatInstance } from '@ibm-watson/assistant-web-chat-react';
import { Icon, List, ListItem, Page, Splitter, SplitterContent, SplitterSide, Toolbar, ToolbarButton} from 'react-onsenui';
import { isBrowser, isMobile, MobileView } from 'react-device-detect';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const webChatOptions:WebChatConfig = {
  integrationID: '46fef89b-5750-4a68-ab59-ef1041728772',
  region: 'eu-de',
  serviceInstanceID: 'a6394b40-e604-4897-9e35-c6e4a0e35cad',
  // subscriptionID: 'only on enterprise plans',
  // Note that there is no onLoad property here. The WebChatContainer component will override it.
  // Use the onBeforeRender or onAfterRender prop instead.
  showLauncher:false
};

const Layout = ({menu, disableMenu, user}: React.PropsWithChildren<Props>) =>{
  const [openMenu, setOpenMenu] = useState(isBrowser);
  const [instance, setInstance] = useState(null as WebChatInstance|null);
  const navigate = useNavigate();
  const location = useLocation();
  setEnableDebug(false);

  return (
    <Page renderToolbar={() =>
      <Toolbar modifier="menu">
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
            <div className="watson-btn" onClick={()=>instance?.toggleOpen()}>WATSON assistant</div>
            <WebChatContainer config={webChatOptions} onBeforeRender={(inst:WebChatInstance) => setInstance(inst)}/>
        </Page>
      </SplitterSide>
      <SplitterContent>
        <Page modifier={isMobile ? 'main' : 'main-browser'}>
          <Outlet/>
        </Page>
      </SplitterContent>
      </Splitter>
      <img src={bg} className='bg' alt=""/>
      <div>dupa</div>
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
