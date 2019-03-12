/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../../modules/components/AppFrame';


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
        
      </AppFrame>
    );
  }
}



export default index;
