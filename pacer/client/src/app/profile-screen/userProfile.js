import React from 'react';

import {ModalWindow} from '../common-components/modalWindow';
import {RoundImage} from '../common-components/roundImage';

class UserProfile extends React.Component{
  constructor(props) {
    super(props);
  }

  handleOpenChat = (event) => {
    this.props.chatClick(this.props.user);
    this.props.onClose();
    event.preventDefault();
  }

  render() {
    return (
      <ModalWindow onClose={this.props.onClose}>
        <div className="AlignedItem">
          <div className="Aligner">
            <RoundImage imgUrl={this.props.user.imgUrl} alt="User avatar"/>
          </div>
        </div>
        <div className="AlignedItem">
          <span className="Aligner">{this.props.user.nickname}, {this.props.user.age} y.o.</span>
        </div>
        <p className="AlignedItem AboutP">{this.props.user.about}</p>
        <button className="AlignedItem" onClick={this.handleOpenChat}>
            Go chat
        </button>
      </ModalWindow>
    );
  }
}

export {UserProfile}