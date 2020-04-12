import React from 'react';
import {Topbar} from './topbar/topbar';
import {Sidepane} from './sidepane/sidepane';

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidepaneVisible: false,
      sidepaneStyle: {
        width: 0,
      },
    }
    console.log("mainapp: " + props.profileClick);
  }

  toggleSidepane() {
    const sidepaneStyle = {};
    const topbarStyle = {};
    if (this.state.sidepaneVisible) {
      sidepaneStyle.width = '0';
      topbarStyle.marginLeft = '0';
    } else {
      sidepaneStyle.width = '200px'; // sidepane.offsetWidth + 'px';
      topbarStyle.marginLeft = '200px';
    }
    this.setState((state) => {
      return {
        sidepaneVisible: !state.sidepaneVisible,
        sidepaneStyle: sidepaneStyle,
        topbarStyle: topbarStyle,
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <Sidepane sidepaneStyle={this.state.sidepaneStyle}
                  profileClick={this.props.profileClick}
                  settingsClick={this.props.settingsClick}
                  logoutClick={this.props.logoutClick}/>
        <Topbar topbarStyle={this.state.topbarStyle}
                toggleSidepane={() => this.toggleSidepane()}/>
      </React.Fragment>
    );
  }
}

export {MainApp}
