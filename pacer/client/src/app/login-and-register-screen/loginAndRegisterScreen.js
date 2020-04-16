import React from 'react';

import {AuthorizedEnum} from '../authorized-enum.js';
import {UserDataForm} from '../common-components/userDataForm';
import {TemplateForm} from '../common-components/templateForm';

import './loginAndRegisterScreen.scss';

class AuthScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {  showRegister: false
                  , };
  }

  handleLogin = (loginData) => {
    console.log(loginData);

    // Everything's ok, user authorized
    this.props.authHandler(AuthorizedEnum.authorized);
  }

  handleRegister = (registerData) => {
    console.log(registerData);
  }

  handleSwitchToRegister = () => {
    this.setState({  showRegister: true
                   , });
  }

  handleSwitchToLogin = () => {
    this.setState({  showRegister: false
                   , });
  }

  render() {
    return (      
      <div className="authAligner">
        <div className="authScreen">
          {this.state.showRegister ?
              <RegisterScreen registerHandler={this.handleRegister} onSwitchToLogin={this.handleSwitchToLogin}/> 
            : <LoginScreen loginHandler={this.handleLogin} onSwitchToRegister={this.handleSwitchToRegister}/> 
          }
        </div>
      </div>
    );
  }
}

class LoginScreen extends React.Component{
  constructor(props) {
    super(props);

    this.state = {}
  }

  handleSubmit = (event) => {
    const loginData = this.getLoginData();
    this.props.loginHandler(loginData);

    event.preventDefault();
  }

  handleInputChange = (event) => {
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
        <>
          <h2 className="AlignedItem">Log in</h2>
          <form className="AlignedItem Aligner" onSubmit={this.handleSubmit}>
            <TemplateForm formTemplate={formTemplate} onChange={this.handleInputChange} data={loginData}/>
            <input className="FormAlignedItem" type="submit" value="Log in"/>
          </form>
          <button className="AlignedItem" onClick={this.props.onSwitchToRegister}>
              Register
          </button>
        </>
    );
  }
}

class RegisterScreen extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h2 className="AlignedItem">Register</h2>
        <UserDataForm submitText="Register" onSubmit={this.props.registerHandler} userData={{}}/>
        <button className="AlignedItem" onClick={this.props.onSwitchToLogin}>
              Back to log in
          </button>
      </>
    );
  }
}

export {AuthScreen}