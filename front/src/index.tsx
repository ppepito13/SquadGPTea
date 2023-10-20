import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { SplashScreen } from '@capacitor/splash-screen';// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';


await SplashScreen.show({
  showDuration: 2000,
  autoHide: true,
});

// window.addEventListener('myCustomEvent', (resolve, reject, args) => {
//   LocalNotifications.schedule({
//     notifications:[
//         {
//         id: 11,
//         title: "test title",
//         body: "test body",
//         largeBody: " test largebody",
//         summaryText: "test summary text"
//       }
//     ]
//   })
//   resolve();
// });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Call the element loader after the app has been rendered the first time
defineCustomElements(window);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
