/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../../modules/components/AppFrame';
import apiClient from "../../modules/ApiClient"

const MediaRawWithApiClient = props => <MediaRaw apiClient={apiClient} {...props}/>

class index extends React.Component {
 

  render() {
    return (
      <AppFrame>
        
      </AppFrame>
    );
  }
}export default index