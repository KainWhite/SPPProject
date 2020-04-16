import React from 'react';

import './app.scss';
import {AuthorizedEnum} from './authorized-enum.js';
import {MainApp} from './main-app/main-app'
import {AuthScreen} from './login-and-register-screen/loginAndRegisterScreen';
import {UserProfile} from './profile-screen/userProfile';
import {EditableUserProfile} from './profile-screen/editableUserProfile';
import {SettingsScreen} from './settings-screen/settingsScreen';
import {ChatScreen} from "./chat/chat-screen";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {  authorized: AuthorizedEnum.unauthorized
                    // Display status of modal windows is an app state
                  , showLogin: true
                  , showRegister: false
                  , showUserProfile: false
                  , showEditableUserProfile: false
                  , showSettings: false
                  , showChat: false
                  , };
  }

  getAuthorizedState() {
    let authorized; // todo call backend here to get it
    this.setState({authorized: authorized});
  }

  setAuthorizedState = (newState) => {
    this.setState({authorized: newState});
  }

  render() {
    // TEMP
    const user = {email: "jason@born.com", imgUrl: "https://i.pinimg.com/originals/4e/73/20/4e73208be9f326816a787de2e04db80a.jpg", age: 20, nickname: "NaRuTo2003", about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."};
    const userSettings = {searchRadius: 10};

    return (
      // Just a container, put everything here
      <>
        {this.state.authorized === AuthorizedEnum.unauthorized ?
            <AuthScreen authHandler={this.setAuthorizedState}/>
          : <MainApp profileClick={() => this.setState({showUserProfile: true})}
            settingsClick={() => this.setState({showSettings: true})}
            logoutClick={() => this.setState({authorized: AuthorizedEnum.unauthorized})}/>
        }

        {/* TEMP - example of showing modal window (do the same in side menu) */}
        <button onClick={() => this.setState({showLogin: true})}>Show login window</button>
        <button onClick={() => this.setState({showUserProfile: true})}>Show user profile</button>
        <button onClick={() => this.setState({showEditableUserProfile: true})}>Show editable user profile</button>
        <button onClick={() => this.setState({showSettings: true})}>Show user settings</button>
        <button onClick={() => this.setState({showChat: true})}>Show chat</button>

        {/* Rendering modals: */}
        {/* {this.state.showUserProfile && <UserProfile user={user} onClose={() => this.setState({showUserProfile: false})}/>}
        {this.state.showEditableUserProfile && <EditableUserProfile user={user} onClose={() => this.setState({showEditableUserProfile: false})}/>}
        {this.state.showSettings && <SettingsScreen data={userSettings} onClose={() => this.setState({showSettings: false})}/>}
        {this.state.showChat && <ChatScreen onClose={() => this.setState({showChat: false})}/>} */}

      </>
    );
  }
}

export {App};
