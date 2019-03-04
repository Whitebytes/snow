/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../../modules/components/AppFrame';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react'

import supercluster from 'points-cluster';
import { susolvkaCoords, markersData } from '../../modules/media/fakeData';
import GMap from '../../modules/media/GMap';


class Index extends React.Component {
  
 
  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    greatPlaceCoords: PropTypes.any
  };

  static defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 9,
    greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
      <AppFrame noBorder={true}>
        <GMap
          bootstrapURLKeys={{key: 'AIzaSyDKzVON9dMEWaJqWw8ARIa9wM2gU465btk'}}
          //apiKey= // set if you need stats etc ...
          center={this.props.center}
          zoom={this.props.zoom}>
      
      </GMap>
      </AppFrame>
    );
  }
}
export default Index
