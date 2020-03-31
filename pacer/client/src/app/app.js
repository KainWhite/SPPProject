import React from 'react';

import './app.scss';
import {AuthorizedEnum} from './authorized-enum.js';
import {DefaultApp} from './default-app/default-app'
import {LoginScreen} from './login-and-register-screen/loginAndRegisterScreen';
import {RegisterScreen} from './login-and-register-screen/loginAndRegisterScreen';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {  authorized: AuthorizedEnum.unauthorized
                  , registering: false
                  , };

    this.handleSwitchToRegister = this.handleSwitchToRegister.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  getAuthorizedState() {
    let authorized; // todo call backend here to get it
    this.setState({authorized: authorized});
  }
  
  handleSwitchToRegister() {
    this.setState({registering: true});
  }

  // TODO DAY->ANY: Make modals close adequately
  handleCloseModal() {
    alert("I was closed :(");
  }

  render() {
    if (this.state.authorized === AuthorizedEnum.authorized) {
      return <DefaultApp/>;
    } else {
      const isRegistering = this.state.registering;
      return (isRegistering ? 
          <RegisterScreen onClose={this.handleCloseModal}/> 
        : <LoginScreen onSwitchToRegister={this.handleSwitchToRegister} onClose={this.handleCloseModal}/>
      );
    }
  }
}

export {App};
