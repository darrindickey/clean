/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import SignupForm from '../components/SignUpForm';

export default class Signup extends React.Component {

  render() {
    return (
      <div>
        <h1>Signup</h1>
        <SignupForm {...this.props} />
      </div>
    );
  }
}
