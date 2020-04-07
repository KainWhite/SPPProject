import React from 'react';
import {Topbar} from './topbar/topbar.js';

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidepaneVisible: false,
    }
  }

  toggleSidepane() {
    this.setState({
      sidepaneVisible: !this.state.sidepaneVisible,
    });
  }

  render() {
    return (
      <Topbar toggleSidepane={() => this.toggleSidepane()}/>
    );
  }
}

export {MainApp}
