import React from 'react';

import {ModalWindow} from '../common-components/modalWindow';
import {TemplateForm} from '../common-components/templateForm';
import API from '../api';

class SettingsScreen extends React.Component{
  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await API.put(
          "user-settings/" + this.props.userSettings.id,
          this.props.userSettings,
          {headers: { "Content-Type": "application/json"}});

      if (!response.data.error) {
        this.props.updateUserSettings(response.data.userSettings);
      }

    } catch(err) {
      console.error(err);
    }

    this.props.onClose();
  };

  handleInputChange = (event) => {
    const target = event.target;
    const newSettings = {
      ...this.props.userSettings,
      [target.name]: target.value
    };
    this.props.updateUserSettings(newSettings);
    event.preventDefault();
  };

  render() {
    const formTemplate = [{
      title: "Search radius:",
      name: "searchRadius",
      type: "text",
    }];
    return (
      <React.Fragment>
        {
          this.props.userSettings ?
            <ModalWindow onClose={this.props.onClose}>
              <h2 className="AlignedItem">Settings</h2>
              <form className="AlignedItem Aligner" onSubmit={this.handleSubmit}>
                <TemplateForm formTemplate={formTemplate}
                              onChange={this.handleInputChange}
                              data={this.props.userSettings}/>
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
