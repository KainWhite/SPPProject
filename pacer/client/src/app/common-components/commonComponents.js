// Maybe need to split this one into separate files
import React from 'react';

class ModalContainer extends React.Component {
    // constructor(props) {
    //   super(props);
    // }

    render() {
      return (
        <div className="ModalContainer">
          <CloseButton onClose={this.props.onClose}/>
          {this.props.children}
        </div>
      );
    }
}

class CloseButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClose();
  }

  render() {
    return (
      <div className="CloseButton" onClick={this.handleClick}>
        ❌
      </div>
    );
  }
}

export {ModalContainer}
