import React from 'react';

import API from '../api';

import {ModalWindow} from '../common-components/modalWindow';
import {UserDataForm} from '../common-components/userDataForm';
import {RoundImage} from '../common-components/roundImage';

class EditableUserProfile extends React.Component{
    constructor(props) {
      super(props);

      const user = this.props.user;
      this.state = {  imgFileName: ""
                    , imageUrl: user.imageUrl  
                    , email: user.email
                    , nickname: user.nickname
                    , age: user.age
                    , about: user.about};
    }
  
    handleSubmit = async (userData) => {      
      
      if (!userData.password || !userData.confirmPassword) return;

      let user = this.props.user;
      user.email = userData.email ? userData.email : user.email;
      user.nickname = userData.nickname ? userData.nickname : user.nickname;
      user.age = userData.age ? userData.age : user.age;
      user.about = userData.about ? userData.about : user.about;
      user.password = userData.password;
      user.confirmPassword = userData.confirmPassword;

      try {
        console.log("Hello, i am going to send update user data :)");  
        let response = await API.put("users/" + this.props.user.id, user, 
        { headers: {
            "Content-Type": "application/json"}});
          
        console.log(response.data);  

        if (!response.data.error) {
          this.props.onUserUpdate(response.data.user); 
        }    
    
      } catch(err) {
        console.log(err);
      }
    }

    handleUpdateAvatar = async (event) => {
      event.preventDefault();
      
      const file = this.state.imgFileName;

      if (file != '') {
        let formData = new FormData();
        formData.append('profilepic', file);

        try {
          let response = await API.post(`upload-image`, formData, 
          { headers: {
              "Content-Type": "multipart/form-data"}});
    
          let user = this.props.user;
          user.imageUrl = response.data.fileUrl;
          console.log("Avatar url: " + response.data.error)

          let avatarResponce = await API.put(`users/profile/updateAvatar`, {id: user.id, imageUrl: user.imageUrl}, 
          { headers: {
              "Content-Type": "application/json"}});

          if (!avatarResponce.data.error) {
            this.props.onUserUpdate(avatarResponce.data.user); 
            this.setState({imageUrl: user.imageUrl}) 
          }
      
        } catch(err) {
          console.log(err);
        }
      }
    }
    
    handleInputChange = (event) => {
      const target = event.target;
      
      if (event.target.files) {
        this.setState({
          imgFileName: target.files[0]
        });
      }
      else {
        this.setState({
          [target.name]: target.value
        });
      }
  
      event.preventDefault();
    }

    getUserData() {
      const userData = {  email: this.state.email
                        , nickname: this.state.nickname
                        , age: this.state.age
                        , about: this.state.about
                        , imageUrl: this.state.imageUrl};
      return userData;
    }

    render() {
      const userData = this.getUserData();

      return (
        <ModalWindow onClose={this.props.onClose}>
          <h2 className="AlignedItem">Edit Profile</h2>
          <div className="AlignedItem">
            <div className="Aligner">
              <RoundImage imgUrl={this.state.imageUrl} alt="User avatar"/>
            </div>
          </div>
          <form className="AlignedItem Aligner" onSubmit={this.handleUpdateAvatar}>
            <input className="FormAlignedItem FormInput" name="imgFileName" type="file" onChange={this.handleInputChange}/>
            <input className="FormAlignedItem FormInput" type="submit" value="Upload"/>
          </form>
          <UserDataForm submitText="Save" onSubmit={this.handleSubmit} userData={userData}/>
        </ModalWindow>
      );
    }
}

export {EditableUserProfile}