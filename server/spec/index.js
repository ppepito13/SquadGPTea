// Example express application adding the parse-server module to expose Parse
// compatible API routes.

import express from 'express';
import { ParseServer } from 'parse-server';
import ParseDashboard from 'parse-dashboard';
import path from 'path';
const __dirname = path.resolve();
import http from 'http';
import ParseSwagger from 'parse-server-swagger';
//const ParseSwagger = require('parse-server-swagger');


export const config = {
  appId: "collabothon",
  masterKey: "fa114fa1-1ddc-49f1-8034-a8ab414fa558",
  appName: "collabothon",
  cloud: __dirname + '/cloud/main.js',
  databaseURI: "mongodb://localhost:27017/collabothon",
  serverURL: "http://127.0.0.1:1337/parse",
  publicServerURL: "https://polarny.it:1337/parse",
  port: 1337
//  liveQuery: {
  //  classNames: ['Posts', 'Comments'], // List of classes to support for query subscriptions
//  },
};

export const app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
if (!process.env.TESTING) {
  const mountPath = process.env.PARSE_MOUNT || '/parse';
  const server = new ParseServer(config);
  await server.start();
  app.use(mountPath, server.app);

//  const parseSwagger = new ParseSwagger({});
  var parseSwagger = new ParseSwagger({
     serverURL: "https://www.polarny.it/parse",
     apiRoot: "/parse",
     appId: "collabothon",
     masterKey: "fa114fa1-1ddc-49f1-8034-a8ab414fa558",
  });
  app.use(parseSwagger);

  const dashboard = new ParseDashboard({
    "apps": [
      {
        "serverURL": "https://www.polarny.it/parse",
        "appId": "collabothon",
        "masterKey": "fa114fa1-1ddc-49f1-8034-a8ab414fa558",
        "appName": "Collabothon 2023"
      }
    ]
  });
  app.use("/dashboard", dashboard);
}

// Parse Server plays nicely with the rest of your web routes
app.get('/dupa', function (req, res) {
  res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

if (!process.env.TESTING) {
  const port = process.env.PORT || 1337;
  const httpServer = http.createServer(app);
  httpServer.listen(port, function () {
    console.log('parse-server-example running on port ' + port + '.');
  });
  // This will enable the Live Query real-time server
  await ParseServer.createLiveQueryServer(httpServer);
}
console.log(app.routes)
