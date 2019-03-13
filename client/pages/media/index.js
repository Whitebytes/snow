/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../../modules/components/AppFrame';
import MediaList from '../../modules/media/MediaList';
const query = `query{queryMediaRaw(clause:"{}"){id,name,blobRef,props,labels, userOwner{firstName, avatar}, createdAt}}`

class index extends React.Component {
  static getInitialProps({query}) {
    return {query,data:[], ...this.props}
  }
  render() {

    return (
      <AppFrame>
       <MediaList query={query} {...this.props} />
  
      </AppFrame>
    );
  }
}



export default index;
