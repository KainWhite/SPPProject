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
                    // Display status of modal windows is an app state
                  , showLogin: false
                  , showRegister: false              
                  , };

    this.handleSwitchToRegister = this.handleSwitchToRegister.bind(this);
  }

  getAuthorizedState() {
    let authorized; // todo call backend here to get it
    this.setState({authorized: authorized});
  }
  
  handleSwitchToRegister() {
    this.setState({  showRegister: true
                   , showLogin: false});                     
  }

  render() {
    return (
      // Just a container, put everything here
      <>
        
        {/* TEMP - example of showing login window (do the same in side menu) */}
        <button onClick={() => this.setState({showLogin: true})}>Show login window</button>

        {/* Rendering modals: */}
        {this.state.showLogin && <LoginScreen onSwitchToRegister={this.handleSwitchToRegister} onClose={() => this.setState({showLogin: false})}/>}
        {this.state.showRegister && <RegisterScreen onClose={() => this.setState({showRegister: false})}/>}

      </>
    );
  }
}

export {App};
