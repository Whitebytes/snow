/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../../modules/components/AppFrame';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';
import GMap from '../../modules/media/GMap';
import BuObjects from '../../data/BuObjects';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const greatPlace = {lat: 52.6743317,lng:6.2571985};
const objName = 'mediaList'
const query = `query{queryMediaRaw(clause:"{}"){id,name,blobRef,props}}`

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
    const {data, ...rest} = this.props;
  
    let popperContent=<div>
      <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
      <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
    </div>;
    
  
    return (
      <AppFrame noBorder={true} popperContent={popperContent}>
      <BuObjects query={query} objectName={objName}>
        <GMap
          bootstrapURLKeys={{key: 'AIzaSyDKzVON9dMEWaJqWw8ARIa9wM2gU465btk'}}
          markers={data.map((elem)=>{
            var {props, ...item} = elem;
            var propObj = JSON.parse(props)
            return {
              ...propObj,
                ...item
            }
          })}
          {...rest} >
      </GMap>
      </BuObjects>
      </AppFrame>
    );
  }
}

const mapStateToProps = state => {
  return (state) => { 
      if (state.buObjects[objName])
        return {
          loadState:state.buObjects[objName].state, 
          data:state.buObjects[objName].records
        }
        return {}
  };

};


export default connect(
  mapStateToProps,
)(Index);
