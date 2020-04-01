import React from 'react';

import {ModalWindow} from '../common-components/commonComponents';
import {FormElement} from '../common-components/commonComponents';

class LoginScreen extends React.Component{
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    // ...
    event.preventDefault();
  }

  render() {
    return (
      <ModalWindow onClose={this.props.onClose}>
      <h2 className="AlignedItem">Log in</h2>
      <form className="AlignedItem Aligner" onSubmit={this.handleSubmit}>
        <FormElement title="Email:" name="email" type="email"/>
        <FormElement title="Password:" name="password" type="password"/>
        <input className="FormAlignedItem" type="submit" value="Log in"/>
      </form>
      <button className="AlignedItem" onClick={this.props.onSwitchToRegister}>
          Register
      </button>
      </ModalWindow>
    );
  }
}

class RegisterScreen extends React.Component{
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {
    // ...
    event.preventDefault();
  }

  handleInputChange(event) {
    // const target = event.target;
    // const value = target.name === 'isGoing' ? target.checked : target.value;
    // const name = target.name;

    // this.setState({
    //   [name]: value
    // });
    alert("Smth changed...");
  }

  render() {
    return (
      <ModalWindow onClose={this.props.onClose}>
      <h2 className="AlignedItem">Register</h2>
      <form className="AlignedItem Aligner" onSubmit={this.handleSubmit}>
        <FormElement title="Email:" name="email" type="email"/>
        <FormElement title="Password:" name="password" type="password" onChange={this.handleInputChange}/>
        <FormElement title="Confirm password:" name="confirmPassword" type="password" onChange={this.handleInputChange}/>
        <FormElement title="Nickname:" name="nickname" type="text"/>
        <FormElement title="Age:" name="age" type="text" onChange={this.handleInputChange}/>
        <label className="FormAlignedItem Aligner">
          <span className="FormSpan">About:</span>
          <textarea className="FormInput FormTextArea"/>
        </label>
        <input className="FormAlignedItem" type="submit" value="Register"/>
      </form>
      </ModalWindow>
    );
  }
}

export {LoginScreen, RegisterScreen}