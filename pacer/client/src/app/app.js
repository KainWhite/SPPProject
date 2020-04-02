import React from 'react';

import './app.scss';
import {AuthorizedEnum} from './authorized-enum.js';
import {DefaultApp} from './default-app/default-app'
import {LoginScreen} from './login-and-register-screen/loginAndRegisterScreen';
import {RegisterScreen} from './login-and-register-screen/loginAndRegisterScreen';
import {UserProfile} from './profile-screen/userProfile';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {  authorized: AuthorizedEnum.unauthorized
                    // Display status of modal windows is an app state
                  , showLogin: true
                  , showRegister: false   
                  , showUserProfile: false           
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
    // TEMP
    const user = {imgUrl: "https://i.pinimg.com/originals/4e/73/20/4e73208be9f326816a787de2e04db80a.jpg", age: 20, nickname: "NaRuTo2003", about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."};

    return (
      // Just a container, put everything here
      <>
        
        {/* TEMP - example of showing login window (do the same in side menu) */}
        <button onClick={() => this.setState({showLogin: true})}>Show login window</button>

        {/* Rendering modals: */}
        {this.state.showLogin && <LoginScreen onSwitchToRegister={this.handleSwitchToRegister} onClose={() => this.setState({showLogin: false})}/>}
        {this.state.showRegister && <RegisterScreen onClose={() => this.setState({showRegister: false})}/>}
        {this.state.showUserProfile && <UserProfile user={user} onClose={() => this.setState({showUserProfile: false})}/>}

      </>
    );
  }
}

export {App};
