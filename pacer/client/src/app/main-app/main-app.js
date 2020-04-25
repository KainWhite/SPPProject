import React from 'react';
import {MainContainerEnum} from './main-container-enum';
import {ModalWindowEnum} from './modal-window-enum';
import {Topbar} from './topbar/topbar';
import {Sidepane} from './sidepane/sidepane';
import {YandexMap} from './map/map';
import {ChatScreen} from "../chat/chat-screen";
import {EditableUserProfile} from '../profile-screen/editableUserProfile';
import {UserProfile} from '../profile-screen/userProfile';
import {SettingsScreen} from '../settings-screen/settingsScreen';

import "./main-app.scss";

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidepaneVisible: false,
      sidepaneStyle: {
        width: 0,
      },
      mainStyle: {
        marginLeft: 0,
      },
      mainContainer: MainContainerEnum.map,
      modalWindow: ModalWindowEnum.none,
      userToChat: null,
      userToShowProfile: null,
    }
  }

  toggleSidepane() {
    const sidepaneStyle = {};
    const mainStyle = {};
    if (this.state.sidepaneVisible) {
      sidepaneStyle.width = '0';
      mainStyle.marginLeft = '0';
    } else {
      sidepaneStyle.width = '200px'; // sidepane.offsetWidth + 'px';
      mainStyle.marginLeft = '200px';
    }
    this.setState((state) => {
      return {
        sidepaneVisible: !state.sidepaneVisible,
        sidepaneStyle: sidepaneStyle,
        mainStyle: mainStyle,
      }
    });
  }

  showChat(userToChat) {
    this.setState({
      mainContainer: MainContainerEnum.chat,
      userToChat: userToChat,
    });
  }

  renderSwitchModalWindow(modalWindow) {
    switch (modalWindow) {
      case ModalWindowEnum.none:
        return;
      case ModalWindowEnum.profileSelf:
        return <EditableUserProfile user={this.props.currentUser}
                                    onClose={() => this.setState({
                                      modalWindow: ModalWindowEnum.none,
                                    })}/>;
      case ModalWindowEnum.profileUser:
        return <UserProfile user={this.state.userToShowProfile}
                            onClose={() => this.setState({
                              modalWindow: ModalWindowEnum.none,
                            })}/>;
      case ModalWindowEnum.settings:
        return <SettingsScreen data={this.props.currentUser.settings}
                               onClose={() => this.setState({
                                 modalWindow: ModalWindowEnum.none,
                               })}/>;
      default:
        console.error("Unsupported modal window " + modalWindow);
    }
  }

  render() {
    return (
      <React.Fragment>
        <Sidepane sidepaneStyle={this.state.sidepaneStyle}
                  profileClick={() => this.setState({
                    modalWindow: ModalWindowEnum.profileSelf,
                  })}
                  settingsClick={() => this.setState({
                    modalWindow: ModalWindowEnum.settings,
                  })}
                  chatsClick={(userToChat) => this.showChat(userToChat)}
                  mapClick={() => this.setState({
                    mainContainer: MainContainerEnum.map,
                  })}
                  logoutClick={this.props.logoutClick}/>
        <div className={"main"} style={this.state.mainStyle}>
          <Topbar toggleSidepane={() => this.toggleSidepane()}/>
          {
            this.state.mainContainer === MainContainerEnum.map ?
              <YandexMap currentUser={this.props.currentUser}
                         profileClick={(userToShowProfile) => this.setState({
                           userToShowProfile: userToShowProfile,
                           modalWindow: ModalWindowEnum.profileUser,
                         })}
                         chatClick={(userToChat) => this.showChat(userToChat)}/> :
              <ChatScreen currentUser={this.props.currentUser}
                          userToChat={this.state.userToChat}/>
          }
        </div>
        { this.renderSwitchModalWindow(this.state.modalWindow) }
      </React.Fragment>
    );
  }
}

export {MainApp}
