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

  onAuthorized = (newState, user, userSettings, token) => {
    API.defaults.headers.common['x-auth'] = token;
    this.setState({
      authorized: newState,
      currentUser: user,
      userSettings: userSettings,
    });
  };

  updateCurrentUser = (newUser) => {
    console.log(newUser);
    this.setState({currentUser: newUser});
  };

  updateUserSettings = (newSettings) => {
    console.log(newSettings);
    this.setState({userSettings: newSettings});
  };

  render() {
    return (
      <React.Fragment>
        {
          this.state.authorized === AuthorizedEnum.unauthorized ?
            <AuthScreen authHandler={this.onAuthorized}/> :
            <MainApp currentUser={this.state.currentUser}
                     userSettings={this.state.userSettings}
                     updateCurrentUser={this.updateCurrentUser}
                     updateUserSettings={this.updateUserSettings}
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
