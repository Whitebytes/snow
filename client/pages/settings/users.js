/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../../modules/components/AppFrame';
import UserEdit from '../../modules/settings/UserEdit'

class Index extends React.Component {
  render() {
    return (
      <AppFrame><UserEdit/></AppFrame>
    );
  }
}
export default Index
