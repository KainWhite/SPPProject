// Maybe need to split this one into separate files
import React from 'react';

class ModalWindow extends React.Component {
  render() {
    return (
      <div className="ModalWindowContainer">
        <div className="ModalWindow">
        <CloseButton onClose={this.props.onClose}/>
        <div className="ModalWindowContentWrapper Aligner">
          {this.props.children}
        </div>
        </div>
      </div>
    );
  }
}

class CloseButton extends React.Component {
  render() {
    return (
      <div className="CloseButtonWrapper">
        <span className="CloseButton" onClick={this.props.onClose}>❌</span>
      </div>
    );
  }
}

// (Text + edit)
class FormElement extends React.Component {
  render() {
    return (
      <label className="FormAlignedItem Aligner">
          <span className="FormSpan">{this.props.title}</span>
          <input className="FormInput" name={this.props.name} type={this.props.type} onChange={this.props.onChange}/>
      </label>
    );
  }
}

class RoundImage extends React.Component {
  render() {
    return (
      <img className="RoundImage" src={this.props.imgUrl} alt={this.props.alt}></img>
    );
  }
}

export {ModalWindow, FormElement, RoundImage}
