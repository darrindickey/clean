/* eslint no-console: 0, react/jsx-filename-extension: 0 */
import express from 'express';
import http from 'http';
import httpProxy from 'http-proxy';
import path from 'path';
import PrettyError from 'pretty-error';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';
import {
  createStore,
} from '../src/redux/createStore';
import getRoutes from '../src/routes';
import Default from '../src/layouts/Default';
import { port, apiHost, apiPort } from '../config/env';
import Config from '../config/db-config';
import SeverConfig from '../config/server-config';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

const targetUrl = `http://${apiHost}:${apiPort}`;
const pretty = new PrettyError();
const app = express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true,
});

global.__CLIENT__ = false; // eslint-disable-line

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'ServerConfig.session_secret', saveUninitialized: true, resave: true }));

app.use(passport.initialize());
app.use(passport.session());    // Required for persistent login sessions (optional, but recommended)

app.use('/', express.static(path.resolve(__dirname, '../public')));

app.use('/api', (req, res) => {
  proxy.web(req, res, { target: `${targetUrl}/api` });
});

// app.get('/signup', (req, res) => {
//   proxy.web(req, res, { target: `${targetUrl}/signup` });
// });

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});
proxy.on('error', (error, req, res) => {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }
  const json = { error: 'proxy_error', reason: error.message };
  res.end(JSON.stringify(json));
});
app.use((req, res) => {
  if (process.env.NODE_ENV === 'development') {
    webpackIsomorphicTools.refresh();
  }
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  function hydrateOnClient() {
    console.log('hydrated')
    res.send(`<!doctype html>${ReactDOM.renderToString(<Default assets={webpackIsomorphicTools.assets()} store={store} />)}`);
  }

  match({ history, routes: getRoutes(store), location: req.originalUrl },
  (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      const component = (
        <Provider store={store} key="provider">
          <RouterContext {...renderProps} />
        </Provider>
      );
      res.status(200);
      global.navigator = { userAgent: req.headers['user-agent'] };
      res.send(`<!doctype html>${ReactDOM.renderToStaticMarkup(<Default component={component} store={store} assets={webpackIsomorphicTools.assets()} />)}`);
    } else {
      res.status(404).send('Not found');
    }
  });
});
app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Server listening on port ${port}!`);
  }
});
