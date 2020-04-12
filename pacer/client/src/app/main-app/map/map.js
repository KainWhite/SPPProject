import React from 'react';
import {YMaps, Map} from 'react-yandex-maps';

import './map.scss'

class YandexMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapStyle: {
        width: "100%",
        height: "100%",
      }
    }
  }

  render() {
    return (
      <div className="map">
        <YMaps>
          <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }}
               style={this.state.mapStyle}/>
        </YMaps>
      </div>
    );
  }
}

export {YandexMap}
