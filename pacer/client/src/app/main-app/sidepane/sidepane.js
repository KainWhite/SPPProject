import React from 'react';
import {SidepaneItem} from './sidepane-item/sidepane-item';
import './sidepane.scss'

class Sidepane extends React.Component {
  render() {
    return (
      <div className="sidepane" style={this.props.sidepaneStyle}>
        <ul className="sidepane__list">
          <SidepaneItem caption="Profile"
                        id="sidepaneItemProfile"
                        onClick={this.props.profileClick}/>
          <SidepaneItem caption="Chats"
                        id="sidepaneItemChats"
                        onClick={this.props.chatsClick}/>
          <SidepaneItem caption="Map"
                        id="sidepaneItemMap"
                        onClick={this.props.mapClick}/>
          <SidepaneItem caption="Settings"
                        id="sidepaneItemSettings"
                        onClick={this.props.settingsClick}/>
          <SidepaneItem caption="Log out"
                        id="sidepaneItemLogOut"
                        onClick={this.props.logoutClick}/>
        </ul>
      </div>
    );
  }
}

export {Sidepane}
