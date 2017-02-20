/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import { Link } from 'react-router';

export default class Home extends React.Component {

  render() {
    return (
      <div>
        <h1>Smoked</h1>
        <Link to='/signup'>Signup</Link>
      </div>
    );
  }
}
