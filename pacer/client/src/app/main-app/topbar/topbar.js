import React from 'react';
import './topbar.scss';

class Topbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="main-header" style={this.props.topbarStyle}>
        <nav className="main-menu">
          <button className="main-menu__toggle-btn"
                  onClick={() => this.props.toggleSidepane()}>
            <i className="fas fa-bars"/>
          </button>
          <div className="main-menu__item_logo">
            <a className="main-menu__link" href="">Some Cool Logo</a>
          </div>
          <ul className="main-menu__list"/> {/*here should be some menu items*/}
        </nav>
      </header>
    );
  }
}

export {Topbar}
