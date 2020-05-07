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
      authorized: AuthorizedEnum.authorized,
      currentUser: {
        id: 0,
        coordinates: null,
        nickname: "Current User",
        imgUrl: "http://localhost:3000/images/notFound.jpg",
        settings: {
          searchRadius: 10,
        }
      }
    };
  }

  // redundant (?)
  getAuthorizedState() {
    let authorized; // todo call backend here to get it
    this.setState({authorized: authorized});
  }

  onAuthorized = (newState, user, token) => {
    API.defaults.headers.common['x-auth'] = token;
    this.setState({authorized: newState, currentUser: user});
  }

  onUserUpdate = (newUser) => {
    console.log(newUser);
    this.setState({currentUser: newUser});
  }

  render() {
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
