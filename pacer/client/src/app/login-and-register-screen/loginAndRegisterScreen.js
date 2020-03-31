import React from 'react';

import {ModalContainer} from '../common-components/commonComponents';
import {FormElement} from '../common-components/commonComponents';

class LoginScreen extends React.Component{
  constructor(props) {
    super(props);
    //this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleClose() {
  //   alert("Yep, i can close :)");
  // }

  handleSubmit(event) {
    // ...
    event.preventDefault();
  }

  render() {
    return (
      <ModalContainer onClose={this.props.onClose}>
      <h2>Log in</h2>
      <form onSubmit={this.handleSubmit}>
        <FormElement title="Email:" name="email" type="email"/> <br />
        <FormElement title="Password:" name="password" type="password"/> <br />
        <input type="submit" value="Log in"/>
      </form>
      <button onClick={this.props.onSwitchToRegister}>
        Register
      </button>
      </ModalContainer>
    );
  }
}

class RegisterScreen extends React.Component{
  constructor(props) {
    super(props);
    //this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // handleClose() {
  //   alert("Yep, i can close too:)");
  // }

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
      <ModalContainer onClose={this.props.onClose}>
      <h2>Register</h2>
      <form onSubmit={this.handleSubmit}>
        <FormElement title="Email:" name="email" type="email"/> <br />
        <FormElement title="Password:" name="password" type="password" onChange={this.handleInputChange}/> <br />
        <FormElement title="Confirm password:" name="confirmPassword" type="password" onChange={this.handleInputChange}/> <br />
        <FormElement title="Nickname:" name="nickname" type="text"/> <br />
        <FormElement title="Age:" name="age" type="text" onChange={this.handleInputChange}/> <br />
        <label>
          About:
          <br />
          <textarea value=""/>
        </label>
        <br />
        <input type="submit" value="Register"/>
      </form>
      </ModalContainer>
    );
  }
}

export {LoginScreen, RegisterScreen}