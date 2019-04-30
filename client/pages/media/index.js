/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../../modules/components/AppFrame';
import MediaList from '../../modules/media/MediaList';
import {mediaRaw} from '../../data/Queries'
import {Query} from 'react-apollo'

class index extends React.Component {
  
  render() {
    return (
      <AppFrame>
        <Query query={mediaRaw} >{({data, loading})=>{
          if (loading) return "loading...";
          return <MediaList mediaItems={data.queryMediaRaw} {...this.props} />
        }}
        </Query>
      </AppFrame>
    );
  }
}
export default index;
