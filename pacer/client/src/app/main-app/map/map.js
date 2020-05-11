import './map.scss';
import React from 'react';
import {YMaps, Map} from 'react-yandex-maps';
import {UserPlacemark} from './user-placemark/user-placemark';
import API from '../../api';

class YandexMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersNearby: [],
    }
  }

  updateCurrentUserCoordinates() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.props.updateCurrentUser({
        ...this.props.currentUser,
        coordinates: [position.coords.latitude, position.coords.longitude],
      });
    });
    API.put(
        "users/" + this.props.currentUser.id,
        this.props.currentUser,
        {headers: { "Content-Type": "application/json"}});
    this.currentUserCoordinatesSet = true;
  }

  getUsersNearby() {
    API.get('users/nearby', {
              params: {
                latitude: this.props.currentUser.coordinates[0],
                longitude: this.props.currentUser.coordinates[1],
                searchRadius: this.props.userSettings.searchRadius,
              },
              headers: { "Content-Type": "application/json"}
            })
        .then(res => {
          console.log(res);
          if (!res.data.error) {
            this.setState({
              usersNearby: res.data.usersNearby,
            });
          } else {
            console.error(res.data.error);
          }
        }, err => {
          console.error(err);
        });
  }

  componentDidMount() {
    this.updateCurrentUserCoordinates();
    this.getUsersNearby();
    this.getUsersNearbyTimerID = setInterval(() => {
      this.getUsersNearby();
    }, 10000);
    this.updateCurrentUserCoordinatesTimerID = setInterval(() => {
      this.updateCurrentUserCoordinates();
    }, 10000);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userSettings !== this.props.userSettings ||
        (prevProps.userSettings && this.props.userSettings &&
         prevProps.userSettings.searchRadius !== this.props.userSettings.searchRadius)) {
      this.getUsersNearby();
    }
  }

  componentWillUnmount() {
    clearInterval(this.getUsersNearbyTimerID);
    clearInterval(this.updateCurrentUserCoordinatesTimerID);
  }

  render() {
    const usersNearbyPlacemarks = this.state.usersNearby
      .map(userNearby =>
        <UserPlacemark geometry={userNearby.coordinates}
                       key={userNearby.nickname}
                       options={{
                         iconColor: userNearby.isOnline ? "#03b5ff" : "#aaaaaa",
                         hideIconOnBalloonOpen: false,
                         balloonMaxWidth: 200,
                       }}
                       user={userNearby}
                       currentUser={this.props.currentUser}
                       profileClick={this.props.profileClick}
                       chatClick={this.props.chatClick}/>);
    return (
      <div className="map">
        <YMaps query={{
               lang: "en_US",
               apikey: "f8a4a7fe-f442-4a37-af5a-a4dec57c863f"}}>
          {
            this.currentUserCoordinatesSet && (
              <Map defaultState={{center: this.props.currentUser.coordinates, zoom: 12}}
                   options={{autoFitToViewport: 'always'}}
                   height="100%"
                   width="100%"
                   modules={["geolocation", "geocode"]}>
                {usersNearbyPlacemarks}
                <UserPlacemark geometry={this.props.currentUser.coordinates}
                               options={{
                                 iconColor: '#ff0000',
                                 hideIconOnBalloonOpen: false,
                                 balloonMaxWidth: 200,
                               }}
                               user={this.props.currentUser}
                               currentUser={this.props.currentUser}
                               profileClick={this.props.profileClick}
                               chatClick={this.props.chatClick}/>
              </Map>
            )
          }
        </YMaps>
      </div>
    );
  }
}

export {YandexMap}
