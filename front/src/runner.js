import {LocalNotifications} from '@capacitor/local-notifications';

addEventListener('myCustomEvent', (resolve, reject, args) => {
  LocalNotifications.schedule({
    notifications:[
        {
        id: 11,
        title: "test title",
        body: "test body",
        largeBody: " test largebody",
        summaryText: "test summary text"
      }
    ]
  })
  resolve();
});
