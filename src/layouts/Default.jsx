/* eslint react/prefer-stateless-function: 0, react/no-danger: 0, react/forbid-prop-types: 0 */
import React from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import { webpackHost, webpackPort } from '../../config/env';

export default class Default extends React.Component {

  render() {
    const { assets, component, store } = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';

    return (
      <html lang="en">
        <head>
          <title>Hello, Darrin!</title>
          {/* production */}
          {Object.keys(assets.styles).map((style, key) =>
            <link
              href={assets.styles[style]}
              key={key} media="screen, projection"
              rel="stylesheet" type="text/css" charSet="UTF-8"
            />
          )}
          {/* development */}
          {
            Object.keys(assets.styles).length === 0 ?
              <style dangerouslySetInnerHTML={{ __html: require('../containers/App.css')._style }} /> :
            null
          }
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          <script
            dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }}
            charSet="UTF-8"
          />
          <script
            src={
              process.env.NODE_ENV === 'development' ?
              `http://${webpackHost}:${webpackPort}/assets/main.js` :
              '/assets/main.js'
            }
            charSet="UTF-8"
          />
        </body>
      </html>
    );
  }
}

Default.propTypes = {
  component: React.PropTypes.node,
  store: React.PropTypes.object,
};
