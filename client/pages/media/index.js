/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../../modules/components/AppFrame';
import MediaCard from '../../modules/media/MediaCard';

class index extends React.Component {
  static getInitialProps({query}) {
    return {query}
  }

  getItems = ()=>{
    
    if (this.props.query.url)
      return <MediaCard key={i} url={this.props.query.url}></MediaCard>
    let result = [];
    for (var i=0; i<20; i++){
        result.push(<MediaCard key={i} url={'https://picsum.photos/200/300/?random&k='+i}></MediaCard>);
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
