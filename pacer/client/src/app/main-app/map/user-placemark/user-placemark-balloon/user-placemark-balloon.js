import {RoundImage} from '../../../../common-components/roundImage';
import './user-placemark-balloon.scss'

/**
 * @return {string}
 */
function UserPlacemarkBalloon(props) {
  return `
    <div class="map__placemark-balloon">
      <div class="placemark-balloon__image">
        ${
          new RoundImage({
            imgUrl: props.user.imageUrl,
            alt: "Some cool photo"
          }).renderAsString()
        }
      </div>
      <h2 class="placemark-balloon__nickname">
        ${props.user.nickname}
      </h2>
      <div class="placemark-balloon__buttons">
        <button class="placemark-balloon__profile-btn"
                id="placemark-balloon__profile-btn_user-id_${props.user.id}">
          Show profile
        </button>
        <button class="placemark-balloon__chat-btn"
                id="placemark-balloon__chat-btn_user-id_${props.user.id}">
          ${props.currentUser === props.user ? "Show saved messages" : "Show chat"}
        </button>
      </div>
    </div>
  `;
}

export {UserPlacemarkBalloon}
