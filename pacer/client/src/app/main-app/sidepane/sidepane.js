import React from 'react';
import {SidepaneItem} from './sidepane-item/sidepane-item';
import './sidepane.scss'

class Sidepane extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sidepane" style={this.props.sidepaneStyle}>
        <ul className="sidepane__list">
          <SidepaneItem caption="Chats"
                        id="sidepaneItemChats"
                        onClick={() => this.props.chatsClick}/>
          <SidepaneItem caption="Profile"
                        id="sidepaneItemProfile"
                        onClick={() => this.props.profileClick}/>
          <SidepaneItem caption="Log out"
                        id="sidepaneItemLogOut"
                        onClick={() => this.props.captionClick}/>
        </ul>
      </div>
    );
  }
}

export {Sidepane}
