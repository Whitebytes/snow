/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../../modules/components/AppFrame';
import MediaCard from '../../modules/media/MediaCard';

class index extends React.Component {
  getItems = ()=>{
    let result = [];
    for (var i=0; i<20; i++){
        result.push(<MediaCard key={i} imgId={i}></MediaCard>);
    }
    return result;
  }
  render() {
    return (
      <AppFrame>
          {this.getItems()}
      </AppFrame>
    );
  }
}
export default index
