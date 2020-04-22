import React from 'react';
import {Topbar} from './topbar/topbar';
import {Sidepane} from './sidepane/sidepane';
import {YandexMap} from './map/map';
import {ChatScreen} from "../chat/chat-screen";

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidepaneVisible: false,
      sidepaneStyle: {
        width: 0,
      },
      isMapShown: true,
      userToChat: null,
    }
  }

  toggleSidepane() {
    const sidepaneStyle = {};
    const topbarStyle = {};
    if (this.state.sidepaneVisible) {
      sidepaneStyle.width = '0';
      topbarStyle.marginLeft = '0';
    } else {
      sidepaneStyle.width = '200px'; // sidepane.offsetWidth + 'px';
      topbarStyle.marginLeft = '200px';
    }
    this.setState((state) => {
      return {
        sidepaneVisible: !state.sidepaneVisible,
        sidepaneStyle: sidepaneStyle,
        topbarStyle: topbarStyle,
      }
    });
  }

  getUserToChat = () => {
    this.setState( {isMapShown: false});
    //HERE @KAINWHITE CAN PUT LOGIC TO GET USER AFTER CLICK ON MAP OR USE IT FOR "CHATS BUTTON CLICK" with userToChat=null;
  }

  render() {
    return (
      <React.Fragment>
        <Sidepane sidepaneStyle={this.state.sidepaneStyle}
                  profileClick={this.props.profileClick}
                  settingsClick={this.props.settingsClick}
                  logoutClick={this.props.logoutClick}
                  chatsClick={() => this.getUserToChat()}/>
        <Topbar topbarStyle={this.state.topbarStyle}
                toggleSidepane={() => this.toggleSidepane()}/>
        {this.state.isMapShown && <YandexMap currentUser={this.props.currentUser}
                   profileClick={this.props.profileClick}/> }
        {!this.state.isMapShown && <ChatScreen currentUser={this.props.currentUser}
                                               userToChat={this.state.userToChat}/>}
      </React.Fragment>
    );
  }
}

export {MainApp}
