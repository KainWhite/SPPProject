import React from 'react';

import './commonComponents.scss';

class RoundImage extends React.Component {
  render() {
    return (
      <img className="RoundImage" src={this.props.imgUrl} alt={this.props.alt}></img>
    );
  }
}

export {RoundImage};