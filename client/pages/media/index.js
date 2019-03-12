/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../../modules/components/AppFrame';
import MediaList from '../../modules/media/MediaList';

class index extends React.Component {
  static getInitialProps({query}) {
    return {query,data:[], ...this.props}
  }
  render() {

    return (
      <AppFrame>
       <MediaList {...this.props} />
  
      </AppFrame>
    );
  }
}



export default index;
