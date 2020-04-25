import React from 'react';
import {YMaps, Map, Placemark} from 'react-yandex-maps';
import {PlacemarkBalloon} from './placemark-balloon/placemark-balloon';

import './map.scss';

class YandexMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser,
      usersNearby: [{
        coordinates: [53.91, 27.56],
        nickname: "Active User Nearby",
        imgUrl: "https://i.pinimg.com/originals/4e/73/20/4e73208be9f326816a787de2e04db80a.jpg",
        isOnline: true,
      },{
        coordinates: [53.89, 27.54],
        nickname: "Inactive User Nearby",
        imgUrl: "https://i.pinimg.com/originals/4e/73/20/4e73208be9f326816a787de2e04db80a.jpg",
        isOnline: false,
      }],
    }
  }

  updateMyCoordinates() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState(prevState => ({
        currentUser: {
          ...prevState.currentUser,
          coordinates: [position.coords.latitude, position.coords.longitude],
        }
      }));
    })
    this.currentUserCoordinatesSet = true;
  }

  componentDidMount() {
    this.updateMyCoordinates();
    this.getUsersNearbyTimerID = setInterval(() => {
      /*todo call server for getting users with setstate here*/
    }, 10000);
    this.sendMyCoordsTimerID = setInterval(() => {
      /*todo push my coords to server with setstate here*/
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.getUsersNearbyTimerID);
    clearInterval(this.sendMyCoordsTimerID);
  }

  render() {
    const usersNearbyPlacemarks = this.state.usersNearby
      .map(userNearby =>
        <Placemark geometry={userNearby.coordinates}
                   key={userNearby.nickname}
                   properties={{
                     balloonContent: new PlacemarkBalloon({
                       user: userNearby,
                       currentUser: this.state.currentUser,
                       profileClick: this.props.profileClick,
                       chatClick: this.props.chatClick,
                     }).renderAsString(),
                   }}
                   options={{
                     iconColor: userNearby.isOnline ? "#03b5ff" : "#aaaaaa",
                     hideIconOnBalloonOpen: false,
                     balloonMaxWidth: 200,
                   }}/>
    );
    return (
      <div className="map">
        <YMaps query={{
               lang: "en_US",
               apikey: "f8a4a7fe-f442-4a37-af5a-a4dec57c863f"}}>
          {
            this.currentUserCoordinatesSet && (
              <Map state={{center: this.state.currentUser.coordinates, zoom: 12}}
                   options={{autoFitToViewport: 'always'}}
                   height="100%"
                   width="100%"
                   modules={["geolocation", "geocode"]}>
                <Placemark modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
                           geometry={this.state.currentUser.coordinates}
                           properties={{
                             balloonContent: new PlacemarkBalloon({
                               user: this.state.currentUser,
                               currentUser: this.state.currentUser,
                               profileClick: this.props.profileClick,
                               chatClick: this.props.chatClick,
                             }).renderAsString(),
                           }}
                           options={{
                             iconColor: '#ff0000',
                             hideIconOnBalloonOpen: false,
                             balloonMaxWidth: 200,
                           }}/>
                {usersNearbyPlacemarks}
              </Map>
            )
          }
        </YMaps>
      </div>
    );
  }
}

export {YandexMap}
