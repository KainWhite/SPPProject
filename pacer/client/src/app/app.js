import React from 'react';
import './app.scss';
import {AuthorizedEnum} from './authorized-enum.js';
import {DefaultApp} from './default-app/default-app'
import {LoginScreen} from './login-screen/loginScreen';

class App extends React.Component {
  state = {
    authorized: AuthorizedEnum.unauthorized,
  };

  getAuthorizedState() {
    let authorized; // todo call backend here to get it
    this.setState({authorized: authorized});
  }

  render() {
    if (this.state.authorized === AuthorizedEnum.authorized) {
      return <DefaultApp/>;
    } else {
      return <LoginScreen/>;
    }
  }
}

export {App};
