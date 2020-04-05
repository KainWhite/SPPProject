import React from 'react';

import {ModalWindow} from '../common-components/modalWindow';
import {TemplateForm} from '../common-components/templateForm';

class SettingsScreen extends React.Component{
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = this.props.data;
  }

  handleSubmit(event) {
    // Back-end calls here
    const settingsData = this.getSettingsData();
    console.log(settingsData);

    event.preventDefault();
  }

  handleInputChange(event) {
    const target = event.target;
    
    this.setState({
      [target.name]: target.value
    });

    event.preventDefault();
  }

  getSettingsData() {
    const settingsData = {  searchRadius: this.state.searchRadius
                          , };
    return settingsData;
  }

  render() {
    const settingsData = this.getSettingsData();
    const formTemplate = [{title: "Search radius:", name:"searchRadius", type: "text"}];

    return (
      <ModalWindow onClose={this.props.onClose}>
        <h2 className="AlignedItem">Settings</h2>
        <form className="AlignedItem Aligner" onSubmit={this.handleSubmit}>
          <TemplateForm formTemplate={formTemplate} onChange={this.handleInputChange} data={settingsData}/>
          <input className="FormAlignedItem" type="submit" value="Save"/>
        </form>
      </ModalWindow>
    );
  }
}

export {SettingsScreen}