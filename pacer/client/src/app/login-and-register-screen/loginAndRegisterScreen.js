import React from 'react';

import {ModalWindow} from '../common-components/commonComponents';
import {UserDataForm} from '../common-components/commonComponents';
import {TemplateForm} from '../common-components/commonComponents';

class LoginScreen extends React.Component{
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {}
  }

  handleSubmit(event) {
    // Back-end calls here
    const loginData = this.getLoginData();
    console.log(loginData);

    event.preventDefault();
  }

  handleInputChange(event) {
    const target = event.target;
    
    this.setState({
      [target.name]: target.value
    });

    event.preventDefault();
  }

  getLoginData() {
    const loginData = {  email: this.state.email
                       , password: this.state.password};
    return loginData;
  }

  render() {
    const loginData = this.getLoginData();
    const formTemplate = [  {title: "Email:", name:"email", type: "email"}
                          , {title: "Password:", name:"password", type: "password"}];

    return (
      <ModalWindow onClose={this.props.onClose}>
        <h2 className="AlignedItem">Log in</h2>
        <form className="AlignedItem Aligner" onSubmit={this.handleSubmit}>
          <TemplateForm formTemplate={formTemplate} onChange={this.handleInputChange} data={loginData}/>
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
  }

  handleSubmit(userData) {
    
    // check userData and call some back-end
    console.log(userData)
  }

  render() {
    return (
      <ModalWindow onClose={this.props.onClose}>
        <h2 className="AlignedItem">Register</h2>
        <UserDataForm submitText="Register" onSubmit={this.handleSubmit}/>
      </ModalWindow>
    );
  }
}

export {LoginScreen, RegisterScreen}