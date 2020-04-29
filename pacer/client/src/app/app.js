import React from 'react';
import {AuthorizedEnum} from './authorized-enum.js';
import {MainApp} from './main-app/main-app'
import {AuthScreen} from './login-and-register-screen/loginAndRegisterScreen';

import './app.scss';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authorized: AuthorizedEnum.unauthorized,
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

  getAuthorizedState() {
    let authorized; // todo call backend here to get it
    this.setState({authorized: authorized});
  }

  setAuthorizedState = (newState) => {
    this.setState({authorized: newState});
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.authorized === AuthorizedEnum.unauthorized ?
            <AuthScreen authHandler={this.setAuthorizedState}/> :
            <MainApp currentUser={this.state.currentUser}
                     logoutClick={() => this.setState({
                       authorized: AuthorizedEnum.unauthorized
                     })}/>
        }
      </React.Fragment>
    );
  }
}

export {App};
