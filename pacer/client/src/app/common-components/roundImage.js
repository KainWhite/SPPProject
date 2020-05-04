import React from 'react';

import './commonComponents.scss';

class RoundImage extends React.Component {
  renderAsString() {
    return `
      <div class="image-cropper">
        <img class="img ${this.props.className}"
             src="${this.props.imgUrl}"
             alt="${this.props.alt}"/>
      </div>
    `;
  }

  render() {
    return (
      <div className="image-cropper">
        <img className={"img " + this.props.className}
             src={this.props.imgUrl}
             alt={this.props.alt}/>
      </div>
    );
  }
}

export {RoundImage};
