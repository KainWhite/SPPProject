import React from 'react';

import API from '../api';

import {AuthorizedEnum} from '../authorized-enum.js';
import {UserDataForm} from '../common-components/userDataForm';
import {TemplateForm} from '../common-components/templateForm';

import './loginAndRegisterScreen.scss';

class AuthScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {  showRegister: false
                  , errorMsg: ""};
  }

  handleLogin = async (loginData) => {
    try {
      const response = await API.post(`login`, loginData,
      { headers: {
          "Content-Type": "application/json"}});

      if (!response.data.error) {
        const token = response.data.token;
        const currentUser = response.data.currentUser;
        this.setState({errorMsg: ""});
        this.props.authHandler(AuthorizedEnum.authorized, currentUser, token);
      } else {
        this.setState({errorMsg: response.data.error});
      }

    } catch(err) {
      this.setState({errorMsg: "Sorry, something went wrong on server :("});
    }
  };

  handleRegister = async (registerData) => {
    console.log(registerData);

    // @KainWhite goes here :)
    registerData.latitude = 1;
    registerData.longitude = 1;

    try {
      const response = await API.post(`users/create`, registerData,
      { headers: {
          "Content-Type": "application/json"}});
      console.log(response)
      if (!response.data.error) {
        this.handleLogin({email: registerData.email, password: registerData.password})
        this.setState({errorMsg: ""});
      }
      else {
        this.setState({errorMsg: response.data.error});
      }

    } catch(err) {
      this.setState({errorMsg: "Sorry, something went wrong on server :("});
    }
  };

  handleSwitchToRegister = () => {
    this.setState({  showRegister: true
                   , });
  };

  handleSwitchToLogin = () => {
    this.setState({  showRegister: false
                   , });
  };

  render() {
    return (
      <div className="authAligner">
        <div className="authScreen">
          {this.state.showRegister ?
              <RegisterScreen registerHandler={this.handleRegister} onSwitchToLogin={this.handleSwitchToLogin} errorMsg={this.state.errorMsg}/>
            : <LoginScreen loginHandler={this.handleLogin} onSwitchToRegister={this.handleSwitchToRegister} errorMsg={this.state.errorMsg}/>
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
  };

  handleInputChange = (event) => {
    const target = event.target;

    this.setState({
      [target.name]: target.value
    });

    event.preventDefault();
  };

  getLoginData() {
    return {  email: this.state.email
            , password: this.state.password};
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
          <span className="ErrorSpan">{this.props.errorMsg}</span>
        </>
    );
  }
}

class RegisterScreen extends React.Component{
  render() {
    return (
      <>
        <h2 className="AlignedItem">Register</h2>
        <UserDataForm submitText="Register" onSubmit={this.props.registerHandler} userData={{}}/>
        <button className="AlignedItem" onClick={this.props.onSwitchToLogin}>
              Back to log in
        </button>
        <span className="ErrorSpan">{this.props.errorMsg}</span>
      </>
    );
  }
}

export {AuthScreen}
