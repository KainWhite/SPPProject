import React from 'react';
import {AuthorizedEnum} from './authorized-enum.js';
import {MainApp} from './main-app/main-app'
import {AuthScreen} from './login-and-register-screen/loginAndRegisterScreen';
import API from './api';

import './app.scss';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authorized: AuthorizedEnum.unauthorized,
    };
  }

  onAuthorized = (newState, user, token) => {
    API.defaults.headers.common['x-auth'] = token;
    this.setState({authorized: newState, currentUser: user});
  };

  onUserUpdate = (newUser) => {
    console.log(newUser);
    this.setState({currentUser: newUser});
  };

  render() {
    console.error(this.state);
    return (
      <React.Fragment>
        {
          this.state.authorized === AuthorizedEnum.unauthorized ?
            <AuthScreen authHandler={this.onAuthorized}/> :
            <MainApp currentUser={this.state.currentUser}
                     onUserUpdate={this.onUserUpdate}
                     logoutClick={() => {
                        this.setState({
                          authorized: AuthorizedEnum.unauthorized,
                          currentUser: undefined});
                        delete API.defaults.headers.common['x-auth'];
                     }}/>
        }
      </React.Fragment>
    );
  }
}

export {App};
