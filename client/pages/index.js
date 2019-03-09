/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../modules/components/AppFrame';
import DashBoard from '../modules/components/DashBoard';

class Index extends React.Component {
  

  render() {
    return (
      <AppFrame><DashBoard></DashBoard></AppFrame>
    );
  }
}


export default Index;
