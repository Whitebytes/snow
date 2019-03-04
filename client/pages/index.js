/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../modules/components/AppFrame';
import DashBoard from '../modules/components/DashBoard';
import { connect } from 'react-redux'

class Index extends React.Component {
  static getInitialProps ({ reduxStore, req }) {
    const isServer = !!req
    console.log('store',reduxStore  , isServer)

    return {}
  }

  render() {
    console.log(this.props.selectedModule);
    return (
      <AppFrame><DashBoard></DashBoard></AppFrame>
    );
  }
}
const mapStateToProps = state => {
  return { selectedModule :state.menu.selectedModule };
};

export default connect(mapStateToProps, null)(Index);
