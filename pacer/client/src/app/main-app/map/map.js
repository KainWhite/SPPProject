import React from 'react';
import {YMaps, Map, Placemark} from 'react-yandex-maps';

import './map.scss'

class YandexMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myCoordinates: null,
      usersNearby: [],
    }
  }

  updateMyCoordinates() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        myCoordinates: [position.coords.latitude, position.coords.longitude]
      });
    })
  }

  componentDidMount() {
    this.updateMyCoordinates();
    this.getUsersNearbyTimerID = setInterval(() => {
      /*call server for getting users with setstate here*/
    }, 10000);
    this.sendMyCoordsTimerID = setInterval(() => {
      /*push my coords to server with setstate here*/
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
                     key={userNearby.name}/>
    );
    return (
      <div className="map">
        <YMaps query={{
               lang: "en_US",
               apikey: "f8a4a7fe-f442-4a37-af5a-a4dec57c863f"}}>
          {
            this.state.myCoordinates && (
              <Map state={{center: this.state.myCoordinates, zoom: 12}}
                   height="100%"
                   width="100%"
                   modules={["geolocation", "geocode"]}>
                <Placemark geometry={this.state.myCoordinates}/>
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
