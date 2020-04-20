import React from 'react';

import './commonComponents.scss';

class RoundImage extends React.Component {
  renderAsString() {
    return `
      <img class="RoundImage ${this.props.className}"
           src="${this.props.imgUrl}"
           alt="${this.props.alt}"/>
    `;
  }

  render() {
    return (
      <img className={"RoundImage " + this.props.className}
           src={this.props.imgUrl}
           alt={this.props.alt}/>
    );
  }
}

export {RoundImage};
