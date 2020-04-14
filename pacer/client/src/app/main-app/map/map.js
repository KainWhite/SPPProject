import React from 'react';
import {YMaps, Map, Placemark} from 'react-yandex-maps';

import './map.scss'

class YandexMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myCoordinates: [0, 0],
      usersNearbyCoordinates: [],
    }
  }

  componentDidMount() {
    this.serverPollCoordsTimerID = setInterval(() => {
      /*call server for getting users coords with setstate here*/
    }, 10000);
    this.pushMyCoordsTimerID = setInterval(() => {
      /*push my coords to server with setstate here*/
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.serverPollCoordsTimerID);
    clearInterval(this.pushMyCoordsTimerID);
  }

  setCurrentPosition(ymaps) {
    ymaps.geolocation.get({
      provider: 'browser',
      mapStateAutoApply: true
    }).then(res => {
      this.setState({
       myCoordinates: res.geoObjects.get(0).geometry.getCoordinates(),
      });
    }, err => {
      console.error("coordinates are not set due to ", err);
    });
  }

  render() {
    const usersNearbyPlacemarks = this.state.usersNearbyCoordinates
        .map(usersNearbyCoordinate =>
          <Placemark geometry={usersNearbyCoordinate.coordinates}
                     key={usersNearbyCoordinate.name}/>
    );
    return (
      <div className="map">
        <YMaps query={{
               lang: "en_US",
               apikey: "f8a4a7fe-f442-4a37-af5a-a4dec57c863f"}}>
          <Map state={{center: this.state.myCoordinates, zoom: 12}}
               height="100%"
               width="100%"
               modules={["geolocation", "geocode"]}
               onLoad={(ymaps) => {this.setCurrentPosition(ymaps);}}>
            {this.state.myCoordinates && <Placemark geometry={this.state.myCoordinates}/>}
            {usersNearbyPlacemarks}
          </Map>
        </YMaps>
      </div>
    );
  }
}

export {YandexMap}
