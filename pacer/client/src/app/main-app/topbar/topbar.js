import React from 'react';
import './topbar.scss';

class Topbar extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleSidepane() {
    this.props.toggleSidepane();
  }

  render() {
    return (
      <header className="main-header">
        <nav className="main-menu">
          <div className="main-menu__item_logo">
            <a className="main-menu__link" href="">Some Cool Logo</a>
          </div>
          <button className="main-menu__toggle-btn"
                  onClick={() => this.toggleSidepane()}>
              <i className="fas fa-bars"/>
          </button>
          <ul className="main-menu__list"/> {/*here should be some menu items*/}
        </nav>
      </header>
    );
  }
}

export {Topbar}
