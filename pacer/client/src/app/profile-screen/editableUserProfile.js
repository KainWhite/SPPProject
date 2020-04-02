import React from 'react';

import {ModalWindow} from '../common-components/commonComponents';
import {UserDataForm} from '../common-components/commonComponents';
import {RoundImage} from '../common-components/commonComponents';

class EditableUserProfile extends React.Component{
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleUpdateAvatar = this.handleUpdateAvatar.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);

      this.state = {imgFileName: ""};
    }
  
    handleSubmit(userData) {
      
      // check userData and call some back-end
      console.log(userData)
    }

    handleUpdateAvatar(event) {
      // upload image to server
      console.log(this.state.imgFileName);

      event.preventDefault();
    }
    
    handleInputChange(event) {
      const target = event.target;
  
      this.setState({
        [target.name]: target.value
      });
  
      event.preventDefault();
    }

    render() {
      const user = this.props.user;
      const userData = {  email: user.email
                        , nickname: user.nickname
                        , age: user.age
                        , about: user.about};

      return (
        <ModalWindow onClose={this.props.onClose}>
          <h2 className="AlignedItem">Edit Profile</h2>
          <div className="AlignedItem">
            <div className="Aligner">
              <RoundImage imgUrl={user.imgUrl} alt="User avatar"/>
            </div>
          </div>
          <form className="AlignedItem Aligner" onSubmit={this.handleUpdateAvatar}>
            <input className="FormAlignedItem FormInput" value={this.state.imgFileName} name="imgFileName" type="file" onChange={this.handleInputChange}/>
            <input className="FormAlignedItem FormInput" type="submit" value="Upload"/>
          </form>
          <UserDataForm submitText="Save" onSubmit={this.handleSubmit} userData={userData}/>
        </ModalWindow>
      );
    }
}

export {EditableUserProfile}