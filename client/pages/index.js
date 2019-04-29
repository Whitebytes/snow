/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../modules/components/AppFrame';
import DashBoard from '../modules/components/DashBoard';
import Subscribe from '../data/Subscribe';

class Index extends React.Component {
  

  render() {
    return (
      <AppFrame>
        <Subscribe>{({ payload,sender, topic }) => {
          return <div><div>{payload}({sender}-{topic})</div> <DashBoard></DashBoard></div>}}
        </Subscribe></AppFrame>
    );
  }
}


export default Index;
