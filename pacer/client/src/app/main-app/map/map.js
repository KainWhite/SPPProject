import React from 'react';
import {YMaps, Map, Placemark} from 'react-yandex-maps';

import './map.scss'

class YandexMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: [0, 0],
    }
  }

  setCurrentPosition(ymaps) {
    ymaps.geolocation.get({
      provider: 'browser',
      mapStateAutoApply: true
    }).then(res => {
       this.setState({
         coordinates: res.geoObjects.get(0).geometry.getCoordinates(),
       });
    }, err => {
      console.error("coordinates are not set due to ", err);
    });
  }

  render() {
    return (
      <div className="map">
        <YMaps query={{
               lang: "en_US",
               apikey: "f8a4a7fe-f442-4a37-af5a-a4dec57c863f"}}>
          <Map state={{center: this.state.coordinates, zoom: 9}}
               height="100%"
               width="100%"
               modules={["geolocation", "geocode"]}
               onLoad={(ymaps) => {this.setCurrentPosition(ymaps);}}>
            {this.state.coordinates && <Placemark geometry={this.state.coordinates}/>}
          </Map>
        </YMaps>
      </div>
    );
  }
}

export {YandexMap}
