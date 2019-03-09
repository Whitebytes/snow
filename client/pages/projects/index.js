/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../../modules/components/AppFrame';
import MediaCard from '../../modules/media/MediaCard';
import MediaRaw from '../../data/MediaRaw';
import apiClient from "../../modules/ApiClient"
import { connect } from "react-redux";

const MediaRawWithApiClient = props => <MediaRaw apiClient={apiClient} {...props}/>

class index extends React.Component {
  static getInitialProps({query}) {
    return {query,data:[], ...this.props}
  }

  getItems = ()=>{
    if (this.props.query.url)
      return <MediaCard  url={this.props.query.url}></MediaCard>

    return this.props.data.splice(0,10).map((item)=>{
      return (<MediaCard key={item.id} url={item.blobRef}></MediaCard>);
    })
  }
  render() {
    return (
      <AppFrame>
        <MediaRawWithApiClient>
         {this.getItems()}
        </MediaRawWithApiClient>
  
      </AppFrame>
    );
  }
}

const mapStateToProps = state => {
  return { 
      loadState:state.mediaRaw.loadState, 
      data:state.mediaRaw.records
  };
};

export default connect(mapStateToProps,
null
)(index);
