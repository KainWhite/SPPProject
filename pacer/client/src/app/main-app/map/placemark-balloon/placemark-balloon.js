import React from 'react';
import {RoundImage} from '../../../common-components/roundImage';
import './placemark-balloon.scss'

class PlacemarkBalloon extends React.Component {
  renderAsString() {
    const userImage = new RoundImage({
      imgUrl: this.props.user.imgUrl,
      alt: "Some cool photo"
    });
    // todo make profile/chat click
    return `
      <div class="map__placemark-balloon">
        <div class="placemark-balloon__image">
          ${userImage.renderAsString()}
        </div>
        <h2 class="placemark-balloon__nickname">
          ${this.props.user.nickname}
        </h2>
        <div class="placemark-balloon__buttons">
          <button class="placemark-balloon__profile-btn"
                  onclick="${() => {}}">
            Show profile
          </button>
          <button class="placemark-balloon__chat-btn"
                  onclick="${() => {}}">
            ${this.props.currentUser === this.props.user ? "Show saved messages" : "Show chat"}
          </button>
        </div>
      </div>
    `;
  }
}

export {PlacemarkBalloon}
