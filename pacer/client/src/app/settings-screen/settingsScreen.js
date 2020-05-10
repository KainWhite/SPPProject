import React from 'react';

import {ModalWindow} from '../common-components/modalWindow';
import {TemplateForm} from '../common-components/templateForm';
import API from '../api';

class SettingsScreen extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userSettings: undefined,
    }
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await API.put(
          "user-settings/" + this.state.userSettings.id,
          this.state.userSettings,
          {headers: { "Content-Type": "application/json"}});

      if (!response.data.error) {
        this.setState({
          userSettings: response.data.userSettings,
        });
      }

    } catch(err) {
      console.error(err);
    }

    this.props.onClose();
  };

  handleInputChange = (event) => {
    const target = event.target;
    this.setState({
      userSettings: {
        ...this.state.userSettings,
        [target.name]: target.value
      }
    });
    event.preventDefault();
  };

  componentDidMount() {
    API.get(
        "user-settings/" + this.props.currentUser.id,
        null,
        {headers: { "Content-Type": "application/json"}})
      .then(res => {
        if (!res.data.error) {
          this.setState({
            userSettings: res.data.userSettings,
          });
        } else {
          console.error(res.data.error);
        }
      }, err => {
        console.error(err);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const formTemplate = [{
      title: "Search radius:",
      name: "searchRadius",
      type: "text",
    }];
    return (
      <React.Fragment>
        {
          this.state.userSettings ?
            <ModalWindow onClose={this.props.onClose}>
              <h2 className="AlignedItem">Settings</h2>
              <form className="AlignedItem Aligner" onSubmit={this.handleSubmit}>
                <TemplateForm formTemplate={formTemplate}
                              onChange={this.handleInputChange}
                              data={this.state.userSettings}/>
                <input className="FormAlignedItem" type="submit" value="Save"/>
              </form>
            </ModalWindow>
            :
            ''
        }
      </React.Fragment>
    );
  }
}

export {SettingsScreen}
