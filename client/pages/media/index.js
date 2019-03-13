/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../../modules/components/AppFrame';
import MediaList from '../../modules/media/MediaList';
import { connect } from "react-redux";
import BuObjects from '../../data/BuObjects'
const objName = 'mediaList'

const query = `query{queryMediaRaw(clause: "{}") {
  id
  name
  blobRef
  props,
  createdAt,
  labels,
  userOwner {
    firstName
    avatar
  }
}
}`
class index extends React.Component {
  
  render() {

    return (
      <AppFrame>
        <BuObjects query={query} objectName={objName}>
          <MediaList mediaItems={this.props.data} {...this.props} />
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
        return {data:[]}
  };
};


export default connect(mapStateToProps, null)(index);
