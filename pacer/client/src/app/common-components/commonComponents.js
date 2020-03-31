// Maybe need to split this one into separate files
import React from 'react';

class ModalContainer extends React.Component {
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
  render() {
    return (
      <div className="CloseButton" onClick={this.props.onClose}>
        <span>❌</span>
      </div>
    );
  }
}

// Maybe rename?
class FormElement extends React.Component {
  render() {
    return (
      <label>
          {this.props.title}
          <br />
          <input name={this.props.name} type={this.props.type} onChange={this.props.onChange}/>
      </label>
    );
  }
}

export {ModalContainer, FormElement}
