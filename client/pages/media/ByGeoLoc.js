/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../../modules/components/AppFrame';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';
import GMap from '../../modules/media/GMap';

import MediaRaw from '../../data/MediaRaw';
import apiClient from "../../modules/ApiClient"
import { connect } from "react-redux";

const MediaRawWithApiClient = props => <MediaRaw apiClient={apiClient} {...props}/>
const greatPlace = {lat: 52.6743317,lng:6.2571985};

class Index extends React.Component {
  
 
  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    greatPlaceCoords: PropTypes.any
  };

  static defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 9,
    greatPlaceCoords: greatPlace
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
      <AppFrame noBorder={true}>
      <MediaRawWithApiClient>
        <GMap
          bootstrapURLKeys={{key: 'AIzaSyDKzVON9dMEWaJqWw8ARIa9wM2gU465btk'}}
          //apiKey= // set if you need stats etc ...
          center={this.props.center}
          zoom={this.props.zoom}
          markers={this.props.data.map((elem)=>{
            var {props, ...item} = elem;
            
            var propObj = JSON.parse(props)
            return {
              ...propObj,
                ...item
            }
          })}>
      </GMap>
      </MediaRawWithApiClient>
      </AppFrame>
    );
  }
}

const mapStateToProps = state => {
  return { 
      data:state.mediaRaw.records
  };
};

export default connect(
  mapStateToProps,
)(Index);
