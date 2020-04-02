// Maybe need to split this one into separate files
import React from 'react';

class ModalWindow extends React.Component {
  render() {
    return (
      <div className="ModalWindowContainer">
        <div className="ModalWindow">
        {this.props.onClose !== undefined && <CloseButton onClose={this.props.onClose}/>}
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
          <input className="FormInput" value={this.props.value} name={this.props.name} type={this.props.type} onChange={this.props.onChange}/>
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

class UserDataForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {}
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.getUserData());
  }

  handleInputChange(event) {
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
            <textarea name="about" className="FormInput FormTextArea" onChange={this.handleInputChange}/>
          </label>
          <input className="FormAlignedItem" type="submit" value={this.props.submitText}/>
        </form>
    );
  }
}

class TemplateForm extends React.Component {
  render() {
    const formElements = this.props.formTemplate.map(
      (el) => <FormElement key={el.name}
                           value={this.props.data[el.name]} 
                           title={el.title} 
                           name={el.name}
                           type={el.type}
                           onChange={this.props.onChange}/>
    );

    return (<>{formElements}</>);
  }
}

export {ModalWindow, TemplateForm, RoundImage, UserDataForm}
