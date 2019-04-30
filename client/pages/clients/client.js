/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../../modules/components/AppFrame';
import FileList from '../../modules/clients/FileList';

class client extends React.Component {
  static getInitialProps({query}) {
    return {...query, ...this.props}
  }

  render() {
    return (
      <AppFrame>
        <FileList token={this.props.id}></FileList>
      </AppFrame>
    );
  }
}


export default client
