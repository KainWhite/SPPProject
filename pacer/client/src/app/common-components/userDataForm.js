import React from 'react';

import './commonComponents.scss';
import {TemplateForm} from './templateForm';

class UserDataForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.userData;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.getUserData());
  }

  handleInputChange = (event) => {
    const target = event.target;

    this.setState({
      [target.name]: target.value
    });

    event.preventDefault();
  }

  getUserData() {
    const userData = {  email: this.state.email
                      , password: this.state.password
                      , confirmPassword: this.state.confirmPassword
                      , nickname: this.state.nickname
                      , age: this.state.age
                      , about: this.state.about};
    return userData;
  }

  render() {
    const userData = this.getUserData();
    const formTemplate = [  {title: "Email:", name:"email", type: "email"}
                          , {title: "Password:", name:"password", type: "password"}
                          , {title: "Confirm password:", name:"confirmPassword", type: "password"}
                          , {title: "Nickname:", name:"nickname", type: "text"}
                          , {title: "Age:", name:"age", type: "text"}];

    return (
      <form className="AlignedItem Aligner" onSubmit={this.handleSubmit}>
          <TemplateForm formTemplate={formTemplate} onChange={this.handleInputChange} data={userData}/>
          <label className="FormAlignedItem Aligner">
            <span className="FormSpan">About:</span>
            <textarea value={userData.about} name="about" className="FormInput FormTextArea" onChange={this.handleInputChange}/>
          </label>
          <input className="FormAlignedItem" type="submit" value={this.props.submitText}/>
        </form>
    );
  }
}

export {UserDataForm};