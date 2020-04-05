import React from 'react';

import './commonComponents.scss';

class CloseButton extends React.Component {
  render() {
    return (
      <div className="CloseButtonWrapper">
        <span className="CloseButton" onClick={this.props.onClose}>❌</span>
      </div>
    );
  }
}

export {CloseButton};