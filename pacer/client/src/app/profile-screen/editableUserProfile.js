import React from 'react';

import {ModalWindow} from '../common-components/commonComponents';
import {UserDataForm} from '../common-components/commonComponents';

class EditableUserProfile extends React.Component{
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(userData) {
      
      // check userData and call some back-end
      console.log(userData)
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
          <UserDataForm submitText="Save" onSubmit={this.handleSubmit} userData={userData}/>
        </ModalWindow>
      );
    }
}

export {EditableUserProfile}